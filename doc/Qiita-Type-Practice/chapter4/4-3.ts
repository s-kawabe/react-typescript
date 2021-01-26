interface EventPayloads {
  start: {
    user: string;
  };
  stop: {
    user: string;
    after: number;
  };
  end: {};
}

type Spread<Ev, EvOrig, E> = Ev extends keyof E
  ? EvOrig[] extends Ev[]
    ? E[Ev]
    : never
  : never;

class EventDischarger2<E> {
  emit<Ev extends keyof E>(eventName: Ev, payload: Spread<Ev, Ev, E>) {
    // 省略
  }
}

// 使用例
const ed2 = new EventDischarger2<EventPayloads>();
ed2.emit('start', {
  user: 'user1',
});
ed2.emit('stop', {
  user: 'user1',
  after: 3,
});
ed2.emit('end', {});

// エラー例
ed2.emit<'start' | 'stop'>('stop', {
  user: 'user1',
});
