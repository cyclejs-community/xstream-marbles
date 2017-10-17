import { Stream } from 'xstream';
import { OperatorExample, Marble } from '../../definitions';
import { DOMSource, VNode, div } from '@cycle/dom';
import isolate from '@cycle/isolate';
import { StreamView, ReadonlyStreamView } from './StreamView';
import delay from 'xstream/extra/delay';

interface Sources {
  dom: DOMSource;
  operator$: Stream<OperatorExample>;
}

interface Sinks {
  dom: Stream<VNode>;
}

const xs = Stream;

const getOutputs = (example: OperatorExample): Stream<Marble[]> =>
  example.operate(...example.inputs.map(input => Stream.fromArray(input)))
    .fold((marbles, marble) => marbles.concat(marble), [] as Marble[]).last();

const toDom$ = (streams$: Stream<Marble[][]>, selector: string, dom: DOMSource): Stream<VNode> =>
  streams$
    .map(inputs => {
      const streamViews = inputs.map(marbles => StreamView({ dom, marbles$: xs.of(marbles) }));
      const streamViewDoms$: Stream<VNode[]> = xs.combine(...streamViews.map(sv => sv.dom));
      const streamViewDom$ = streamViewDoms$.map(doms => div(selector, doms));
      return streamViewDom$;
    })
    .flatten();

const OperatorComponent = ({ operator$, dom }: Sources): Sinks => {
  const vdom$ =
    operator$
      .map(({ inputs, label, operate }) => {
        const inputStreams = inputs.map(marbles => StreamView({ dom, marbles$: xs.of(marbles) }));
        const inputDoms$: Stream<VNode[]> = xs.combine(...inputStreams.map(sv => sv.dom));
        const outputDoms$ = ReadonlyStreamView({ marbles$: getOutputs({ inputs, label, operate }) }).dom;
        return xs.combine(inputDoms$, outputDoms$)
          .map(([inputs, outputs]) =>
            div('.operator', [
              div('.inputs', inputs),
              div('.label', [label]),
              div('.output', outputs)
            ])
          )
          .compose(delay(10))
          .startWith(undefined)
      }).flatten();
  return {
    dom: vdom$
  };
};

export const Operator = (sources: Sources) => isolate(OperatorComponent)(sources);
