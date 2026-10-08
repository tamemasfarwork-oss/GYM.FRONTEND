export interface CreateDtoSub {
  paymentMethod: string;
  playerId: number;
  typeSubId: number;
  branchesId: number;
}
// model/branch.ts
export interface Branch {
  branchesId: number;
  branchName: string;
  branchAddres: string;
}

// model/subscription-type.ts
export interface SubscriptionType {
  typeSubId: number;
  price: number;
  timeSpan: string;
}

export interface SubGetAll {
  subid: number; // معرّف الاشتراك
  price: number; // السعر
  fullname: string; // اسم اللاعب الكامل
  status: string; // حالة الاشتراك (نشط / غير نشط)
  branchname: string; // اسم الفرع
  startsub: string; // تاريخ البداية (يستقبل كـ string بصيغة YYYY-MM-DD من DateOnly)
  endsub: string; // مدة الاشتراك أو تاريخ الانتهاء
}

export interface SubscriptionDto {
  dateSub: string;
  dateEnd: string;
  status: string;
  createBy: string;
  price: number;
  fullname: string;
  branchName: string;
}

export interface MonthRevenueDto {
  year: number;
  month: number;
  total: number;
}

export interface SubEXDto {
  subid: number;
  nameplayer: string;
  dateend: string;
}

export interface TypeSubDto {
  typeSubId: number;
  price: number;
  timeSpan: string;
}
export interface CreateTypeSubDto {
  price: number;
  timeSpan: string;
  durationMonths: number;
}

export interface RenewSubRequest {
  oldSubId: number;
  typeSubId: number;
  startDate: string; // "2026-10-05"
  createdby: string;
  paymentmethod: string;
  branchesId: number;
}
