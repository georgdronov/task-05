import React, { useState } from "react";
import Table from "../components/Table";
import Controls from "../components/Controls";

function DataPage() {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentRegion, setCurrentRegion] = useState("USA");
  const [currentErrorCount, setCurrentErrorCount] = useState(0);
  const [currentSeed, setCurrentSeed] = useState(42);

  const fetchMoreData = () => {
    const nextPage = Math.ceil(data.length / 20) + 1;
    handleGenerate({
      region: currentRegion,
      errorCount: currentErrorCount,
      seed: currentSeed,
      page: nextPage,
    });
  };

  const handleGenerate = (params) => {
    fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        region: params.region,
        errorCount: params.errorCount,
        seed: params.seed,
        page: params.page,
      }),
    })
      .then((response) => response.json())
      .then((newData) => {
        if (newData.length === 0) {
          setHasMore(false);
        } else {
          setData((prevData) => [...prevData, ...newData]);
        }
      })
      .catch((error) => console.error("Generate error: ", error));
  };

  const updateParams = (region, errorCount, seed) => {
    setCurrentRegion(region);
    setCurrentErrorCount(errorCount);
    setCurrentSeed(seed);
  };

  return (
    <div
      className="container-fluid bg-light text-dark py-4"
      style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
    >
      <h1 className="my-4 text-center">Data Generator</h1>
      <Controls onGenerate={handleGenerate} updateParams={updateParams} />
      <Table data={data} fetchMoreData={fetchMoreData} hasMore={hasMore} />
    </div>
  );
}

export default DataPage;
