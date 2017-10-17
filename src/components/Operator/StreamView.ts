import { Marble } from '../../definitions';
import { Stream } from 'xstream';
import { div, span, VNode, DOMSource } from '@cycle/dom';
import { MarbleView } from './MarbleView';
import { cssRaw } from 'typestyle';

interface ReadonlySources {
  marbles$: Stream<Marble[]>;
}
interface Sources extends ReadonlySources {
  readonly$?: Stream<boolean>;
  dom: DOMSource;
}

interface Sinks {
  dom: Stream<VNode>;
}

// TODO: Refactor
cssRaw(`
  .stream {
    position: relative;
    margin: 20px 32px 20px 64px;
    height: 32px;
  }

  .stream::before {
    position: absolute;
    left: -32px;
    top: 50%;
    height: 1px;
    background: #000;
    content: '';
    right: 0;
    display: block;
    z-index: -1;
  }

  .stream::after {
    width: 0;
    height: 0;
    border-top-width: 8px;
    border-top-style: solid;
    border-top-color: transparent;
    border-bottom-width: 8px;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    border-left-width: 16px;
    border-left-style: solid;
    border-left-color: #000;
    display: inline-block;
    right: -16px;
    position: absolute;
    top: 8px;
    content: '';
  }
`);

const xs = Stream;

export const StreamView = ({ marbles$, readonly$, dom }: Sources): Sinks => {
  const interactive$ = (readonly$ || xs.of(false)).map(readonly => !readonly).remember();
  const dom$ =
    marbles$
      .map(marbles => {
        const marbleViews = marbles.map(marble => MarbleView({ marble$: xs.of(marble), draggable$: interactive$ }));
        const marbleDom$: Stream<VNode[]> = xs.combine(...marbleViews.map(view => view.dom));
        const dom$ = marbleDom$.map(doms => div('.stream', doms));
        return dom$;
      })
      .flatten();
  return {
    dom: dom$
  };
};

export const ReadonlyStreamView = ({ marbles$ }: ReadonlySources): Sinks =>
  StreamView({
    marbles$,
    readonly$: Stream.of(true),
    dom: undefined
  });
