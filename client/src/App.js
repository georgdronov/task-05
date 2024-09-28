import React, { useState } from "react";
import DataPage from "./pages/DataPage";

function App() {
  const [region, setRegion] = useState("USA");
  const [errorCount, setErrorCount] = useState(0);
  const [seed, setSeed] = useState(0);

  return (
    <div>
      <DataPage
        region={region}
        setRegion={setRegion}
        errorCount={errorCount}
        setErrorCount={setErrorCount}
        seed={seed}
        setSeed={setSeed}
      />
    </div>
  );
}

export default App;
