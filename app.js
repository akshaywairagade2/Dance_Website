const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
// const bodyparser=require('body-parser')
var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser:true});
const port=8080;

//Define Mongoose Schemas
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    describe: String,
  });
  const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS RELATED STUFF
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//PUG RELATED STUFF
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

//ENDPOINTS
app.get('/',(req,res)=>{
    params={}
    res.status(200).render('home.pug',params);
});
app.get('/contact',(req,res)=>{
    params={}
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been send to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved in the database")
    })

    // res.status(200).render('contact.pug');
});

app.get('/about',(req,res)=>{
    params={}
    res.status(200).render('about.pug',params);
});

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The server started at port ${port}`);
});