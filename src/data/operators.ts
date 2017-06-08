import { Stream } from 'xstream';
import fromDiagram, { FromDiagramOptions } from 'xstream/extra/fromDiagram';

export const operators: string[] = [
  'map',
  'mapTo',
  'filter',
  'take',
  'drop',
  'last',
  'startWith',
  'endWhen',
  'fold',
  'replaceError',
  'flatten',
  'compose',
  'remember',
  'debug',
  'imitate'
];

const create_diagram_string = (length: number, to_repeat: string) => Array.apply(null, Array(length)).map(String.prototype.valueOf, to_repeat).join('') + '|';
const default_stream_value = create_diagram_string(100, '-');
const default_diagram = create_diagram_string(100, 'a');
const get_default_stream = () => fromDiagram(default_diagram, { values: { a: '-' } });

const copy = (value: string) => (' ' + value).slice(1);
const at = (index: number, replace: string, value: string) => {
  var copy_of_value = copy(value);
  return copy_of_value.substr(0, index) + replace + copy_of_value.substr(index + 1);
};

export const examples: IndexedOperatorExamples = {
  'map': {
    inputs: [
      {
        value: at(40, 'b', at(20, 'a', default_stream_value)),
        options: { values: { a: '1', b: '2' } }
      }
    ],
    label: 'map(x => x * 10)',
    operate: input => [input.map(x => parseInt(x)).map(x => x * 10).map(x => x.toString())]
  }
};

interface IndexedOperatorExamples {
  [key: string]: OperatorExample;
}

interface AnyObject {
  [x: string]: any;
}

interface StreamDiagram {
  value: string;
  options?: FromDiagramOptions;
}

export interface OperatorExample {
  inputs: StreamDiagram[];
  label: string;
  operate: (...inputs: Stream<string>[]) => Stream<string>[];
}
