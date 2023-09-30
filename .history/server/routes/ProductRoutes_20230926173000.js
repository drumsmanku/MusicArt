const AuthenticateUser = require('../middlewares/AuthenticateUser');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const router=express.Router();
const Product=require('../models/Product');


router.get('/get-prods', async(req, res) => {
  try {
    const { category} = req.query;
    let query = {};

    if (category) {
      const CatsArray = category.split(',').map(cat => new RegExp(cat, 'i'));
      query.category = { $in: CatsArray };
    }

    const products = await CreateProd.find(query);
    for (let i = 0; i < products.length; i++) {
      let commentsCount = await Comment.countDocuments({productId: products[i]._id});
      let upvoteCount=await Upvote.countDocuments({productId: products[i]._id});
      products[i] = products[i].toObject(); 
      products[i].commentsCount = commentsCount;
      products[i].upvoteCount = upvoteCount;
    }

    res.send({ status: 'success', products });
  } catch (err) {
    console.log(err);
    res.send({ status: 'failed', message: 'Something went wrong' });
  }
});

module.exports = router;