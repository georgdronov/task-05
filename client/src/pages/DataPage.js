import React, { useState } from "react";
import Table from "../components/Tabel";
import Controls from "../components/Controls";

function DataPage() {
  const [data, setData] = useState([]);

  const fetchMoreData = () => {
    // add logic, maybe like setData[...data, ...newData]
  };

  const handleGenerate = (params) => {
    fetch(
      `http://localhost:5000/api/generate?region=${params.region}&errorCount=${params.errorCount}$seed=${params.seed}`
    )
      .then((response) => response.json())
      .then((newData) => setData(newData))
      .catch((error) => console.error("Generate error: ", error));
  };

  return (
    <div
      className="container-fluid bg-dark text-light py-4"
      style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
    >
      <h1 className="my-4 text-center">Data Generator</h1>
      <Controls onGenerate={handleGenerate} />
      <Table data={data} fetchMoreDate={fetchMoreData} />
    </div>
  );
}

export default DataPage;
