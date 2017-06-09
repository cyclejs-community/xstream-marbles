import { Stream } from 'xstream';
import { div, span, VNode } from '@cycle/dom';
import { Marble, State } from './definitions';
import { StreamView } from './components/StreamView';

function view({ inputs$, label$, outputs$ }: State): Stream<VNode> {
  const xs = Stream;
  const inputsDom$ =
    inputs$
      .map(inputs => {
        const streamViews = inputs.map(marbles => StreamView({ marbles$: xs.of(marbles) }));
        const streamViewDoms$: Stream<VNode[]> = xs.combine(...streamViews.map(sv => sv.dom));
        const streamViewDom$ = streamViewDoms$.map(doms => div('.inputs', doms));
        return streamViewDom$;
      })
      .flatten();
  const labelDom$ =
    label$
      .map(label => div('.label', [label]));
  const outputsDom$ =
    outputs$
      .map(outputs => {
        const streamViews = outputs.map(marbles => StreamView({ marbles$: xs.of(marbles) }));
        const streamViewDoms$: Stream<VNode[]> = xs.combine(...streamViews.map(sv => sv.dom));
        const streamViewDom$ = streamViewDoms$.map(doms => div('.inputs', doms));
        return streamViewDom$;
      })
      .flatten();
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
