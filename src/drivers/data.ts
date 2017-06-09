import { Stream } from 'xstream';
import { examples } from '../data/operators';
import { OperatorExample } from '../definitions';

export class DataSource {
  data$: Stream<OperatorExample>;
  constructor(operator$: Stream<string>) {
    const xs = Stream;
    operator$.addListener({
      next: () => {},
      error: () => {},
      complete: () => {}
    });
    this.data$ =
      operator$
        .map(op => xs.of(examples[op]))
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
