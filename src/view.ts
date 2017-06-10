import { Stream } from 'xstream';
import { div, span, VNode } from '@cycle/dom';
import { Marble, State } from './definitions';
import { StreamView } from './components/StreamView';
import { Sidebar } from './components/Sidebar';
import { cssRaw } from 'typestyle';

cssRaw(`
  .container {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .content {
    position: absolute;
    left: 280px;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .label {
    border: 1px solid #ddd;
    padding: 20px;
    font-size: 30px;
    margin: 30px;
    text-align: center;
  }
`);

function view({ inputs$, label$, output$, operators$ }: State): Stream<VNode> {
  const xs = Stream;
  const toDom$ = (streams$: Stream<Marble[][]>, selector: string): Stream<VNode> => {
    return streams$
      .map(inputs => {
        const streamViews = inputs.map(marbles => StreamView({ marbles$: xs.of(marbles) }));
        const streamViewDoms$: Stream<VNode[]> = xs.combine(...streamViews.map(sv => sv.dom));
        const streamViewDom$ = streamViewDoms$.map(doms => div(selector, doms));
        return streamViewDom$;
      })
      .flatten();
  };
  const sidebarDom$ = Sidebar({ operators$ }).dom;
  const inputsDom$ = toDom$(inputs$, '.inputs');
  const labelDom$ = label$.map(label => div('.label', [label]));
  const outputsDom$ = StreamView({ marbles$: output$ }).dom.map(dom => div('.output', [dom]));
  const vdom$ =
    xs.combine(sidebarDom$, inputsDom$, labelDom$, outputsDom$)
      .map(([sidebarDom, inputsDom, labelDom, outputsDom]) =>
        div('.container', [
          sidebarDom,
          div('.content', [
            inputsDom,
            labelDom,
            outputsDom
          ])
        ])
      );
  return vdom$;
}

export default view;
