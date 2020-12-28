const mongoose=require('mongoose');
const Userschema=new mongoose.Schema({
    username:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true
    },
    password:{
        type:"String",
        required:true
    },
    article:[
        {
            article_title:String,
            article_content:String,
            article_likes:Number,
            liked_by:[
                {
                    email:String
                }
            ]
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
})

const User=mongoose.model("users",Userschema);

module.exports=User;