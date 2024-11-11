const express = require('express');
const Router = express.Router();
const { AddBanner, UpdateBanner, DeleteBanner, GettAllBanners } = require("../Controller/bannerController")

Router.route('/addbanner')
    .post(AddBanner)

Router.route('/updatebanner/:id')
    .patch(UpdateBanner)
    .delete(DeleteBanner)

Router.route('/allbanners')
    .get(GettAllBanners)

module.exports = Router