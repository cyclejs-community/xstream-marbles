import { Stream } from 'xstream';
import { Marble, Operator } from '../../definitions';
import { withCompletionMarble$ } from './helpers';
import { map } from './map';
import { mapTo } from './mapTo';
import { filter } from './filter';
import { take } from './take';
import { drop } from './drop';
import { last } from './last';

interface Operators {
  [key: string]: Operator;
}

export const operators: Operators = {
  'map': map,
  'mapTo': mapTo,
  'filter': filter,
  'take': take,
  'drop': drop,
  'last': last
};
