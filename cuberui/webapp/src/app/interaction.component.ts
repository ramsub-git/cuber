/**
 * Created by ramsub on 5/2/17.
 */
import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RealTime} from "./shared/sdk/services";
import {FireLoopRef} from "./shared/sdk/models/FireLoopRef";

import {Interaction} from "./shared/sdk/models";
import {Observable} from "rxjs";


@Component({
  selector: 'all-interactions',
  templateUrl: './interaction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InteractionComponent {
  public InterRef: FireLoopRef<Interaction>;
  private interarray: Array<Interaction> = new Array<Interaction>();
  public inters: Observable<Array<Interaction>>;

  constructor(private rt: RealTime) {

    this.inters = Observable.create(this.interarray);

    this.rt.onReady().subscribe(() => {
      this.InterRef = this.rt.FireLoop.ref<Interaction>(Interaction);

      // this.inters = this.InterRef.on('changes',{});

      this.rt.IO.on('HumanSaid').subscribe((message: Observable<any>) => {
        console.log('entering inside InterAction Component HumanSaid', message);

        // this.inters.merge(message);


        var subscription = this.inters.forEach(x => console.log('outputting inter : ', x));


        console.log('leaving inside InterAction Component HumanSaid', message);
      });
    });
  }
}
