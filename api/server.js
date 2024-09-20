const express = require("express");
const app = express();
const port = 1337;
const verifyToken = require("./middleware/authMiddleware");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");

app.use(cors());

require("../middleware/allowCors");

// routes categories
require("../routes/categories", verifyToken)(app);
// routes login
require("../routes/login", verifyToken)(app);
// routes questions
require("../routes/questions", verifyToken)(app);
// routes users
require("../routes/users", verifyToken)(app);

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
