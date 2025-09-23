const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const Visitor = require('./models/Visitor'); // ✅ new
const connectDB = require('./config/db');
const visitorRoutes = require("./routes/visitor");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: ['https://chauhan-vastralaya.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));

const io = socketIo(server, {
  cors: {
    origin: ['https://chauhan-vastralaya.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ✅ Connect MongoDB

connectDB();

let activeUsers = 0;

io.on('connection', async (socket) => {
  activeUsers++;
  io.emit('active-users', activeUsers);

    socket.on('disconnect', () => {
    activeUsers--;
    io.emit('active-users', activeUsers);
  });

  // ✅ Increment total visitors
  try {
    let visitorDoc = await Visitor.findOne();
    if (!visitorDoc) {
      visitorDoc = new Visitor({ totalVisitors: 1 });
    } else {
      visitorDoc.totalVisitors += 1;
    }
    await visitorDoc.save();
    io.emit('total-visitors', visitorDoc.totalVisitors);
  } catch (err) {
    console.error("Error updating visitor count:", err);
  }


});

app.use("/api", visitorRoutes);


server.listen(3001, () => {
  console.log('Socket Server is running on http://localhost:3001');
});
