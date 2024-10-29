const express = require('express')
const Router = express.Router()
const { AddCategory, UpdateCategory, GetAllCategory } = require("../Controller/categoryController")

Router.route('/addcategory')
    .post(AddCategory)

Router.route('/updatecategory/:id')
    .patch(UpdateCategory)

Router.route('/getallcategory')
    .get(GetAllCategory)

module.exports = Router