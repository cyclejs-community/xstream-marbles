import { Stream } from 'xstream';
import { Marble, OperatorExample } from '../definitions';
import { withCompletionMarble$ } from './helpers';
import { map } from './map';
import { mapTo } from './mapTo';
import { filter } from './filter';
import { take } from './take';
import { drop } from './drop';
import { last } from './last';

export const examples: IndexedOperatorExamples = {
  'map': map,
  'mapTo': mapTo,
  'filter': filter,
  'take': take,
  'drop': drop,
  'last': last
};

interface IndexedOperatorExamples {
  [key: string]: OperatorExample;
}
