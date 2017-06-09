import { Stream } from 'xstream';
import { examples } from '../data/operators';
import { OperatorExample } from '../definitions';
import { keys } from 'ramda';

const dummy = {
  next: () => { },
  error: () => { },
  complete: () => { }
};

export class DataSource {
  operators$: Stream<string[]>;
  data$: Stream<OperatorExample>;
  constructor(operator$: Stream<string>) {
    const xs = Stream;
    operator$.addListener(dummy);
    this.data$ =
      operator$
        .map(op => xs.of(examples[op]))
        .flatten();
    this.operators$ =
      xs.of(keys(examples)).remember();
  }
}

export function makeDataDriver(): (operator$: Stream<string>) => DataSource {
  function dataDriver(operator$: Stream<string>) {
    return new DataSource(operator$);
  }
  return dataDriver;
}

export default makeDataDriver;
