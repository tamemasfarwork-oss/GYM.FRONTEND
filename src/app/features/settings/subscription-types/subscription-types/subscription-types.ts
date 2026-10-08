import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TypeSubDto } from '../../../model/create-dto-sub';
import { RouterLink } from '@angular/router';
import { Route } from '@angular/router';
import { SubscriptionTypesService } from './Servies/subscription-types.service';
interface TypeCard {
  id: number;
  months: number;
  price: string;
  perMonth: string | null;
  durationKey: string | null;
  durationParams?: { n: number };
  raw: string;
}

const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });
@Component({
  selector: 'app-subscription-types',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './subscription-types.html',
  styleUrl: './subscription-types.css',
})
export class SubscriptionTypes implements OnInit {
  private service = inject(SubscriptionTypesService);

  types = signal<TypeSubDto[]>([]);
  loading = signal(true);
  error = signal(false);

  cards = computed<TypeCard[]>(() =>
    this.types()
      .map((t) => {
        // timeSpan يصل نصاً مثل "1" أو "3" أو "12" (عدد الأشهر)
        const n = Number(t.timeSpan);
        const months = Number.isFinite(n) && n > 0 ? n : 0;

        let durationKey: string | null = null;
        let durationParams: { n: number } | undefined;

        if (months === 1) durationKey = 'types.oneMonth';
        else if (months === 12) durationKey = 'types.oneYear';
        else if (months > 12 && months % 12 === 0) {
          durationKey = 'types.years';
          durationParams = { n: months / 12 };
        } else if (months > 1) {
          durationKey = 'types.months';
          durationParams = { n: months };
        }

        return {
          id: t.typeSubId,
          months,
          price: fmt(t.price),
          perMonth: months > 1 ? fmt(t.price / months) : null,
          durationKey,
          durationParams,
          raw: t.timeSpan,
        };
      })
      // الأقصر مدة أولاً، وما لا يُفهم مدته يذهب للنهاية
      .sort((a, b) => (a.months || Infinity) - (b.months || Infinity)),
  );
  router: any;

  ngOnInit(): void {
    this.service.getlisttype().subscribe({
      next: (data) => {
        this.types.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Types error:', err);
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
  go(path: string): void {
    this.router.navigate([path]);
  }
}
