import { OperatorExample } from '../definitions';

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
  operate: input$ => [
    input$.map(({ data, time, complete }) => ({ data: data && '10', time, complete }))
  ]
};
