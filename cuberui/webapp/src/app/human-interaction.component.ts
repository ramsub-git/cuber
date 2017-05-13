import {ChangeDetectionStrategy, Component} from "@angular/core";

import {RealTime} from "./shared/sdk/services";
import {FireLoopRef, HumanInteraction} from "./shared/sdk/models";

@Component({
  selector: 'human-interaction',
  templateUrl: './human-interaction.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HumanInteractionComponent {

  private humanInter : HumanInteraction = new HumanInteraction({ text: '' });
  private humanInterRef : FireLoopRef<HumanInteraction>;

  constructor(private rt:RealTime){

    this.rt.onReady().subscribe(() => {
      this.humanInterRef = this.rt.FireLoop.ref<HumanInteraction>(HumanInteraction);
    });


  }

  humanSaid(): void {

    console.log('HumanInteractionComponent : ', this.humanInter.text);

    this.humanInterRef.remote('humanSaid', [this.humanInter.text]);

    this.humanInter.text = "";
  }
}
