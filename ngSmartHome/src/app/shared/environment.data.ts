import { InMemoryDbService } from 'angular-in-memory-web-api';

import { INuPnPResponse } from './environment.model';

export class EnvironmentData implements InMemoryDbService {

    createDb() {
        //let sensors: ISensor[] = [
        let sensors: INuPnPResponse[] = [{"id":"001788fffe7168c6","internalipaddress":"192.168.178.56"}];
        
        return  {sensors} ;
    }
}
