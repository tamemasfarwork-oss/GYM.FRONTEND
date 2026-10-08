import { Component, signal, computed, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Update_Player } from '../../model/player.dto';
import { ActivatedRoute } from '@angular/router';
import { AppButton } from '../../../shared/app-button/app-button';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
@Component({
  selector: 'app-update-player',
  imports: [CustomInput, AppButton],
  templateUrl: './update-player.html',
  styleUrl: './update-player.css',
})
export class UpdatePlayer implements OnInit {
  private playerservice = inject(PlayerService);
  private route = inject(ActivatedRoute);
  firstName = signal('');
  lastName = signal('');
  phone = signal('');
  email = signal('');
  playerId: number = 0;

  isLoading = signal(true);
  message = signal('');

  // الخطوة 2: نقرأ الـ id من الرابط ونجيب البيانات
  ngOnInit(): void {
    this.playerId = Number(this.route.snapshot.paramMap.get('playerID'));
    console.log(this.playerId);
    this.loadPlayer(this.playerId);
  }

  // الخطوة 3: نعبي الـ signals بالبيانات اللي رجعت من السيرفر
  loadPlayer(id: number): void {
    this.playerservice.FindePlayer(id).subscribe({
      next: (data: any) => {
        // .set() تغير القيمة وتبلغ Angular بنفس الوقت
        this.firstName.set(data.firstName);
        this.lastName.set(data.lastName);
        this.phone.set(data.phone);
        this.email.set(data.email);
        this.isLoading.set(false);
      },
      error: () => {
        this.message.set('ما قدرنا نجيب بيانات اللاعب');
        this.isLoading.set(false);
      },
    });
  }

  // الخطوة 4: نجمع قيم الـ signals في الـ DTO ونرسله للسيرفر
  onUpdate(): void {
    // firstName() بالأقواس = اقرأ القيمة الحالية
    const player: Update_Player = {
      playerID: this.playerId,
      FirstName: this.firstName(),
      LastName: this.lastName(),
      Phone: this.phone(),
      Email: this.email(),
    };
    console.log(player);

    this.playerservice.UpdatePlayer(player).subscribe({
      next: () => this.message.set('تم حفظ التعديلات بنجاح'),
      error: (err) => console.log(err),
    });
  }
}
