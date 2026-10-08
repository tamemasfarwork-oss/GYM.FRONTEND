import { Component, signal, inject, OnInit, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatusBadge } from '../../../shared/StatusBadge/StatusBadge';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../model/player.dto';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-players-list',
  imports: [StatusBadge, CommonModule, RouterLink, TranslatePipe],
  templateUrl: './players-list.html',
  styleUrl: './players-list.css',
})
export class PlayersList {
  private playerService = inject(PlayerService);

  players = signal<Player[]>([]);
  isLoading = signal<boolean>(true);
  searchQuery = signal<string>('');

  // القائمة المفلترة حسب الاسم
  filteredPlayers = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const list = this.players();

    if (!query) return list;
    // r تمرّ على كل لاعب وتسأل: هل اسمه
    // يحتوي على النص المكتوب؟ إذا نعم يبقى، وإذا لا يُستبعد. و
    // includes تبحث عن النص في أي مكان داخل الاسم، فكتابة "ess"
    //  تجد "Messi".
    //  أما ?. فتحمي الكود من الخطأ لو كان لاعب ما ليس له اسم.
    return list.filter((player) => player.firstName?.toLowerCase().includes(query));
  });

  private logPlayersEffect = effect(() => {
    console.log('بيانات اللاعبين الحالية:', this.players());
  });

  ngOnInit(): void {
    this.loadPlayers();
  }

  private loadPlayers(): void {
    this.isLoading.set(true);
    this.playerService.getPlayers().subscribe({
      next: (data) => {
        this.players.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
  }
}
