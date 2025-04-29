const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bookingRoutes = require('./routes/bookingRoutes');


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/hotelBookings', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/', bookingRoutes);

const http =require('http').createServer(app);
const io= require("socket.io")(http);
io.on("connection",(socket)=>{
console.log("a user connected");
socket.on('disconnect',()=>{
  console.log("user disconnected");
});
setInterval(()=>{
socket.emit('number',parseInt(Math.random()*10));
},1000);

});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});

module.exports=app;
