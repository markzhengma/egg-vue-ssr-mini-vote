'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const EventSchema = new Schema({
    title: {
      type: String,
      default: '',
    },
    info: {
      type: String,
      default: ''
    },
    open_status: {
      type: Boolean,
      default: true,
    },
    userid: {
      type: String,
      default: '',
    }
  });

  return mongoose.model('Event', EventSchema);
};
