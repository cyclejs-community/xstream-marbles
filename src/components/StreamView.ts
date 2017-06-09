import { Marble } from '../definitions';
import { Stream } from 'xstream';
import { div, span, VNode } from '@cycle/dom';
import { MarbleView } from './MarbleView';

interface Sources {
  marbles$: Stream<Marble[]>;
}

interface Sinks {
  dom: Stream<VNode>;
}

export const StreamView = ({ marbles$ }: Sources): Sinks => {
  const xs = Stream;
  const dom$ =
    marbles$
      .map(marbles => {
        const marbleViews = marbles.map(marble => MarbleView({ marble$: xs.of(marble) }));
        const marbleDom$: Stream<VNode[]> = xs.combine(...marbleViews.map(view => view.dom));
        const dom$ = marbleDom$.map(doms => div('.stream-view', doms));
        return dom$;
      })
      .flatten();
  return {
    dom: dom$
  };
};
