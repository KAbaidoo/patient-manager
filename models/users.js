const mongoose = require('mongoose');

const admin = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password : {
         type: String,
         required: true}
         
});

// const Users = mongoose.model('User', admin);

// module.exports = Users;
module.exports =  mongoose.model('Users', admin);