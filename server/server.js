const express = require("express");
const cors = require("cors");
const { generateFakeData } = require("./utils/Faker");

const app = express();
const port = 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

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

  res.attachment("data.csv");
  res.send(csvData);
});

function convertToCSV(data) {
  if (!data || !data.length) {
    return "";
  }

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(",")];

  for (const record of data) {
    const values = headers.map((header) => {
      const escaped = ("" + record[header]).replace(/"/g, '\\"');
      return `${escaped}`;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
}

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
