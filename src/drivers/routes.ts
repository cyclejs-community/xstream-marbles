import { Stream, Producer, Listener } from 'xstream';

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
      next: route => {
        window.location.hash = `/${route}`;
      },
      error: () => { },
      complete: () => { }
    });
    const xs = Stream;
    const hashChangeProducer = new HashChangeProducer();
    const hashRoute$ =
      xs.create(hashChangeProducer)
        .map((ev: HashChangeEvent) => (ev.target as Window).location.hash.replace('#', ''))
        .map(hash => (hash || '').replace('/', ''))
        .startWith(window.location.hash.replace('#', '').replace('/', '') || 'map');
    this.route$ = hashRoute$;
  }
}

export function makeRoutesDriver(): (route$: Stream<string>) => RoutesSource {
  function routesDriver(route$: Stream<string>) {
    return new RoutesSource(route$);
  }
  return routesDriver;
}

export default makeRoutesDriver;
