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
        const user = await User.find({ email: req.body.email }).limit(1).next();
        if(err){
            console.log(err)
            }
            else{
        if (user) {
            return res.status(400).send('User already exists...');
        }

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        await newUser.save();

        return newUser;
    }
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


