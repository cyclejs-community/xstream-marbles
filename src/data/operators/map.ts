import { toMarbleStream } from './helpers';

export const map = {
  inputs: [
    [
      { data: '1', time: 25 },
      { data: '3', time: 30 },
      { data: '7', time: 50 },
      { time: 100, complete: true }
    ]
  ],
  label: 'map(x => 10 * x)',
  operate: input$ => toMarbleStream(input$, input$ => input$.map(x => 10 * parseInt(x)).map(x => x.toString()))
};
