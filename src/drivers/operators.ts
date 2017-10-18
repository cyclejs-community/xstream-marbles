import { Stream, Listener } from 'xstream';
import { operators } from '../data/operators';
import { Operator } from '../definitions';
import { keys } from 'ramda';

const noop = () => {};
const dummyListener = {
  next: noop,
  error: noop,
  complete: noop
};

export class OperatorsSource {
  operators$: Stream<string[]>;
  operator$: Stream<Operator>;
  constructor(operator$: Stream<string>) {
    const xs = Stream;
    operator$.addListener(dummyListener);
    this.operator$ =
      operator$
        .map(operator => xs.of(operators[operator]))
        .flatten();
    this.operators$ =
      xs.of(keys(operators)).remember();
  }
}

export function makeOperatorsDriver(): (operator$: Stream<string>) => OperatorsSource {
  function operatorsDriver(operator$: Stream<string>) {
    return new OperatorsSource(operator$);
  }
  return operatorsDriver;
}
