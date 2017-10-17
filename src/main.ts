import { Sources, Sinks } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';
import { Stream } from 'xstream';
import fromDiagram from 'xstream/extra/fromDiagram';

function main(sources: Sources): Sinks {
  const state = model(intent(sources));
  const vdom$ = view(state);
  const data$ =
    sources.history
      .map(route => route.pathname.replace('/', ''))
      .map(path => (path || 'map'));
  return {
    dom: vdom$,
    data: data$
  };
}

export default main;
