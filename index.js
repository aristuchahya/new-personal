const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

const router = require("./routes/index");
const flash = require("express-flash");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(port, () => {
  console.log("Server running on port :", port);
});
