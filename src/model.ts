import { Stream } from 'xstream';
import { IIntent } from './intent';
import { IState, IMarble } from './definitions';

function model(intent: IIntent): IState {
  const xs = Stream;
  const marbles: IMarble[] = [
    {
      data: '2',
      time: 1
    },
    {
      data: '3',
      time: 10
    },
    {
      data: '5',
      time: 15
    },
    {
      data: '7',
      time: 20
    },
    {
      data: '11',
      time: 25
    },
    {
      data: '13',
      time: 30
    }
  ];
  const marbles$ = xs.of(marbles);
  return {
    marbles$
  };
}

export default model;
