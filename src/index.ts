/**
 * Application to show how to log automatically a class.
 */
import { bootstrap } from './bootstrap';
import { Person } from './person';

bootstrap();

try {
  const person: Person = new Person('John', 'Smith');
  person.study(7);
  person.work(10);
  person.sleep(8);
} catch (err) {
  // eat it!
}
