import React, { useState } from "react";

function Controls({ onGenerate }) {
  const [region, setRegion] = useState("USA");
  const [errorCount, setErrorCount] = useState(0);
  const [seed, setSeed] = useState(42);

  const handleGenerate = () => {
    onGenerate({ region, errorCount, seed });
  };

  return (
    <div>
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="USA">USA</option>
        <option value="Poland">Poland</option>
        <option value="Uzbekistan">Uzbekistan</option>
      </select>

      <input
        type="number"
        value={errorCount}
        min={0}
        max={1000}
        onChange={(e) => setErrorCount(e.target.value)}
      />

      <input
        type="number"
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
      />

      <button onClick={handleGenerate}>Generate</button>
    </div>
  );
}

export default Controls;
