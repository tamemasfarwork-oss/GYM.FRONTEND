import { DecimalPipe } from '@angular/common';

export interface TrainerDto {
  trainersId: number;
  fullname: string;
  dateWork: string; // يُفضل تمثيل DateOnly بالنص (YYYY-MM-DD) لتلقي تسلسل الـ JSON بسهولة
  isActive: number; // byte في C# يطابق number في TypeScript
  createBy: string;
  salaryPerMonth: number;
  specialization: string;
  pricePerMonthPrivateTrain: number;
}

export interface TrainerLookup {
  trinerid: number;
  fullname: string;
}

export interface PrivateTrainSub {
  playerId: number;
  trainerId: number;
  pricePerMonth: number;
  clubShare: number;
}
