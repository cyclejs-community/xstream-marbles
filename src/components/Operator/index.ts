import { Stream } from 'xstream';
import { Operator as IOperator, Marble } from '../../definitions';
import { DOMSource, VNode, div } from '@cycle/dom';
import isolate from '@cycle/isolate';
import { StreamView, ReadonlyStreamView } from './StreamView';

interface Sources {
  dom: DOMSource;
  operator$: Stream<IOperator>;
}

interface Sinks {
  dom: Stream<VNode>;
}

const xs = Stream;

const getOutputs = ({ operate, inputs }: IOperator): Stream<Marble[]> =>
  operate(...inputs.map(input => Stream.fromArray(input)))
    .fold((marbles, marble) => marbles.concat(marble), [] as Marble[])
    .last();

const OperatorComponent = ({ operator$, dom }: Sources): Sinks => {
  const vdom$ =
    operator$
      .map(({ inputs, label, operate }) => {
        const inputStreams = inputs.map(marbles => StreamView({ dom, marbles$: xs.of(marbles) }));
        const inputDoms$: Stream<VNode[]> = xs.combine(...inputStreams.map(sv => sv.dom));
        const outputDom$ = ReadonlyStreamView({ marbles$: getOutputs({ inputs, label, operate }) }).dom;
        return xs.combine(inputDoms$, outputDom$)
          .map(([inputs, output]) =>
            div('.operator', [
              div('.inputs', inputs),
              div('.label', [label]),
              div('.output', [output])
            ])
          )
      }).flatten();
  return {
    dom: vdom$
  };
};

export const Operator = (sources: Sources): Sinks => isolate(OperatorComponent)(sources);
