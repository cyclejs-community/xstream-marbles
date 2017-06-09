import { ISources, ISinks } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';
import { Stream } from 'xstream';
import { operators, outputs$ } from './data/operators';
import fromDiagram from 'xstream/extra/fromDiagram';

const noop = () => { };
const dummy = {
  next: noop,
  error: noop,
  complete: noop
};

function main(sources: ISources): ISinks {
  const xs = Stream;
  sources.routes.route$.addListener(dummy);
  sources.data.data$.addListener({
    next: example => outputs$(example).forEach(output$ => output$.debug().addListener(dummy)),
    error: () => { },
    complete: () => { }
  });
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
