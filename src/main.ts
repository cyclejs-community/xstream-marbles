import { ISources, ISinks } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';
import { Stream } from 'xstream';

function main(sources: ISources): ISinks {
  const xs = Stream;
  sources.routes.route$.addListener({
    next: route => console.log(route),
    error: () => {},
    complete: () => {}
  });
  const state = model(intent(sources)); 
  const vdom$ = view(state);
  const route$ = xs.periodic(1000).mapTo('sunday');
  return {
      dom: vdom$,
      routes: route$
  };
}

export default main;
