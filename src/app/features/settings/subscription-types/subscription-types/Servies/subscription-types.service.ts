import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTypeSubDto, TypeSubDto } from '../../../../model/create-dto-sub';
@Injectable({
  providedIn: 'root',
})
export class SubscriptionTypesService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7057/TypeSub';

  getlisttype(): Observable<TypeSubDto[]> {
    return this.http.get<TypeSubDto[]>(`${this.baseUrl}/GetTypeOfSub`);
  }

  addType(dto: CreateTypeSubDto): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/AddTypeOfSub`, dto);
  }
}
