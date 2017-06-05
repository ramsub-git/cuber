import {Model} from "@mean-expert/model";

import {ArgusApi} from '../../server/cuberai/api';

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
	this.model.app.mx.PubSub.publish({"method":'test', "endpoint":'http://localhost:9500', "data": 'Hello World2'}, (() => {console.log('inside next of pubsub');}));

    console.log('after emitting machine said');

    return lInter.text;
  }


  onSessionStart(clientID: string | string[]): string {
    console.log('Human Interaction: inside onSessionStart', clientID);
    
    
    // Now, lets try to create an Argus Channel
    let channels : string = '{"text":["human"],"event":["chat"]}';
    let cuberAPI : ArgusApi = new ArgusApi('http://localhost:9500/api');
    cuberAPI.argusCreateChannel(<string>channels,<string>clientID);
    
    console.log('Human Interaction: exiting onSessionStart');

    return "";
  }
}

module.exports = HumanInteraction;
