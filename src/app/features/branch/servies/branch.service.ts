import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BranchAddDto } from '../../model/branch-dto';

@Injectable({ providedIn: 'root' })
export class BranchService {
  private http = inject(HttpClient);

  add(body: BranchAddDto) {
    return this.http.post('https://localhost:7057/addbranch', body);
  }
}
