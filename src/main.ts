import { ISources, ISinks } from './definitions';
import intent from './intent';
import model from './model';
import view from './view';
import { Stream } from 'xstream';
import { operators } from './data/operators';
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
    next: example => {
      console.log(example);
      console.log(example.inputs[0]);
      const input$: Stream<string> = fromDiagram(example.inputs[0].value, example.inputs[0].options);
      const output$ = Stream.merge(Stream.of('_FIRST_'), example.operate(input$)[0]);
      const periodic$ = Stream.periodic(20).take(100);
      Stream.combine(periodic$, output$)
        .fold(({ value, last }, [period, output]) => ({ value: value + (output === last ? '-' : output), last: output }), { value: '', last: '_FIRST_' })
        .map(result => result.value)
        .debug()
        .addListener(dummy);
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
