import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center py-32">

        <h1 className="text-8xl font-bold text-cyan-400 mb-6">
          CastingAI
        </h1>

        <p className="text-2xl text-gray-300 mb-8">
          Industrial X-Ray Casting Defect Detection Platform
        </p>

        <Link href="/dashboard">
          <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-xl text-xl font-bold">
            Start Detection →
          </button>
        </Link>

      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 py-16">

        <h2 className="text-4xl text-cyan-400 text-center mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 p-8 rounded-xl border border-cyan-500">
            <h3 className="text-2xl mb-3">
              Defect Detection
            </h3>

            <p>
              Automatically detect casting defects using AI.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-xl border border-yellow-500">
            <h3 className="text-2xl mb-3">
              U-Net Enhancement
            </h3>

            <p>
              Improve X-Ray image quality before analysis.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-xl border border-red-500">
            <h3 className="text-2xl mb-3">
              YOLO Analysis
            </h3>

            <p>
              Detect and highlight defect locations.
            </p>
          </div>

        </div>

      </section>

      {/* About */}
      <section className="max-w-4xl mx-auto px-8 py-16 text-center">

        <h2 className="text-4xl text-cyan-400 mb-6">
          About CastingAI
        </h2>

        <p className="text-gray-300 text-lg">
          CastingAI combines U-Net image enhancement,
          Unsharp Masking, and YOLO object detection
          to identify casting defects from industrial
          X-Ray images quickly and accurately.
        </p>

      </section>

    </main>
  );
}