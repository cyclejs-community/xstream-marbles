import main from './main';
import { makeDOMDriver } from '@cycle/dom';
import { makeRoutesDriver } from './drivers/routes';
import { run } from '@cycle/xstream-run';

run(main, {
  dom: makeDOMDriver('#app'),
  routes: makeRoutesDriver()
});
