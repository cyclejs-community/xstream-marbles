import { Stream } from 'xstream';
import { div, span, VNode } from '@cycle/dom';
import { Marble, State } from './definitions';
import { StreamView } from './components/StreamView';
import { cssRaw } from 'typestyle';

cssRaw(`
  .label {
    border: 1px solid #ddd;
    padding: 20px;
    font-size: 30px;
    margin: 30px;
    text-align: center;
  }
`);

function view({ inputs$, label$, outputs$ }: State): Stream<VNode> {
  const xs = Stream;
  const toDom$ = (streams$: Stream<Marble[][]>, selector: string): Stream<VNode> => {
    return streams$
      .map(inputs => {
        const streamViews = inputs.map(marbles => StreamView({ marbles$: xs.of(marbles) }));
        const streamViewDoms$: Stream<VNode[]> = xs.combine(...streamViews.map(sv => sv.dom));
        const streamViewDom$ = streamViewDoms$.map(doms => div(selector, doms));
        return streamViewDom$;
      })
      .flatten();
  };
  const inputsDom$ = toDom$(inputs$, '.inputs');
  const labelDom$ = label$.map(label => div('.label', [label]));
  const outputsDom$ = toDom$(outputs$, '.outputs');
  const vdom$ =
    xs.combine(inputsDom$, labelDom$, outputsDom$)
      .map(([inputsDom, labelDom, outputsDom]) =>
        div('#root', [
          div('#container', [
            inputsDom,
            labelDom,
            outputsDom
          ]),
        ])
      );
  return vdom$;
}

export default view;
