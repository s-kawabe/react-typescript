# りあクト！

3. React 応用編

# Redux
Reduxの掲げる３原則
- Single source of truth(信頼できる唯一の情報源)
  アプリケーションの状態は、ただ一つのstoreオブジェクトによる
  ツリー構造で表現される。
  storeが一つに集約されることで、デバッグやテストがやりやすくなる。

- State is read-only(状態は読み取り専用)
　直接書き換えることができない。
　書き換える為には、どんなイベントが起こったかを表現するaction
　を発行すること。

- Changes are made with pure functions(変更は純粋関数にて行われる)
  Reduxではstoreは状態を格納する一つのステートツリーと、
  それを更新するためのreducerという純粋関数で表現される装置から構成される。

## Reduxを使ってみる

### App.tsx

最初にstoreを初期化して`Provider`コンポーネントに
propsとして渡す必要がある。

```tsx
const store = createStore(counterReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
```
### actions

独自UtilityTypeでactionの値に型をつける

```tsx
export const CounterActionType = {
  ADD: 'ADD',
  DECREMENT: 'DECREMENT',
  INCREMENT: 'INCREMENT',
} as const;

type ValueOf<T> = T[keyof T];
```

**dispatcherにactionを発行する時は直のオブジェクト形式ではなく、
action creator関数の戻り値を使う様にする。**

### reducers

reducerとは、`(prevState,action) => newState`で表現される**純粋関数**である。
