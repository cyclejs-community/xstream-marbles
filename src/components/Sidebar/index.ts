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
  const title$ = Title().dom;
  const xs = Stream;
  return {
    dom: xs.combine(title$, operators$).map(([title, operators]) =>
      div([
        title,
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
