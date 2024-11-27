const express = require('express');
const Router = express.Router();
const { AddToCart, GetCartItems, RemoveFromCart, UpdateCartItems } = require("../Controller/cartController")
Router.route('/addcart')
    .post(AddToCart)

Router.route('/getcartitems/:userId')
    .get(GetCartItems)

Router.route('/removefromcart/:id')
    .post(RemoveFromCart)

Router.route('/updateCart/:id')
    .patch(UpdateCartItems)

module.exports = Router;