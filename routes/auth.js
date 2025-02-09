const express = require('express');

const routes= express.Router();
const authctl = require("../controller/authcontroller")

routes.post ("/usersignup",authctl.usersignup);
routes.post ("/usersignin",authctl.usersignin);
module.exports= routes;