const express = require("express");
const faker = require("faker");
const csv = require("csvtojson");

const app = express();
const port = 5000;

const { generateFakeData } = require("./utils/generateFakeData");

app.use(express.json());

app.post("/api/generate", (req, res) => {
  const { region, errorsCount, seed, page } = req.body;
  const data = generateFakeData(region, errorsCount, seed, page);
  res.json(data);
});

app.get("/api/export", (req, res) => {
  const { region, errorsCount, seed, page } = req.query;

  // need to add CSV logic here

  res.attachment("export.csv");
  res.send(csvData);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
