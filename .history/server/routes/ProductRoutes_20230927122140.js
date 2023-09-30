const AuthenticateUser = require('../middlewares/AuthenticateUser');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const router=express.Router();
const Product=require('../models/Product');


router.get('/get-prods', async(req, res) => {
  try {
    const { type, company, color, price, name } = req.query;
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
    if (price) {
      query.price = { $lte: parseInt(price) };
    }
    if (name) {
      query.name = new RegExp(name, 'i');
    }

    const products = await Product.find(query);

    res.send({ status: 'success', products });
  } catch (err) {
    console.log(err);
    res.send({ status: 'failed', message: 'Something went wrong' });
  }
});




module.exports = router;