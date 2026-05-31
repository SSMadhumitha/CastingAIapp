import os
import cv2
import torch
import numpy as np
import torch.nn as nn

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import shutil

class UNet(nn.Module):
    """U-Net architecture for image-to-image translation"""
    def __init__(self, in_channels=1, out_channels=1):
        super(UNet, self).__init__()

        # Encoder
        self.enc1 = self.conv_block(in_channels, 64)
        self.enc2 = self.conv_block(64, 128)
        self.enc3 = self.conv_block(128, 256)
        self.enc4 = self.conv_block(256, 512)

        # Bottleneck
        self.bottleneck = self.conv_block(512, 1024)

        # Decoder
        self.upconv4 = nn.ConvTranspose2d(1024, 512, kernel_size=2, stride=2)
        self.dec4 = self.conv_block(1024, 512)

        self.upconv3 = nn.ConvTranspose2d(512, 256, kernel_size=2, stride=2)
        self.dec3 = self.conv_block(512, 256)

        self.upconv2 = nn.ConvTranspose2d(256, 128, kernel_size=2, stride=2)
        self.dec2 = self.conv_block(256, 128)

        self.upconv1 = nn.ConvTranspose2d(128, 64, kernel_size=2, stride=2)
        self.dec1 = self.conv_block(128, 64)

        # Final convolution
        self.final_conv = nn.Conv2d(64, out_channels, kernel_size=1)

        # Max pooling
        self.pool = nn.MaxPool2d(2)

    def conv_block(self, in_channels, out_channels):
        return nn.Sequential(
            nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True)
        )

    def forward(self, x):
        # Encoder
        enc1 = self.enc1(x)
        enc2 = self.enc2(self.pool(enc1))
        enc3 = self.enc3(self.pool(enc2))
        enc4 = self.enc4(self.pool(enc3))

        # Bottleneck
        bottleneck = self.bottleneck(self.pool(enc4))

        # Decoder with skip connections
        dec4 = self.upconv4(bottleneck)
        dec4 = torch.cat([dec4, enc4], dim=1)
        dec4 = self.dec4(dec4)

        dec3 = self.upconv3(dec4)
        dec3 = torch.cat([dec3, enc3], dim=1)
        dec3 = self.dec3(dec3)

        dec2 = self.upconv2(dec3)
        dec2 = torch.cat([dec2, enc2], dim=1)
        dec2 = self.dec2(dec2)

        dec1 = self.upconv1(dec2)
        dec1 = torch.cat([dec1, enc1], dim=1)
        dec1 = self.dec1(dec1)

        # Final output
        return torch.sigmoid(self.final_conv(dec1))

# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


filter_model = UNet(in_channels=1, out_channels=1).to(device)

filter_model.load_state_dict(
    torch.load("models/xray_filter_model.pth", map_location=device)
)

filter_model.eval()

def load_image(image_path):
        """Load an image and detect its bit depth"""
        # Read image in grayscale, preserving original bit depth
        img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)

        if img is None:
            raise ValueError(f"Could not read image: {image_path}")

        # Convert to grayscale if it's a color image
        if len(img.shape) == 3 and img.shape[2] == 3:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Detect bit depth
        if img.dtype == np.uint16:
            bit_depth = 16
            max_val = 65535.0
        elif img.dtype == np.uint8:
            bit_depth = 8
            max_val = 255.0
        else:
            # Convert to 8-bit if it's another type
            img = img.astype(np.uint8)
            bit_depth = 8
            max_val = 255.0

        return img, bit_depth, max_val

def preprocess_image(img, max_val, target_size):
        """Preprocess image for model input"""
        # Resize image
        img = cv2.resize(img, (target_size, target_size))

        # Normalize to [0, 1]
        img = img.astype(np.float32) / max_val

        # Convert to tensor and add dimensions
        img_tensor = torch.from_numpy(img).float()
        img_tensor = img_tensor.unsqueeze(0).unsqueeze(0)  # Add batch and channel dimensions

        return img_tensor

def postprocess_image(output_tensor, original_shape, original_bit_depth):
        """Convert model output back to image format"""
        output_img = output_tensor.cpu().numpy().squeeze()
        # Force 8-bit scaling for consistency
        output_img = (output_img * 255.0).astype(np.uint8)
        output_img = cv2.resize(output_img, (original_shape[1], original_shape[0]))
        return output_img

def apply_unsharp_mask(image, sigma=1.0, amount=0.6, threshold=0):
        """
        Apply unsharp mask filter to an image.

        Args:
            image: Input image (numpy array)
            sigma: Radius of the Gaussian blur (controls the size of the edges to enhance)
            amount: The strength of the unsharp mask (how much to enhance edges)
            threshold: Threshold for minimal brightness change (0 means no threshold)

        Returns:
            Sharpened image
        """
        # Create a blurred version of the image
        blurred = cv2.GaussianBlur(image, (0, 0), sigma)

        # Calculate the difference (mask)
        sharpened = cv2.addWeighted(image, 1.0 + amount, blurred, -amount, 0)

        # Clip values to valid range
        sharpened = np.clip(sharpened, 0, 255)

        return sharpened.astype(np.uint8)

def apply_filter(image_path, output_path):

    # Load image
    img, bit_depth, max_val = load_image(image_path)

    original_shape = img.shape

    # Preprocess
    img_tensor = preprocess_image(img, max_val, 960)

    img_tensor = img_tensor.to(device)

    # Model inference
    with torch.no_grad():
        output_tensor = filter_model(img_tensor)

    # Postprocess
    filtered_img = postprocess_image(
        output_tensor,
        original_shape,
        bit_depth
    )

    # Apply Unsharp Mask
    filtered_img = apply_unsharp_mask(
        filtered_img,
        sigma=2,
        amount=0.7
    )

    # Save filtered image
    cv2.imwrite(output_path, filtered_img)

    return output_path

app = FastAPI()

# Load YOLO model
yolo_model = YOLO("models/best.pt")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

from fastapi.staticfiles import StaticFiles

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.get("/")
def home():
    return {"message": "AI Backend Running"}

CLASS_NAMES = {
    0: "good_casting",
    1: "defect"
}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run YOLO prediction
    # Create filtered image path
    filtered_path = os.path.join(
        UPLOAD_FOLDER,
        f"filtered_{file.filename}"
    )

    # Apply U-Net + USM filtering
    apply_filter(file_path, filtered_path)

    # Run YOLO on FILTERED image
    results = yolo_model(
        filtered_path,
        conf=0.5
    )

    detections = []

    annotated_path = os.path.join(
        UPLOAD_FOLDER,
        f"detected_{file.filename}"
    )

    for result in results:

        boxes = result.boxes

        for box in boxes:

            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            detections.append({
                "class_id": class_id,
                "class_name": CLASS_NAMES.get(class_id, "unknown"),
                "confidence": round(confidence, 2)
            })

        # Save image with bounding boxes
        annotated_image = result.plot(
            line_width=5,
            font_size=2
        )
        cv2.imwrite(annotated_path, annotated_image)

    return {
        "filename": file.filename,

        "original_image":
        f"http://127.0.0.1:8000/uploads/{file.filename}",

        "filtered_image":
        f"http://127.0.0.1:8000/uploads/filtered_{file.filename}",

        "output_image":
        f"http://127.0.0.1:8000/uploads/detected_{file.filename}",

        "detections": detections
    }