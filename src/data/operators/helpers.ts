import { Stream } from 'xstream';
import { Marble } from '../../definitions';

const complete = (some$: Stream<Marble>, time: number) => {
  some$.shamefullySendNext({
    time,
    complete: true
  });
  some$.shamefullySendComplete();
}

export const withCompletionMarble$ = (some$: Stream<Marble>, completion_time?: number): Stream<Marble> => {
  const return$ = Stream.create<Marble>();
  let lastTime = 0;
  const getCompletionTime = () => completion_time == undefined ? lastTime : completion_time;
  setTimeout(() =>
    some$.addListener({
      next: marble => {
        lastTime = marble.time;
        if (!marble.complete) return$.shamefullySendNext(marble);
        else complete(return$, getCompletionTime());
      },
      complete: () => complete(return$, getCompletionTime()),
      error: err => return$.shamefullySendError(err)
    }), 30);
  return return$;
};

export const toMarbleStream = (marble$: Stream<Marble>, operate: (data$: Stream<string>) => Stream<string>): Stream<Marble> =>
  Stream.merge<Marble>(
    marble$
      .filter(({ complete }) => !complete)
      .map(({ data, time }) => operate(Stream.of(data)).map<Marble>(data => ({ time, data })))
      .flatten(),
    marble$
      .filter(({ complete }) => !!complete)
  );
