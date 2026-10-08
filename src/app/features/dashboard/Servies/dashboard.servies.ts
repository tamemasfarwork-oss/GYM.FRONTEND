import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthRevenueDto, SubEXDto, SubscriptionDto } from '../../model/create-dto-sub';

@Injectable({ providedIn: 'root' })
export class dashboardservies {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7057';

  getActiveSubs(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7057/Subscription/GetActiveSub`);
  }
  GetALLPlayers(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7057/Players/countplayers`);
  }

  getExpiringIn7Days(): Observable<SubscriptionDto[]> {
    return this.http.get<SubscriptionDto[]>(`https://localhost:7057/Subscription/SubUntilEx7days`);
  }
  GetMonthlyRevenue(): Observable<any> {
    return this.http.get('https://localhost:7057/Subscription/Revenues');
  }
  getRevenueLast6Months(): Observable<MonthRevenueDto[]> {
    return this.http.get<MonthRevenueDto[]>(
      `https://localhost:7057/Subscription/RevenueLast6Months`,
    );
  }

  GetExpiredSubs(): Observable<SubEXDto[]> {
    return this.http.get<SubEXDto[]>(`https://localhost:7057/Subscription/SubEX`);
  }
}
