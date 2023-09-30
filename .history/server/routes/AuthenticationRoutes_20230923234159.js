const AuthenticateUser = require('../middlewares/AuthenticateUser');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const router=express.Router()

router.post("/signup", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const existingUser = await Customer.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      res.send({ message: "user already exists, please sign in" });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUsers = {
        name,
        email,
        mobile,
        password: encryptedPassword,
      };
      Customer.create(newUsers).then(() => {
        const jwtToken=jwt.sign(newUsers,process.env.JWT_SECRET_KEY, {expiresIn:3600} )
        res.json({ status: "success", jwtToken, name: newUsers.name });
      });

    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/login',async (req, res)=>{
  
  try{
    const {email, password} = req.body;
    const userInDB=await Customer.findOne({email});
    if(!userInDB){
      res.send({message:'user not found in database. PLease Sign up'});
      return
    }
    const existingUser=await bcrypt.compare(password, userInDB.password);
    if(existingUser){
      const jwtToken=jwt.sign(userInDB.toJSON(),process.env.JWT_SECRET_KEY, {expiresIn:'1hr'} )
      res.send({message:"user exists, Signed in successfully",jwtToken, name: userInDB.name })
    }
    else{
      res.send({message:'invalid credentials'})
    }

  }
  catch(err){
    console.log(err)
    res.send({message:"FAILED"})
  }
  
})

module.exports=router



