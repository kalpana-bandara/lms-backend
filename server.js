require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DATABASE_URI);
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.once("open", () => console.log("connected to database"));

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log("Backend listening on port 3001");
});
