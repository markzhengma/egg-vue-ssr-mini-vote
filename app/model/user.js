'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
  });

  return mongoose.model('User', UserSchema);
};
