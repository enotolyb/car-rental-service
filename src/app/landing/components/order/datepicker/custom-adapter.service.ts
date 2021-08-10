import { Injectable } from '@angular/core';
import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Moment } from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Injectable({ providedIn: 'root' })
export class CustomDateAdapter extends MomentDateAdapter implements NgxMatDateAdapter<Moment> {
  getHour(date: Moment): number {
    return +date.format('HH');
  }

  /**
   * Gets the minute component of the given date.
   * @param date The date to extract the month from.
   * @returns The minute component.
   */
  getMinute(date: Moment): number {
    return +date.format('mm');
  }

  /**
   * Gets the second component of the given date.
   * @param date The date to extract the month from.
   * @returns The second component.
   */
  getSecond(date: Moment): number {
    return +date.format('ss');
  }

  /**
   * Set the hour component of the given date.
   * @param date The date to extract the month from.
   * @param value The value to set.
   */
  setHour(date: Moment, value: number): void {
    date.set('hour', value);
  }

  /**
   * Set the second component of the given date.
   * @param date The date to extract the month from.
   * @param value The value to set.
   */
  setMinute(date: Moment, value: number): void {
    date.set('minute', value);
  }

  /**
   * Set the second component of the given date.
   * @param date The date to extract the month from.
   * @param value The value to set.
   */
  setSecond(date: Moment, value: number): void {
    date.set('second', value);
  }

  /**
   * Check if two date have same time
   * @param a Date 1
   * @param b Date 2
   */
  isSameTime(a: Moment, b: Moment): boolean {
    return a.isSame(b);
  }

  /**
   * Copy time from a date to a another date
   * @param toDate
   * @param fromDate
   */
  copyTime(toDate: Moment, fromDate: Moment): void {
    toDate.set('second', +fromDate.format('ss'));
    toDate.set('minute', +fromDate.format('mm'));
    toDate.set('hour', +fromDate.format('HH'));
  }

  /**
   * Compares two dates.
   * @param first The first date to compare.
   * @param second The second date to compare.
   * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
   *     a number greater than 0 if the first date is later.
   */
  compareDateWithTime(first: Moment, second: Moment, showSeconds?: boolean): number {
    return first.toDate().getTime() - second.toDate().getTime();
  }

  /**
   * Set time by using default values
   * @param defaultTime List default values [hour, minute, second]
   */
  setTimeByDefaultValues(date: Moment, [hour, minute, second]: number[]): void {
    date.set('second', second);
    date.set('minute', minute);
    date.set('hour', hour);
  }
}
