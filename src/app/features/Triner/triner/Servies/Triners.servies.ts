import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrivateTrainSub, TrainerDto, TrainerLookup } from '../../../model/Triner.dto';
@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private baseUrl = 'https://tamemwork0-001-site1.jtempurl.com';
  private readonly apiUrl = `${this.baseUrl}/Triner/GetAllTriner`;

  constructor(private http: HttpClient) {}

  // جلب كافة المدربين
  getAllTrainers(pageNumber: number = 1, pageSize: number = 10): Observable<TrainerDto[]> {
    const params = new HttpParams().set('pagenmuber', pageNumber).set('pagesize', pageSize);

    return this.http.get<TrainerDto[]>(`${this.baseUrl}/Triner/GetAllTriner`, { params });
  }

  // جلب مدرب محدد بواسطة الـ ID
  getTrainerById(id: number): Observable<TrainerDto> {
    return this.http.get<TrainerDto>(`${this.apiUrl}/${id}`);
  }

  // إضافة مدرب جديد
  createTrainer(trainer: Omit<TrainerDto, 'trainersId'>): Observable<TrainerDto> {
    return this.http.post<TrainerDto>(this.apiUrl, trainer);
  }

  // تعديل بيانات مدرب
  updateTrainer(id: number, trainer: TrainerDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, trainer);
  }

  // حذف مدرب
  deleteTrainer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  search(searchTerm: string): Observable<TrainerLookup[]> {
    return this.http.get<TrainerLookup[]>(`${this.baseUrl}/Triner/Lookup`, {
      params: { searchTerm },
    });
  }
  addPrivateTrainSub(dto: PrivateTrainSub) {
    return this.http.post(`${this.baseUrl}/create`, dto);
  }
}
