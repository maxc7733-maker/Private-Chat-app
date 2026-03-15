const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors()); 
app.use(express.json());

const PORT = 5000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat_db'
});

db.connect((err) => {
  if (err) console.error("Chyba DB:", err);
  else console.log("✅ Připojeno k databázi!");
});

// Registrace
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', 
    [username, hashedPassword, email], 
    (err) => {
      if (err) {
        console.error("Chyba DB:", err);
        return res.status(500).send('Chyba při zápisu do DB');
      }
      res.status(200).send('Registrace úspěšná');
    });
  } catch (err) { 
    res.status(500).send('Chyba serveru'); 
  }
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body; // 'username' zde obsahuje jméno nebo e-mail

  // Hledáme uživatele, kde buď username nebo email odpovídá vstupnímu řetězci
  db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, username], async (err, results) => {
    if (err) return res.status(500).send('Chyba databáze');
    
    if (results.length === 0) return res.status(401).send('Uživatel nenalezen');

    const match = await bcrypt.compare(password, results[0].password);
    if (match) {
      res.status(200).send('Přihlášení úspěšné!');
    } else {
      res.status(401).send('Špatné heslo');
    }
  });
});

app.listen(PORT, () => console.log(`🚀 Server běží na http://localhost:${PORT}`));