import { Sources, OperatorExample } from './definitions';
import { Stream } from 'xstream';

export interface Intent {
  example$: Stream<OperatorExample>;
  operators$: Stream<string[]>;
}

function intent({ data }: Sources): Intent {
  return {
    example$: data.data$,
    operators$: data.operators$
  };
}

export default intent;
