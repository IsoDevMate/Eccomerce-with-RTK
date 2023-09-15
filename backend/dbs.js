const mongoose=require('mongoose');
const ConnectSchema=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            
        });
        console.log(`MongoDB connected successfully to : ${conn.connection.host}`);

    }
    catch(error){
        console.error(`MongoDB Connection Failed: ${error.message}`);
        process.exit(1);
    }
}
module.exports=ConnectSchema;