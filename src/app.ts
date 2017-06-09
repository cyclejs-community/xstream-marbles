import main from './main';
import { makeDOMDriver } from '@cycle/dom';
import { makeRoutesDriver } from './drivers/routes';
import { makeDataDriver } from './drivers/data';
import { run } from '@cycle/run';
import { cssRaw } from 'typestyle';

// TODO: Refactor
cssRaw(`
  html, body {
    font-size: 100%;
    height: 100%;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }
`);

run(main, {
  dom: makeDOMDriver('#app'),
  routes: makeRoutesDriver(),
  data: makeDataDriver()
});
