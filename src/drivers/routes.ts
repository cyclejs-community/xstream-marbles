import { Stream, Producer, Listener } from 'xstream';
import { createDummyListener } from '../utils';

class HashChangeProducer implements Producer<HashChangeEvent> {
  start: (listener: Listener<HashChangeEvent>) => void;
  stop: () => void;
  stream: Listener<HashChangeEvent>;
  handler: (ev: HashChangeEvent) => void;
  constructor() {
    this.start =
      listener => {
        this.stream = listener;
        window.addEventListener('hashchange', this.handler);
      };
    this.stop =
      () => {
        window.removeEventListener('hashchange', this.handler);
        this.stream = null;
      };
    this.stream = null;
    this.handler = event => this.stream.next(event);
  }
}

export class RoutesSource {
  route$: Stream<string>;
  constructor(route$: Stream<string>) {
    route$.addListener({
      ...createDummyListener(),
      next: route => window.location.hash = `/${route}`
    });
    const xs = Stream;
    this.route$ =
      xs.create(new HashChangeProducer())
        .map((ev: HashChangeEvent) => (ev.target as Window).location.hash.replace('#', ''))
        .map(hash => (hash || '').replace('/', ''))
        .startWith(window.location.hash.replace('#', '').replace('/', '') || 'map');
  }
}

export function makeRoutesDriver(): (route$: Stream<string>) => RoutesSource {
  function routesDriver(route$: Stream<string>) {
    return new RoutesSource(route$);
  }
  return routesDriver;
}

export default makeRoutesDriver;
