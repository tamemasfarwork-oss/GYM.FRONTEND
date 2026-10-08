import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TrainerDto } from '../../model/Triner.dto';
import { TrainerService } from './Servies/Triners.servies';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-triner-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './triner-list.html',
  styleUrl: './triner-list.css',
})
export class TrinerList implements OnInit {
  private trinerservies = inject(TrainerService);

  trainers: WritableSignal<TrainerDto[]> = signal<TrainerDto[]>([]);
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  pageNumber: WritableSignal<number> = signal<number>(1);
  pageSize: WritableSignal<number> = signal<number>(10);

  ngOnInit(): void {
    this.loadTrainers();
  }

  loadTrainers(): void {
    this.isLoading.set(true);

    // طباعة للتحقق في الـ Console
    console.log(`Sending Request -> Page: ${this.pageNumber()}, Size: ${this.pageSize()}`);

    this.trinerservies.getAllTrainers(this.pageNumber(), this.pageSize()).subscribe({
      next: (data) => {
        console.log('Data received from API:', data);
        this.trainers.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching trainers:', err);
        this.isLoading.set(false);
      },
    });
  }

  previousPage(): void {
    if (this.pageNumber() > 1) {
      const newPage = this.pageNumber() - 1;
      this.pageNumber.set(newPage);
      this.loadTrainers();
    }
  }

  nextPage(): void {
    const newPage = this.pageNumber() + 1;
    this.pageNumber.set(newPage);
    this.loadTrainers();
  }
}
