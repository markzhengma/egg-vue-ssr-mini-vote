// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportEvent = require('../../../app/controller/event');
import ExportIndex = require('../../../app/controller/index');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    event: ExportEvent;
    index: ExportIndex;
    user: ExportUser;
  }
}
