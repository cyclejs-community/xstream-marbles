import { Stream } from 'xstream';
import { Marble, OperatorExample } from '../definitions';

export const examples: IndexedOperatorExamples = {
  'map': {
    inputs: [
      [{ data: '1', time: 25 }, { data: '3', time: 30 }, { data: '7', time: 50 }]
    ],
    label: 'map(x => 10 * x)',
    operate: input$ => [input$.map(({ data, time }) => ({ data: (parseInt(data) * 10).toString(), time }))]
  },
  'mapTo': {
    inputs: [
      [{ data: '1', time: 25 }, { data: '3', time: 30 }, { data: '7', time: 50 }]
    ],
    label: 'mapTo(10)',
    operate: input$ => [input$.map(({ data, time }) => ({ data: '10', time }))]
  },
  'filter': {
    inputs: [
      [{ data: '1', time: 20 }, { data: '2', time: 25 }, { data: '1', time: 30 }, { data: '1', time: 45 }, { data: '7', time: 50 }, { data: '4', time: 60 }]
    ],
    label: 'filter(x => x > 1)',
    operate: input$ => [input$.filter(({ data }) => parseInt(data) > 1)]
  },
  'take': {
    inputs: [
      [{ data: '1', time: 20 }, { data: '2', time: 25 }, { data: '1', time: 30 }, { data: '1', time: 45 }, { data: '7', time: 50 }, { data: '4', time: 60 }]
    ],
    label: 'take(4)',
    operate: input$ => {
      const output$ = Stream.create<Marble>();
      let lastTime = 0;
      setTimeout(() =>
        input$.take(4)
          .addListener({
            next: marble => {
              lastTime = marble.time;
              output$.shamefullySendNext(marble);
            },
            complete: () => {
              output$.shamefullySendNext({ time: lastTime, complete: true, data: '|' });
              output$.shamefullySendComplete();
            },
            error: err => output$.shamefullySendError(err)
          }), 30);
      return [output$];
    }
  },
};

interface IndexedOperatorExamples {
  [key: string]: OperatorExample;
}
