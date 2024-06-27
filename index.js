const express = require("express");
const app= express()
const port=  8080;
const path = require("path")
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')


app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts  =[
    {    
        id: uuidv4(),
        username : "Abhishek",
        content : "I love coding",
    },
    {
        id: uuidv4(),
        username : "Abhi",
        content : "Hard work is required to get success",
    },
    {
        id: uuidv4(),
        username : "Rahul",
        content : "I got seleclted for my first internship",
    }
]

app.get("/post",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/post/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/post",(req,res)=>{
  let {username,content}= req.body
  let id  = uuidv4();
  posts.push({id,username,content})
  res.redirect("/post")
//   res.send("post request is working")
})

app.get("/post/:id",(req,res)=>{
  let { id}= req.params;
  let post = posts.find((p)=> id===p.id);
  res.render("show.ejs",{post})
})
app.patch("/post/:id",(req,res)=>{
    let { id}= req.params;
    let newContent= req.body.content;
    let post = posts.find((p)=> id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/post");
})
app.get("/post/:id/edit",(req,res)=>{
    let { id}= req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post})
})
app.delete("/post/:id",(req,res)=>{
    let { id}= req.params;
    posts = posts.filter((p)=> id !==p.id);
    res.redirect("/post");


})
app.get("/",(req,res)=>{
    res.send("Hii Welcome to Qura");
})

app.listen(port,()=>{
    console.log(`Listening to port : ${port}`);
})