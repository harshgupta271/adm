const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path=require("path");

mongoose.connect('mongodb+srv://officialadmsociety:Adm%40july2017@adm.5lzswmv.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const app = express();
const port = 5000;
app.use(cors()); // Enable CORS for all routes


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,"./public/styles.css")));
app.use(express.static(path.join(__dirname,"./index.js")));
const formSchema = new mongoose.Schema({
    email: String,
    registration: String
});

const Form = new mongoose.model('forms', formSchema);

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const registration = req.body.registrationNo;

        try {
            const user = await Form.findOne({ email: email, registrationNumber: registration });

            console.log('Email:', email);
            console.log('Registration:', registration);
            console.log('User found:', user);

            if (user) {
                console.log('Success');
                res.status(200).json({ success: true, message: 'Login successful.' });
            } else {
                console.log('Invalid Registration');
            res.status(401).json({ success: false, message: 'Invalid registration.' });
            }
        } catch (err) {
            console.error('Error finding user:', err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});