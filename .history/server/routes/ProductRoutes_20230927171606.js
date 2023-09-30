const AuthenticateUser = require('../middlewares/AuthenticateUser');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const router=express.Router();
const Product=require('../models/Product');


router.get('/get-prods', async(req, res) => {
  
  try {
    const { type, company, color, priceOption , name_of_product, sortingOption  } = req.query;
    
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

    let sortingParams = {};

    if (sortingOption) {
      switch (sortingOption) {
        case 'lowest':
          sortingParams.price = 1;
          break;
        case 'highest':
          sortingParams.price = -1;
          break;
        case 'ascending':
          sortingParams.name_of_product = 1;
          break;
        case 'descending':
          sortingParams.name_of_product = -1;
          break;
        default:
          break;
      }
    }
    const products = await Product.find(query).sort(sortingParams);

    res.send({ status: 'success', products });
  } catch (err) {
    console.log(err);
    res.send({ status: 'failed', message: 'Something went wrong' });
  }
});




module.exports = router;