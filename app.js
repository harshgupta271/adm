const cors=require("cors");
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const nodemailer = require('nodemailer');
const path=require("path");

const port =process.env.PORT||5000;
const corsOptions = {
    origin: true, 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,get,head,put,patch,post,delete',
  credentials: true,
}
const app=express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://officialadmsociety:Adm%40july2017@adm.5lzswmv.mongodb.net/?retryWrites=true&w=majority");
function generateRegistrationNumber() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const registrationLength = 6;
    let registrationNumber = '';
    for (let i = 0; i < registrationLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      registrationNumber += characters[randomIndex];
    }
    return registrationNumber;
  }
const formSchema = new mongoose.Schema({
    yourName:String,
    schoolCollege:String,
    city:String,
    state:String,
    email:String,
    registrationNumber:String
});  
const Form =new mongoose.model('forms',formSchema);
app.post('/submit', async(req,res)=>{
    try {
        console.log(req.body);
        const registrationNumber=generateRegistrationNumber();
        let form = new Form({...req.body,registrationNumber});
        let result = await form.save();
        const { email,yourName } = req.body; // Extract the email from req.body
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'official.admsociety@gmail.com',
              pass: 'tghk eaeg gvpn hgjz'
            }
          });
          
          var mailOptions = {
            from: 'official.admsociety@gmail.com',
            to: email,
            replyTo: 'noreply@admsociety.org', // Set a non-existent email address as the reply-to address
            subject: 'Event Registration Successful',
            text: `Dear ${yourName},

            Greetings from ADM Educational and Welfare Society.
            We are delighted to inform you that your registration on our website has been successfully completed. Welcome to ADM Education and Welfare Society! We appreciate your interest and trust in our platform.
            
            you registration number is:${registrationNumber}
            
            If you have any questions, concerns, or need assistance, please do not reply this mail. Reach out to us at info@admsociety.org . We are here to assist you.We look forward to your active participation and hope that you find our platform valuable and enjoyable.

            Best regards,
            
            ADM Education and Welfare Society`,
          };
          
          transporter.sendMail(mailOptions, function(error, data){
            if (error) {
              console.log(error);
            } else {
              res.status(200).send("successful sent email");
            }
          });
          res.status(200).json({ success: true, message: 'Registration successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port,()=>{
    console.log(`server start at the port of ${port}`);
});