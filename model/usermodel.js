const mongoose = require ('mongoose');
const multer = require('multer');
const path=require('path')
const imagepath="/upload"

const userSchma = mongoose.Schema ({

    username :{
        type : String ,
        required: true 
    },
    email:{
        type:String ,
        required:true 
    },
    passwrod:{
        type:String,
        required:true
     },
     gender:{
        type:String ,
        required:true
     },
     hobby:{
        type: Array ,
        required:true
     },
     city:{
        type:String ,
        required:true
     },
     userimage:{
        type:String ,
        required:true
     }

},
  {
    timestamps: true
    }
);

const storageimage=multer.diskStorage({
   destination: (req, file, cd) => {
       cd(null, path.join(__dirname, '..', imagepath)); 
   },
   
   filename:(req,file,cd)=>{
       cd(null,file.fieldname+'-'+Date.now())
   }
})

userSchma.statics.uploadImageFile=multer({storage:storageimage}).single('image');
userSchma.statics.imgPath = imagepath;

const user = mongoose.model ('user', userSchma);

module.exports= user;