import { Sources, Sinks } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';
import { Stream } from 'xstream';
import fromDiagram from 'xstream/extra/fromDiagram';

const noop = () => { };
const dummy = {
  next: noop,
  error: noop,
  complete: noop
};

function main(sources: Sources): Sinks {
  const xs = Stream;
  sources.routes.route$.addListener(dummy);
  const state = model(intent(sources));
  const vdom$ = view(state);
  // TODO: Remove mock
  const route$ = xs.of('map');
  return {
    dom: vdom$,
    routes: route$,
    data: route$
  };
}

export default main;
