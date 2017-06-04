import { Model } from '@mean-expert/model';
/**
 * @module argus
 * @description
 * Write a useful argus Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
  },
  remotes: {
    createChannel: {
      accepts: [{arg: 'channels', type: 'string'},{arg:'clientID', type:'string'}],
      return: {arg: 'channelID', type: 'string'},
      http: {path: '/createChannel', verb: 'post'}
    }
  }
})

class argus {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  createChannel(channels: string[], clientID : string): string {
    console.log('entering argus.create', channels);

    /*
     * channels - is a array of string which will indicate 
     *   - human    = interaction is with human
     *   - machine  = originating from machine  
     *   - text     = text entered by human or maybe a website
     *   - sound    = the stream is going to audio
     *   - image    = the stream is an image
     *   - video    = the stream is a video stream
     */
    
    // I wanted to use Set, but looks like Set datatype is not available in Typescript
      
      
    // The alternative would be to use a JSON
      
    /*
      {
         "text"  : ["human","machine","any"],
         "audio" : ["speech","music","any"],
         "image" : ["photo","drawing","art", "id","any"],
         "video" : ["people", "monitoring", "any"],
         "event" : ["transaction", "chat", "any"]
      }
     */
    
    
    console.log('inside cuberai before subscribe to human said - ', 'HumanSaid'+clientID)
    this.model.app.mx.IO.on('HumanSaid'+clientID, function(message: string) {
      console.log('entering inside cuber HumanSaid', message);
      console.log('leaving inside cuber HumanSaid', message);
    });
    
    
    console.log('exiting argus.create');

    return '';
  }
        
        
}

module.exports = argus;
