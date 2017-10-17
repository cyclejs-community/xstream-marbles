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
  const inputs$ = operator$.map(operator => operator.inputs);
  const label$ = operator$.map(operator => operator.label);
  const outputs$ = operator$.map(operator => getOutputs(operator)).flatten();
  const inputsDom$ = toDom$(inputs$, '.inputs', dom);
  const labelDom$ = label$.map(label => div('.label', [label]));
  const outputsDom$ = ReadonlyStreamView({ marbles$: outputs$ }).dom.map(dom => div('.output', [dom]));
  const vdom$ = xs.combine(inputsDom$, labelDom$, outputsDom$).map(doms => div('.operator', doms));
  return {
    dom: vdom$
  };
};

export const Operator = (sources: Sources) => isolate(OperatorComponent)(sources);
