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
const mysql = require('mysql2');

// Vytvoření propojení
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Výchozí uživatel v XAMPP
  password: '',      // Výchozí heslo v XAMPP je prázdné
  database: 'chat_db'
});

// Dotaz do databáze
connection.query(
  'SELECT * FROM messages',
  function(err, results) {
    console.log(results); // Zde uvidíš data ze své tabulky
  }
);