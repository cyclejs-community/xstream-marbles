import { Stream } from 'xstream';
import { div, label, input, hr, h1, VNode } from '@cycle/dom';
import { IMarble, IState } from './definitions';

function renderMarble(marble: IMarble): VNode {
  return div('.marble', {
    style: {
      'z-index': marble.time,
      left: marble.time.toString() + '%'
    }
  }, marble.data);
}

function view(state: IState): Stream<VNode> {
  const xs = Stream;
  const vdom$ =
    state.marbles$
      .map(marbles =>
        div('#root', [
          div('#container', [
            div('.stream', marbles.map(renderMarble))
          ]),
        ])
      );
  return vdom$;
}

export default view;
