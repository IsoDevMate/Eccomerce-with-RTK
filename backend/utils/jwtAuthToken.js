const jwt=require('jsonwebtoken')

//create a function to generate a web token
const generateAccessToken =(user)=>{
   
    const secretKey =process.env.SECRET_KEY
  
 const token =jwt.sign({
    _id:user._id,
    name:user.name,
    email:user.email
 },secretKey)

 console.log(token)
 return token

}
module.exports = generateAccessToken 