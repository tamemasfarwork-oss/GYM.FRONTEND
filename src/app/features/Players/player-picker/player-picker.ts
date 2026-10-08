import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../model/player.dto';
import { AppButton } from '../../../shared/app-button/app-button';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
@Component({
  selector: 'app-player-picker',
  imports: [CustomInput, AppButton],
  templateUrl: './player-picker.html',
  styleUrl: './player-picker.css',
})
export class PlayerPicker {
  @Output() playerSelected = new EventEmitter<number>();
  playerService = inject(PlayerService);
  // كل اللاعبين اللي رجعوا من السيرفر
  players = signal<Player[]>([]);

  // النص اللي المستخدم يكتبه في البحث
  searchText = signal('');

  // رقم اللاعب المختار، عشان نلوّنه
  selectedId = signal<number | null>(null);

  isLoading = signal(true);
  errorMessage = signal('');

  // القائمة بعد الفلترة: تتحدث تلقائياً كل ما تغير البحث أو اللاعبين
  filteredPlayers = computed(() => {
    const text = this.searchText().toLowerCase();

    // إذا البحث فاضي نرجع الكل
    if (!text) return this.players();

    // غير هيك نرجع بس اللي اسمهم فيه النص المكتوب
    return this.players().filter((p) =>
      (p.firstName + ' ' + p.lastName).toLowerCase().includes(text),
    );
  });

  // أول ما يفتح البيكر نجيب اللاعبين
  ngOnInit(): void {
    this.playerService.getPlayers().subscribe({
      next: (data) => {
        this.players.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('ما قدرنا نجيب اللاعبين');
        this.isLoading.set(false);
      },
    });
  }

  // لما المستخدم يضغط على لاعب
  selectPlayer(id: any): void {
    this.selectedId.set(id); // نعلّمه كمختار
    this.playerSelected.emit(id); // نبعت الرقم للأب
  }
  goto() {
    console.log(this.selectedId);
  }
}
