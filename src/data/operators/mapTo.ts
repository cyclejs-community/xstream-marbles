import { toMarbleStream } from './helpers';

export const mapTo = {
  inputs: [
    [
      { data: '1', time: 25 },
      { data: '3', time: 30 },
      { data: '7', time: 50 },
      { time: 100, complete: true }
    ]
  ],
  label: 'mapTo(10)',
  operate: input$ => toMarbleStream(input$, input$ => input$.mapTo('10'))
};
