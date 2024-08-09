

const express = require('express')

const app=express();
const path=require('path');

const userModel=require('./models/user');
const { name } = require('ejs');

app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.render("index");
})



app.get('/read', async (req, res) => {
    try {
        let allUsers = await userModel.find();
        res.render("read", { users: allUsers });
        console.log("kaam ho gaya");
        
    } catch (err) {
        res.status(500).send({ error: "Database query failed" });
    }
});

app.get('/edit/:userid', async (req, res) => {
    try {
       let user=await userModel.findOne({_id: req.params.userid})
       res.render("edit",{user});
    } catch (err) {
        res.status(500).send({ error: "Database query failed" });
    }
});

app.post('/update/:userid', async (req, res) => {
    try {
        let { name, email, image, description } = req.body;
        let user = await userModel.findOneAndUpdate(
            { _id: req.params.userid },
            { image, name, email, description },
            { new: true }
        );
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.redirect("/read");
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).send({ error: "Database query failed" });
    }
});



app.post('/create', async (req, res) => {
    try {
        let { name, email, image, description } = req.body;
        let createdUser = await userModel.create({
            name,
            email,
            image,
            description
        });
        res.send(createdUser);
    } catch (err) {
        res.status(500).send({ error: "Database insertion failed" });
    }
});

app.get('/delect/:id',async(req,res)=>{
    let users=await userModel.findOneAndDelete({_id:req.params.id})
    res.redirect("/read");
})
console.log('Server running on http://localhost:3000');
console.log('hello');


app.listen(3000);