'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserOptionSchema = new Schema({
    option_id: {
      type: String,
      default: '',
    },
    userid: {
      type: String,
      default: '',
    }
  });

  return mongoose.model('UserOption', UserOptionSchema);
};
