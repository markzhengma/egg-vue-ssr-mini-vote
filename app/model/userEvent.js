'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserEventSchema = new Schema({
    option_id: {
      type: String,
      default: '',
    },
    uid: {
      type: String,
      default: '',
    }
  });

  return mongoose.model('UserEvent', UserEventSchema);
};
