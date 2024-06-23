import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-DatePicker',
  templateUrl: './date-picker.component.html'
})
export class DatePickerComponent implements OnInit {
  MONTH_NAMES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  DAYS = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab'];
  showDatepicker = false;
  datepickerValue: string = '';
  month: number = 0;
  year: number = 0;
  no_of_days: number[] = [];
  blankdays: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
  }

  initDate() {
    const today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = this.formatDate(today); // Inicializar con la fecha actual formateada
  }

  formatDate(date: Date): string {
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  isToday(date: number): boolean {
    const today = new Date();
    return this.year === today.getFullYear() && this.month === today.getMonth() && date === today.getDate();
  }

  getDateValue(date: number) {
    this.datepickerValue = this.formatDate(new Date(this.year, this.month, date));
    this.showDatepicker = false;
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    const dayOfWeek = new Date(this.year, this.month).getDay();
    const blankdaysArray = Array(dayOfWeek).fill(0).map((x, i) => i + 1);

    const daysArray = Array(daysInMonth).fill(0).map((x, i) => i + 1);

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

  trackByIdentity(index: number, item: any): any {
    return item;
  }
}
