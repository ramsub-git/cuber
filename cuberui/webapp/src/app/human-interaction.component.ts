import {ChangeDetectionStrategy, Component} from "@angular/core";

import {RealTime} from "./shared/sdk/services";
import {FireLoopRef, HumanInteraction} from "./shared/sdk/models";

import { Cookie } from 'ng2-cookies';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'human-interaction',
  templateUrl: './human-interaction.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HumanInteractionComponent {
  private humanInter : HumanInteraction = new HumanInteraction();
  private humanInterRef : FireLoopRef<HumanInteraction>;
  private clientID : string;


  constructor(private rt:RealTime){

    this.rt.onReady().subscribe(() => {
      this.humanInterRef = this.rt.FireLoop.ref<HumanInteraction>(HumanInteraction);
      // I should not have this here, it is causing the start to get called twice, 
	  this.onSessionStart();
    });
  }

  humanSaid(): void {

    console.log('HumanInteractionComponent : ', this.humanInter.text);

    this.humanInterRef.remote('humanSaid', [this.humanInter.text, this.clientID]);

    this.humanInter.text = "";
  }

  onSessionStart() : void {
  	// I am using this as a trigger for a new client access
  	
  	console.log('Inside HumanWalksIn');
  	if( !Cookie.check( 'clientID__UUID' )) {
  		this.clientID = UUID.UUID();
  		Cookie.set( 'clientID__UUID', this.clientID );
  	} 
  	
  	this.clientID = Cookie.get('clientID__UUID' );
  	
  	console.log('human-interaction.component - clientID', this.clientID );
  	// This is a business event, so we should use to create the environment 
  	// as well as setup the infrastructure
  	
    this.humanInterRef.remote('onSessionStart', [this.clientID]);
  }
}
