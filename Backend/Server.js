const express = require('express');
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());


const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes.js");


app.use("/api", studentRoutes);
app.use("/api", courseRoutes);

app.get('/', (req, res) => {
  res.send("API Running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});