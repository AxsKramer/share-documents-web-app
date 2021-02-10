const User  = require('../models/User');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

  try {
    let user= await User.findOne({email: req.body.email});

    if(user) return res.status(400).json({msg: 'The user already exists'});

    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    res.json({msg: 'User created successfully'});
    
  } catch (error) {
    console.log(error);
  } 
}

module.exports = createUser;