//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require('lodash')
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
mongoose.connect(
'mongodb+srv://admin-infinity:dxyu44@cluster0.ekquc.mongodb.net/postDB'
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema ={
  title:String,
  body:String,
  val:String
}

const Post = mongoose.model('Post',postSchema)

app.get('/',function(req,res){
  Post.find({},function(err,result){
    if(err){
      console.log(err)
  }else{
    res.render("home",{homeContent:homeStartingContent,post:result})
  }
  })
 
  
})

app.get('/about',function(req,res){
  res.render("about",{about:homeStartingContent})
})
app.get('/contact',function(req,res){
  res.render("contact",{contact:homeStartingContent})
})
app.get('/compose',function(req,res){
  res.render("compose")
})


app.get('/posts/:topic',function(req,res){
 var requestT=_.lowerCase(req.params.topic)
//  let totle=_.lowerCase(post.title)
 Post.findOne({val:requestT},function(err,post){
   if(err){
    res.redirect('/404')
  }else{
     res.render('post',{toto:post.title,totoContent:post.body})
       } 
  });
    
 })
 
app.post('/compose',function(req,res){
  var ptitle=req.body.title
  var pbody=req.body.post
  let post = new Post({
    title:ptitle,
    body:pbody,
    val:_.lowerCase(ptitle)
  })
  post.save()
  res.redirect('/')
})









app.use(function(req, res, next){
  res.status(404).render('error');
});

app.listen(process.env.PORT||3000);
