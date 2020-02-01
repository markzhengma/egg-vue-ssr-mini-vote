// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportEvent = require('../../../app/service/event');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    event: ExportEvent;
    user: ExportUser;
  }
}
