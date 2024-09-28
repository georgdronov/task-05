import React, { useCallback, useEffect, useState } from "react";
import Table from "../components/Table";
import Controls from "../components/Controls";

function DataPage() {
  const [data, setData] = useState([]);
  const [currentRegion, setCurrentRegion] = useState("USA");
  const [currentErrorCount, setCurrentErrorCount] = useState(0);
  const [currentSeed, setCurrentSeed] = useState(42);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading
    ) {
      if (data.length < allData.length) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [loading, data, allData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const loadData = useCallback(() => {
    setLoading(true);
    fetch(`https://task-05-production.up.railway.app/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        region: currentRegion,
        errorCount: currentErrorCount,
        seed: currentSeed,
      }),
    })
      .then((response) => response.json())
      .then((newData) => {
        setLoading(false);
        setAllData(newData);
        setData(newData.slice(0, 20));
      })
      .catch((error) => {
        setLoading(false);
        console.error("Generate error: ", error);
      });
  }, [currentRegion, currentErrorCount, currentSeed]);

  useEffect(() => {
    loadData();
  }, [currentRegion, currentErrorCount, currentSeed]);

  useEffect(() => {
    if (page > 0) {
      const nextData = allData.slice(page * 20, (page + 1) * 20);
      setData((prevData) => [...prevData, ...nextData]);
    }
  }, [page, allData]);

  const generateData = () => {
    setPage(0);
    loadData();
  };

  const handleGenerateParams = (region, errorCount, seed) => {
    setCurrentRegion(region);
    setCurrentErrorCount(errorCount);
    setCurrentSeed(seed);
    setAllData([]);
    setData([]);
    setPage(0);
    generateData();
  };

  return (
    <div
      className="container-fluid bg-light text-dark py-4"
      style={{
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        overflowX: "auto",
      }}
    >
      <h1 className="my-4 text-center">Data Generator</h1>
      <Controls
        updateParams={handleGenerateParams}
        currentRegion={currentRegion}
        currentErrorCount={currentErrorCount}
        currentSeed={currentSeed}
      />
      {loading ? (
        <h2 className="text-center">Loading more data...</h2>
      ) : data.length === 0 ? (
        <h2 className="text-center">Waiting for input...</h2>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <Table data={data} />
        </div>
      )}
    </div>
  );
}

export default DataPage;
