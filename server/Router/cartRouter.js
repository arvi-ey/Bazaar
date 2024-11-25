const express = require('express');
const Router = express.Router();
const { AddToCart, GetCartItems } = require("../Controller/cartController")
Router.route('/addcart')
    .post(AddToCart)

Router.route('/getcartitems/:userId')
    .get(GetCartItems)

module.exports = Router;