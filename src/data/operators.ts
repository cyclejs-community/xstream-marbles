import { Stream } from 'xstream';
import { Marble, OperatorExample } from '../definitions';
import { withCompletionMarble$ } from './helpers';
import { map } from './map';
import { mapTo } from './mapTo';
import { filter } from './filter';
import { take } from './take';
import { drop } from './drop';

export const examples: IndexedOperatorExamples = {
  'map': map,
  'mapTo': mapTo,
  'filter': filter,
  'take': take,
  'drop': drop,
  'last': {
    inputs: [
      [
        { data: '1', time: 20 },
        { data: '2', time: 25 },
        { data: '1', time: 30 },
        { data: '1', time: 45 },
        { data: '7', time: 50 },
        { data: '4', time: 60 },
        { time: 100, complete: true }
      ]
    ],
    label: 'last()',
    operate: input$ => [
      withCompletionMarble$(input$.last().map(({ time }) =>input$.filter(({ complete }) => !complete).last().map(({ data }) => ({ data, time }))).flatten())
    ]
  }
};

interface IndexedOperatorExamples {
  [key: string]: OperatorExample;
}
