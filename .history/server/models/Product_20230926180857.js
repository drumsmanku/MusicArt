const mongoose = require('mongoose');

module.exports=mongoose.model('Product', {
  name_of_product:String,
  short_desc:String,
  detailed_desc:String,
  review_stars:String,
  price:String,
  color:String,
  type:String,
  brand:String,
  isAvailable:Boolean,
  imageURLs:[String],

})