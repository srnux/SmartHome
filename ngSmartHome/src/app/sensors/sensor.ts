/* Defines the sensor entity */
export interface ISensor {
    id: number;
    sensorName: string;
    sensorCode: string;
    tags?: string[];
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
    state: State,
    swupdate: Swupdate,
    config: Config,
    name: string;
    type: string;
    modelid: string;
    manufacturername: string,
    swversion: string,
    uniqueid: string
}

export interface State {
    temperature: number;
    lastupdated: Date;
}

export interface Swupdate {
    state: string;
    lastinstall?: any;
}

export interface Config {
    on: boolean;
    battery: number;
    reachable: boolean;
    alert: string;
    ledindication: boolean;
    usertest: boolean;
    pending: any[];
}
