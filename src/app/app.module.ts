import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common'; 
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter'; // Moment Date Adapter
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import { NotificationService } from './notification.service';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';  // Date-fns Adapter
import { enGB } from 'date-fns/locale';  // Import locale for date-fns
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { NavbarComponent } from './navbar/navbar.component';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [
    BrowserModule,
     HttpClientModule,
     
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,  
    MatButtonModule,
    MatDateFnsModule,  // Add this for date-fns DateAdapter
    EmployeeComponent,NavbarComponent,
    BrowserModule,CommonModule,MatMomentDateModule,BrowserAnimationsModule,MatDatepickerModule,MatNativeDateModule,MatButtonModule,ManagerComponent,EmployeeComponent,
    RouterModule.forRoot([{ path: 'login', component: LoginComponent }]),
  ],
  declarations: [],
  providers: [
    NotificationService,MatDatepickerModule,EmployeeService,HttpClient,HttpClientModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Optional: Set locale
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, // Optional: Use custom date formats
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } }, // Moment.js options
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },  // Set locale if needed
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } },  // Optional: Strict parsing with Moment.js
    { provide: MAT_DATE_LOCALE, useValue: enGB },  // Set locale if needed
    // importProvidersFrom(HttpClientModule),

  ],
  bootstrap: [],
})
export class AppModule {}
