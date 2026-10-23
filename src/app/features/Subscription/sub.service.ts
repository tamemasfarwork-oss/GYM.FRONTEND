import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Branch,
  SubscriptionType,
  CreateDtoSub,
  SubGetAll,
  RenewSubRequest,
} from '../model/create-dto-sub';

@Injectable({ providedIn: 'root' })
export class SubServies {
  private http = inject(HttpClient);
  private baseUrl = 'https://tamemwork0-001-site1.jtempurl.com';
  private apiUrl = `${this.baseUrl}/Subscription`;

  renew(body: RenewSubRequest) {
    return this.http.post<boolean>(`${this.apiUrl}/renewsub`, body);
  }

  getBranches() {
    return this.http.get<Branch[]>(`${this.baseUrl}/GetAllBranches`);
  }

  getTypes() {
    return this.http.get<SubscriptionType[]>(`${this.baseUrl}/TypeSub/GetTypeOfSub`);
  }

  addSubscription(dto: CreateDtoSub) {
    return this.http.post(`${this.apiUrl}/CreateSub`, dto);
  }

  getAllSubs(pageNumber: number, pageSize: number): Observable<SubGetAll[]> {
    // إعداد البارامترات المطلوبة وإرسالها في رابط الطلب (Query Parameters)
    const params = new HttpParams()
      .set('pagenumber', pageNumber) // إضافة رقم الصفحة للطلب
      .set('pagesize', pageSize); // إضافة حجم الصفحة للطلب

    // إرسال طلب من نوع GET إلى الـ Endpoint وإرجاع النتيجة كـ Array من SubGetAll
    return this.http.get<SubGetAll[]>(`${this.apiUrl}/GetAllSubs`, { params });
  }
}
