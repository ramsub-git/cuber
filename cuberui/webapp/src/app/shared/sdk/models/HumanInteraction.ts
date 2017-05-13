/* tslint:disable */

declare var Object: any;
export interface HumanInteractionInterface {
  "text": string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class HumanInteraction implements HumanInteractionInterface {
  "text": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: HumanInteractionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `HumanInteraction`.
   */
  public static getModelName() {
    return "HumanInteraction";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of HumanInteraction for dynamic purposes.
  **/
  public static factory(data: HumanInteractionInterface): HumanInteraction{
    return new HumanInteraction(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'HumanInteraction',
      plural: 'HumanInteractions',
      properties: {
        "text": {
          name: 'text',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
