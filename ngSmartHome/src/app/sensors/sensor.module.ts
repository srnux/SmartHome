import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SensorListComponent } from './sensor-list.component';
import { SensorDetailComponent } from './sensor-detail.component';
import { SensorDetailGuard, SensorEditGuard } from './sensor-guard.service';
import { SensorEditComponent } from './sensor-edit.component';

import { SensorFilterPipe } from './sensor-filter.pipe';
import { SensorService } from './sensor.service';

import { SharedModule } from '../shared/shared.module';

import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    //InMemoryWebApiModule.forRoot(SensorData),
    RouterModule.forChild([
      { path: 'sensors', component: SensorListComponent },
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
    SensorDetailComponent,
    SensorEditComponent,
    SensorFilterPipe
  ],
  providers: [
    SensorService,
    SensorDetailGuard,
    SensorEditGuard
  ]
})
export class SensorModule {}
