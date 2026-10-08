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
  private apiUrl = 'https://localhost:7057/Subscription'; // غيّره حسب الباك عندك

  renew(body: RenewSubRequest) {
    return this.http.post<boolean>(`https://localhost:7057/Subscription/renewsub`, body);
  }

  getBranches() {
    return this.http.get<Branch[]>(`https://localhost:7057/GetAllBranches
`);
  }

  getTypes() {
    return this.http.get<SubscriptionType[]>(`https://localhost:7057/TypeSub/GetTypeOfSub

`);
  }

  addSubscription(dto: CreateDtoSub) {
    return this.http.post(`https://localhost:7057/Subscription/CreateSub`, dto);
  }

  getAllSubs(pageNumber: number, pageSize: number): Observable<SubGetAll[]> {
    // إعداد البارامترات المطلوبة وإرسالها في رابط الطلب (Query Parameters)
    const params = new HttpParams()
      .set('pagenumber', pageNumber) // إضافة رقم الصفحة للطلب
      .set('pagesize', pageSize); // إضافة حجم الصفحة للطلب

    // إرسال طلب من نوع GET إلى الـ Endpoint وإرجاع النتيجة كـ Array من SubGetAll
    return this.http.get<SubGetAll[]>(`https://localhost:7057/Subscription/GetAllSubs`, { params });
  }
}
