const jwt = require('jsonwebtoken');

const authMiddleware = async(req, res, next) => {
  try {
    const {token} = req.headers;
     const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).send('Token is blacklisted');
    }
    const decodedToken = jwt.verify(token, "abrakadabra");
    const user=await UserModel.findOne({email:decodedData.email})
    if(!user){
       return res.status(401).json({msg:"Unauthorized user!"})
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;