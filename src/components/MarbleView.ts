import { Marble } from '../definitions';
import { Stream } from 'xstream';
import { div, span, VNode } from '@cycle/dom';

interface Sources {
  marble$: Stream<Marble>;
}

interface Sinks {
  dom: Stream<VNode>;
}

export const MarbleView = ({ marble$ }: Sources): Sinks => ({
  dom: marble$
    .map(({ data, time }) =>
      div('.marble', {
        style: {
          'z-index': time,
          left: `calc(${time}% - 32px)`
        }
      }, [span([data])])
    )
});
