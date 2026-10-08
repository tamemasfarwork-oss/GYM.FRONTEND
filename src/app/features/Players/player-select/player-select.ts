import { Component, Output, EventEmitter, signal } from '@angular/core';
import { PlayerLookup } from '../../model/player.dto';
import { PlayerService } from '../../services/player.service';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError, of } from 'rxjs';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
@Component({
  selector: 'app-player-select',
  imports: [CustomInput],
  templateUrl: './player-select.html',
  styleUrl: './player-select.css',
})
export class PlayerSelect {
  @Output() playerSelected = new EventEmitter<number | null>();

  // نص البحث اللي بيكتبه المستخدم
  searchText = signal('');

  // نتائج البحث اللي رجعت من السيرفر
  results = signal<PlayerLookup[]>([]);

  // اللاعب المختار (الرقم والاسم)، null يعني لسا ما اختار
  selectedPlayer = signal<PlayerLookup | null>(null);

  // هل في بحث شغال هلأ
  isLoading = signal(false);

  constructor(private playerService: PlayerService) {
    // نراقب نص البحث، وكل ما تغير نبحث بالسيرفر
    toObservable(this.searchText)
      .pipe(
        // نستنى المستخدم يوقف كتابة 400ms قبل ما نبعت طلب
        debounceTime(400),

        switchMap((text) => {
          // إذا الخانة فاضية: ما نبعت طلب، ونرجع قائمة فاضية
          if (!text.trim()) return of([]);

          // غير هيك نبحث بالسيرفر
          // switchMap بتلغي الطلب القديم لو كتب المستخدم شي جديد قبل ما يرجع الرد
          return this.playerService.LookupPlayers(text.trim()).pipe(
            catchError(() => of([])), // لو صار خطأ نرجع قائمة فاضية
          );
        }),

        // نوقف المراقبة تلقائياً لما يتسكر الكمبونت
        takeUntilDestroyed(),
      )
      .subscribe((players) => {
        // وصلت النتائج
        this.results.set(players);
        this.isLoading.set(false);
      });
  }

  // تشتغل مع كل حرف يكتبه المستخدم
  onType(text: string): void {
    this.searchText.set(text);
    // نظهر "جاري البحث" فوراً إذا كتب شي
    this.isLoading.set(text.trim() !== '');
  }

  // لما المستخدم يضغط على لاعب من القائمة
  choose(player: PlayerLookup): void {
    this.selectedPlayer.set(player); // نحفظه عشان نعرض اسمه
    this.playerSelected.emit(player.playerID); // نبعت رقمه للأب
  }

  // لما يضغط "تغيير": نرجع لوضع البحث
  clear(): void {
    this.selectedPlayer.set(null);
    this.searchText.set(''); // نفضي خانة البحث
    this.results.set([]); // ونفضي القائمة
    this.playerSelected.emit(null); // نبلغ الأب إنه ما عاد في لاعب مختار
  }
}
