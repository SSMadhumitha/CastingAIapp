export default function AnalyticsPage() {

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-center border-b border-cyan-500 pb-4">

        <h1 className="text-4xl font-bold text-cyan-400">
          CastingAI
        </h1>

        <div className="flex gap-8">
          <a href="/dashboard">Dashboard</a>
          <a href="/upload">Upload</a>
          <a href="/results">Results</a>
          <a href="/analytics">Analytics</a>
        </div>

      </div>

      <h1 className="text-6xl font-bold text-cyan-400 mt-12">
        AI Analytics Dashboard
      </h1>

      <p className="text-gray-400 mt-4">
        Industrial Defect Intelligence Overview
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">

        <div className="bg-zinc-900 p-6 rounded-2xl border border-cyan-500">
          <h3>Total Inspections</h3>
          <p className="text-5xl font-bold text-cyan-400 mt-3">
            35
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-red-500">
          <h3>Total Defects</h3>
          <p className="text-5xl font-bold text-red-400 mt-3">
            18
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-yellow-500">
          <h3>Average Confidence</h3>
          <p className="text-5xl font-bold text-yellow-400 mt-3">
            82%
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-green-500">
          <h3>Pass Rate</h3>
          <p className="text-5xl font-bold text-green-400 mt-3">
            74%
          </p>
        </div>

      </div>

    </main>

  );

}