import { App } from './components/App';
import { makeDOMDriver } from '@cycle/dom';
import { makeHashHistoryDriver } from '@cycle/history';
import { makeDataDriver } from './drivers/data';
import { run } from '@cycle/run';

run(App, {
  dom: makeDOMDriver('#app'),
  history: makeHashHistoryDriver(),
  data: makeDataDriver()
} as any);
