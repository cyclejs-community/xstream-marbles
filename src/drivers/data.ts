import { Stream, Listener } from 'xstream';
import { examples } from '../data/operators';
import { OperatorExample } from '../definitions';
import { keys } from 'ramda';

const noop = () => {};
const dummyListener = {
  next: noop,
  error: noop,
  complete: noop
};

export class DataSource {
  operators$: Stream<string[]>;
  data$: Stream<OperatorExample>;
  constructor(operator$: Stream<string>) {
    const xs = Stream;
    operator$.addListener(dummyListener);
    this.data$ =
      operator$
        .map(operator => xs.of(examples[operator]))
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
