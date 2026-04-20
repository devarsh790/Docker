const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "testdb"
});

app.get("/", (req, res) => {
  res.send("Backend Running 🚀 - Devarsh Soni");
});

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, password) VALUES (?, ?)",
    [username, hash],
    (err) => {
      if (err) return res.send(err);
      res.send("User Registered ✅");
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE name=?",
    [username],
    async (err, result) => {
      if (err) return res.send(err);
      if (result.length === 0) return res.send("User not found");

      const valid = await bcrypt.compare(password, result[0].password);
      if (!valid) return res.send("Wrong password");

      const token = jwt.sign({ id: result[0].id }, "secretkey");
      res.json({ token });
    }
  );
});

// Get users
app.get("/users", (req, res) => {
  db.query("SELECT id, name FROM users", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
