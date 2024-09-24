const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://informatique:xMR9tbQNjdC4PEkA@cluster0.ecs2h.mongodb.net/Sondage?retryWrites=true&w=majority&appName=Cluster0`
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected successfully");
});
