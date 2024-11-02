const express = require("express")
const Router = express.Router()
const { AddUser, UpdateUser, GetUser } = require("../Controller/userController")

Router.route('/adduser')
    .post(AddUser)

Router.route('/getuser/:id')
    .get(GetUser)

Router.route('/getallUser')
    .get()

Router.route('/updateuser/:id')
    .post(UpdateUser)


module.exports = Router