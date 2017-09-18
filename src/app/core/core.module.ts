import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CoreRouting } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../auth/auth.service';
import { LegendsService } from '../legends/legends.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReportingComponent } from './reporting/reporting.component';
import { UserComponent } from './user/user.component';
import { FooterComponent } from './footer/footer.component';
import { TodoComponent } from './todo/todo.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    NotFoundComponent,
    ReportingComponent,
    UserComponent,
    FooterComponent,
    TodoComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    CoreRouting
  ],
  exports: [
    HeaderComponent,
    CoreRouting,
    FooterComponent
  ],
  providers: [
    AuthService,
    LegendsService,
    DataStorageService
  ]
})

export class CoreModule {}