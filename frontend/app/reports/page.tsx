export default function ReportsPage() {

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

      {/* Page Title */}

      <div className="mt-12">

        <h1 className="text-6xl font-bold text-cyan-400">
          Inspection Reports
        </h1>

        <p className="text-gray-400 mt-4 text-xl">
          Historical AI Inspection Records
        </p>

      </div>

      {/* Report Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

        <div className="bg-zinc-900 border border-cyan-500 rounded-2xl p-6">

          <h3 className="text-xl text-cyan-400">
            Report #001
          </h3>

          <p className="mt-3 text-gray-400">
            Date: 31-May-2026
          </p>

          <p className="mt-2 text-red-400">
            Status: Defect Found
          </p>

          <button className="mt-5 bg-cyan-500 text-black px-5 py-2 rounded-lg">
            Download PDF
          </button>

        </div>

        <div className="bg-zinc-900 border border-cyan-500 rounded-2xl p-6">

          <h3 className="text-xl text-cyan-400">
            Report #002
          </h3>

          <p className="mt-3 text-gray-400">
            Date: 30-May-2026
          </p>

          <p className="mt-2 text-green-400">
            Status: Passed
          </p>

          <button className="mt-5 bg-cyan-500 text-black px-5 py-2 rounded-lg">
            Download PDF
          </button>

        </div>

        <div className="bg-zinc-900 border border-cyan-500 rounded-2xl p-6">

          <h3 className="text-xl text-cyan-400">
            Report #003
          </h3>

          <p className="mt-3 text-gray-400">
            Date: 29-May-2026
          </p>

          <p className="mt-2 text-red-400">
            Status: Defect Found
          </p>

          <a
            href="/sample-report.pdf"
            download
            className="bg-cyan-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-cyan-400"
          >
            Download PDF Report
          </a>

        </div>  

      </div>

    </main>

  );

}