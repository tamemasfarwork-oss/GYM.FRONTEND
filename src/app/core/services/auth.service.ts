import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

interface LoginResponse {
  token: string;
  expiresAt: string;
  fullName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly KEY = 'gm_token';
  private readonly NAME = 'gm_name';

  fullName = signal<string>(localStorage.getItem(this.NAME) ?? '');
  clubName = signal<string>(this.readClubName()); // جديد

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>('https://localhost:7057/Auth/Login', { email, password })
      .pipe(
        tap((r) => {
          localStorage.setItem(this.KEY, r.token);
          localStorage.setItem(this.NAME, r.fullName);
          this.fullName.set(r.fullName);
          this.clubName.set(this.readClubName()); // جديد (بعد حفظ التوكن)
        }),
      );
  }

  get token(): string | null {
    return localStorage.getItem(this.KEY);
  }

  isLoggedIn(): boolean {
    const payload = this.readPayload();
    return !!payload && payload.exp * 1000 > Date.now();
  }

  logout() {
    localStorage.removeItem(this.KEY);
    localStorage.removeItem(this.NAME);
    this.fullName.set('');
    this.clubName.set(''); // جديد
  }

  // جديد: يفك التوكن مرة وحدة (ويدعم الأسماء العربية)
  private readPayload(): any | null {
    const t = localStorage.getItem('gm_token');
    if (!t) return null;
    try {
      const base64 = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(bytes));
    } catch {
      return null;
    }
  }

  // جديد
  private readClubName(): string {
    return this.readPayload()?.club_name ?? '';
  }
}
