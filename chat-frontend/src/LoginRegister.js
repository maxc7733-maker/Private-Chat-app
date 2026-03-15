import React from "react";
import "./Login.css";

const LoginRegister = ({ 
  title, buttonText, secondaryText, targetPage, 
  username, setUsername, password, setPassword, 
  email, setEmail, confirmPassword, setConfirmPassword,
  showPassword, setShowPassword, handleAuth, setPage 
}) => {
  
  const isRegister = title === "Registrace";

  // Pomocná funkce pro zobrazení zbývajících znaků
  // Nahraď svou stávající funkci touto:
  const renderCharCount = (value, max) => {
  const remaining = max - value.length;
  const isWarning = remaining < 5; // Pokud zbývá méně než 5 znaků, bude to červené
  
  return (
    <div className={`char-count ${isWarning ? 'warning' : ''}`}>
      Zbývá: {remaining}
    </div>
  );
};

  return (
    <div className="auth-box">
      <h1>{title}</h1>
      <p>{isRegister ? "Vytvoř si nový účet!" : "Vítej zpět!"}</p>
      
      {/* Uživatelské jméno */}
      <input 
        placeholder={isRegister ? "Uživatelské jméno" : "Jméno nebo E-mail"} 
        maxLength="20" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      {renderCharCount(username, 20)}
      
      {/* E-mail (jen pro registraci) */}
      {isRegister && (
        <>
          <input 
            type="email" 
            placeholder="E-mail" 
            maxLength="50"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          {renderCharCount(email, 50)}
        </>
      )}

      {/* Heslo */}
      <div style={{ position: "relative" }}>
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Heslo" 
          maxLength="30"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button 
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Skrýt" : "Ukázat"}
        </button>
      </div>
      {renderCharCount(password, 30)}

      {/* Potvrzení hesla (jen pro registraci) */}
      {isRegister && (
        <>
          <input 
            type="password" 
            placeholder="Potvrdit heslo" 
            maxLength="30"
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          {renderCharCount(confirmPassword, 30)}
        </>
      )}

      <button onClick={() => {
        if (isRegister && password !== confirmPassword) {
          return alert("Hesla se neshodují!");
        }
        if (isRegister && password.length < 6) {
          return alert("Heslo musí mít alespoň 6 znaků!");
        }
        handleAuth(isRegister ? "register" : "login");
      }}>
        {buttonText}
      </button>

      {/* Profesionální patička */}
      <div className="auth-footer">
        {isRegister ? "Máš už účet? " : "Nemáš účet? "}
        <span className="auth-link" onClick={() => { setPage(targetPage); setUsername(""); setPassword(""); setEmail(""); setConfirmPassword(""); }}>
          {isRegister ? "Přihlaš se" : "Registruj se"}
        </span>
      </div>
    </div>
  );
};

export default LoginRegister;