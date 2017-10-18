import { Stream, MemoryStream } from 'xstream';
import { DOMSource, VNode, div, aside, main } from '@cycle/dom';
import { OperatorsSource } from '../drivers/operators';
import { Location } from '@cycle/history';
import { Sidebar } from './Sidebar';
import { Operator } from './Operator';
import { cssRaw } from 'typestyle';
import delay from 'xstream/extra/delay';

cssRaw(`
  html, body {
    font-size: 100%;
    height: 100%;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Source Sans Pro", sans-serif;
  }

  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  #app {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .container {
    display: flex;
    height: 100%;
  }

  aside {
    flex: 0 1 30%;
    max-width: 280px;
  }

  main {
    flex: 1;
  }

  main, aside {
    padding: 1rem;
  }

  .label {
    border: 1px solid #ddd;
    padding: 20px;
    font-size: 30px;
    margin: 30px;
    text-align: center;
  }
`);

interface Sources {
  dom: DOMSource;
  history: MemoryStream<Location>;
  operators: OperatorsSource;
}

interface Sinks {
  dom: Stream<VNode>;
  operators: Stream<string>;
}

export const App = ({ history, dom, operators: { operator$, operators$ } }: Sources): Sinks => {
  const xs = Stream;
  const sidebarDom$ = Sidebar({ operators$ }).dom;
  const operatorDom$ =
    operator$.map(operator =>
      Operator({ operator$: xs.of(operator), dom })
        .dom
        .compose(delay(10))
        .startWith(null)
    ).flatten();
  const vdom$ =
    xs.combine(sidebarDom$, operatorDom$)
      .map(([sidebar, operator]) =>
        div('.container', [
          aside([sidebar]),
          main([operator])
        ])
      );
  const operatorRequest$ =
    history
      .map(route => route.pathname.replace('/', ''))
      .map(path => (path || 'map'));
  return {
    dom: vdom$,
    operators: operatorRequest$
  };
};
