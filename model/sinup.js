const mongoose = require ('mongoose');

const signupSchma = mongoose.Schema ({

    username :{
        type : String ,
        required: true 
    },
    email:{
        type:String ,
        required:true 
    },
    password:{
        type:String,
        required:true
     }

});

const signup = mongoose.model ('signup', signupSchma);

module.exports= signup;