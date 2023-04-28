const express = require('express');
const mongoose = require('mongoose');
const Mydata = require('./model');
const cors = require('cors')
const app = express();
require('dotenv').config()

mongoose.connect('mongodb+srv://Naganna:Naganna890@cluster0.qhaksm0.mongodb.net/test?retryWrites=true&w=majority').then(
    () => console.log('DB connected!.....')
);

app.use(express.json()); // Parse JSON data in request body

app.use(cors({
    origin:'*'
}))

app.post('/addData', async (req, resp) => {
    const { email_Id } = req.body;
    const { name } = req.body;
    const { password } = req.body;
    const { confirmpassword } = req.body;
    try {
        const Mydata1 = new Mydata({
            email_Id: email_Id,
            name:name,
            password: password,
            confirmpassword:confirmpassword
        });
        await Mydata1.save();
        const mydata2 = await Mydata.find();
        return resp.json(mydata2);
    } catch (err) {
        console.log(err);
        return resp.status(500).send('Internal Server Error');
    }
});

app.get('/getData', async (req, resp) => {
    try {
        return resp.json(await Mydata.find())
    } catch (err) {
        console.log(err)
    }
})

app.delete('/delete/:id', async (req, resp) => {
    try {
        await Mydata.findByIdAndDelete(req.params.id)
        return resp.json(await Mydata.find())
    } catch (err) {
        console.log(err)
    }
})
app.post('/register',async(req,resp)=>{
    try {
        const{email_Id}=req.body;
        let exist= await Mydata.findOne({email_Id})
        if(!exist){
            return resp.status(400).send('user Already exit')
        }
        
    } catch (error) {
        console.log(error)
    }
})

app.listen(5000, () => console.log("Server is running...."));
