const express=require('express');
const db=require("./db")
const app=express();
const port=4000;

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("welcome to backend ")
})

const adminRoutes = require('./routes/adimRoutes');
app.use('/Admin',adminRoutes);


const userdataRoutes=require('./routes/userdataRoutes');
app.use('/userdata',userdataRoutes);

app.listen(port,()=>{
    console.log("server started");
}) 