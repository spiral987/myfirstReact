const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // 本番環境では限定してください
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('🔌 ユーザーが接続:', socket.id);

  socket.on('sendMessage', (message) => {
    console.log('📩 メッセージ:', message);
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('❌ ユーザー切断:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('✅ Socket.IO サーバーが 4000番ポートで起動中');
});
