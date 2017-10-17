import { Stream } from 'xstream';
import { div, aside, main, VNode } from '@cycle/dom';
import { Marble, State, Sources } from './definitions';
import { Sidebar } from './components/Sidebar';
import { Operator } from './components/Operator';
import { cssRaw } from 'typestyle';

cssRaw(`
  .container {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  aside {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 280px;
  }
  main {
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

export const view = ({ dom, data: { data$: operator$, operators$ } }: Sources): Stream<VNode> => {
  const xs = Stream;
  const sidebarDom$ = Sidebar({ operators$ }).dom;
  const operatorDom$ = Operator({ operator$, dom }).dom;
  const vdom$ =
    xs.combine(sidebarDom$, operatorDom$)
      .map(([sidebar, operator]) =>
        div('.container', [
          aside([sidebar]),
          main(operator)
        ])
      );
  return vdom$;
}
