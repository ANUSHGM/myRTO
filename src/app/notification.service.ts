import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  notifications$: Observable<string[]> = this.notificationsSubject.asObservable();

  // Send a new notification
  sendNotification(message: string) {
    const currentNotifications = this.notificationsSubject.getValue();
    currentNotifications.push(message);
    this.notificationsSubject.next(currentNotifications);
  }

  // Get notifications
  getNotifications(): Observable<string[]> {
    return this.notifications$;
  }
}
