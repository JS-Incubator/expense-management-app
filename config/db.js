const mongoose = require('mongoose');

let _db;

module.exports = {
  initDb: (callback) => {
    if (_db) {
      console.log('Database is already initialized');
      return callback(null, _db);
    }
    mongoose
      .connect(process.env.MONGO_URI_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then((connection) => {
        _db = connection;
        callback(null, _db);
      })
      .catch((error) => {
        callback(erro);
      });
  },
  getDB: () => {
    if (_db) {
      throw Error('Data base is not yet initialized');
    }
    return _db;
  },
};
