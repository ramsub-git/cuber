/**
 * Created by ramsub on 5/2/17.
 */
import {ChangeDetectionStrategy, Component, Injectable, Input} from "@angular/core";
import {RealTime} from "./shared/sdk/services";
import {FireLoopRef} from "./shared/sdk/models/FireLoopRef";

import {Interaction} from "./shared/sdk/models";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {AsyncSubject} from "rxjs/AsyncSubject";


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

  constructor(private rt: RealTime) {
    this.interarray.push(new Interaction( {"source":"AI","text":"Hello there...","image":""} ));  
	this.inters = Observable.of( this.interarray );	

    this.rt.onReady().subscribe(() => {
      this.InterRef = this.rt.FireLoop.ref<Interaction>(Interaction);
    });

	  this.rt.IO.on('HumanSaid').subscribe((message: string) => {
	    console.log('entering inside InterAction Component HumanSaid', message);
	    var linter : Interaction = JSON.parse(message);
		this.interarray.push(linter);
	    console.log('leaving inside InterAction Component HumanSaid', message);
	  });

  }
}
