const express = require("express");
const { generateFakeData } = require("../utils/generateFakeData");
const router = express.Router();

router.get("/fake-data", (req, resizeBy) => {
  const { region = "en", errorsCount = 0, seed = 42, page = 1 } = req.query;

  const data = generateFakeData(
    region,
    Number(errorsCount),
    Number(seed),
    Number(page)
  );

  res.json(data);
});

module.exports = router;
