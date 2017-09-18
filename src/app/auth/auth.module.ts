import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({

  declarations: [SignupComponent, SigninComponent],
  imports: [FormsModule, SharedModule]
})

export class AuthModule{}