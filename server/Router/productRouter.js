const express = require('express')
const Router = express.Router()
const { AddProduct, UpdateProduct, GetAllProduct, GetSingleProduct, GetAllProductByCategory } = require("../Controller/productController")

Router.route('/addproduct')
    .post(AddProduct)

Router.route('/updateproduct/:id')
    .patch(UpdateProduct)

Router.route('/getallproducts')
    .get(GetAllProduct)

Router.route('/getproduct/:id')
    .get(GetSingleProduct)

Router.route('/getproductcategory/:category')
    .get(GetAllProductByCategory)

module.exports = Router