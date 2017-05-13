/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { HumanInteraction } from '../../models/HumanInteraction';
import { Interaction } from '../../models/Interaction';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    HumanInteraction: HumanInteraction,
    Interaction: Interaction,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
