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

  }
`);

interface Sources {
  marble$: Stream<Marble>;
}

interface Sinks {
  dom: Stream<VNode>;
}

const getStyle = (time: number): any => ({
  'z-index': time,
  left: `calc(${time}% - 32px)`
});

const getOptions = (time: number): any => ({
  style: getStyle(time)
});

export const MarbleView = ({ marble$ }: Sources): Sinks => ({
  dom: marble$
    .map(({ data, time, complete }) =>
      !!complete
        ? div('.complete', getOptions(time))
        : div('.marble', getOptions(time), [span([data])])
    )
});
