import { Stream } from 'xstream';
import { VNode, DOMSource, nav, ul, li, a } from '@cycle/dom';
import { cssRaw } from 'typestyle';

interface Sources {
  operators$: Stream<string[]>;
}

interface Sinks {
  dom: Stream<VNode>;
}

export const Sidebar = ({ operators$ }: Sources): Sinks => ({
  dom: operators$.map(operators =>
    nav('.sidebar', [
      ul('.sidebar-links',
        operators.map(operator =>
          li('.sidebar-link', [
            a('.link', { props: { title: operator, href: `#/${operator}` } }, operator)
          ])
        )
      )
    ])
  )
});
