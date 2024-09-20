const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const jsonFilePath = path.join(__dirname, "../db/users.json");

module.exports = function (app) {
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Read the json file db/users.json
    const usersData = fs.readFileSync(jsonFilePath, "utf-8");
    const users = JSON.parse(usersData);

    // Verify username and password with bcrypt hash
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    console.log("Login successful");
    const token = uuidv4();
    res.status(200).json({ message: "Login successful", token });
  });
};
