const {BlackListModel}=require("../models/blacklist.model")
const authMiddleware=require("../middlewares/logout.middleware")
const express=require("express")
const router=express.Router()

router.post('/logout',authMiddleware, async (req, res) => {
    try {
      const {token} = req.headers
      const blacklistedToken = new BlackListModel({ token });
      await blacklistedToken.save();
  
      res.status(200).send('Logged out successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  module.exports={router}
