const mongoose=require("mongoose");

main().then((res)=>{
    
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


const allSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        required:true,
    },
    time:{
        type: Date,
    }
});


const Chat=mongoose.model("Chat",allSchema);

module.exports=Chat;