"use client";

import { useEffect, useState } from "react";

export default function ResultsPage() {

  const [result, setResult] = useState<any>(null);

  useEffect(() => {

    const data =
      localStorage.getItem("inspectionResult");

    if (data) {

      setResult(JSON.parse(data));

    }

  }, []);

  if (!result) {

    return (

      <main className="min-h-screen bg-black text-white p-10">

        Loading Results...

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-6xl font-bold text-cyan-400 mb-10">

        AI Inspection Results

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-zinc-900 rounded-2xl p-6 border border-red-500">

            <h3 className="text-gray-400">
            Defects Found
            </h3>

            <p className="text-5xl font-bold text-red-400 mt-2">
            {result.detections.length}
            </p>

        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-yellow-500">

            <h3 className="text-gray-400">
            Highest Confidence
            </h3>

            <p className="text-5xl font-bold text-yellow-400 mt-2">

            {Math.max(
                ...result.detections.map(
                (d:any) => d.confidence
                )
            ) * 100}%

            </p>

        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-cyan-500">

            <h3 className="text-gray-400">
            Inspection Status
            </h3>

            <p className="text-3xl font-bold text-cyan-400 mt-4">

            {result.detections.length > 0
                ? "DEFECT DETECTED"
                : "PASS"}

            </p>

        </div>

        </div>

        <div
            className={`mt-10 rounded-3xl p-8 text-center border-2 ${
                result.detections.length > 0
                ? "border-red-500 bg-red-500/10"
                : "border-green-500 bg-green-500/10"
            }`}
            >

            <h2 className="text-4xl font-bold">

                {result.detections.length > 0
                ? "🔴 DEFECT DETECTED"
                : "🟢 CASTING PASSED"}

            </h2>

            <p className="mt-4 text-xl text-gray-300">

                {result.detections.length > 0
                ? "AI recommends further inspection of the casting."
                : "No critical defects detected by the AI system."}

            </p>

            </div>

      <h2 className="text-3xl text-red-400">

        Defects Found:
        {" "}
        {result.detections.length}

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

        <div>

            <h3 className="text-cyan-400 text-xl mb-4">
            Original Image
            </h3>

            <img
            src={result.original_image}
            alt="Original"
            className="rounded-xl border-2 border-cyan-500"
            />

        </div>

        <div>

            <h3 className="text-yellow-400 text-xl mb-4">
            Filtered Image
            </h3>

            <img
            src={result.filtered_image}
            alt="Filtered"
            className="rounded-xl border-2 border-yellow-500"
            />

        </div>

        <div>

            <h3 className="text-red-400 text-xl mb-4">
            Detection Result
            </h3>

            <img
            src={result.output_image}
            alt="Detection"
            className="rounded-xl border-2 border-red-500"
            />

        </div>

        </div>

        <div className="mt-12">

            <h2 className="text-3xl text-cyan-400 mb-6">
                Detection Details
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full border border-cyan-500">

                <thead>

                    <tr className="bg-cyan-500 text-black">

                    <th className="p-4 text-left">
                        #
                    </th>

                    <th className="p-4 text-left">
                        Class
                    </th>

                    <th className="p-4 text-left">
                        Confidence
                    </th>

                    </tr>

                </thead>

                <tbody>

                    {result.detections.map((d:any, index:number) => (

                    <tr
                        key={index}
                        className="border-t border-zinc-700"
                    >

                        <td className="p-4">
                        {index + 1}
                        </td>

                        <td className="p-4">
                        {d.class_name}
                        </td>

                        <td className="p-4 text-yellow-400">
                        {(d.confidence * 100).toFixed(1)}%
                        </td>

                    </tr>

                    ))}

                </tbody>

                </table>

            </div>

            </div>

            <div className="flex gap-6 mt-10">

                <a
                    href="/dashboard"
                    className="bg-cyan-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-cyan-400"
                >
                    Back to Dashboard
                </a>

                <a
                    href="/upload"
                    className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-400"
                >
                    New Inspection
                </a>

                </div>

    </main>

  );

}