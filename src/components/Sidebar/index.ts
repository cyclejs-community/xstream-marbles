import { Stream } from 'xstream';
import { VNode, DOMSource, nav, ul, li, a, div } from '@cycle/dom';
import { cssRaw } from 'typestyle';
import { Title } from './Title';

interface Sources {
  operators$: Stream<string[]>;
}

interface Sinks {
  dom: Stream<VNode>;
}

export const Sidebar = ({ operators$ }: Sources): Sinks => {
  const titleDom$ = Title().dom;
  const xs = Stream;
  return {
    dom: xs.combine(titleDom$, operators$).map(([titleDom, operators]) =>
      div([
        titleDom,
        nav('.sidebar', [
          ul('.sidebar-links',
            operators.map(operator =>
              li('.sidebar-link', [
                a('.link', { props: { title: operator, href: `#/${operator}` } }, operator)
              ])
            )
          )
        ])
      ])
    )
  };
};
