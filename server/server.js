const express = require("express");
const cors = require("cors");
const { generateFakeData } = require("./utils/Faker");
const fs = require("fs");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.post("/api/generate", (req, res) => {
  const { region, errorCount, seed } = req.body;

  if (region === undefined || errorCount === undefined || seed === undefined) {
    return res.status(400).json({
      error: "All parameters (region, errorCount, seed) are required.",
    });
  }

  const data = generateFakeData(region, errorCount, seed);
  res.json(data);
});

app.get("/api/export", (req, res) => {
  const { region, errorCount, seed } = req.query;

  if (region === undefined || errorCount === undefined || seed === undefined) {
    return res.status(400).json({
      error: "All parameters (region, errorCount, seed) are required.",
    });
  }

  const data = generateFakeData(region, errorCount, seed);
  
  const csvData = convertToCSV(data);
  
  const filePath = "output.csv"; 

  fs.writeFile(filePath, csvData, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error generating CSV." });
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=data.csv");
    res.send(csvData);
  });
});

const convertToCSV = (data) => {
  const header = Object.keys(data[0]).join(","); 
  const rows = data.map(item => Object.values(item).join(",")); 
  return [header, ...rows].join("\n");
};

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
