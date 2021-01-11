# りあクト！

２. React 基礎編

# JSX で UI を表現する

## JSX の本質の理解

- JSX は「JavaScript」と「XML」の組み合わせである
- XML ライクな記述ができるようにした ECMAScript2015 に対する**構文拡張**である
- 内部では JSX は以下の様なコードに変換される

```jsx
<button type="submit" autoFocus>
  Click Here
</button>
```

↓↓↓↓

```jsx
React.createElement(
  "button",
  { type: "submit", autoFocus: true },
  "Click Here"
);
```

- React17.0 以降は新しい変換形式が導入されており、CreateReactApp でも 2020/10 以降はそれになっている
- JSX の構文は最終的に`ReactElement`というインターフェースを元にしたオブジェクトになる<br>
  (JSX → ReactElement)
- テンプレート言語(ERB や JSP)との違いは、JSX は結果的にオブジェクトの表現になるので<br>
  **プロパティ値にしたり関数の引数にしたりできる。**

## React は JS ファースト

React においては関心の分離が MVC のような技術の役割ではなく機能で分離する。<br>
そのパーツがコンポーネントになるという考え方。<br>
独立した機能単位のパーツとして分割するためには、(疎結合にするためには)<br>
そのパーツの中に UI とロジックを閉じ込める必要がある。<br><br>

しかし、view レンダリングを HTML テンプレート基盤としている物も少なくない。<br>
一方「JS ファースト」では一貫して JavaScript で view のレンダリングも行う。<br>

- HTML テンプレート派<br>
  Angular, Vue.js, Svelte
- JS ファースト派<br>
  React, Preact, Cycle.js

## HTML テンプレートのデメリット

制御構造が複雑化してくると、テンプレートでのやり方では DX が徐々に低下してくる。

- FW 独自の聖書構文など暗黙の文脈を用意せざるを得ない
- HTML がそのままかけるので簡易的なアプリでは簡単に思える
- 本格アプリを作ろうとすれば決まり事が増えるたびに覚えておかなければならないことが増える
- 早期リターンができない

## JSX の記述方法

### フラグメント

```tsx
return (
  <>
    <div>{greet(name)}</div>
    <div>{greet(name)}</div>
    <div>{greet(name)}</div>
  </>
);
```

このように記述すると、ルートに余分なタグが生まれずに React にも怒られない。
<></> はフラグメントと呼ぶ

### 暗黙的な props children

暗黙的に props に渡される引数**children**は<br>
`React.createElement()`の第３引数に相当するもの。<br>

### 組み込みコンポーネントとユーザ定義コンポーネント

`<p>, <h1>` → 　組み込み<br>
`<Greets>, <TextInput>`　 → 　ユーザ定義<br><br>

ユーザ定義コンポーネントは必ず大文字で始める<br>
そうしないと、JSX からコンポーネントとして呼べなくなる。<br>
小文字で始まるタグ記述は全て組み込みコンポーネントと解釈される<br>
TypeScript では`JSX.IntrinsicElements`インターフェースのキーに<br>
組み込みで登録されているタグ名が列挙されている。

### リストレンダリング時の key

ループ処理で同階層に同じ要素のリストを表示させる際に`key`属性<br>
を指定する必要がある。<br>
これの理想は、そのコレクションの各要素が持つユニーク ID であること。<br>
index を key に用いることは公式でも非推奨とされている。

### おまけ : aria-** と data-**

ARIA(Accessible Rich Internet Applications)<br>
Web アクセシビリティの標準を定めた規格。<br>
聴覚障害者用の読み上げブラウザのために意味づけられたもの。<br><br>

`data-*`は**カスタムデータ属性**という。<br>
これにより開発者がオリジナルの属性を作れる。E2E テストで DOM を特定するために<br>
用いられることもある。
