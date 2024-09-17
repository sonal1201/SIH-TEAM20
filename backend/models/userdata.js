const { default: mongoose } = require("mongoose");

const userdataSchema=new mongoose.Schema({
    address:{
        require:true,
        type:String,
        
    },
    pincode:{
        requre:true,
        type:Number
    }

})


const Userdata=mongoose.model('Userdata',userdataSchema);
module.exports=Userdata;