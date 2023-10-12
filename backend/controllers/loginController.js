const Joi =require('joi')
const { User } = require('../models/schema');
const generateAccessToken = require('../utils/jwtAuthToken')

exports.LogInValidater=async (req, res,next) => {
    try {
        const schema=Joi.object({
            email:Joi.string().min(6).max(133).required().email(),
            password:Joi.string().min(6).max(1024).required(),
        })
        const {error}=schema.validate(req.body);
        if(error){
            res.status(400).send(error.details[0].message);
            return;
        }
        next()
        const user = await loginUser(req);
        console.log(user)
        const token = generateToken(user);
    
        res.send(token);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    
}
const loginUser=async(req,req)=>{
    try {

      
        let user = await User.findOne({ email: req.body.email });
        
        user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        })
    
        const saltRounds = 10;
        const salt= await bcrypt.genSalt(saltRounds);
        user.password = await bcrypt.hash(user.password,salt);
        const match = await bcrypt.compare(req.body.password,user.password);

        if(!match) {
            //login
            return res.status(400).send('Invalid email or Password...');
        }
        user= await user.save();
    
}catch(error){
    console.error(error);
    return res.status(500).send('Internal Server Error');
}
}
const generateToken = (user) => {
    return generateAccessToken(user);
}