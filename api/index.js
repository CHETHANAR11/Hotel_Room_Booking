const express=require('express');
const cors=require('cors');
const mongoose=require("mongoose");
const bcrypt =require('bcryptjs');
require('dotenv').config();
const User = require('./models/User.js');
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app=express();

const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecret='jkxlcjm847842huienjkajk9as989ee';

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL,{
    writeConcern: { w: 'majority' }
  });

app.get('/test',(req,res)=>{
    res.json('test ok');
})

app.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
    
    res.json(userDoc);
    }
    catch(e){
        res.status(422).json(e);
    } 
 });

 app.post('/login',async(req,res)=>{
    const {email,password}= req.body;
    const UserDoc = await User.findOne({email});
    if(UserDoc){
        const passVer = bcrypt.compareSync(password, UserDoc.password)
        if(passVer){
            jwt.sign({
                email:UserDoc.email,
                id:UserDoc._id
            },jwtSecret,{},(err,token)=>{
                if(err)
                throw err;
                res.cookie('token',token).json(UserDoc);
        })
        }
        else{
            res.status(422).json("Invalid password");
        }
    }
    else{
        res.json('not found');
    }
 });

 app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
           if(err)
           throw err;
           const {name,email,_id}= await User.findById(userData.id);
           res.json({name,email,_id});
        }); 
    }
    else{
        res.json(null);
    }
 });

 app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
 });

app.listen(4000,()=>{
    console.log("Listening");
});