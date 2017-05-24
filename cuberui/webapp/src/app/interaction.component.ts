/**
 * Created by ramsub on 5/2/17.
 */
import {ChangeDetectionStrategy, Component, Injectable, Input} from '@angular/core';
import {RealTime} from './shared/sdk/services';
import {FireLoopRef} from './shared/sdk/models/FireLoopRef';
import {Interaction} from './shared/sdk/models';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import { Cookie } from 'ng2-cookies';
import { UUID } from 'angular2-uuid';


@Component({
  selector: 'all-interactions',
  templateUrl: './interaction.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})


@Injectable()
export class InteractionComponent {
  public InterRef: FireLoopRef<Interaction>;
  public interarray: Array<Interaction> = new Array<Interaction>();
  public inters: Observable<Interaction[]>;

  private clientID : string;

  constructor(private rt: RealTime) {
    this.interarray.push(new Interaction( {"source":"AI","text":"Hello there...","image":""} ));  
	this.inters = Observable.of( this.interarray );	

    this.rt.onReady().subscribe(() => {
      this.InterRef = this.rt.FireLoop.ref<Interaction>(Interaction);
    });
    
  	if( !Cookie.check( 'clientID__UUID' )) {
		this.clientID = UUID.UUID();
		Cookie.set( 'clientID__UUID', this.clientID );
	} 
  	
  	this.clientID = Cookie.get('clientID__UUID' );

	console.log('inside inter - ', this.clientID);    

	  this.rt.IO.on('HumanSaid'+this.clientID).subscribe((message: string) => {
	    console.log('entering inside InterAction Component HumanSaid', message);
	    var linter : Interaction = JSON.parse(message);
		this.interarray.push(linter);
	    console.log('leaving inside InterAction Component HumanSaid', message);
	  });
	}
}

