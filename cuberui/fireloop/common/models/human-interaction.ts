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
      accepts: [{arg: 'text', type: 'string'},{arg:'clientID', type:'string'}],
      return: {arg: 'text', type: 'string'},
      http: {path: '/humansaid', verb: 'post'}
    },
    onSessionStart: {
      accepts: {arg: 'clientID', type: 'string'},
      return: {arg: 'text', type: 'string'},
      http: {path: '/onStart', verb: 'post'}
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


  humanSaid(message: string, clientID : string): string {
    console.log('Human Interaction: inside remote humanSaid', message);

    var lInter = new app.models.Interaction();
	var lClientID = '';

    lInter.source = "Human";
    
    if(typeof message === 'string') {
    	lInter.text = message.trim();
	}
	else {
		// lInter.text = message[0].trim();
		// lClientID = message[1].trim();
	}
	
	lClientID = clientID;
	
	console.log('inside humanSaid ', lClientID);
	
    this.model.app.mx.IO.emit('HumanSaid'+lClientID, lInter, true);

    console.log('after emitting machine said');

    return lInter.text;
  }


  onSessionStart(clientID: string | string[]): string {
    console.log('Human Interaction: inside onSessionStart', clientID);
    
    console.log('Human Interaction: exiting onSessionStart');

    return "";
  }
}

module.exports = HumanInteraction;
