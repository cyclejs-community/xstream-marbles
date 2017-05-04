import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom';
import { RoutesSource } from './drivers/routes';
import { DataSource } from './drivers/data';

export interface ISources {
  dom: DOMSource;
  routes: RoutesSource;
  data: DataSource;
}

export interface ISinks {
  dom: Stream<VNode>;
  routes: Stream<string>;
  data: Stream<string>;
}

export interface IMarble {
  data: string;
  time: number;
}

export interface IState {
  marbles$: Stream<IMarble[]>
}
