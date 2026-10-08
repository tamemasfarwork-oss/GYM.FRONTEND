import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'ar' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private doc = inject(DOCUMENT);

  lang = signal<Lang>('ar');

  init(): void {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('lang');
    } catch {}
    this.set(saved === 'en' ? 'en' : 'ar');
  }

  set(lang: Lang): void {
    this.lang.set(lang);
    this.translate.use(lang);
    this.doc.documentElement.lang = lang;
    this.doc.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('lang', lang);
    } catch {}
  }

  toggle(): void {
    this.set(this.lang() === 'ar' ? 'en' : 'ar');
  }
}
