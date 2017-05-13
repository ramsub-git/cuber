/* tslint:disable */

declare var Object: any;
export interface InteractionInterface {
  "source": string;
  "text": string;
  "image": string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Interaction implements InteractionInterface {
  "source": string;
  "text": string;
  "image": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: InteractionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Interaction`.
   */
  public static getModelName() {
    return "Interaction";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Interaction for dynamic purposes.
  **/
  public static factory(data: InteractionInterface): Interaction{
    return new Interaction(data);
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
      name: 'Interaction',
      plural: 'Interactions',
      properties: {
        "source": {
          name: 'source',
          type: 'string'
        },
        "text": {
          name: 'text',
          type: 'string'
        },
        "image": {
          name: 'image',
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
