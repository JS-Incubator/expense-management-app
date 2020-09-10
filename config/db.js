const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected ${connect.connection.host}`);
  } catch (error) {
    console.log('DB connection failed');
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
