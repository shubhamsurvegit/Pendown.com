const express=require('express');
const mongoose=require('mongoose');
const session = require('express-session');
const app=express();

app.set('view engine','ejs');

app.use('/styles',express.static('styles'))
app.use(session({secret: "Shh, its a secret!",resave:false}));

// const url="mongodb://localhost:27017/article/";
// const a= 'test24567'https://github.com/shubhamsurvegit/Pendown.com

mongoose.connect(url,{useNewUrlParser:true})
.then(()=>console.log("mongo db connected"))
.catch((err)=>console.log(err));

app.use('/',require('./routes/authenticate'))
app.use('/',require('./routes/article'))


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log("Server Running..."));