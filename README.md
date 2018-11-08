# Log Example

Example of different features from Typescript.

## Using this code

Clone the repo, then:

```
npm install
npm start
```

## Decorators

A class Person with different methods is defined, and simply adding a decorator at the definition, automatically all methods are decorated including constructors:

```typescript
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
```

With this example, when an instance of the class is created or one method is invoked, automatically the action is logged, including exceptions even if are catched.
Example of output:

```
[2018-11-8 17:06:42 Person.constructor] Enter method
        Function arguments:     [name=John] [surname=Smith]
        Class properties:       [length=2] [prototype=[object Object]] [name=Person]
[2018-11-8 17:06:42 Person.constructor] Exit method
        Function arguments:     [name=John] [surname=Smith] [return=undefined]
        Class properties:       [length=2] [prototype=[object Object]] [name=Person]
[2018-11-8 17:06:42 Person.study] Enter method
        Function arguments:     [hours=7]
        Class properties:       [length=1] [name=study]
[2018-11-8 17:06:42 Person.check] Enter method
        Function arguments:     [hours=7]
        Class properties:       [length=1] [name=check]
[2018-11-8 17:06:42 Person.check] Exit method
        Function arguments:     [hours=7] [return=7]
        Class properties:       [length=1] [name=check]
[2018-11-8 17:06:42 Person.study] Exit method
        Function arguments:     [hours=7] [return=7]
        Class properties:       [length=1] [name=study]
[2018-11-8 17:06:42 Person.work] Enter method
        Function arguments:     [hours=10]
        Class properties:       [length=1] [name=work]
```

There is also the decorator @logMethod to decorate only the methods that you want and not the entire class, example to avoid some private methods.

## Interfaces and Dependency Injection

There is an interface ```Log``` symboliced by ```TYPES.Log```. This interface represents the contract that any logger must have, and is implemented by ```PinoLogger``` and ```ConsoleLogger```, but any other implementation of the interface can be used. At the bootstrap time, we can decide in the inversion container, which implementation of the interface we want for each interface, and those implementation will be automatically injected in all the classes that uses this interfaces. In this case, the logger decorator use an interface Log that is replace automatically by a Pino implementation decided in the bootstrap:

```typescript
import 'reflect-metadata';
import { Container, containerManager, Log, TYPES, PinoLogger } from 'log-decorator-ts';

export function bootstrap() {
  const container: Container = containerManager.getContainer();
  container.bind<Log>(TYPES.Log).to(PinoLogger);
}
```
