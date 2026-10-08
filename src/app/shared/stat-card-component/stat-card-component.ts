import { Component, computed, EventEmitter, Input, input, output, Output } from '@angular/core';
import { from } from 'rxjs';

type CardColor = 'gold' | 'green' | 'purple' | 'amber' | 'blue';

// أسماء الفئات مكتوبة كاملة حتى يلتقطها Tailwind
const THEMES: Record<CardColor, { icon: string; glow: string; ring: string; bar: string }> = {
  gold: {
    icon: 'bg-[#c9a24b]/10 text-[#a8832f]',
    glow: 'from-[#c9a24b]/15',
    ring: 'hover:ring-[#c9a24b]/40',
    bar: 'bg-[#c9a24b]',
  },
  green: {
    icon: 'bg-emerald-50 text-emerald-600',
    glow: 'from-emerald-400/15',
    ring: 'hover:ring-emerald-300/60',
    bar: 'bg-emerald-500',
  },
  purple: {
    icon: 'bg-purple-50 text-purple-600',
    glow: 'from-purple-400/15',
    ring: 'hover:ring-purple-300/60',
    bar: 'bg-purple-500',
  },
  amber: {
    icon: 'bg-amber-50 text-amber-600',
    glow: 'from-amber-400/20',
    ring: 'hover:ring-amber-300/70',
    bar: 'bg-amber-500',
  },
  blue: {
    icon: 'bg-sky-50 text-sky-600',
    glow: 'from-sky-400/15',
    ring: 'hover:ring-sky-300/60',
    bar: 'bg-sky-500',
  },
};

@Component({
  selector: 'app-stat-card-component',
  imports: [],
  template: `
    <div
      class="group relative h-full overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all duration-300 sm:p-5"
      [class]="theme.ring"
      [class.cursor-pointer]="clickable"
      [class.hover:-translate-y-1]="true"
      [class.hover:shadow-xl]="true"
      [class.ring-2]="highlight"
      [class.ring-amber-300]="highlight"
      [attr.role]="clickable ? 'button' : null"
      [attr.tabindex]="clickable ? 0 : null"
      (click)="clickable && clicked.emit()"
      (keydown.enter)="clickable && clicked.emit()"
    >
      <!-- توهج خلفي ناعم -->
      <div
        class="pointer-events-none absolute -end-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br to-transparent opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        [class]="theme.glow"
      ></div>

      <div class="relative flex items-start justify-between">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
          [class]="theme.icon"
        >
          <ng-content select="[icon]"></ng-content>
        </div>

        @if (highlight) {
          <span class="relative flex h-2.5 w-2.5">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-70"
            ></span>
            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
          </span>
        }
      </div>

      <div class="relative mt-4">
        <p class="text-sm font-medium text-gray-500">{{ label }}</p>
        <div class="mt-1 flex items-baseline gap-1.5">
          <span class="text-2xl font-bold tracking-tight text-gray-900 tabular-nums sm:text-3xl">{{
            value
          }}</span>
          @if (hint) {
            <span class="text-xs text-gray-400">{{ hint }}</span>
          }
        </div>
      </div>

      @if (clickable) {
        <svg
          class="absolute bottom-4 end-4 h-4 w-4 text-gray-300 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-gray-500 rtl:rotate-0 ltr:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 6l-6 6l6 6" />
        </svg>
      }

      <!-- شريط سفلي يظهر عند التمرير -->
      <div
        class="absolute inset-x-0 bottom-0 h-0.5 origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        [class]="theme.bar"
      ></div>
    </div>
  `,
})
export class StatCardComponent {
  @Input() label = '';
  @Input() value: string | number = 0;
  @Input() hint = '';
  @Input() color: CardColor = 'gold';
  @Input() highlight = false;
  @Input() clickable = false;
  @Output() clicked = new EventEmitter<void>();

  get theme() {
    return THEMES[this.color] ?? THEMES.gold;
  }
}
