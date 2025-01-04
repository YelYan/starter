const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
require("colors");

const connectDatabse = require("./helpers/database/connectDatabase");
const { logger, logEvents } = require("./middlewares/logger");
const errhandler = require("./middlewares/errHandler");
const rootRoute = require("./routes/root");
const authRoutes = require("./routes/auth/authRoutes");

const app = express();
dotenv.config();

connectDatabse();

const PORT = process.env.PORT || 8000;

app.use(logger);
// serve for static files such as css,js,imgs
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static("public"));

// api routes
app.use(rootRoute);
app.use("/api/v1", authRoutes);

app.use(errhandler);

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    return res.json({
      message: "404 not Found!",
    });
  } else {
    return res.type("txt").send("404 not found");
  }
});

mongoose.connection.once("open", () => {
  console.log(`Connected to mongoDB`.white);
  app.listen(PORT, () => console.log(`Server running at port ${PORT}`.bgGreen));
});

mongoose.connection.on("error", (err) => {
  console.log(`${err}`.red);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
