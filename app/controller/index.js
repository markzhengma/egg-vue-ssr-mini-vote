'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async index(){
    await this.ctx.renderClient('main.js');
  };
}

module.exports = IndexController;
