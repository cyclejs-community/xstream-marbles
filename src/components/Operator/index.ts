import { Stream } from 'xstream';
import { OperatorExample, Marble } from '../../definitions';
import { DOMSource, VNode, div } from '@cycle/dom';
import isolate from '@cycle/isolate';
import { StreamView, ReadonlyStreamView } from './StreamView';

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
      }).flatten();
  return {
    dom: vdom$
  };
};

export const Operator = (sources: Sources) => isolate(OperatorComponent)(sources);
