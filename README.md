# りあクト！

1. 言語・環境編

## 環境、歴史、ツールなど

### yarn とは

npm は Node.js 公式。
npm 公式リポジトリで提供されているパッケージの追加・更新・削除に加えて
各パッケージ感のバージョン整合なども自動的に行ってくれる
**yarn は Facebook 製の改良版 npm コマンドのようなもの**

create-react-app 時、Yarn がグローバルインストールされていた場合は
生成したプロジェクトがデフォルトで yarn を使う様になる。
(npm を使いたい場合は`--use-npm`オプションを使う)

#### 代表的な yarn コマンド

- yarn(install)
  package.json の記述にしたがって依存関係のあるパッケージを全てインストールする
- yadn add <packagename>
  指定したパッケージをインストール
- yarn remove <packagename>
  指定したパッケージをアンインストール
- yarn upgrade <packagename>
  指定したパッケージを最新バージョンに更新
- yarn info <packagename>
  指定したパッケージについての情報を表示

### npm-scripts とは

コマンドを省略して実行するための記述。
npm よりも短くて済む。

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "lint": "eslint src"
}
```

### node コマンド

```
% node
```

を入力すると REPL が起動される。

```
.help
```

で REPL コマンド一覧が表示される。<br>
.load コマンドは指定したファイルの内容を現在のセッションに読み込んでくれるコマンド。

### CreateReactApp について

React はフレームワークではなく、UI 構築のための必要最小限のライブラリである。
Javascript や JSX のコンパイラや、JS と CSS を minify するためのバンドラなどを
導入した上で連携させて動作させる必要があった。

Facebook 社では React を使うための環境が最初から整備されていて、
公開から 4 年後の**2016 年 7 月**にそれ(CreateReactApp)がようやくリリースされた

**CreateReactApp が何をしてくれるか**

- react インストール
- react-dom インストール
- react-scripts インストール
- Babel(レガシーブラウザ対応),Webpack(ソースをまとめ最適化する)の構築
- webpack-dev-server の構築
- Jest の構築

### create react app をする

```
npx create-react-app hello-world --templete typescript
```

--templete typescript で TypeScript テンプレートを指定する。

### ESLint について

create-react-app には最初から入っているが、
以下を実行して.eslintrc.json を作成する必要がある

```
eslint --init or
./node_modules/.bin/eslint --init
```

そして追加で以下のパッケージをインストールする

```
yarn add -D eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-import
```

### prettier について

vscode の拡張で prettier をインストールした後、設定の
workspace で formatOnSave をオンにする。
（そうすると.vscode フォルダができ、その中に setting.json が生成される）

## JavaScript

### public/index.html と src/index.tsx の結びつき

最初のソースコードを動かして、ブラウザで見た時のソースコード

```html
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <script src="/static/js/bundle.js"></script>
  <script src="/static/js/0.chunk.js"></script>
  <script src="/static/js/main.chunk.js"></script>
</body>
```

main.chunk.js がレガシーな JS にコンパイルされたアプリの中身。
この中にコンポーネントと同じ名前の関数が定義されている。

### JavaScript における「オブジェクト」

「JavaScript での『オブジェクト』は、暗黙の内に広義のオブジェクトと狭義のオブジェクトの 2 つがある。狭義のオブジェクトとはキーとそれに対応する値を持ったプロパティの集まりであり、一般的には『連想配列』と呼ばれる、Ruby のハッシュや Java の HashMap に相当するもの。それに対して広義のオブジェクトとは、プリミティブ値以外のすべてのものを指す」

### プリミティブ型とは

Boolean,Number,BigInt,String,Symbol,Null,Undefined
の７種類。**「インスタンスメソッドを持たない」**
- プリミティブ型の値を定義するのにはリテラルを使う

- undefined はリテラルではなくプリミティブ型 undefined が格納されている「undifined」というグローバル変数
- リテラルを用いて定義した値はプリミティブ型であってオブジェクトではない
- null と undifined 以外のプリミティブ型には、それらを包容するラッパーオブジェクトがある
  string→String、number→Number のように。
- これらは JavaScript の言語処理系の標準組み込みオブジェクトである

```javascript
const hoge1 = "hoge"; // ①
const hoge2 = new String("hoge"); // ②
hoge1 === hoge2; // => false
hoge1 === hoge2.valueOf(); // => true

//　リテラルでの記述①は、内部でラッパーオブジェクト②のように自動変換される。
// 値からメソッドが呼べるのは、この為である。(ラッパーオブジェクトのインスタンスメソッドを実行)
```

### 関数\_第一級オブジェクトとは

JavaScript では関数は組み込みオブジェクト Function のインスタンスである。
そして変数に代入できることもあり、「第一級オブジェクト」と呼ばれる。
他のオブジェクト型の値と同様に変数に代入したり、配列の要素やオブジェクトのプロパティ値にしたりできる
関数を第一級オブジェクトとして扱うことができる言語の性質を**第一級関数**という

### クラスの正体

```javascript
class Bird {
  constructor(name) {
    this.name = name;
  }
  chirp = () => {
    console.log(`${this.name}が鳴きました`);
  };
}

console.log(typeof Bird); // => 'function'
```

class はコンストラクタ関数のシンタックスシュガーである。
コンストラクタ関数とはクラスの中のコンストラクタではない。
プロトタイプオブジェクトを継承してオブジェクトインスタンスを生成するための
独立した関数のことである。

### プロトタイプベース

JavaScript はクラスベースではなく**プロトタイプベース**の言語。
オブジェクトの抽象としてクラスの存在がない。
オブジェクトは直接他のオブジェクトを継承する。
その繰り返しによって構造的な表現をする。
この繰り返しを**プロトタイプチェーン**と呼ぶ

- クラス → 実態を持たない抽象概念
- プロトタイプ → 実態のあるオブジェクト

```
> new Array(1, 2, 3);
[ 1, 2, 3 ] > typeof Array // Array はコンストラクタ関数
'function'
> Array.prototype // Array に設定されているプロトタイプは []
```

### スプレッド構文はシャローコピー

スプレッド構文を使ってオブジェクトをコピーしようとした時、
コピーされるオブジェクトの深さが１段階までしか有効でないことに注意する。

```javascript
const patty = {
  name: 'Patty Rabit',
  email: 'patty@maple.town',
  address: { town: 'Maple Town' } // １階層深いオブジェクト指定
}

const rolley = { ...patty, name: 'Rolley Cocker' };
rolley.email = 'rolley@palm.town'
rolley.address.town = 'Palm Town'

console.log(patty)
{
  name: 'Patty Rabit',
  email: 'patty@maple.town',
  address: { town: 'Palm Town' } // バグ！ addressの参照先はコピーされず、元のままになる
}
```

いったん文字列に展開してから JSON にパースし直すか、Lodash の cloneDeep()を使う
などで対応する必要がある。

### ショートサーキット評価(短絡評価)

&&, ||, !, ? とかのやつ。
右辺の評価を左辺の評価に委ねる記法。
React 開発の文脈では文によって手続きを書き連ねるスタイルよりも
こちらの方が好まれる。
(return の中に書くときなどは if や else が使えなかったりする)

### JavaScript における this

**その関数が実行されるコンテキストであるオブジェクトへの参照が格納されている「暗黙の引数」**

### モジュールシステム(require と import)
