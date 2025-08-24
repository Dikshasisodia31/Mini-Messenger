const express = require("express");
const path = require("path");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

main()
.then(()=>{
   console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/whatsapp');
}

app.get("/",(req,res)=>{
    res.send("server is working");
})

// index route
app.get("/chats", async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("chats.ejs",{chats});
})

// the new data
app.post("/chats",  (req,res)=>{ // request m jo data aayga use parse bhi krna pdega
    let {from,to,msg} = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date(),
    })
    newChat.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })

    res.redirect("/chats");
})

// new route
app.get("/chats/new",(req,res)=>{
    res.render("newChats.ejs");
})

// edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id); // if not using then function , then make it await
    res.render("edit.ejs",{chat});
})

//update route
app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let {msg} = req.body;
    let updateChat = await Chat.findByIdAndUpdate(id,{msg : msg});
    console.log(updateChat);
    res.redirect("/chats");
})

//destroy route
app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats");
})

app.listen(port,(req,res)=>{
    console.log("app is listening on port");
})