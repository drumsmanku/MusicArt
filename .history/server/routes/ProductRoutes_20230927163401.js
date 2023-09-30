const AuthenticateUser = require('../middlewares/AuthenticateUser');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const router=express.Router();
const Product=require('../models/Product');


router.get('/get-prods', async(req, res) => {
  console.log(req.query.priceOption);
  try {
    const { type, company, color, priceOption , name_of_product } = req.query;
    console.log(req.query.priceOption);
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
    if (priceOption === "0-1000") {
      query.price = { $gte: parseFloat(0), $lte: parseFloat(1000) };
    } else if (priceOption === "1000-10000") {
      query.price = { $gte: parseFloat(1000), $lte: parseFloat(10000) };
    } else if (priceOption === "10000-20000") {
        query.price = { $gte: parseFloat(10000), $lte: parseFloat(20000) };
    } else {
        delete query.price;
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