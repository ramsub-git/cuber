/* tslint:disable */

declare var Object: any;
export interface ArgusInterface {
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Argus implements ArgusInterface {
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: ArgusInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Argus`.
   */
  public static getModelName() {
    return "Argus";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Argus for dynamic purposes.
  **/
  public static factory(data: ArgusInterface): Argus{
    return new Argus(data);
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
      name: 'Argus',
      plural: 'Argus',
      properties: {
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
