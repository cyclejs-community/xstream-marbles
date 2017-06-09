import { Stream } from 'xstream';
import { Intent } from './intent';
import { State, Marble, OperatorExample } from './definitions';

export const getOutputs = (example: OperatorExample) =>
  Stream
    .fromArray(
      example.operate(...example.inputs.map(input => Stream.fromArray(input)))
        .map(marble$ => marble$.fold((marbles, marble) => marbles.concat(marble), [] as Marble[]).last())
    )
    .flatten()
    .fold((outputs, output) => outputs.concat([output]), [] as Marble[][])
    .last();

function model({ operator$ }: Intent): State {
  const inputs$ = operator$.map(({ inputs }) => Stream.of(inputs)).flatten();
  const label$ = operator$.map(({ label }) => Stream.of(label)).flatten();
  const outputs$ = operator$.map(example => getOutputs(example)).flatten();
  return {
    inputs$,
    label$,
    outputs$
  };
}

export default model;
