var express = require("express");
require("dotenv").config();

const path = require("path");
var app = express();

var cors = require("cors");

//connect DB

const DBconnect = require("./config/DBconnect");

DBconnect();

//Middlewares
app.use(express.json());
app.use(cors());
app.use("/contacts", require("./routes/contact"));

//serve static assests if in production

if (process.env.NODE_ENV === "production") {
  app.get("*", function (req, res) {
    const index = path.join(__dirname, "client", "build", "index.html");
    res.sendFile(index);
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is runnings");
});
