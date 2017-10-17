import { App } from './components/App';
import { makeDOMDriver } from '@cycle/dom';
import { makeHashHistoryDriver } from '@cycle/history';
import { makeOperatorsDriver } from './drivers/operators';
import { run } from '@cycle/run';

run(App, {
  dom: makeDOMDriver('#app'),
  history: makeHashHistoryDriver(),
  operators: makeOperatorsDriver()
});
