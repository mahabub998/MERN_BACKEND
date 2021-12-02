const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
var cookie = require('cookie');
require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello world i ma a auth.js");
});

//promies funcation

// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "filed i not compeilte" });
//   }
//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "email allready exist" });
//       }
//       const user = new User({ name, email, phone, work, password, cpassword });
//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user register successfully" });
//         })
//         .catch((error) =>
//           res.status(500).json({ error: "failed to registered" })
//         );
//     })
//     .catch((err) => {
//       console.log(err);
//     });

// });

// async awite

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "filed i not compeilte" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email allready exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      res.status(201).json({ message: "user register successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/singin", async (req, res) => {
  try {
    let token; 
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "plz filed the data" });
    }
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
 
    if(userLogin){
      const isMatch = await bcrypt.compare(password, userLogin.password)

    const token = await userLogin.generateAuthToken();
    console.log(token)

    res.cookie("jwtoken",token,{
      expires:new Date(Date.now() +25892000000),
      httpOnly:true
    });

      if (isMatch) {
        res.status(400).json({ error: "Invalid Credientials pass" });
      } else {
        res.json({ message: "user singing Successfully" });
      }
    }else{
      res.status(400).json({ error: "Invalid Credientials " });
    }

 
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
