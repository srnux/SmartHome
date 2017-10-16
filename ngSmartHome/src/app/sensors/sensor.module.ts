import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SensorListComponent } from './sensor-list.component';
import { SensorTableComponent } from './sensor-table.component';
import { SensorDetailComponent } from './sensor-detail.component';
import { SensorDetailGuard, SensorEditGuard } from './sensor-guard.service';
import { SensorEditComponent } from './sensor-edit.component';

import { SensorFilterPipe } from './sensor-filter.pipe';
import { SensorService } from './sensor.service';

import { SharedModule } from '../shared/shared.module';

//add to shared module maybe?
import { MaterialModule } from '../shared/material.module';
import { CookieService } from '../shared/services/cookie.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    //InMemoryWebApiModule.forRoot(SensorData),
    RouterModule.forChild([
      { path: 'sensors', component: SensorListComponent },
      { path: 'sensorsTable', component: SensorTableComponent },
      { path: 'sensor/:id',
        canActivate: [ SensorDetailGuard],
        component: SensorDetailComponent
      },
      { path: 'sensorEdit/:id',
        canDeactivate: [ SensorEditGuard ],
        component: SensorEditComponent },
    ])
  ],
  declarations: [
    SensorListComponent,
    SensorTableComponent,
    SensorDetailComponent,
    SensorEditComponent,
    SensorFilterPipe
  ],
  providers: [
    SensorService,
    SensorDetailGuard,
    SensorEditGuard,
    CookieService
  ]
})
export class SensorModule {}
