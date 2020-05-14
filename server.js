require("express-async-errors");
require("./config/config")();
const error = require("./middleware/error");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(express.json({ extended: false }));

app.use("/api/users", cors(corsOptions), require("./routes/api/users"));
app.use("/api/auth", cors(corsOptions), require("./routes/api/auth"));
app.use("/api/profile", cors(corsOptions), require("./routes/api/profile"));
app.use("/api/posts", cors(corsOptions), require("./routes/api/posts"));
app.use(cors(corsOptions), error);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
