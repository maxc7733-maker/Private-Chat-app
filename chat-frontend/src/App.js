import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [page, setPage] = useState("login"); // "login", "register", "chat"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);

  // Funkce pro registraci
  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", { username, password });
      alert("Registrace úspěšná! Nyní se můžeš přihlásit.");
      setPage("login");
    } catch (err) {
      alert("Chyba při registraci: " + (err.response?.data || "Neznámá chyba"));
    }
  };

  // Funkce pro přihlášení
  const handleLogin = async () => {
    try {
      await axios.post("http://localhost:5000/login", { username, password });
      setPage("chat"); // Přepne na chat
    } catch (err) {
      alert("Přihlášení selhalo: " + (err.response?.data || "Špatné jméno nebo heslo"));
    }
  };

  // --- ZOBRAZENÍ PODLE STAVU ---

  if (page === "login") {
    return (
      <div className="auth-box">
        <h1>Přihlášení</h1>
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Heslo" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Přihlásit</button>
        <p onClick={() => setPage("register")} style={{cursor: "pointer", color: "blue"}}>Nemáš účet? Registruj se.</p>
      </div>
    );
  }

  if (page === "register") {
    return (
      <div className="auth-box">
        <h1>Registrace</h1>
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Heslo" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Vytvořit účet</button>
        <p onClick={() => setPage("login")} style={{cursor: "pointer", color: "blue"}}>Máš účet? Přihlas se.</p>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Chat aplikace 💬</h1>
      <button onClick={() => setPage("login")}>Odhlásit</button>
      <div className="chat-box" style={{height: "300px", border: "1px solid #ccc"}}>
        {/* Zde bude seznam zpráv */}
      </div>
      {/* Input pro zprávy */}
    </div>
  );
}

export default App;