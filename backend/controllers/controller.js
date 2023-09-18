/* const asyncHandler = require('express-async-handler') */
const Joi =require('joi')
const { User } = require('../models/schema');
const generateAccessToken = require('../utils/jwtAuthToken')

exports.Validater=async (req, res,next) => {
    try {
        const schema=Joi.object({
            name:Joi.string().min(3).max(21).required(),
            email:Joi.string().min(6).max(133).required().email(),
            password:Joi.string().min(6).max(1024).required(),
        })
        const {error}=schema.validate(req.body);
        if(error){
            res.status(400).send(error.details[0].message);
            return;
        }
        next()
    
        const user = await createUser(req);
        const token = generateToken(user);
    
        res.send(token);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const createUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send('User already exists...');
        }


    user = new User({ name,email,password })=req.body

    const saltRounds = 10;
    const salt= await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password,salt);

    user= await user.save();

    return user;
} catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
}
}

const generateToken = (user) => {
    return generateAccessToken(user);
}
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


