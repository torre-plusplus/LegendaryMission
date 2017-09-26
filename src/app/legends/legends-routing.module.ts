import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegendsComponent } from './legends.component';
import { LegendsIndexComponent } from './legends-index/legends-index.component';
import { LegendsShowComponent } from './legends-show/legends-show.component';
import { LegendsEditComponent } from './legends-edit/legends-edit.component';
import { AuthGuard } from '../auth/auth-guard.service';


const legendsRoutes: Routes = [
  { path: '', component: LegendsComponent, children: [
      {path: '', component: LegendsIndexComponent},
      {path:'new', component: LegendsEditComponent, canActivate: [AuthGuard] },
      {path:':id', component: LegendsShowComponent},
      {path:':id/edit', component: LegendsEditComponent, canActivate: [AuthGuard] }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(legendsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})

export class LegendsRoutingModule {}