const express = require("express");
const connectDB = require("./config/db");
const session = require("express-session"); //to tell express how to work with session
const MongoStore = require("connect-mongo")(session); //usig this,session are created automatically
const mongoose = require("mongoose");
const passport = require("passport");

require("./models/User");
require("./models/Post");
require("./models/Comment");
require("./models/Like");
require("./models/View");

const app = express();

connectDB();
require("./config/passport");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());  //converts json data into js objects before every request

app.use(
  session({
    secret: "mysecretkey", //performs encryption on cookie
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize()); //before every request,make use of passport
app.use(passport.session());  //create a session using passport library whenever any request is made

app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/index"));
app.use("/", require("./routes/profile"));
app.use("/", require("./routes/post"));
app.use("/", require("./routes/comment"));
app.use("/", require("./routes/upload"));

app.get("/*", (req, res) => {
  res.render("error-404");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on Port" + port);
});
