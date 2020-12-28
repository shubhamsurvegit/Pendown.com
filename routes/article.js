const express=require('express');
const router=express.Router();
const bodyparser=require('body-parser');
const User = require('../models/schema');

const bodyparserurl=bodyparser.urlencoded({extended:false})

router.post('/add',bodyparserurl,(req,res)=>{
    const article={
        article_title:req.body.title,
        article_content:req.body.content,
        article_likes:0
    }
    User.findOne({email:req.session.email})
    .then((userdata)=>{
        const articles=userdata.article.filter(i=>i.article_title==article.article_title);
        if(articles.length==0){
            userdata.article.push(article);
            User.findOneAndUpdate({email:req.session.email},{
                $set:{
                    'article':userdata.article
                }
            },(err,data)=>{
                if(err){
                    console.log(err);
                }
            })
        }
        else{
            const errors=[];
            errors.push({msg:"Title Already exist"});
            res.render('article',{article:article},{errors:errors})
        }
    })
    .catch((err)=>console.log(err));
})

router.get('/article',(req,res)=>{
    const article={
        article_content:''
    }
    if(req.session.email==null){
        const errors=[];
        errors.push({msg:"Kindly Login"});
        res.render('login',{errors:errors})
    }
    else{
        res.render('article',{article:article})
    }
})


router.get('/myarticles',(req,res)=>{
    User.findOne({email:req.session.email})
    .then((userdata)=>{
        if(userdata==null){
            res.render('myarticles');
        }
        else{
            res.render('myarticles',{userdata:userdata})
        }
    })
    .catch((err)=>console.log(err));
})

router.get('/allarticles',(req,res)=>{
    if(req.session.email==undefined){
        const errors=[];
        errors.push({msg:"Kindly Login"});
        res.render('login',{errors:errors})
    }
    else{
        User.find({})
        .then((userdata)=>{
            res.render('allarticles',{userdata:userdata,email:req.session.email})
        })
        .catch((err)=>console.log(err));
    }
})

router.post('/save',bodyparserurl,(req,res)=>{
    User.findOneAndUpdate({email:req.session.email,
        "article._id":req.body.id},{
        $set:{

            'article.$.article_content':req.body.article_content
        }
    },({new:true}),(err,data)=>{
        if(err){
            console.log(err);
        }
    })
})


router.post('/likes',bodyparserurl,(req,res)=>{
    User.findOne({email:req.body.email})
    .then((userdata)=>{
        const article=userdata.article.filter(i=>i._id==req.body.id);
        const likedusers=article[0].liked_by.filter(i=>i.email==req.session.email);
        const removelikedusers=article[0].liked_by.filter(i=>i.email!=req.session.email);
        likedusers.push({name:userdata.username,email:req.session.email})
        article[0].liked_by.push({email:req.session.email})
        if(likedusers.length==1){
            User.findOneAndUpdate({email:req.body.email,
                'article._id':req.body.id
            },{
                $set:{
                    'article.$.article_likes':parseInt(article[0].article_likes)+1,
                    'article.$.liked_by':article[0].liked_by,
                }
            },(err,data)=>{
                if(err){
                    console.log(err);
                }
            })
        }
        else{
            User.findOneAndUpdate({email:req.body.email,
                'article._id':req.body.id
            },{
                $set:{
                    'article.$.liked_by':removelikedusers,
                    'article.$.article_likes':(parseInt(article[0].article_likes)-1)<0 ? 0:parseInt(article[0].article_likes)-1,
                }
            },(err,data)=>{
                if(err){
                    console.log(err);
                }
            })
        }
    })
    
    .catch((err)=>console.log(err));
    
})
module.exports=router;