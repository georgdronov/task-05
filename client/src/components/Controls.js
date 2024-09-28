import React, { useState, useEffect } from "react";

function Controls({
  updateParams,
  currentRegion,
  currentErrorCount,
  currentSeed,
}) {
  const [region, setRegion] = useState(currentRegion);
  const [errorCount, setErrorCount] = useState(currentErrorCount);
  const [seed, setSeed] = useState(currentSeed);

  const handleErrorChange = (e) => {
    const newErrorCount = e.target.value;
    setErrorCount(newErrorCount);
    updateParams(region, newErrorCount, seed);
  };

  const handleRangeChange = (e) => {
    const newErrorCount = e.target.value * 100;
    setErrorCount(newErrorCount);
    updateParams(region, newErrorCount, seed);
  };

  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1000);
    setSeed(randomSeed);
    updateParams(region, errorCount, randomSeed);
  };

  const handleSeedChange = (e) => {
    const newSeed = Number(e.target.value);
    setSeed(newSeed);
    updateParams(region, errorCount, newSeed);
  };

  useEffect(() => {
    updateParams(region, errorCount, seed);
  }, [region, errorCount, seed]);

  return (
    <div className="controls mb-4 text-center">
      <select
        value={region}
        onChange={(e) => {
          setRegion(e.target.value);
          updateParams(e.target.value, errorCount, seed);
        }}
        className="form-select mb-2"
      >
        <option value="USA">USA</option>
        <option value="Poland">Poland</option>
        <option value="Uzbekistan">Uzbekistan</option>
      </select>
      <input
        type="number"
        value={errorCount}
        onChange={handleErrorChange}
        className="form-control mb-2"
        placeholder="Error Count"
      />
      <input
        type="range"
        min="0"
        max="10"
        value={errorCount / 100}
        onChange={handleRangeChange}
        className="form-range mb-2"
      />
      <button onClick={handleRandomSeed} className="btn btn-warning mb-2">
        Generate Random Seed
      </button>
      <input
        type="number"
        value={seed}
        onChange={handleSeedChange}
        className="form-control mb-2"
        placeholder="Seed"
      />
    </div>
  );
}

export default Controls;
