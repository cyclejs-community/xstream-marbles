import { Stream } from 'xstream';
import { Marble, OperatorExample } from '../definitions';

export const examples: IndexedOperatorExamples = {
  'map': {
    inputs: [
      [ { data: '1', time: 20 }, { data: '3', time: 40 }, { data: '7', time: 60 } ]
    ],
    label: 'map(x => x * 10)',
    operate: input$ => [input$.map(({ data, time }) => ({ data: (parseInt(data) * 10).toString(), time }))]
  },
  'mapTo': {
    inputs: [
      [ { data: '1', time: 20 }, { data: '3', time: 40 }, { data: '7', time: 60 } ]
    ],
    label: 'mapTo(10)',
    operate: input$ => [input$.map(({ data, time }) => ({ data: '10', time }))]
  },
};

interface IndexedOperatorExamples {
  [key: string]: OperatorExample;
}
