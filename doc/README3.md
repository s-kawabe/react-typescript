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

## ReduxStyleGuide
Reduxを使用するとコードの記述量が多くなってしまう。
そこに対するルール決めの動きがいくつか生まれ始めた。
(例)
- FSA(Flux Standard Action)
- Ducks

2019年11月に公式が出したガイドラインが**ReduxStyleGuide**

### 優先度A：必須
1. stateを直接書き換えない
  
2. reducerに副作用を持たせない
   外部システム通信やreducerの外の変数を書き換えるなど

3. シリアライズできない値をstateやactionに入れない
  Promise関数やクラスインスタンスのような`JSON.stringfy()`したときに
  値が同一であることが保証されないものをstateやactionに入れてはいけない

4. storeは１アプリにつき１つのみ

### 優先度B：強く推奨
### 優先度C：普通に推奨
- Actionに関するもの
  5. actionをsetterでなくイベントとしてモデリングする
  6. actionの名前は意味を的確にしたものにする
  7. actionタイプ名を「ドメインモデル/イベント種別」のフォーマットで
  8. actionをFSAに準拠させる
  9. dispatchするactionは直に書かずaction creatorを使って生成

- ツールやデザインパターンの利用に関するもの
  10. Reduxのロジックを書くときはReduxToolkitを使う
  11. イミュータブルな状態の更新にはImmerを使う
  12. デバッグにはReduxDevTools拡張を使う
  13. ファイル構造には「feature folder」またはDucksパターンを適用する

- 設計に関するもの
  14. どの状態をどこに持たせるかは柔軟に考える
  15. フォームの状態をReduxに入れない
  16. 複雑なロジックはコンポーネントの外に追い出す
  17. 非同期処理にはReduxThunkを使う

## ReduxToolkitを使う
当初は「ReduxStarterKit」という名前で、
最初のバージョンは2018年2月に公開された。

**ReduxToolkitの提供する主要なAPI**
- configureStore
  各種デフォルト値が設定可能な`createStore`のカスタム版

- createReducer
  reducerの作成を簡単にしてくれる

- createAction
  action creatorを作成してくれる

- createSlice
  actionの定義とaction creator, reducerをまとめて生成できる

### 良い構成はDucksパターンによるディレクトリ分けとcreateSlice使用
**createSliceを定義したらトップレベルのファイルに追加**

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import { counterSlice } from 'features/counter';
import reportWebVitals from './reportWebVitals';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const store = configureStore({ reducer: counterSlice.reducer });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
```

**RTKを使用しないトップレベルファイル**

```tsx
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { counterReducer, initialState } from 'reducer';
import reportWebVitals from './reportWebVitals';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const store = createStore(counterReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
```

## useReducer
Reduxではアプリケーションを包括するグローバルな状態をactionと
reducerで管理していたが、useReducerは同じことを個別のコンポーネントで可能にするHooksAPI

**useReducer**
`const [state, dispatch] = useReducer(reducer, initialState)`

**useState**
`const [state, setState] = useState(initialState)`

**createStore**
`const store = createStore(reducer, initialState)`

### stateHookの正体

`useState`は機能を限定した`useReducer`である。
Reduxではアプリケーションを包括するグローバルな状態をactionとreducerで管理していた。
useReducerは同じことを個別のコンポーネントで可能にするHooks API


**クラスコンポーネントがstateをメンバー変数として持つのに対して
stateHookはその状態をどこでどうやって保持しているか**
ReactではVer16.0からFiberというレンダリングのためのアーキテクチャを導入している。
Reactが提供する`useXXX`のHooksAPIコンポーネントの中で使用すると
仮想DOMにマウントされたReactElementsが対応するFiberの「メモ化された状態」
領域の中にそのHooksのオブジェクトがつくられる。


## コンポーネントの中で非同期処理を行う
コンポーネントの中で非同期処理をどこに記述するかという問題は
当初のReactにとっては大きな課題であった。
class componentの中で非同期処理を行い、フェッチした結果を
stateに入れてrender()の中で表示させる方法は
時間軸によって変わるライフサイクルメソッドの複数箇所に
同じ処理を記述する必要があった。

その後Reactの成長に伴い、Reduxでは**ミドルウェア**という仕組みが
用意されていた。　外部からdispatcherを拡張して、
reducerの実行前後に任意の処理を追加できるようにするためのもの。

Reduxでは`createStore`の第３引数にdispatch()関数をラップした
処理が記述されたミドルウェアを適用できる。

**有名なミドルウェア**
- Redux Persist (store内のstateをloal strageなどに永続化)
- redux-logger (actionの発行とstateの遷移履歴の記録)
- ReduxThunk, redux-saga, redux-observable (非同期処理を扱う)
Redux公式サイトの「Ecosystem」に載っている。

## Redux不要論
React16.3.0でContextAPIが導入された。
これはReact本体の機能のみでグローバルステートを管理するソリューション。

```tsx
const ThemeContext = React.createContext('light');

constApp = () => {
  const theme = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <ThemedButton /> 
    </ThemeContext.Provider>
  );
};

const ThemedButton = () => {
  const theme = userContext(ThemeContext);
  return <Button theme={theme} />; 
}
```
## フロントエンドのマイクロサービスアーキテクチャ
SPAへの要求が高度化するにつれて機能が増えていくと、
モノリシックなアーキテクチャではいつか無理がきてしまう。
究極的にはそれぞれのドメインに分割したコンポーネント群を
Web Componentsの形式で出力し、それらを束ねてブラウザに
読み込ませるようにすれば、各ドメインがどんなフレームワークで作られようが関係なくなる。

フロントエンドで本格的にマイクロサービスアーキテクチャが導入されれば、
中央集権的な状態管理手法派生率しなくなる。
ドメイン単位で分割され、それぞれが依存することなく動作し、
ときには異なるフレームワークで作られていることもあるコンポーネントなので
個々がうまく競合することなく動作しなくてはならない。

## GraphQL Apollo Clientの可能性
Apollo ClientはReduxを縫合する形で構築されていたが、
2017年10月リリースのver2からはReduxをパージして、自前で状態管理システム
を持つ様になった。
ローディング状態やエラー状態の管理加え、データはキャッシュベースで
取り回され、そのキャッシュはApolloが勝手に正規化してくれたりする。

