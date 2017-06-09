import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom';
import { RoutesSource } from './drivers/routes';
import { DataSource } from './drivers/data';

export interface Sources {
  dom: DOMSource;
  routes: RoutesSource;
  data: DataSource;
}

export interface Sinks {
  dom: Stream<VNode>;
  routes: Stream<string>;
  data: Stream<string>;
}

export interface Marble {
  data: string;
  time: number;
}

export interface State {
  inputs$: Stream<Marble[][]>;
  label$: Stream<string>;
  outputs$: Stream<Marble[][]>;
}

export interface OperatorExample {
  inputs: Marble[][];
  label: string;
  operate: (...inputs: Stream<Marble>[]) => Stream<Marble>[];
}
