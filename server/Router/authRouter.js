const express = require('express')
const Router = express.Router()
const { UserSignIn, UserSignUp } = require("../Controller/authController")


Router.route('/signin')
    .post(UserSignIn)

Router.route('/signup')
    .post(UserSignUp)

module.exports = Router