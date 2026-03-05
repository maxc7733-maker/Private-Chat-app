const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// statické soubory z React build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// všechny requesty vrátí React aplikaci
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server běží na http://localhost:${PORT}`);
});