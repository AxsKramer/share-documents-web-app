const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const linksRouter = require('./routes/linksRouter');
const filesRouter = require('./routes/filesRouter');

const connectDB = require('./config/db');

const app = express();

const port = process.env.PORT || 4000;

// const optionsCors = {
//   origin: 'http://localhost:8080'
// }

app.use(cors());

connectDB();

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'uploads')));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter );
app.use('/api/links', linksRouter );
app.use('/api/files', filesRouter);

app.listen(port, () => console.log('Server running at http://localhost:', port))