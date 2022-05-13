import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { BookingsComponent } from './bookings/bookings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'bookings', component: BookingsComponent },
  { path: 'login', component: LoginComponent},

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


//export const appRoutingModule = RouterModule.forRoot(routes);
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    BookingsComponent,
    MenuBarComponent,
    BookingDialogComponent,
    LoginComponent,
  ],
  entryComponents: [BookingDialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
    RouterModule
    
    
  ],
  providers: [],
  exports : [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
