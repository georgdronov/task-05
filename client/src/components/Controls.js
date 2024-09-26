import React, { useState } from "react";

function Controls({ onGenerate }) {
  const [region, setRegion] = useState("USA");
  const [errorCount, setErrorCount] = useState(0);
  const [seed, setSeed] = useState(42);

  // Функция для синхронизации значения ошибки с ползунком
  const handleErrorChange = (e) => {
    setErrorCount(e.target.value);
  };

  const handleRangeChange = (e) => {
    setErrorCount(e.target.value * 100); // 1 шаг = 100 ошибок
  };

  const handleGenerate = () => {
    onGenerate({ region, errorCount, seed });
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
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
        <div className="form-group d-flex flex-column  justify-content-end mb-auto">
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

      <div className="d-flex justify-content-center">
        <button className="btn btn-warning" onClick={handleGenerate}>
          Generate
        </button>
      </div>
    </div>
  );
}

export default Controls;
