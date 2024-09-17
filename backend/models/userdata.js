const { default: mongoose } = require("mongoose");

const userdataSchema=new mongoose.Schema({
    address:{
        required: true, 
        type:String,
        
    },
    pincode:{
        required: true, 
        type:Number
    }

})


const Userdata=mongoose.model('Userdata',userdataSchema);
module.exports=Userdata;