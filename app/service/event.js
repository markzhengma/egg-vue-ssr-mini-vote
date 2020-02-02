'use strict';

const Service = require('egg').Service;

class EventService extends Service {
  async find(id){
    const event = await this.ctx.model.Event.findOne({ _id: id });
    const optionData = await this.ctx.model.Option.find({ event_id: id });
    const options = [];
    for(let i in optionData){
      let userIdList = await this.ctx.model.UserOption.find({ option_id: optionData[i]._id });
      let userList = [];
      for(let j in userIdList){
        let user = await this.ctx.model.User.findById(userIdList[j].userid);
        userList.push({ userid: userIdList[j].userid, username: user.username });
      };
      let prettyOption = {
        event_id: optionData[i].event_id,
        detail: optionData[i].detail,
        _id: optionData[i]._id,
        user_list: userList
      };
      options.push(prettyOption);
    }
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
  };

  async delete(id){
    const res = await this.ctx.model.Event.deleteOne({ _id: id });
    return res;
  };
  async createUserOption(option_id, userid){
    const res = await this.ctx.model.UserOption.create({ option_id, userid });
    return res;
  };
  async deleteUserOption(option_id, userid){
    const res = await this.ctx.model.UserOption.deleteOne({ option_id, userid });
    return res;
  }
}

module.exports = EventService;
