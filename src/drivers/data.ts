import { Stream } from 'xstream';
import { operators } from './../data/operators';

export class DataSource {
  data$: Stream<string>;
  constructor(operator$: Stream<string>) {
    const xs = Stream;
    operator$.addListener({
      next: () => {},
      error: () => {},
      complete: () => {}
    });
    this.data$ =
      operator$.map(op =>
        xs
        .fromArray(operators)
        .filter(operator => op === operator))
        .flatten();
  }
}

export function makeDataDriver(): (operator$: Stream<string>) => DataSource {
  function dataDriver(operator$: Stream<string>) {
    return new DataSource(operator$);
  }
  return dataDriver;
}

export default makeDataDriver;
