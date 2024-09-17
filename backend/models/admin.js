const { default: mongoose } = require("mongoose");

const userSchema=new mongoose.Schema({
    email:{
        require:true,
        type:String,
        
    },
    username:{
        requre:true,
        type:String
    },
    password:{
        require:true,
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }

})


const User=mongoose.model('User',userSchema);
module.exports=User;