const express = require("express");
const app = express();
const db=require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

app.get("/", function (req, res) {
  res.send("Welcome to our hotel");
});

const menuItemRoutes=require('./routes/menuItemRoutes');
app.use('/menuItem',menuItemRoutes);

//Import the router files
const personRoutes= require('./routes/personRoutes');
//Use the routers
app.use('/person', personRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Listening on port 3001");
});
