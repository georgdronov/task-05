const express = require("express");
const faker = require("@faker-js/faker");
const csv = require("csvtojson");

const app = express();
const port = 5000;

const { generateFakeData } = require("./utils/Faker");

app.use(express.json());

app.post("/api/generate", (req, res) => {
  const { region, errorCount, seed, page } = req.body;

  const data = generateFakeData(region, errorCount, seed, page);

  res.json(data);
});

//csv export
app.get("/api/export", (req, res) => {
  const { region, errorsCount, seed, page } = req.query;

  const data = generateFakeData(region, errorsCount, seed, page);
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
