import { Stream } from 'xstream';

export interface Marble {
  time: number;
  complete?: boolean;
  data?: string;
}

export interface Operator {
  inputs: Marble[][];
  label: string;
  operate: (...inputs: Stream<Marble>[]) => Stream<Marble>;
}
