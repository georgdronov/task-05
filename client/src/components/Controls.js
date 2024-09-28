import React, { useState, useEffect } from "react";

function Controls({
  updateParams,
  currentRegion,
  currentErrorCount,
  currentSeed,
}) {
  const [region, setRegion] = useState(currentRegion);
  const [errorCount, setErrorCount] = useState("");
  const [seed, setSeed] = useState(currentSeed);

  useEffect(() => {
    setErrorCount(currentErrorCount);
  }, [currentErrorCount]);

  const handleErrorChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "" || inputValue === "0" || inputValue === "0.") {
      setErrorCount(inputValue);
      return;
    }

    const newErrorCount = parseFloat(inputValue);

    if (!isNaN(newErrorCount)) {
      setErrorCount(newErrorCount);
    }
  };

  const handleRangeChange = (e) => {
    const newErrorCount = parseFloat(e.target.value) * 100;
    setErrorCount(newErrorCount);
  };

  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1000);
    setSeed(randomSeed);
  };

  const handleSeedChange = (e) => {
    const newSeed = Number(e.target.value);
    setSeed(newSeed);
  };

  const handleUpdateParams = () => {
    updateParams(region, errorCount, seed);
  };

  const handleExportCSV = () => {
    const url = `/api/export?region=${region}&errorCount=${errorCount}&seed=${seed}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error during export:", error);
      });
  };

  return (
    <div className="controls mb-4 text-center">
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="form-select mb-2"
      >
        <option value="USA">USA</option>
        <option value="Poland">Poland</option>
        <option value="Uzbekistan">Uzbekistan</option>
      </select>
      <input
        type="number"
        step="0.1"
        value={errorCount || ""}
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
      <button onClick={handleRandomSeed} className="btn btn-primary mb-2">
        Generate Random Seed
      </button>
      <input
        type="number"
        value={seed}
        onChange={handleSeedChange}
        className="form-control mb-2"
        placeholder="Seed"
      />
      <div className="d-flex justify-content-center mt-3">
        <button onClick={handleUpdateParams} className="btn btn-success me-2">
          Generate Data
        </button>
        <button onClick={handleExportCSV} className="btn btn-success me-2">
          Export CSV
        </button>
      </div>
    </div>
  );
}

export default Controls;
