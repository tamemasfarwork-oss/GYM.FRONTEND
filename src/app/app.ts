import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/services/language.service';

import { AddPlayer } from './features/Players/add-player/add-player';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddPlayer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    inject(LanguageService).init();
  }
  protected readonly title = signal('GM-App');
}
