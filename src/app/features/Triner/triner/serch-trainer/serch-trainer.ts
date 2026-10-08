// trainer-select.component.ts
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TrainerService } from '../Servies/Triners.servies';
import { TrainerLookup } from '../../../model/Triner.dto';
@Component({
  selector: 'app-trainer-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="wrapper" dir="rtl">
      <input
        type="text"
        [formControl]="search"
        placeholder="ابحث عن كابتن..."
        (focus)="open = true"
        (blur)="open = false"
      />

      @if (open && trainers()) {
        <ul class="list">
          @for (t of trainers(); track t.trinerid) {
            <li (mousedown)="select(t)">
              <span class="avatar">{{ t.fullname?.charAt(0) }}</span>
              <span class="name">{{ t.fullname }}</span>
            </li>
          } @empty {
            <li class="empty">لا توجد نتائج</li>
          }
        </ul>
      }
    </div>
  `,
  styles: [
    `
      .wrapper {
        position: relative;
        width: 300px;
      }

      input {
        width: 100%;
        padding: 10px 12px;
        box-sizing: border-box;
        border: 1px solid #d0d0d0;
        border-radius: 8px;
        font-size: 15px;
        color: #222;
        background: #fff;
        outline: none;
      }
      input:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
      }

      .list {
        position: absolute;
        top: calc(100% + 4px);
        right: 0;
        left: 0;
        margin: 0;
        padding: 4px;
        list-style: none;
        background: #fff;
        border: 1px solid #e2e2e2;
        border-radius: 8px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        max-height: 240px;
        overflow-y: auto;
        z-index: 10;
      }

      li {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: 6px;
        color: #222; /* مهم: لون النص صريح */
        font-size: 14px;
        cursor: pointer;
      }
      li:hover {
        background: #eef4ff;
      }
      li.empty {
        color: #888;
        cursor: default;
        justify-content: center;
      }
      li.empty:hover {
        background: transparent;
      }

      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #3b82f6;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        flex-shrink: 0;
      }
    `,
  ],
})
export class SerchTrainer {
  private trainerService = inject(TrainerService);

  @Output() selected = new EventEmitter<number>();

  search = new FormControl('', { nonNullable: true });
  open = false;

  trainers = toSignal(
    this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => {
        console.log('term sent:', term);
        return this.trainerService.search(term);
      }),
      tap((res) => console.log('API response:', res)),
    ),
  );

  select(trainer: TrainerLookup) {
    this.search.setValue(trainer.fullname, { emitEvent: false });
    this.open = false;
    this.selected.emit(trainer.trinerid);
  }
}
