import { OperatorExample } from '../definitions';
import { withCompletionMarble$ } from './helpers';

export const take = {
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
};
