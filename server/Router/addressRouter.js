const express = require('express');
const Router = express.Router();

const { AddAddress, GetUserAddress } = require("../Controller/addressController")

Router.route('/addaddress')
    .post(AddAddress)

Router.route('/getuseraddress/:id')
    .get(GetUserAddress)

module.exports = Router;