// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportEvent = require('../../../app/model/event');
import ExportOption = require('../../../app/model/option');
import ExportUser = require('../../../app/model/user');
import ExportUserEvent = require('../../../app/model/userEvent');

declare module 'egg' {
  interface IModel {
    Event: ReturnType<typeof ExportEvent>;
    Option: ReturnType<typeof ExportOption>;
    User: ReturnType<typeof ExportUser>;
    UserEvent: ReturnType<typeof ExportUserEvent>;
  }
}
