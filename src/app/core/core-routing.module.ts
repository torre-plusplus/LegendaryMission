import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { UserComponent } from './user/user.component';
import { ReportingComponent } from './reporting/reporting.component';
import { TodoComponent } from './todo/todo.component';
import { AuthGuard } from '../auth/auth-guard.service';

const coreRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'reporting', component: ReportingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'legends', loadChildren: '../legends/legends.module#LegendsModule' },
  { path: '**', redirectTo: 'not-found' }
]
@NgModule({
  imports: [
    RouterModule.forRoot(coreRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})

export class CoreRouting {}