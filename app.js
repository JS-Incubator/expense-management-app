const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const {initDb, getDB} = require('./config/db');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//Initializing config file for environment variables
dotenv.config({path: './config/config.env'});

//Initalize express
const app = express();

//Initialize mongodb store to save sessions
const store = new MongoDBStore({
  uri: process.env.MONGO_URI_LOCAL,
  collection: 'sessions',
});

//Initiliaz express sessions
app.use(
  session({
    secret: 'My Expense App Session Secret Code #112$12#1455%',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

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

app.use('/', authRoutes);
app.use('/app', appRoutes);

//Initialize the express server
const PORT = process.env.PORT || 5858;
initDb((error, db) => {
  if (error) {
    console.log('Database connection faild');
    console.log(error);
  } else {
    app.listen(
      PORT,
      console.log(
        `Server started in ${process.env.NODE_ENV} mode on port ${PORT}`
      )
    );
  }
});
