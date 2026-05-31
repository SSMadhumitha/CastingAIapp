"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);
  const router = useRouter();

  const runInspection = async () => {

    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {

        const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
            method: "POST",
            body: formData,
        }
        );

        const data = await response.json();

        localStorage.setItem(
        "inspectionResult",
        JSON.stringify(data)
        );

        router.push("/results");

    } catch (error) {

        console.error(error);

    }

    };
    
    return (
    
    <main className="min-h-screen bg-black text-white p-10">

      {/* Navbar */}

      <div className="flex justify-between items-center border-b border-cyan-500 pb-4">

        <h1 className="text-4xl font-bold text-cyan-400">
          CastingAI
        </h1>

        <div className="flex gap-8">

          <a href="/dashboard">Dashboard</a>

          <a href="/upload">Upload</a>

          <a href="/results">Results</a>

          <a href="/analytics">Analytics</a>

          <a href="/reports">Reports</a>

        </div>

      </div>

      {/* Title */}

      <div className="text-center mt-16">

        <h1 className="text-6xl font-bold text-cyan-400">
          Upload Workspace
        </h1>

        <p className="text-gray-400 mt-4 text-xl">
          Upload Industrial X-Ray Images for AI Inspection
        </p>

      </div>

      {/* Upload Area */}

      <div className="mt-20 max-w-4xl mx-auto">

        <div className="border-2 border-dashed border-cyan-500 rounded-3xl p-20 text-center bg-zinc-900">

          <h2 className="text-3xl mb-4">
            Drag & Drop X-Ray Image
          </h2>

          <p className="text-gray-400 mb-8">
            Supported formats: JPG, PNG, JPEG
          </p>

          <label className="bg-cyan-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-cyan-400 cursor-pointer">
            Select Image
            
            <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {

                const file = e.target.files?.[0];

                if (!file) return;

                setSelectedFile(file);

                const imageUrl = URL.createObjectURL(file);

                setSelectedImage(imageUrl);

            }}
          />

          </label>

        </div>

      </div>
      {selectedImage && (

        <div className="mt-10 flex justify-center">

            <div>

                <h3 className="text-cyan-400 text-2xl mb-4 text-center">
                    Selected Image
                </h3>

                <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-[500px] rounded-xl border-2 border-cyan-500"
                />

                <div className="flex justify-center mt-6">

                    <button
                        onClick={runInspection}
                        className="bg-green-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-green-400"
                    >
                    Run AI Inspection
                    </button>

                </div>

            </div>

        </div>

    )}

    </main>
  );
}