const user = require("../model/usermodel")
const path = require("path")
const fs = require("fs");
const { error } = require("console");

module.exports.home= async (req,res) => {
   return res.render("index");
}
module.exports.insertuser = async (req, res) => {
   try {

      // console.log("home is loading")
      const userdata = await user.find();
      if (userdata) {
         return res.status(200).json({ message: "home page data", data: userdata })
      }
      else {
         return res.status(404).json({ message: "no data found" })
      }
   }
   catch (err) {
      return res.status(500).json({ message: "server error" })
   }
}
module.exports.adddata = async (req, res) => {
   try {
      console.log(req.body);
      console.log(req.file);

      var image = ""
      if (req.file) {
         image = user.imgPath + "/" + req.file.filename;
      }
      req.body.userimage = image;

      let userdata = await user.create(req.body);
      //   console.log(userdata);


      if (userdata) {
         return res.status(201).json({ message: "user created successfully" })
      }
      else {
         return res.status(400).json({ message: "user not created" })
      }
   }
   catch (err) {
      return res.status(400).json({ message: "server error", error: err })
   }
}

module.exports.deletedata = async (req, res) => {
   try {
      //  const id = req.params.id;
      const deletedata = await user.findById(req.params.id);
      if (deletedata) {
         try {
            var findImage = path.join(__dirname, "..", deletedata.userimage);
            await fs.unlinkSync(findImage);
         }
         catch (err) {
            console.log(" error in deleting data");
         }
         const userdata = await user.findByIdAndDelete(req.params.id);
         if (userdata) {
            return res.status(200).json({ message: "user deleted successfully" })
         }
         else {
            return res.status(404).json({ message: "user not found" })
         }
      }
      else {
         return res.status(404).json({ message: "user not found" })
      }


   }
   catch (err) {
      return res.status(400).json({ message: "server error", error: err })
   }
}

module.exports.getdatauser = async (req, res) => {
   try {
      console.log(req.query.dataId)
      const userdata = await user.findById(req.query.dataId);
      if (userdata) {
         return res.status(200).json({ data: userdata })
      }
      else {
         return res.status(404).json({ message: "user not found" })
      }
   }
   catch (err) {
      return res.status(400).json({ message: "server error", error: err })
   }
}
module.exports.update = async (req, res) => {
   try {
      // console.log(req.body);

      let checkdata = await user.findById(req.params.id)
      // console.log(checkdata)
      // console.log(req.body)
      if (checkdata) {
         if (req.file) {
            try {
               var findImage = path.join(__dirname, "..", checkdata.userimage);
               await fs.unlinkSync(findImage);
            }
            catch (err) {
               console.log("error in deleting image",error);
            }
            req.body.userimage = user.imgPath + "/" + req.file.filename;

         }
         else {
            req.body.userimage = checkdata.userimage;
         }
         const userdata = await user.findByIdAndUpdate(checkdata._id, req.body);
         if (userdata) {
            const updateddata = await user.findById(checkdata._id);
            return res.status(200).json({ message: "user updated successfully", data: updateddata })
         }
         else {
            return res.status(404).json({ message: "user not update" })
         }
      }
      else {
         return res.status(404).json({ message: "user not found" })
      }
   }
   catch (err) {
      return res.status(400).json({ message: "server error", error: err })
   }
}

