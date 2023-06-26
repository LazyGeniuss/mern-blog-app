const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Posts');
const cors = require('cors');
const app = express();
require("dotenv").config();
const corsOptions ={
    origin:process.env.REACT_URL, 
    credentials:true,            
    optionSuccessStatus:200,
}

app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,
useUnifiedTopology: true,})
.then(()=>{console.log("Successfully Connected with DB");})
.catch((err)=>{console.log(err.message)})

app.get('/post', async (req,res) => {
    res.json(
      await Post.find()
        .sort({date: -1})
    );
  });   

app.post('/post', async (req,res) => {
    const {title,summary,content,date} = req.body;
    const postDoc = await Post.create({
      title: title,
      summary: summary,
      content: content,
      date: date,
    });
    res.json(postDoc);
});   

app.get('/delete/:id', async (req,res)=>{
    const {id} = req.params;
    const postDoc = await Post.findById(id);
    await postDoc.deleteOne(postDoc);
    res.json(postDoc);
}); 

app.put('/post', async (req,res) => {
      const {id,title,summary,content,date} = req.body;
      const postDoc = await Post.findById(id);
      await postDoc.update({
        title,
        summary,
        content,
        date
      });
  
      res.json(postDoc);
});

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id)
    res.json(postDoc);
})
  
if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"client","build","index.html"));
  });
}

app.listen(process.env.API_PORT||4000);

module.exports = app;
