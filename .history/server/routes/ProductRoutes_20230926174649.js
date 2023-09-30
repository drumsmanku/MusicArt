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

    const products = await Product.find(query);

    res.send({ status: 'success', products });
  } catch (err) {
    console.log(err);
    res.send({ status: 'failed', message: 'Something went wrong' });
  }
});


router.post('/create-prod', AuthenticateUser,(req,res)=>{
  const {companyName,category,logoURL, productLink, description}=req.body 
  const newJob={companyName,category,logoURL, productLink, description}
  Product.create(newJob).then(()=>{
    res.json({status:'success', message:'Job created successfully'})
  }).catch(err=>{console.log(err)});
  
});
module.exports = router;