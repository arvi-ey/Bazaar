const express = require("express")
const Router = express.Router()
const { AddUser, UpdateUser } = require("../Controller/userController")

Router.route('/adduser')
    .post(AddUser)

Router.route('/updateuser/:id')
    .post(UpdateUser)


module.exports = Router