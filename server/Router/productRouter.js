const express = require('express')
const Router = express.Router()
const { AddProduct, UpdateProduct, GetAllProduct, GetSingleProduct, GetAllProductByCategory, GetAllProductsAdmin } = require("../Controller/productController")

Router.route('/addproduct')
    .post(AddProduct)

Router.route('/updateproduct/:id')
    .patch(UpdateProduct)

Router.route('/getproducts')
    .get(GetAllProduct)

Router.route('/getproduct/:id')
    .get(GetSingleProduct)

Router.route('/getproductcategory/:category')
    .get(GetAllProductByCategory)

Router.route('/getallproducts')
    .get(GetAllProductsAdmin)

module.exports = Router