'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async findAll() {
    const res = await this.ctx.model.User.find();
    return res;
  };
  async login(data) {
    const res = await this.ctx.model.User.findOne({
      username: data.username,
      password: data.password
    });
    return res;
  };
  async findOne(id) {
    const res = await this.ctx.model.User.findOne({ _id: id });
    return res;
  };
  async create(data) {
    const res = await this.ctx.model.User.create({
      username: data.username,
      password: data.password
    });
    return res;
  };
}

module.exports = UserService;
