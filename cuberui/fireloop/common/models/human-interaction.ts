import {Model} from "@mean-expert/model";

var app = require('../../server/server');


/**
 * @module HumanInteraction
 * @description
 * Write a useful HumanInteraction Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    myRemote: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/my-remote', verb: 'get' }
    },
    humanSaid: {
      accepts: {arg: 'text', type: 'string'},
      return: {arg: 'text', type: 'string'},
      http: {path: '/humansaid', verb: 'post'}
    }
  }
})

class HumanInteraction {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('HumanInteraction: Before Save');
    next();
  }
  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }


  humanSaid(message: string): string {
    console.log('Human Interaction: inside remote humanSaid', message);

    var lInter = new app.models.Interaction();

    lInter.source = "Human";
    lInter.text = message;

    this.model.app.mx.IO.emit('HumanSaid', lInter, false);

    console.log('after emitting machine said');

    return message;
  }
}

module.exports = HumanInteraction;
