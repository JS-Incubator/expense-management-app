const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

//Initializing config file for environment variables
dotenv.config({path: './config/config.env'});

//Initilizing and connecting to the database
connectDB();

//Initalize express
const app = express();

//JSON parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Setting up view engine and views folder
app.set('views', 'views');
app.set('view engine', 'ejs');

//Defining static folder paths
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/public/images',
  express.static(path.join(__dirname, 'public/images'))
);
app.use('/helpers/app', express.static(path.join(__dirname, 'helpers/app')));

//Initialize HTTP request logger
// **Not required and interesting to see, just comment out this block, remove morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Registering and Initializing routes
const authRoutes = require('./routes/auth');
const appRoutes = require('./routes/app');

app.use('/auth', authRoutes);
app.use('/app', appRoutes);

//Initialize the express server
const PORT = process.env.PORT || 5858;
app.listen(
  PORT,
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
