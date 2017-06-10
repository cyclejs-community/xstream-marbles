import { OperatorExample } from '../definitions';

export const filter = {
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
};
