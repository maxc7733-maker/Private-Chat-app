const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { verifyJWT } = require('./middleware/authMiddleware');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Socket.IO server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // React frontend
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// REST API routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', verifyJWT, roomRoutes);
app.use('/api/messages', verifyJWT, messageRoutes);

// MongoDB připojení
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Socket.IO realtime chat
io.on('connection', (socket) => {
  console.log('🟢 Nové spojení:', socket.id);

  // Připojení do místnosti
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`Uživatel ${socket.id} vstoupil do místnosti ${roomId}`);
  });

  // Odeslání zprávy
  socket.on('send_message', ({ roomId, message, sender }) => {
    const msgData = { message, sender, createdAt: new Date() };
    // Broadcast do místnosti kromě odesílatele
    socket.to(roomId).emit('receive_message', msgData);
  });

  // Indikace psaní
  socket.on('typing', ({ roomId, sender }) => {
    socket.to(roomId).emit('typing', { sender });
  });

  // Odpojení uživatele
  socket.on('disconnect', () => {
    console.log('🔴 Odpojení:', socket.id);
  });
});

// Spuštění serveru
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server běží na http://localhost:${PORT}`);
});