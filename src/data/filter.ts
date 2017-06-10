import { OperatorExample } from '../definitions';
import { toMarbleStream } from './helpers';

export const filter = {
  inputs: [
    [
      { data: '10', time: 20 },
      { data: '20', time: 25 },
      { data: '10', time: 30 },
      { data: '30', time: 45 },
      { data: '7', time: 50 },
      { data: '40', time: 60 },
      { time: 100, complete: true }
    ]
  ],
  label: 'filter(x => x > 10)',
  operate: input$ => toMarbleStream(input$, input$ => input$.filter(x => parseInt(x) > 10))
};
