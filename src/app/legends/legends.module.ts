import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LegendsRoutingModule } from './legends-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LegendsComponent } from './legends.component';
import { LegendsIndexComponent } from './legends-index/legends-index.component';
import { LegendsEditComponent } from './legends-edit/legends-edit.component';
import { LegendsShowComponent } from './legends-show/legends-show.component';

@NgModule({

  declarations: [
    LegendsComponent, 
    LegendsIndexComponent, 
    LegendsEditComponent, 
    LegendsShowComponent
  ],
  imports: [
    LegendsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})

export class LegendsModule {}