import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import LoginRegister from "./LoginRegister";
import "./Login.css";

function App() {
  const [page, setPage] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async (endpoint) => {
    try {
      const response = await axios.post(`http://localhost:5000/${endpoint}`, { username, password });
      alert(response.data);
      
      setUsername("");
      setPassword("");
      setShowPassword(false);

      if (endpoint === "register") {
        setPage("login");
      } else {
        setPage("chat");
      }
    } catch (err) {
      alert(err.response?.data || "Chyba připojení");
    }
  };

  return (
    <div className="app">
      {page === "login" && (
        <LoginRegister 
          title="Přihlášení" buttonText="Přihlásit" secondaryText="Nemáš účet? Registrace" targetPage="register"
          username={username} setUsername={setUsername} password={password} setPassword={setPassword}
          showPassword={showPassword} setShowPassword={setShowPassword} handleAuth={handleAuth} setPage={setPage}
        />
      )}

      {page === "register" && (
        <LoginRegister 
          title="Registrace" buttonText="Vytvořit účet" secondaryText="Máš účet? Zpět na login" targetPage="login"
          username={username} setUsername={setUsername} password={password} setPassword={setPassword}
          showPassword={showPassword} setShowPassword={setShowPassword} handleAuth={handleAuth} setPage={setPage}
        />
      )}

      {page === "chat" && (
        <div className="chat-container">
          <h1>Chat je aktivní! 💬</h1>
          <button onClick={() => setPage("login")}>Odhlásit</button>
        </div>
      )}
    </div>
  );
}

export default App;