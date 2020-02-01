'use strict';

const Service = require('egg').Service;

class EventService extends Service {
  async find(id){
    const event = await this.ctx.model.Event.findOne({ _id: id });
    const options = await this.ctx.model.Option.find({ event_id: id });
    return { event, options };
  };
  async findAll(){
    const res = await this.ctx.model.Event.find();
    return res;
  };
  async create(event, optionList){
    const newEvent = await this.ctx.model.Event.create({
      title: event.title,
      info: event.info,
      open_status: true,
      userid: event.userid,
    });
    if(!newEvent) {
      return null;
    } else {
      const eventId = newEvent._id;
      optionList.forEach(option => {
        this.ctx.model.Option.create({
          event_id: eventId,
          detail: option
        })
      });
      return newEvent;
    }
  };

  async findByIdAndUpdate(id, data){
    const res = await this.ctx.model.Event.findByIdAndUpdate(id, data);
    return res;
  }
}

module.exports = EventService;
