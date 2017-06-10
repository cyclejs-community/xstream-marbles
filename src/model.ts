import { Stream } from 'xstream';
import { Intent } from './intent';
import { State, Marble, OperatorExample } from './definitions';

export const getOutputs = (example: OperatorExample): Stream<Marble[]> =>
  example.operate(...example.inputs.map(input => Stream.fromArray(input)))
    .fold((marbles, marble) => marbles.concat(marble), [] as Marble[]).last();

function model({ example$, operators$ }: Intent): State {
  const inputs$ = example$.map(({ inputs }) => Stream.of(inputs)).flatten();
  const label$ = example$.map(({ label }) => Stream.of(label)).flatten();
  const output$ = example$.map(example => getOutputs(example)).flatten();
  return {
    inputs$,
    label$,
    output$,
    operators$
  };
}

export default model;
