
const signup =require("../model/sinup")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

module.exports.usersignup= async(req,res)=>{
    try {
        const checkemail = await signup.find({ email: req.body.email }).countDocuments();
        if (checkemail==0) {
           if (req.body.password == req.body.confirmpassword) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            let signupuser = await signup.create(req.body);
                 if (signupuser) {
                    res.status(201).json({ message: "User created successfully" });
                    } else {
                        res.status(200).json({ message: "Failed to create user" });
                        }
           }
          else{
            return res.status(200).json({ message: "Password and Confirm Password are not same" });
          }

        }
        else {
            return res.status(400).json({ message: "Email already exists" });
            }
    }
    catch (err) {
        return res.status(400).json({message: "server error",error:err})
    }
}

module.exports.usersignin = async(req,res)=>{
 try {
     let signinuser = await signup.findOne({ email: req.body.email });
     console.log(signinuser);
     
     if (signinuser) {
        let comparepassword = await bcrypt.compare(req.body.password, signinuser.password);
        console.log(comparepassword);
        
        if (comparepassword) {
          let token = jwt.sign({userdata:signinuser},"rnw");
          res.status(200).json({ message: "User signin successfully", token: token });
     }
     else{
        return res.status(200).json({ message: "Invalid email or password" });
     }
 }
}
  catch (err) {
    return res.status(400).json({message: "server error",error:err})
  }
}