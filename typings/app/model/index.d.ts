// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportEvent = require('../../../app/model/event');
import ExportOption = require('../../../app/model/option');
import ExportUser = require('../../../app/model/user');
import ExportUserOption = require('../../../app/model/userOption');

declare module 'egg' {
  interface IModel {
    Event: ReturnType<typeof ExportEvent>;
    Option: ReturnType<typeof ExportOption>;
    User: ReturnType<typeof ExportUser>;
    UserOption: ReturnType<typeof ExportUserOption>;
  }
}
