import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import LoginRegister from "./LoginRegister";
import "./Login.css";

function App() {
  const [page, setPage] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async (endpoint) => {
    try {
      const response = await axios.post(`http://localhost:5000/${endpoint}`, { 
        username, 
        password, 
        email: endpoint === "register" ? email : undefined 
      });
      
      alert(response.data);
      
      setUsername("");
      setPassword("");
      setEmail("");
      setConfirmPassword("");
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

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
  };

  return (
    <div className="app">
      {/* Podmínka: Zobrazit formulář pouze pokud nejsme v chatu */}
      {(page === "login" || page === "register") && (
        <LoginRegister 
          title={page === "login" ? "Přihlášení" : "Registrace"}
          buttonText={page === "login" ? "Přihlásit" : "Vytvořit účet"}
          secondaryText={page === "login" ? "Nemáš účet? Registrace" : "Máš účet? Zpět na login"}
          targetPage={page === "login" ? "register" : "login"}
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          email={email} setEmail={setEmail}
          confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
          showPassword={showPassword} setShowPassword={setShowPassword}
          handleAuth={handleAuth}
          setPage={(p) => { setPage(p); resetForm(); }}
        />
      )}

      {/* Podmínka: Zobrazit chat pouze pokud jsme v chatu */}
      {page === "chat" && (
        <div className="chat-container">
          <h1>Chat je aktivní! 💬</h1>
          <button onClick={() => { setPage("login"); resetForm(); }}>Odhlásit</button>
        </div>
      )}
    </div>
  );
}

export default App;