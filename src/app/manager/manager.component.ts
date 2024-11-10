import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
// import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../notification.service';
import { EmployeeService } from '../employee.service';


export interface Employee {
  sapId: number;
  employeeName: string;
  employeeEmail: string;
  managerName: string;
  project: string;
  password: string;
  daysPresent: number;
}

export interface Alerts{
  employeeId: number;
  alertContent : string
}

@Component({
  selector: 'app-manager',
  standalone: true,
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class ManagerComponent implements OnInit {

  displayedColumns: string[] = ['sapId', 'employeeName','employeeEmail', 'managerName', 'project','daysPresent', 'alert', 'actions'];
  
  employees: Employee[] = [];
  alerts: Alerts ={employeeId :0,alertContent:''}
  editingIndex: number[] = [];
  deletedEmployee: Employee | null = null;
  deletedEmployeeIndex: number | null = null;
  undoTimer: any;
  showAddForm: boolean = false;
  newEmployee: Employee = { sapId: 0, employeeName: '',employeeEmail:'', managerName: '', project: '',password:'', daysPresent: 0 };
  // alertcon: string;
  constructor(private employeeService: EmployeeService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }

  addEmployee(): void {
    if (!this.newEmployee.employeeName || !this.newEmployee.employeeEmail ||  !this.newEmployee.managerName || !this.newEmployee.project || !this.newEmployee.password) {
      alert('All fields are required!');
      return;
    }

    this.employeeService.addEmployee(this.newEmployee ).subscribe((response: any) => {
      alert(response.message); // Alert success message
      this.employees.push({ ...this.newEmployee });
      this.resetNewEmployee();
      this.showAddForm = false;
      this.fetchEmployees(); // Refresh the list
    });
  }

  resetNewEmployee(): void {
    this.newEmployee = {sapId: 0, employeeName: '',employeeEmail:'', managerName: '', project: '',password:'', daysPresent: 0 };
  }

  cancelAddEmployee(): void {
    this.resetNewEmployee();
    this.showAddForm = false;
  }

  editEmployee(index: number): void {
    this.editingIndex.push(index);
  }

  saveEdit(index: number): void {
    const editedEmployee = this.employees[index];
    this.employeeService.updateEmployee(editedEmployee).subscribe((response: any) => {
      alert(response.message); // Alert success message
      const i = this.editingIndex.indexOf(index);
      if (i !== -1) this.editingIndex.splice(i, 1);
    });
  }

  confirmDelete(index: number): void {
    if (confirm(`Are you sure you want to delete ${this.employees[index].employeeName}?`)) {
      this.deleteEmployee(index);
    }
  }

  deleteEmployee(index: number): void {
    const sapId = this.employees[index].sapId;
    this.employeeService.deleteEmployee(sapId).subscribe((response: any) => {
      alert(response.message); // Alert success message
      this.fetchEmployees();
      this.deletedEmployee = { ...this.employees[index] };
      this.deletedEmployeeIndex = index;
      this.employees.splice(index, 1);
      this.startUndoTimer();
    });
  }

  startUndoTimer(): void {
    clearTimeout(this.undoTimer);
    this.undoTimer = setTimeout(() => {
      this.deletedEmployee = null;
      this.deletedEmployeeIndex = null;
    }, 5000);
  }

  undoDelete(): void {
    if (this.deletedEmployee && this.deletedEmployeeIndex !== null) {
      this.employees.splice(this.deletedEmployeeIndex, 0, this.deletedEmployee);
      this.deletedEmployee = null;
      this.deletedEmployeeIndex = null;
      clearTimeout(this.undoTimer);
    }
  }

  sendAlert(employee: Employee): void {
    const notify  = `Alert: ${employee.employeeName} has less than 12 days present.`;
    alert(notify);
  
    this.addAlert(employee.sapId,notify);
    this.employeeService.sendAlert(this.alerts).subscribe((response: any) => {
    console.log(response.message);
    let managerNotifications = localStorage.getItem('managerNotifications');
    let notifications = managerNotifications ? JSON.parse(managerNotifications) : [];
    notifications.push(notify);
    localStorage.setItem('managerNotifications', JSON.stringify(notifications));
    });
  }

  addAlert(employeeId: number, alertContent: string): void {
    this.alerts.employeeId = employeeId;
    this.alerts.alertContent = alertContent;
  }
  
}

