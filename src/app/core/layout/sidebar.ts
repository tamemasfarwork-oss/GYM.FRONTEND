import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { AuthService } from '../services/auth.service';

interface NavItem {
  path: string;
  labelKey: string;
  icon: string; // جديد: مسار رسمة الأيقونة
  children?: { path: string; labelKey: string }[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  lang = inject(LanguageService);
  private router = inject(Router);
  auth = inject(AuthService);

  // جديد: اسم النادي من التوكن + أول حرف منه كشعار
  clubName = computed(() => this.auth.clubName() || 'Gym Manager');
  clubInitial = computed(() => this.clubName().trim().charAt(0).toUpperCase());

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private openState = signal<Record<string, boolean>>({});

  navItems: NavItem[] = [
    {
      path: '/dashbored',
      labelKey: 'nav.dashbored',
      icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    },
    {
      path: '/players',
      labelKey: 'nav.players',
      icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    },
    {
      path: '/subscriptions',
      labelKey: 'nav.subscriptions',
      icon: 'M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM2 10h20',
    },
    {
      path: '/subscriptions/expired',
      labelKey: 'nav.Expired',
      icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
    },
    {
      path: '/trainers',
      labelKey: 'nav.trainers',
      icon: 'M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11',
    },
    {
      path: '/reports',
      labelKey: 'nav.reports',
      icon: 'M3 3v18h18M8 17v-5M13 17V8M18 17v-9',
    },
    {
      path: '/addbranch',
      labelKey: 'nav.branch',
      icon: 'M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    },
    {
      path: '/settings',
      labelKey: 'nav.settings',
      icon: 'M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M16 4v4M10 10v4M18 16v4',
      children: [{ path: '/subscription-types', labelKey: 'nav.subscriptionTypes' }],
    },
  ];

  // تُفتح المجموعة تلقائياً إن كنت داخل إحدى صفحاتها
  isOpen(item: NavItem): boolean {
    const manual = this.openState()[item.path];
    if (manual !== undefined) return manual;
    return (item.children ?? []).some((c) => this.router.url.startsWith(c.path));
  }

  toggle(item: NavItem): void {
    this.openState.update((s) => ({ ...s, [item.path]: !this.isOpen(item) }));
  }
}
