const asyncHandler = require('express-async-handler')
const Joi =require('joi')

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
