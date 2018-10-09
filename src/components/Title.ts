import { Stream } from 'xstream';
import { VNode, h1 } from '@cycle/dom';
import { cssRaw } from 'typestyle';

interface Sinks {
  dom: Stream<VNode>;
}

export const Title = (): Sinks => ({
  dom: Stream.of(
    h1('.title', [ 'xstream marbles' ])
  )
});
