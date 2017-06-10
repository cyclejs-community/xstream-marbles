import { OperatorExample } from '../definitions';

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
  operate: input$ => [
    input$.map(({ data, time, complete }) => ({ data: data && (parseInt(data) * 10).toString(), time, complete }))
  ]
};
