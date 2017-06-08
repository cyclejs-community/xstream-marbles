import { ISources, ISinks } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';
import { Stream } from 'xstream';
import { operators } from './data/operators';
import fromDiagram from 'xstream/extra/fromDiagram';

function main(sources: ISources): ISinks {
  const xs = Stream;
  sources.routes.route$.addListener({
    next: route => console.log('route: ' + route),
    error: () => { },
    complete: () => { }
  });
  sources.data.data$.addListener({
    next: example => {
      console.log(example);
      console.log(example.inputs[0]);
      example.operate(fromDiagram(example.inputs[0].value, example.inputs[0].options))[0].addListener({
        next: ev => console.log(ev),
        error: () => { },
        complete: () => { }
      });
    },
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
