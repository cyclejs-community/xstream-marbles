import { Stream, Producer, Listener } from 'xstream';

class HashChangeProducer implements Producer<HashChangeEvent> {
  start: (listener: Listener<HashChangeEvent>) => void;
  stop: () => void;
  stream: Listener<HashChangeEvent>;
  handler: (ev: HashChangeEvent) => void;
  constructor() {
    const _this = this;
    this.start = function (listener) {
      _this.stream = listener;
      window.addEventListener('hashchange', _this.handler);
    };
    this.stop = function () {
      window.removeEventListener('hashchange', _this.handler);
      _this.stream = null;
    };
    this.stream = null;
    this.handler = event => _this.stream.next(event);
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
        .map((ev: HashChangeEvent) =>
          (ev.target as Window).location.hash.replace('#', ''))
        .map(hash => (hash || '').replace('/', ''))
        .startWith(window.location.hash.replace('#', '') || '');
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
