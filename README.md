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

## React

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
