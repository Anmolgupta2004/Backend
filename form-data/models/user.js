const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/textapp1", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));
    
const userSchema=mongoose.Schema({
    image:String,
    email:String,
    name:String,
    description:String

})

module.exports =mongoose.model('user',userSchema);
