import { logClass } from 'log-decorator-ts';

@logClass
export class Person {
  public name: string;
  public surname: string;
  private hours: number;

  constructor(name : string, surname : string) {
    this.name = name;
    this.surname = surname;
    this.hours = 0;
  }

  private check(hours): number {
    this.hours += hours;
    if (this.hours > 24) {
      throw new Error('You have only 24 hours per day!');
    }
    return this.hours;
  }

  public study(hours: number): number {
    return this.check(hours);
  }

  public work(hours: number): number {
    return this.check(hours);
  }

  public sleep(hours: number): number {
    return this.check(hours);
  }
}
