const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const authUser = async (req, res, next ) => {
  
  const errors = validationResult(req);

  if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

  const user = await User.findOne({email: req.body.email});

  if(!user) {
    res.status(401).json({msg : 'Username does not exist '});
    return next();
  }

  if(bcrypt.compareSync(req.body.password, user.password )) {

    const token = jwt.sign(
      {
      id: user._id,
      name: user.name,
      email: user.email
      }, 
      'secret-word', 
      { expiresIn: '8h'}  
    );
    res.json({ token })

  } else {
    res.status(401).json({msg: "Incorrect password"});
    return next();
  }
}

const userAuthenticated = (req, res, next) => {
  res.status(200).json({user: req.user});
  console.log(req.user)
}

module.exports = { userAuthenticated, authUser };