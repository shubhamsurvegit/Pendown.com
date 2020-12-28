const express=require('express');
const router=express.Router();
const bodyparser=require('body-parser');
const { model } = require('mongoose');
const User = require('../models/schema');

const bodyparserurl=bodyparser.urlencoded({extended:false})


router.get('/login',(req,res)=>{
    res.render('login');
})


router.get('/register',(req,res)=>{
    res.render('register');
})

router.get('/home',(req,res)=>{
    res.render('home');
})



router.post('/register',bodyparserurl,(req,res)=>{
    const errors=[];
    const data={
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        confirmpassword:req.body.confirmpassword,
        articles:[

        ]
    }
    if(!data.username || !data.email || !data.password || !data.confirmpassword){
        errors.push({msg:"Please fill in all fields"});
    }
    if(req.body.password!==req.body.confirmpassword){
        errors.push({msg:"Passwords do not match"});
    }
    if(errors.length>0){
        res.render('register',{errors:errors,data:data});
    }
    else{
        User.findOne({email:data.email})
        .then((userdata)=>{
            if(userdata){
                errors.push({msg:"User already exists"});
                res.render('register',{errors:errors});
            }
            else{
                User.create(data)
                .then((userdata)=>{
                    req.session.email=data.email;
                        res.redirect('/home');
                })
                .catch((err)=>res.send(err));
            }
        })
    }
})


router.post('/login',bodyparserurl,(req,res)=>{

    const errors=[];
    const data={
        email:req.body.email,
        password:req.body.password
    }
    if(!data.email || !data.password){
        errors.push({msg:"Please fill in all fields"})
        res.render('login',{errors:errors});
    }
    else{
        User.findOne({email:data.email})
        .then((userdata)=>{
            if(userdata){
                if(data.password==userdata.password){
                    req.session.email=data.email;
                    res.redirect('/home');
                }
                else{
                    errors.push({msg:"Incorrect Password"});
                    res.render('login',{errors:errors});
                }
            }
            else{
                errors.push({msg:"User does not exist"})
                res.render('login',{errors:errors})
            }
        })
        .catch((err)=>res.send(err));
    }
})


router.get('/logout',(req,res)=>{
    delete req.session.email;
    const errors=[];
    errors.push({msg:"You are logged out"});
    res.render('login',{errors:errors});
})

module.exports=router;