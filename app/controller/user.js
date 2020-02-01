'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async findAll() {
    const res = await this.ctx.service.user.findAll();
    this.ctx.body = res;
  };
  async login() {
    const { username, password } = this.ctx.request.query;
    const res = await this.ctx.service.user.login({ username, password });
    if(!res){
      this.ctx.body = { code: 400, data: 'not found' };
    } else {
      this.ctx.body = { code: 200, data: res };
    }
  };
  async findOne() {
    const { id } = this.ctx.params;
    const res = await this.ctx.service.user.findOne(id);
    if(!res){
      this.ctx.body = { code: 400, data: 'not found' };
    } else {
      this.ctx.body = { code: 200, data: { username: res.username, userid: res._id } };
    }
  };
  async create() {
    const { username, password } = this.ctx.request.body;
    const res = await this.ctx.service.user.create({ username, password });
    this.ctx.body = res;
  };
}

module.exports = UserController;
