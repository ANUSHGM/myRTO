import { Component } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { NotificationService } from '../notification.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { MatCalendarBody } from '@angular/material/datepicker';
import { MatDatepicker } from '@angular/material/datepicker';
import { LoginComponent } from '../login/login.component';
import { MatNativeDateModule } from '@angular/material/core';

import { HttpClient } from '@angular/common/http';
import { resolve } from 'path';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import {  } from '../notification.service';
// import { CommonModule } from '@angular/common';
// import { OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: true,
  imports: [MatCalendar,MatNativeDateModule,MatDatepicker,MatCalendarBody,CommonModule,LoginComponent,MatDatepickerModule,MatFormFieldModule,MatInputModule],
})
export class EmployeeComponent implements OnInit{

  private basicUrl = 'http://localhost:9899'; 

  employeeName = '';
  employeeId = 0;
  employeeEmail = '';
  managerName = '';
  managerId = 0;
  projectName = '';
  password = '';
  daysCount = 0;
  today = new Date();

  selectedDays: Date[] = [];
  notifications: string[] = [];
  showingNotifications = false;

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  ngOnInit() {
    const email = localStorage.getItem('loggedInEmail');
    if (email) {
      this.fetchEmployeeData(email)
        // Call fetchNotifications only after employee data has been fetched
      
    }
  }

  fetchEmployeeData(email: string) {
    this.http.get(`${this.basicUrl}/getEmployee/${email}`).subscribe((employee: any) => {
      this.employeeName = employee.employeeName;
      this.employeeEmail = employee.employeeEmail;
      this.employeeId = employee.sapId;
      this.managerName = employee.managerName;
      this.projectName = employee.project;
      this.daysCount = employee.daysPresent;
      this.password = employee.password;
      this.fetchNotifications();

    });
  }

  // toggleDay(selectedDate: Date) {
  //   const index = this.selectedDays.findIndex(
  //     (d) => d.toDateString() === selectedDate.toDateString()
  //   );
  //   if (index === -1) {
  //     this.selectedDays.push(selectedDate);
  //   } else {
  //     this.selectedDays.splice(index, 1);
  //   }
  //   // Update daysCount as the length of selectedDays
  //   this.daysCount = this.selectedDays.length;
  // }

  toggleDay(selectedDate: Date) {
    // Check if the selected date is in the future
    if (selectedDate > this.today) {
      alert('You cannot select a future date.');
      return;
    }

    // Add or remove the date based on whether it is already selected
    const index = this.selectedDays.findIndex(
      (d) => d.toDateString() === selectedDate.toDateString()
    );

    if (index === -1) {
      this.selectedDays.push(selectedDate);
    } else {
      this.selectedDays.splice(index, 1);
    }
  }

  submitAttendance() {
    const updatedEmployee = {
      sapId: this.employeeId,
      employeeName: this.employeeName,
      employeeEmail: this.employeeEmail,
      daysPresent: this.selectedDays.length,
      managerName: this.managerName,
      project: this.projectName,
      password: this.password,
    };
    this.http.post(`${this.basicUrl}/updateEmployee`, updatedEmployee).subscribe(response => {
      alert('Attendance updated');
      if (this.selectedDays.length >=12){
        this.deletNotifications();
      }
    });
  }

  fetchNotifications() {
    console.log(this.employeeId)
    this.http.get(`${this.basicUrl}/showAlert/${this.employeeId}`).subscribe((alerts: any) => {
      console.log(alerts.alertContent);
      this.notifications.push(alerts.alertContent);
    });
  }

  deletNotifications() {
    console.log(this.employeeId)
    this.http.get(`${this.basicUrl}/deleteAlert/${this.employeeId}`).subscribe((response: any) => {
      alert(response.message);
      this.notifications.splice(0,1);
      this.fetchNotifications();
    });
  }

  showNotifications() {
    this.showingNotifications = !this.showingNotifications;
  }
}
