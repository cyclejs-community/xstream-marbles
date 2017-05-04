import { ISources, ISinks } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';
import { Stream } from 'xstream';
import { operators } from './data/operators';

function main(sources: ISources): ISinks {
  const xs = Stream;
  sources.routes.route$.addListener({
    next: route => console.log('route: ' + route),
    error: () => { },
    complete: () => { }
  });
  sources.data.data$.addListener({
    next: operator => console.log('operator: ' + operator),
    error: () => { },
    complete: () => { }
  });
  const state = model(intent(sources));
  const vdom$ = view(state);
  const route$ = xs.periodic(1000).map(i => operators[i % 15]);
  return {
    dom: vdom$,
    routes: route$,
    data: route$
  };
}

export default main;