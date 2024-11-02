const express = require('express')
const Router = express.Router()
const { UserSignIn, UserSignUp } = require("../Controller/authController")
const { authenticate } = require("../Middleware/authMidleware")


Router.route('/signin')
    .post(UserSignIn)

Router.route('/signup')
    .post(UserSignUp)

Router.route('/checkauth')
    .get(authenticate)

module.exports = Router