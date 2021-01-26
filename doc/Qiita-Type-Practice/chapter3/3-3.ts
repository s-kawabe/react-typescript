// EventDischargerクラスに型をつける
// emitメソッドで間違ったイベント名やデータに対してエラーを出す様にする

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

class EventDischarger<E, T> {
  emit<Ev extends keyof E>(eventName: Ev, payload: E[Ev]) {
    // 省略
  }
}

// 使用例
const ed = new EventDischarger<EventPayloads>();
ed.emit('start', {
  user: 'user1',
});
ed.emit('stop', {
  user: 'user1',
  after: 3,
});
ed.emit('end', {});

// エラー例
ed.emit('start', {
  user: 'user2',
  after: 0,
});
ed.emit('stop', {
  user: 'user2',
});
ed.emit('foobar', {
  foo: 123,
});
