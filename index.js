const express= require('express');

const port = 8000;

const app= express();
const path = require('path');
// const db= require("./config/db")
const passport = require("passport");

const mongoose=require('mongoose');

 mongoose.connect("mongodb+srv://ikmedia2121:H2xVJGXGXe2BfnK7@cluster0.uwvaa.mongodb.net/api").then((res) => {
  console.log("connected to database");
  }).catch((err) => {
    console.log(err,"not connected to database");
    });


const jwtstegy = require ("./config/passport-jwt-Strategy");
const session = require("express-session");

app.use(session({
    name:"Jwtsession",
    secret: "jwtjj",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: 1000*60*60
    }
}))
app.use("/upload",express.static(path.join(__dirname,"upload")));



app.use (passport.initialize());
app.use (passport.session());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

app.use("/", require("./routes"))
app.listen (port, (err) => {

    if(err) {
        console.log(err);
        }  
    console.log( "server is running on port", port);
})