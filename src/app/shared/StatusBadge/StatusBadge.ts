// shared/components/status-badge/status-badge.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeStatus = 'active' | 'inactive';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statusbadge.html',
})
export class StatusBadge {
  @Input() status: string = 'active';
}
