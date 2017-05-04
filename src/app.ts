import main from './main';
import { makeDOMDriver } from '@cycle/dom';
import { makeRoutesDriver } from './drivers/routes';
import { makeDataDriver } from './drivers/data';
import { run } from '@cycle/run';

run(main, {
  dom: makeDOMDriver('#app'),
  routes: makeRoutesDriver(),
  data: makeDataDriver()
});
