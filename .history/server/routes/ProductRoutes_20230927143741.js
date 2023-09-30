const AuthenticateUser = require('../middlewares/AuthenticateUser');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const router=express.Router();
const Product=require('../models/Product');


router.get('/get-prods', async(req, res) => {
  try {
    const { type, company, color, price, min_price, max_price, name_of_product } = req.query;
    let query = {};

    if (type) {
      query.type = new RegExp(type, 'i');
    }
    if (company) {
      query.company = new RegExp(company, 'i');
    }
    if (color) {
      query.color = new RegExp(color, 'i');
    }
    if (min_price && max_price) {
      query.price = { $gte: parseFloat(min_price), $lte: parseFloat(max_price) };
    }
    else if (min_price) {
         query.price = { $gte: parseFloat(min_price) };
    }
    else if (max_price) {
    query.price = { $lte: parseFloat(max_price) };
    }
    if (name_of_product) {
      query.name_of_product = new RegExp(name_of_product, 'i');
    }

    const products = await Product.find(query);

    res.send({ status: 'success', products });
  } catch (err) {
    console.log(err);
    res.send({ status: 'failed', message: 'Something went wrong' });
  }
});




module.exports = router;