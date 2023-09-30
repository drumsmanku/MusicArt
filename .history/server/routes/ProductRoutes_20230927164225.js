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
    
    let query = {};

    const priceRange = {
      low: { $gte: 0, $lte: 1000 },
      medium: { $gte: 1000, $lte: 10000 },
      high: { $gte: 10000, $lte: 20000 }
    }

    if (type) {
      query.type = new RegExp(type, 'i');
    }
    if (company) {
      query.company = new RegExp(company, 'i');
    }
    if (color) {
      query.color = new RegExp(color, 'i');
    }
    if (priceOption in priceRange) query.price = priceRange[priceOption];
    
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