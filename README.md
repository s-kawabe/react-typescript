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

1995 年の誕生以来、JavaScript にはモジュールシステムがなかった。
ファイル分割をするには HTML の script タグによる方法しかなく、
ロードしたものは即座にグローバル空間へと紛れてしまう。

2009 年に Node.js が誕生し、初めてモジュールシステムとしての「commonJS」が開発された。
commonJS は`module.exports = hoge`や`const hode = require('./hoge')`のような
構文、API を提供する。

require と exports の問題を解決するべく
**AMD**という仕様が出来上がった。
これを実装した RequireJS というモジュールローダもこのとき発案される。

そして 2015 年、ECMAScript2015 の大変革の中で
**ESModules**というモジュールシステムが発案された。
これが`import`と`export`による構文。

## 関数型プログラミング

与えられた引数が同じなら返る値も常に一定であること : **参照透過性**

- *命令型プログラミング*　
  ステップ順にしたがって連続した文章を記述していく
  → 手続き型プログラミング、オブジェクト思考プログラミング

- _宣言型プログラミング_
  出力をエル方法ではなく、出力の性質・あるべき状態を宣言する　
  SQL などが宣言型プログラミング言語にあたる。
  「どのようにデータ取得するか」でなく「どんなデータが欲しいか」記述
  「どんなデータが欲しいか」の記述を複雑化するのは困難。
  **そこで生まれたのが関数型プログラミングである。**
  ```javascript
  // 関数型プログラミング例
  {
    const range = (start, end) =>
      [...new Array(end - start).keys()].map((n) => n + start);
    console.log(range(1, 101).filter((n) => n % 8 === 0));
  }
  ```
  可変性（Mutability）と不変性（Immutability）

---

関数型プログラミングのパラダイム

```
ⅰ. 名前を持たないその場限りの関数（無名関数）を定義できる
ⅱ. 変数に関数を代入できる
ⅲ. 関数の引数として関数を渡したり、戻り値として関数を返すことができる（高階関数）
ⅳ. 関数に特定の引数を固定した新しい関数を作ることができる（部分適用）
ⅴ. 複数の高階関数を合成してひとつの関数にできる（関数合成）
```

---

### 関数のカリー化

複数の引数をとる関数をより少ない引数をとる
関数に分割して入れ子にする構造に変えること。
→ 上位の関数で一部の引数をとり、その中でもう一部の引数をとる
関数を return することで `calc(2)(3)`のような記述ができる

### カリー化された関数の部分適用

```javascript
const withMultiple = (n) => (m) => n * m;
console.log(withMultiple(3)(5)); // 15
const triple = withMultiple(3);
console.log(triple(5)); // 15
```

カリー化された関数の一部を引数を固定して新しい関数をつくることを「関数の部分適用」と言う
