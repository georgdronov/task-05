import React, { useState } from "react";

function Controls({ onGenerate }) {
  const [region, setRegion] = useState("USA");
  const [errorCount, setErrorCount] = useState(0);
  const [seed, setSeed] = useState(42);

  const handleGenerate = () => {
    onGenerate({ region, errorCount, seed });
  };

  return (
    <div className="form-inline mb-4">
      <label className="mr-2">Region:</label>
      <select
        className="form-control mr-2"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="USA">USA</option>
        <option value="Poland">Poland</option>
        <option value="Uzbekistan">Uzbekistan</option>
      </select>

      <label className="mr-2">Errors:</label>
      <input
        type="number"
        className="form-control mr-2"
        value={errorCount}
        min={0}
        max={1000}
        onChange={(e) => setErrorCount(e.target.value)}
      />

      <label className="mr-2">Seed:</label>
      <input
        type="number"
        className="form-control mr-2"
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleGenerate}>
        Generate
      </button>
    </div>
  );
}

export default Controls;
