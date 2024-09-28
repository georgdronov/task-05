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
    setErrorCount(e.target.value);
  };

  const handleRangeChange = (e) => {
    setErrorCount(e.target.value * 100);
  };

  const handleGenerate = () => {
    updateParams(region, errorCount, seed);
  };

  useEffect(() => {
    setRegion(currentRegion);
    setErrorCount(currentErrorCount);
    setSeed(currentSeed);
  }, [currentRegion, currentErrorCount, currentSeed]);

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-around align-items-center mb-4">
        <div className="form-group">
          <label>Region:</label>
          <select
            className="form-control"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="USA">USA</option>
            <option value="Poland">Poland</option>
            <option value="Uzbekistan">Uzbekistan</option>
          </select>
        </div>
        <div className="form-group">
          <label>Errors (0-1000):</label>
          <input
            type="number"
            className="form-control"
            value={errorCount}
            min={0}
            max={1000}
            onChange={handleErrorChange}
          />
        </div>
        <div className="form-group d-flex flex-column justify-content-end mb-auto">
          <label>Error Range (0-10):</label>
          <input
            type="range"
            className="form-control-range mt-2"
            min={0}
            max={10}
            step={1}
            value={errorCount / 100}
            onChange={handleRangeChange}
          />
        </div>
        <div className="form-group">
          <label>Seed:</label>
          <input
            type="number"
            className="form-control"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />
        </div>
      </div>
      {/* <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={handleGenerate}>
          Generate
        </button>
      </div> */}
    </div>
  );
}

export default Controls;
