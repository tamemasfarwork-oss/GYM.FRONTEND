import { Component, inject, signal } from '@angular/core';
import { SubGetAll } from '../../model/create-dto-sub';
import { SubServies } from '../sub.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { StatusBadge } from '../../../shared/StatusBadge/StatusBadge';
@Component({
  selector: 'app-sub-list',
  imports: [StatusBadge, RouterLink, TranslatePipe],
  templateUrl: './sub-list.html',
  styleUrl: './sub-list.css',
})
export class SubList {
  private subService = inject(SubServies);

  // Signal لتخزين قائمة الاشتراكات المعروضة في الجدول
  subscriptions = signal<SubGetAll[]>([]);

  // Signal لتتبع حالة التحميل (Loading Indicator)
  isLoading = signal<boolean>(false);

  // إعداد قيم التصفح (الصفحة الأولى وحجم الصفحة 10 عناصر)
  pageNumber = signal<number>(1);
  pageSize = signal<number>(10);

  // دالة تُنفذ تلقائياً عند تحميل المكون
  ngOnInit(): void {
    this.loadSubscriptions(); // استدعاء دالة جلب البيانات
  }

  // دالة جلب الاشتراكات من الـ Service
  loadSubscriptions(): void {
    this.isLoading.set(true); // تفعيل حالة التحميل قبل بدء الطلب

    // استدعاء دالة الـ Service وتمرير رقم وحجم الصفحة
    this.subService.getAllSubs(this.pageNumber(), this.pageSize()).subscribe({
      next: (data) => {
        // عند نجاح وصول البيانات من الخادم
        this.subscriptions.set(data); // تحديث الـ Signal بالبيانات القادمة
        this.isLoading.set(false); // إيقاف حالة التحميل
      },
      error: (err) => {
        // في حال حدوث خطأ أثناء الطلب
        console.error('حدث خطأ أثناء جلب البيانات:', err); // طباعة الخطأ في الكونسول
        this.isLoading.set(false); // إيقاف حالة التحميل
      },
    });
  }
  calculateEndDate(startDateStr: string, monthsToAdd: number): string {
    if (!startDateStr) return '';

    // تحويل النص إلى كائن تاريخ Date
    const date = new Date(startDateStr);

    // إضافة عدد الأشهر (endsub) إلى الشهر الحالي
    date.setMonth(date.getMonth() + monthsToAdd);

    // إرجاع التاريخ بصيغة YYYY-MM-DD
    return date.toISOString().split('T')[0];
  }
  // دالة للانتقال إلى الصفحة التالية
  nextPage(): void {
    this.pageNumber.update((page) => page + 1); // زيادة رقم الصفحة بـ 1
    this.loadSubscriptions(); // إعادة تحميل البيانات للصفحة الجديدة
  }

  // دالة للرجوع إلى الصفحة السابقة
  previousPage(): void {
    if (this.pageNumber() > 1) {
      // التأكد من عدم النزول عن الصفحة 1
      this.pageNumber.update((page) => page - 1); // إنقاص رقم الصفحة بـ 1
      this.loadSubscriptions(); // إعادة تحميل البيانات للصفحة الجديدة
    }
  }
}
