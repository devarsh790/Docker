const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "testdb"
});

app.get("/", (req, res) => {
  res.send("Backend Running 🚀 - Devarsh Soni");
});

app.get("/data", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
