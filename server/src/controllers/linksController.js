const Link = require('../models/Link');
const bcrypt = require('bcrypt')
const shortid = require('shortid');
const { validationResult } = require('express-validator');

const newLink = async (req,res, next) => {

  const errores = validationResult(req);
  if(!errores.isEmpty()) return res.status(400).json({errores: errores.array()});

  const link = new Link();
  link.url = shortid.generate();
  linkn.name = req.body.name;
  link.original_name = req.body.originla_name;

  if(req.user) {
    if(req.body.uploads){
      link.uploads = req.body.uploads;
    }
    if(req.body.password){
      const salt = await bcrypt.genSalt(10);
      link.password = await bcrypt.hash(password, salt);
    }

    link.author = req.user.id
  }

  try {
    await link.save();
    return res.json({msg: `${link.url}`});
    next();
  } catch (error) {
    console.log(error.message);
  }

}

const allLinks = async (req, res, next) => {
  try{
    const links = await Link.find({}).select('url -_id');
    res.json({links: links})
  }catch(error){
    console.log(error.message);
  }
}

const hasPassword = async (req, res, next) => {
  const link = await Link.findOne({url: req.params.url});
  
  if(!link){
    res.status(404).json({msg: 'Link does not exist'});
    return next();
  }

  if(link.password){
    return res.json({ password: true, link: link.url });
  }

  next();
}

const checkPassword = async (req, res, next) => {
  const link = await Link.findOne({url: req.params.url});

  if(bcrypt.compareSync(req.body.password, link.password)){
    next();
  }else{
    return res.status(401).json({msg: 'Incorrect password '})
  }
}

const getLink = async (req, res, next) => {
  const link = await Link.findOne({url: req.params.utl});

  if(!link){
    res.status(404).json({msg: 'Link does not exist'});
    return next();
  }

  res.json({file: link.name, password: false});

  next();
}

module.exports = {
  allLinks,
  hasPassword,
  getLink,
  newLink,
  checkPassword 
}