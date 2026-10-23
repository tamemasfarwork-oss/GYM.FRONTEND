import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthRevenueDto, SubEXDto, SubscriptionDto } from '../../model/create-dto-sub';

@Injectable({ providedIn: 'root' })
export class dashboardservies {
  private http = inject(HttpClient);
  private baseUrl = 'https://tamemwork0-001-site1.jtempurl.com';

  getActiveSubs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Subscription/GetActiveSub`);
  }
  GetALLPlayers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Players/countplayers`);
  }

  getExpiringIn7Days(): Observable<SubscriptionDto[]> {
    return this.http.get<SubscriptionDto[]>(`${this.baseUrl}/Subscription/SubUntilEx7days`);
  }
  GetMonthlyRevenue(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Subscription/Revenues`);
  }
  getRevenueLast6Months(): Observable<MonthRevenueDto[]> {
    return this.http.get<MonthRevenueDto[]>(`${this.baseUrl}/Subscription/RevenueLast6Months`);
  }

  GetExpiredSubs(): Observable<SubEXDto[]> {
    return this.http.get<SubEXDto[]>(`${this.baseUrl}/Subscription/SubEX`);
  }
}
