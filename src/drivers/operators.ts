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

export class OperatorsSource {
  operators$: Stream<string[]>;
  operator$: Stream<OperatorExample>;
  constructor(operator$: Stream<string>) {
    const xs = Stream;
    operator$.addListener(dummyListener);
    this.operator$ =
      operator$
        .map(operator => xs.of(examples[operator]))
        .flatten();
    this.operators$ =
      xs.of(keys(examples)).remember();
  }
}

export function makeOperatorsDriver(): (operator$: Stream<string>) => OperatorsSource {
  function operatorsDriver(operator$: Stream<string>) {
    return new OperatorsSource(operator$);
  }
  return operatorsDriver;
}
