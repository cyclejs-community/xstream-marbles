import { Sources } from './definitions';
import { Stream } from 'xstream';

export interface Intent {
  name$: Stream<string>
}

function intent(sources: Sources): Intent {
  const dom = sources.dom;
  const intent = {
    name$: dom
      .select('.field')
      .events('input')
      .map(ev => (ev.target as HTMLInputElement).value)
      .startWith('')
  };
  return intent;
}

export default intent;
