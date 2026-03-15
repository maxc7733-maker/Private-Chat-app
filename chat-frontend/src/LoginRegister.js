import React from "react";
import "./Login.css"; // Ujisti se, že importuješ správné CSS

const LoginRegister = ({ title, buttonText, secondaryText, targetPage, username, setUsername, password, setPassword, showPassword, setShowPassword, handleAuth, setPage }) => {
  return (
    <div className="auth-box">
      <h1>{title}</h1>
      <p>Vítej zpět!</p>
      
      <input placeholder="Uživatelské jméno" value={username} onChange={(e) => setUsername(e.target.value)} />
      
      <div style={{ position: "relative" }}>
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Heslo" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button 
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
          style={{ position: "absolute", right: "10px", top: "18px" }}
        >
          {showPassword ? "Skrýt" : "Ukázat"}
        </button>
      </div>

      <button onClick={() => handleAuth(title === "Přihlášení" ? "login" : "register")}>
        {buttonText}
      </button>

      <p>
        {title === "Přihlášení" ? "Nemáš účet? " : "Máš už účet? "}
        <span onClick={() => { setPage(targetPage); setUsername(""); setPassword(""); }}>
          {secondaryText}
        </span>
      </p>
    </div>
  );
};

export default LoginRegister;