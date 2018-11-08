import 'reflect-metadata';
import { Container, containerManager, Log, TYPES, PinoLogger } from 'log-decorator-ts';

export function bootstrap() {
  const container: Container = containerManager.getContainer();
  container.bind<Log>(TYPES.Log).to(PinoLogger);
}
