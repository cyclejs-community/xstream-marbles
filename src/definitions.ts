import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';
import { RoutesSource } from './drivers/routes';

export interface ISources {
  dom: DOMSource;
  routes: RoutesSource;
}

export interface ISinks {
  dom: Stream<VNode>;
  routes: Stream<string>;
}

export interface IMarble {
  data: string;
  time: number;
}

export interface IState {
  marbles$: Stream<IMarble[]>
}
