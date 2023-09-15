const asyncHandler = require('express-async-handler')
const Joi =require('joi')
const { User }=require('../models/schema')

exports.Validater=asyncHandler(async (req, res,next) => {
    const schema=Joi.object({
        name:Joi.string().min(3).max(21).required(),
        email:Joi.string().min(6).max(133).required().email(),
        password:Joi.string().min(6).max(1024).required(),
    })
    const {error}=schema.validate(req.body);
    if(error){
        res.status(400)
        throw new Error(error.details[0].message)
    }
    next()
})
//lets bring in the user model that aids us interact with the db
let user = await User.findOne({ email:req.body.email })
if(user) return res.status(400).send('User already exists...')

//generate a document to be saved to the Db
user = new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
})
//encrypt the password

const saltRounds = 10

const salt= await bcrypt.genSalt(saltRounds)
user.password = await bcrypt.hash(user.password,salt)

//comparing db password 

/* const checkUser=(async(username, password) =>{
    //... fetch user from a db etc.

    const match = await bcrypt.compare(user.password, user.passwordHash);

    if(match) {
        //login
    }})
//lets save the user to the db
checkUser()
 */
await user.save()

