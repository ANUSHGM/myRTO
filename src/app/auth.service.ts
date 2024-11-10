import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private http: HttpClient) {}

  private loginUrl = 'http://localhost:9899'; // Adjust URL as needed


  private checkSource = new BehaviorSubject<boolean>(false);
  check$ = this.checkSource.asObservable();

  updateCheck(value: boolean) {
    this.checkSource.next(value);
  }

  login(email: string, password: string): Observable<number> {
    return this.http.get<number>(`${this.loginUrl}/login/${email}/${password}`);
  }
}
