import { MemoryStream, Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom';
import { Location } from '@cycle/history';
import { DataSource } from './drivers/data';

export interface Sources {
  dom: DOMSource;
  history: MemoryStream<Location>;
  data: DataSource;
}

export interface Sinks {
  dom: Stream<VNode>;
  data: Stream<string>;
}

export interface Marble {
  time: number;
  complete?: boolean;
  data?: string;
}

export interface State {
  operators$: Stream<string[]>;
  operator$: Stream<OperatorExample>;
}

export interface OperatorExample {
  inputs: Marble[][];
  label: string;
  operate: (...inputs: Stream<Marble>[]) => Stream<Marble>;
}
