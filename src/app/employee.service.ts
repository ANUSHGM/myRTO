import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alerts, Employee } from './manager/manager.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:9899'; // Base URL for Spring Boot API

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/showEmployee`);
  }

  getEmployee(email: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/getEmployee/${email}`);
  }

  addEmployee(employee: Employee): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/addEmployee`, employee,);
  }

  updateEmployee(employee: Employee): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/updateEmployee`, employee);
  }

  deleteEmployee(id: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/deleteEmployee/${id}`);
  }

  sendAlert(alert: Alerts): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/sendAlert`, alert);
  }
}
