const mongoose = require('mongoose');

const connectDB = async () => {

  const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }

  try {
    await mongoose.connect("mongodb://localhost:27017/nodeSend", connectOptions );
    console.log("DB Conectada");
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
