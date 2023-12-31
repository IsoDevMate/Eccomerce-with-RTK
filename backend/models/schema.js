const mongoose= require('mongoose');
const UserSChema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:21,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:6,
        maxlength:133,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:1024,
    },
})

const User=mongoose.model('User',UserSChema);

module.exports=User;