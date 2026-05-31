export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white p-10">

      {/* Header */}

      <div className="text-center">

        <h1 className="text-6xl font-bold text-cyan-400">
          CastingAI
        </h1>

        <p className="text-xl text-gray-400 mt-4">
          AI-Powered Industrial Defect Intelligence
        </p>

      </div>

      {/* Welcome Card */}

      <div className="bg-zinc-900 shadow-lg border border-cyan-500 rounded-2xl p-8 mt-12 text-center">

        <h2 className="text-3xl text-cyan-400">
          Welcome Operator
        </h2>

        <p className="text-gray-400 mt-3">
          Industrial X-Ray Inspection Platform
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">

        <div className="bg-zinc-900 shadow-lg p-6 rounded-xl text-center">
          <h3>Total Inspections</h3>
          <p className="text-4xl text-cyan-400 mt-2">35</p>
        </div>

        <div className="bg-zinc-900 shadow-lg p-6 rounded-xl text-center">
          <h3>Total Defects</h3>
          <p className="text-4xl text-red-400 mt-2">18</p>
        </div>

        <div className="bg-zinc-900 shadow-lg p-6 rounded-xl text-center">
          <h3>Pass Rate</h3>
          <p className="text-4xl text-green-400 mt-2">74%</p>
        </div>

        <div className="bg-zinc-900 shadow-lg p-6 rounded-xl text-center">
          <h3>Model Accuracy</h3>
          <p className="text-4xl text-yellow-400 mt-2">96%</p>
        </div>

      </div>

      {/* Navigation Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">

        <a href="/upload">
          <div className="bg-zinc-900 shadow-lg p-10 rounded-2xl border border-cyan-500 hover:scale-105 transition">

            <h3 className="text-3xl text-cyan-400">
              🚀 Upload Inspection
            </h3>

            <p className="text-gray-400 mt-3">
              Start a new AI inspection
            </p>

          </div>
        </a>

        <a href="/results">
          <div className="bg-zinc-900 shadow-lg p-10 rounded-2xl border border-red-500 hover:scale-105 transition">

            <h3 className="text-3xl text-red-400">
              📊 Results
            </h3>

            <p className="text-gray-400 mt-3">
              View inspection results
            </p>

          </div>
        </a>

        <a href="/analytics">
          <div className="bg-zinc-900 shadow-lg p-10 rounded-2xl border border-yellow-500 hover:scale-105 transition">

            <h3 className="text-3xl text-yellow-400">
              📈 Analytics
            </h3>

            <p className="text-gray-400 mt-3">
              View AI analytics
            </p>

          </div>
        </a>

        <a href="/reports">
          <div className="bg-zinc-900 shadow-lg p-10 rounded-2xl border border-green-500 hover:scale-105 transition">

            <h3 className="text-3xl text-green-400">
              📄 Reports
            </h3>

            <p className="text-gray-400 mt-3">
              Download inspection reports
            </p>

          </div>
        </a>

      </div>

      <div className="mt-20">

        <h2 className="text-4xl text-center text-cyan-400 mb-10">
          AI Inspection Workflow
        </h2>

        <div className="flex flex-wrap justify-center gap-6 text-center">

          <div className="bg-zinc-900 p-6 rounded-xl border border-cyan-500">
            📤 Upload
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl border border-yellow-500">
            🧠 U-Net Filter
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl border border-red-500">
            🎯 YOLO Detection
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl border border-green-500">
            📊 Analytics
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl border border-cyan-500">
            📄 Reports
          </div>

        </div>

      </div>

      {/* Start Button */}

      <div className="text-center mt-16">

        <a href="/upload">
          <button className="bg-cyan-500 text-black px-10 py-5 rounded-xl text-2xl font-bold hover:bg-cyan-400">

            Start New Inspection →

          </button>
        </a>

      </div>

    </main>
  );
}