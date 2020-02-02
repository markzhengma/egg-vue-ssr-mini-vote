'use strict';

const Controller = require('egg').Controller;

class EventController extends Controller {
  async find(){
    const { id } = this.ctx.params;
    const res = await this.ctx.service.event.find(id);
    if(!res) {
      this.ctx.body = { code: 400, data: 'not found!' };
    } else {
      this.ctx.body = { code: 200, data: res };
    }
  };
  async findAll(){
    const res = await this.ctx.service.event.findAll();
    if(!res) {
      this.ctx.body = { code: 400, data: 'not found!' };
    } else {
      this.ctx.body = { code: 200, data: res };
    }
  };
  async create(){
    const { title, info, userid, options } = this.ctx.request.body;
    const res = await this.ctx.service.event.create({ title, info, userid }, options);
    if(!res) {
      this.ctx.body = { code: 500, data: 'internal server error' };
    } else {
      this.ctx.body = { code: 200, data: res };
    }
  };
  async updateOpenStatus(){
    const { id } = this.ctx.params;
    const { open_status } = this.ctx.request.body;

    const res = await this.ctx.service.event.findByIdAndUpdate(id, { open_status });
    if(!res) {
      this.ctx.body = { code: 500, data: 'internal server error' };
    } else {
      this.ctx.body = { code: 200, data: res };
    }
  };
  async deleteOne(){
    const { id } = this.ctx.params;

    const res = await this.ctx.service.event.delete(id);
    if(!res) {
      this.ctx.body = { code: 500, data: 'internal server error' };
    } else {
      this.ctx.body = { code: 200, data: res };
    }
  };
  async createUserOption(){
    const { option_id, userid } = this.ctx.request.body;

    const res = await this.ctx.service.event.createUserOption(option_id, userid);
    if(!res) {
      this.ctx.body = { code: 500, data: 'internal server error' };
    } else {
      this.ctx.body = { code: 200, data: res };
    }
  };
  async deleteUserOption(){
    const { option_id, userid } = this.ctx.request.query;

    const res = await this.ctx.service.event.deleteUserOption(option_id, userid);
    if(!res) {
      this.ctx.body = { code: 500, data: 'internal server error' };
    } else {
      this.ctx.body = { code: 200, data: res };
    }
  };
}

module.exports = EventController;
