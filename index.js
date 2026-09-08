const express = require("express");
const { join } = require("node:path");

const app = express();

const PORT = 5500;

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
