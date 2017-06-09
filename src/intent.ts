import { Sources, OperatorExample } from './definitions';
import { Stream } from 'xstream';

export interface Intent {
  operator$: Stream<OperatorExample>;
}

function intent(sources: Sources): Intent {
  const data = sources.data;
  return { operator$: data.data$ };
}

export default intent;
