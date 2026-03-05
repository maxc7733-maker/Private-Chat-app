import React, { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      text: input,
      id: Date.now()
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="app">
      <h1>Chat aplikace 💬</h1>

      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Napiš zprávu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Odeslat</button>
      </div>
    </div>
  );
}

export default App;