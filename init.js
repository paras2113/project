const mongoose=require("mongoose");
const Chat=require("./models/chats.js");

const generatedData = [
    { 
      from: "Alice", 
      to: "Bob", 
      time: new Date(), 
      msg: "Hello, how are you?" 
    },
    { 
      from: "Charlie", 
      to: "David", 
      time: new Date(), 
      msg: "Let's meet tomorrow." 
    },
    { 
      from: "Eve", 
      to: "Frank", 
      time: new Date(), 
      msg: "Don't forget our meeting." 
    },
    { 
      from: "Grace", 
      to: "Hank", 
      time: new Date(), 
      msg: "See you at the event!" 
    },
    { 
      from: "Ivy", 
      to: "Jack", 
      time: new Date(), 
      msg: "Can you call me back?" 
    }
];
  
Chat.insertMany(generatedData);