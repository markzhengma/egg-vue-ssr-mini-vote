'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const OptionSchema = new Schema({
    event_id: {
      type: String,
      default: ''
    },
    detail: {
      type: String,
      default: ''
    }
  });

  return mongoose.model('Option', OptionSchema);
};
