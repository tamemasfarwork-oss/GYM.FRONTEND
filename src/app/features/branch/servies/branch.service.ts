import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BranchAddDto } from '../../model/branch-dto';

@Injectable({ providedIn: 'root' })
export class BranchService {
  private http = inject(HttpClient);

  add(body: BranchAddDto) {
    return this.http.post('https://tamemwork0-001-site1.jtempurl.com/Branches/addbranch', body);
  }
}
