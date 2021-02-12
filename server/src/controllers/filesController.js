const multer = require('multer');
const shortId = require('shortid');
const fs = require('fs');
const Link = require('../models/Link');
const path = require('path');

const uploadFile = async (req, res, next) => {
  
  const multerConfig = {
    limits: {fileSize: req.user ? 1024 * 1024 *10 : 1024 * 1024},
    storage: fileStorage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, __dirname + '/../uploads'),
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, `${shortId.generate()}${extension}`);
      }
    })
  }

  const upload = multer(multerConfig).single('file');

  upload(req, res, async (error) => {
    console.log(req.file);
    !error 
      ? res.json({file: req.file.filename})
      : next()
  });

}

const deleteFile = async (req, res) => {
  try {
    fs.unlinkSync(path.resolve(__dirname, `../uploads/${req.file}` ));
    console.log('File deleted');
  } catch (error) {
    console.log(error.message)
  }
}

const download = async (req, res, next) => {
  const link = await Link.findOne({name: req.params.file});
  console.log(link.id)
  
  const fileDownload = path.resolve(__dirname, `../uploads/${req.params.file}`);
  res.download(fileDownload);

  if(!link){
    console.log("Se acabo :(");
  }

  if(link.uploads === 1){
    req.file = link.name;
    await Link.findOneAndRemove({_id: link.id});
  }else{
    link.uploads--;
    await link.save();
  }
  next();
}

module.exports = {uploadFile, download, deleteFile}