import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.html',
})
export class Topbar {
  adminName = 'Sarah J.';
  lang = inject(LanguageService);
}
