const express = require('express')
const Router = express.Router()
const { UserSignIn, UserSignUp } = require("../Controller/authController")
const { authenticate, verifyToken } = require("../Middleware/authMidleware")


Router.route('/signin')
    .post(UserSignIn)

Router.route('/signup')
    .post(UserSignUp)

Router.route('/checkauth')
    .get(authenticate)
Router.route('/checkappauth')
    .get(verifyToken)


module.exports = Router