import { Stream } from 'xstream';
import { Marble, OperatorExample } from '../definitions';
import { withCompletionMarble$ } from './helpers';

export const examples: IndexedOperatorExamples = {
  'map': {
    inputs: [
      [
        { data: '1', time: 25 },
        { data: '3', time: 30 },
        { data: '7', time: 50 },
        { time: 100, complete: true }
      ]
    ],
    label: 'map(x => 10 * x)',
    operate: input$ => [
      input$.map(({ data, time, complete }) => ({ data: data && (parseInt(data) * 10).toString(), time, complete }))
    ]
  },
  'mapTo': {
    inputs: [
      [
        { data: '1', time: 25 },
        { data: '3', time: 30 },
        { data: '7', time: 50 },
        { time: 100, complete: true }
      ]
    ],
    label: 'mapTo(10)',
    operate: input$ => [
      input$.map(({ data, time, complete }) => ({ data: data && '10', time, complete }))
    ]
  },
  'filter': {
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
    label: 'filter(x => x > 1)',
    operate: input$ => [
      input$.filter(({ data, complete }) => complete != undefined || parseInt(data) > 1)
    ]
  },
  'take': {
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
    label: 'take(4)',
    operate: input$ => [
      withCompletionMarble$(input$.take(4))
    ]
  },
  'drop': {
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
    label: 'drop(4)',
    operate: input$ => [
      input$.drop(4)
    ]
  },
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
