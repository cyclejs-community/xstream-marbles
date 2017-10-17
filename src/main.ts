import { Sources, Sinks } from './definitions';
import { view } from './view';
import { Stream } from 'xstream';
import fromDiagram from 'xstream/extra/fromDiagram';

function main(sources: Sources): Sinks {
  const vdom$ = view(sources);
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
