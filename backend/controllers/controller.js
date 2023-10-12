const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/schema');
const generateAccessToken = require('../utils/jwtAuthToken');

const schema = Joi.object({
    name: Joi.string().min(3).max(21).required(),
    email: Joi.string().min(6).max(133).required().email(),
    password: Joi.string().min(6).max(1024).required(),
});

exports.Validater = async (req, res, next) => {
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            console.log('error occcured')
            return res.status(400).send(error.details[0].message); // Return the response and exit the function
        }

        const user = await createUser(req, res);
        if (!user) {
            return; // If createUser returns an error response, exit the function
        }

        const token = generateToken(user);
        res.send(token);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const createUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400).send('User already exists...');
            return null; // Return null to indicate an error
        }

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        user.password = await bcrypt.hash(user.password, salt);

        user = await user.save();
        return user;
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error on user creation ');
        return null; // Return null to indicate an error
    }
};

const generateToken = (user) => {
    return generateAccessToken(user);
};
