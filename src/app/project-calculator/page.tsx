// src/components/ProjectCalculator.tsx

"use client";

import { useState } from "react";

export default function ProjectCalculator() {
  const [projectType, setProjectType] = useState("");
  const [squareFeet, setSquareFeet] = useState(0);
  const [totalCost, setTotalCost] = useState<number | null>(null);

  const pricing = {
    kitchen: 250,
    bathroom: 200,
    basement: 150,
    addition: 300,
  };

  const handleCalculate = () => {
    const costPerSqFt = pricing[projectType as keyof typeof pricing] || 0;
    setTotalCost(costPerSqFt * squareFeet);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 bg-white rounded-md shadow-md text-black">
      <h2 className="text-2xl font-bold mb-6 text-center">Project Calculator</h2>

      <label className="block mb-4">
        <span className="block font-medium mb-1">Project Type</span>
        <select
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a type</option>
          <option value="kitchen">Kitchen</option>
          <option value="bathroom">Bathroom</option>
          <option value="basement">Basement</option>
          <option value="addition">Home Addition</option>
        </select>
      </label>

      <label className="block mb-4">
        <span className="block font-medium mb-1">Square Footage</span>
        <input
          type="number"
          value={squareFeet}
          onChange={(e) => setSquareFeet(Number(e.target.value))}
          className="w-full p-2 border rounded"
          placeholder="e.g., 500"
        />
      </label>

      <button
        onClick={handleCalculate}
        className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
      >
        Calculate Estimate
      </button>

      {totalCost !== null && (
        <div className="mt-6 text-center text-lg font-semibold">
          Estimated Cost: ${totalCost.toLocaleString()}
        </div>
      )}
    </div>
  );
}