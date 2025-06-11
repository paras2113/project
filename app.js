const mongoose=require("mongoose");
const express=require("express");
const path=require("path");
const Chat=require("./models/chats.js");
const method=require("method-override");
const ExpressError = require("./utils/expressError.js");
//const WrapAsync=require('./utils/WrapAsync.js');

const app=express();

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(method("_method"));



main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.listen(8080,()=>{
    console.log("connection successfully done");
});


function asyncWrap(fun){
    return function(req,res,next){
        fun(req,res,next).catch((err)=>next(err));
    }
}

//show all chats
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
        res.render("chats.ejs",{chats});
});

app.get("/chats/new",(req,res)=>{
   res.render("new.ejs");
});

//add new chat
app.post("/chats",asyncWrap(async(req,res,next)=>{
    let {from,to,message}=req.body;
    let addChat= new Chat({
        from:from,
        to:to,
        msg:message,
        time:new Date(),
    });
    await addChat.save().then((req,res)=>{
        console.log("done");
    }).catch((err)=>{
        // res.send(err.message);
        next(err);
    });
    res.redirect("/chats");
}));


//edit route 
app.get("/chats/:id/edit",asyncWrap(async (req,res,next)=>{
    let{id}=req.params;
    let chat=await Chat.findById(id);
    if(!chat){
        next(new ExpressError(400,"NO such chat exist"));
    }
    res.render("edit.ejs",{chat});
}));

app.put("/chats/:id",async (req,res)=>{
    let{id}=req.params;
    let{msg:newMsg}=req.body;
    console.log(newMsg);
    let updated=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true , new:true});
    res.redirect("/chats");
});

app.delete("/chats/:id",async(req,res)=>{
    let{id}=req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
    console.log(deletedChat);
});

app.use((err,req,res,next)=>{
    let {status=500,message="Not found"}=err;
    res.status(status).send(message);
});