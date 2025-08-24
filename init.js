// ek sath bahut saari chatss likhe ke liye for performing functions
const mongoose = require("mongoose");
const Chat = require("./models/chats.js");

main()
.then(()=>{
   console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/whatsapp');
}

let allChats = [
    {
    from : "krishna",
    to : "arjun",
    msg : "kaise ho parth",
    created_at : new Date()
    },
    {
    from : "bheem",
    to : "indumati",
    msg : "you are beautiful",
    created_at : new Date()
    },
    {
    from : "diksha",
    to : "pulkit",
    msg : "bhaad m jaa",
    created_at : new Date()
    },
    {
    from : "mummy",
    to : "papa",
    msg : "main itni sundar hu m kya kru",
    created_at : new Date()
    }
]

Chat.insertMany(allChats);

// Chat.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

