const mongoose=require("mongoose");
// const mongoUrl='mongodb+srv://sonalrig:QMGQyoRx17D4t6t0@cluster0.641p8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/SIH'
const mongoUrl =  'mongodb://127.0.0.1:27017/SIH';
// require('dotenv').config();
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
 
const db = mongoose.connection;

db.on('connected', () =>{
    console.log('connected');
})
db.on('error', (err) =>{
    console.error('error',err);
})

db.on('disconnected', () =>{
    console.log('disconnected');
})

module.exports=db;

