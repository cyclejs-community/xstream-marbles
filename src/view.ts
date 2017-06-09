import { Stream } from 'xstream';
import { div, span, VNode } from '@cycle/dom';
import { Marble, State } from './definitions';

function renderMarble(marble: Marble): VNode {
  return div('.marble', {
    style: {
      'z-index': marble.time,
      left: `calc(${marble.time}% - 32px)`
    }
  }, [span([marble.data])]);
}

function view(state: State): Stream<VNode> {
  const xs = Stream;
  const vdom$ =
    xs.combine(state.inputs$, state.label$, state.outputs$)
      .map(([ inputs, label, outputs]) => 
        div('#root', [
          div('#container', [
            ...inputs.map(marbles => div('.stream', marbles.map(renderMarble))),
            div('.label', [label]),
            ...outputs.map(marbles => div('.stream', marbles.map(renderMarble)))
          ]),
        ])
      );
  return vdom$;
}

export default view;
