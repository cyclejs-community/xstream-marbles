import { Marble } from '../definitions';
import { Stream } from 'xstream';
import { div, span, VNode } from '@cycle/dom';
import { cssRaw } from 'typestyle';

// TODO: Refactor 
cssRaw(`
  .marble {
    position: absolute;
    border: 2px solid #000;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    background: white;
  }

  .marble span {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    line-height: 28px;
    text-align: center;
  }

  .complete {
    position: absolute;
    height: 49px;
    width: 2px;
    background: black;
    top: -8px;
  }
`);

interface Sources {
  marble$: Stream<Marble>;
}

interface Sinks {
  dom: Stream<VNode>;
}

const getStyle = (time: number, complete: boolean): any => ({
  'z-index': time - (complete ? 1 : 0),
  left: `calc(${time}% - ${complete ? 17 : 32}px)`
});

const getOptions = (time: number, complete: boolean): any => ({
  style: getStyle(time, complete)
});

export const MarbleView = ({ marble$ }: Sources): Sinks => ({
  dom: marble$
    .map(({ data, time, complete }) =>
      !!complete
        ? div('.complete', getOptions(time, true))
        : div('.marble', getOptions(time, false), [span([data])])
    )
});
