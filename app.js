const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const users = [];

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("index", {
    pageTitle: "Add New User",
    path: "/",
  });
});

app.get("/users", (req, res, next) => {
  res.render("users", {
    pageTitle: "Users",
    users: users,
    hasUsers: users.length > 0,
    path: "/users",
  });
});

app.post("/add-user", (req, res, next) => {
  users.push({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
  });
  res.redirect("/users");
});

app.use((req, res, next) => {
  res.status(404).render("error", { pageTitle: "Error Page", path: "" });
});

app.listen(3000);
