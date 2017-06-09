import { Stream } from 'xstream';
import { IMarble } from '../definitions';

export const operators: string[] = [
  'map',
  'mapTo',
  'filter',
  'take',
  'drop',
  'last',
  'startWith',
  'endWhen',
  'fold',
  'replaceError',
  'flatten',
  'compose',
  'remember',
  'debug',
  'imitate'
];

export const examples: IndexedOperatorExamples = {
  'map': {
    inputs: [
      [ { data: '1', time: 20 }, { data: '3', time: 40 }, { data: '7', time: 60 } ]
    ],
    label: 'map(x => x * 10)',
    operate: input$ => [input$.map(({ data, time }) => ({ data: (parseInt(data) * 10).toString(), time }))]
  }
};

interface IndexedOperatorExamples {
  [key: string]: OperatorExample;
}

interface AnyObject {
  [x: string]: any;
}

export interface OperatorExample {
  inputs: IMarble[][];
  label: string;
  operate: (...inputs: Stream<IMarble>[]) => Stream<IMarble>[];
}

export const outputs$ = (example: OperatorExample): Stream<IMarble[]>[] =>
  example.operate(...example.inputs.map(input => Stream.fromArray(input)))
    .map(marble$ => marble$.fold((marbles, marble) => marbles.concat(marble), [] as IMarble[]).last());
