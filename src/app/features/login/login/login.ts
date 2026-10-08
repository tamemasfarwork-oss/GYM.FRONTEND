import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  template: ` <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <form
      class="bg-white p-8 rounded-xl shadow w-full max-w-sm flex flex-col gap-4"
      (submit)="submit($event)"
    >
      <h1 class="text-xl font-bold text-center">تسجيل الدخول</h1>
      <input
        class="border rounded px-3 py-2"
        type="email"
        placeholder="Email"
        [value]="email()"
        (input)="email.set($any($event.target).value)"
      />
      <input
        class="border rounded px-3 py-2"
        type="password"
        placeholder="Password"
        [value]="password()"
        (input)="password.set($any($event.target).value)"
      />
      @if (error()) {
        <p class="text-red-600 text-sm">{{ error() }}</p>
      }
      <button class="bg-[#1E2A2F] text-white rounded py-2" [disabled]="loading()">
        {{ loading() ? '...' : 'دخول' }}
      </button>
    </form>
  </div>`,
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  email = signal('');
  password = signal('');
  loading = signal(false);
  error = signal('');

  submit(e: Event) {
    e.preventDefault();
    this.loading.set(true);
    this.error.set('');
    this.auth.login(this.email(), this.password()).subscribe({
      next: () => this.router.navigate(['/dashbored']),
      error: () => {
        this.error.set('الإيميل أو كلمة المرور غير صحيحة');
        this.loading.set(false);
      },
    });
  }
}
