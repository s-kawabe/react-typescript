# りあクト！

２. React 基礎編

# JSX で UI を表現する

## JSX の本質の理解

- JSX は「JavaScript」と「XML」の組み合わせである
- XML ライクな記述ができるようにした ECMAScript2015 に対する**構文拡張**である
- 内部では JSX は以下の様なコードに変換される

```jsx
<button type='submit' autoFocus>
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

- React17.0 以降は新しい変換形式が導入されており、
  CreateReactApp でも 2020/10 以降はそれになっている

- JSX の構文は最終的に`ReactElement`というインターフェース
  を元にしたオブジェクトになる
  (JSX → ReactElement)
- テンプレート言語(ERB や JSP)との違いは、
  JSX は結果的にオブジェクトの表現になるので
  **プロパティ値にしたり関数の引数にしたりできる。**

## React は JS ファースト

React においては関心の分離が MVC のような技術の役割ではなく機能で分離する。
そのパーツがコンポーネントになるという考え方。
独立した機能単位のパーツとして分割するためには、(疎結合にするためには)
そのパーツの中に UI とロジックを閉じ込める必要がある。

しかし、view レンダリングを HTML テンプレート基盤としている物も少なくない。
一方「JS ファースト」では一貫して JavaScript で view のレンダリングも行う。

- HTML テンプレート派
  Angular, Vue.js, Svelte
- JS ファースト派
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

暗黙的に props に渡される引数**children**は
`React.createElement()`の第３引数に相当するもの。

### 組み込みコンポーネントとユーザ定義コンポーネント

`<p>, <h1>` → 　組み込み
`<Greets>, <TextInput>`　 → 　ユーザ定義

ユーザ定義コンポーネントは必ず大文字で始める
そうしないと、JSX からコンポーネントとして呼べなくなる。
小文字で始まるタグ記述は全て組み込みコンポーネントと解釈される
TypeScript では`JSX.IntrinsicElements`インターフェースのキーに
組み込みで登録されているタグ名が列挙されている。

### リストレンダリング時の key

ループ処理で同階層に同じ要素のリストを表示させる際に`key`属性
を指定する必要がある。
これの理想は、そのコレクションの各要素が持つユニーク ID であること。
index を key に用いることは公式でも非推奨とされている。

### おまけ : aria-** と data-**

ARIA(Accessible Rich Internet Applications)
Web アクセシビリティの標準を定めた規格。
聴覚障害者用の読み上げブラウザのために意味づけられたもの。

`data-*`は**カスタムデータ属性**という。
これにより開発者がオリジナルの属性を作れる。E2E テストで DOM を特定するために
用いられることもある。

## Linter とフォーマッター

### ESLint

**linter の歴史**

2002 JSLint(by Douglas Crockford)
2011 JSHint
2013 ESLint,TSLint
ESLint のみ、「開発社が独自の lint ルールを作れる」をコンセプトにしている。
JSLint の思想とは正反対でコードの書き方を強制することは無い。

---

**TypeScript や他パッケージを最新化する**

```
% yarn upgrade-interactive --latest
```

TypeScript の最新版(4.1.3)で React 17.0 から導入された JSX の
新しい変換形式が TypeScript の構文チェクを通るようになるので tsconfig.json を以下の様に編集

```
- "jsx": "react"
+ "jsx": "react-jsx"
```

---

「TypeScript ESLint」のプロジェクトが提供するパッケージ群を使う。
「typescript-eslint-parser」や「eslint-plugin-typescript」は
既に非推奨となっている。

**ESLint を除くエコシステムのパッケージは主に３種類**

- パーサ(Parser)
  ソースコードを特定の言語仕様に沿って解析してくれるライブラリ。ESLint には
  JavaScript のパーサが組み込まれているが、標準では TypeScript には
  対応していないので、TypeScript のパーサを導入する。

- プラグイン(Plugin)
  ESLint の組み込みルール以外に独自のルールを追加するもの。
  それらを適用した推奨の共 有設定とパッケージングして提供されることが多い

- 共有設定(Shareable Config)
  複数のルールの適用をまとめて設定するもの。ESLint に同梱される
  eslint:recommended や Airbnb 社が提供している eslint-config-airbnb55 が有名

ESLint のパーサ「@typescript-eslint/parser」
TypeScript のための ESLinst 標準ルールプラグイン「typescript-eslint/eslint-plugin」

---

**ESLint のファイルを生成する**

```
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? ·  Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-airbnb@latest
The config that you've selected requires the following dependencies:
✔ Would you like to install them now with npm? · No
```

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {},
};
```

---

**eslintrs.js の各プロパティ**

- env
  プログラムの実行環境を ESLint に教える。
  個別の環境ごとに globals の値がプリセットされている

- extends
  共有設定を適用する

- parser
  ESLint が使用するパーサを指定する

- parserOptions
  パーサの各種実行オプションを設定する

- plugins
  任意のプラグインを組み込む

- rules
  適用する個々のルールおと、エラーレベルや例外などその他の設定値を記述する

---

**ESLint の適用ルールカスタマイズ**

eslint-init の時に足りなかったものを yarn add

```
% yarn add -D eslint-plugin-react-hooks
```

`.eslintrc.js`に書き加えていく
extends 内は順番を変えると依存が壊されるものもあるので注意

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: "./tsconfig.eslint.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "import", "jsx-a11y", "react", "react-hooks"],
  root: true,
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true,
      },
    ],
    "no-void": [
      "error",
      {
        allowAsStatement: true,
      },
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "_",
        ignoreRestSiblings: false,
        varsIgnorePattern: "_",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".jsx", ".tsx"],
      },
    ],
    "react/jsx-props-no-spreading": [
      "error",
      {
        html: "enforce",
        custom: "enforce",
        explicitSpread: "ignore",
      },
    ],
    "react/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: ["*.tsx"],
      rules: {
        "react/prop-types": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
};
```

---

`,eslintignore`ファイルでチェックの対象外ファイルを指定する

```
build/
public/
**/coverage/
**/node_modules/
**/*.min.js
*.config.js
.*lintrc.js
```

---

**setting.json に以下を追記する**

```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
"editor.formatOnSave": false,
"eslint.packageManager": "yarn",
"typescript.enablePromptUseWorkspaceTsdk": true,
```
ファイル保存時にVSCode内部のものでなくESLintの自動整形が走るようにする
また、プロジェクトにTypeScriptがインストールされている場合はどっちを使うか
尋ねることができる。

**package.jsonのscriptsに一括lintコマンドを追加**

```
"lint": "eslint 'src/**/*.{js,jsx,ts,tsx}'"
```

### Prettier

#### なぜPritterが必要か？
ESLintでもコードフォーマッタとしてある程度は機能するが
コードスタイルの一貫性を保つため、ESLintとは別途に
用意することでよりPJのメンバー間で統一の取れたコードが書ける。

#### 環境
- prettier
  Prettier本体

- eslint-config-prettier
  Prettierと競合する可能性のあるESLintの
  各種ルールを向こうにする共有設定

```
% yarn add -D prettier eslint-config-prettier
```

#### .eslintrc.jsを書き換える

```js
extends: [
  'airbnb',
  'airbnb/hooks',
  'plugin:import/errors',
  'plugin:import/warnings',
  'plugin:import/typescript',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
  'prettier',
  'prettier/@typescript-eslint',
  'prettier/react',
],
```
最後の３行。競合するルール設定を上書きして調整するものなので
一番最後にするよう公式ドキュメントでも言われている。

#### .prettierrcファイルを作成

'''json
{
  "singleQuote": true,
  "trailingComma": "all"
}
'''
１行の文字数やインデントに関するスタイルの設定値を記述する。
この２つ以外はデフォルト値が設定される。

#### ESLintとPrettierのルールが衝突していないか調べる

```
% npx eslint-config-prettier 'src/**/*.{js,jsx,ts,tsx}'
```
**=> No rules that are unnecessary or conflict with Prettier were found.**
が出ればOK！！
eslint-config-prettierは不要なルールやPrettierと衝突する
ルールがないか検出するCLIツールを同梱している。
エラーだった場合は`.eslintrc.js`の設定を削除したりする。

#### Prettierをnpm-scriptsで実行する

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "fix": "npmrun-sformat&&npmrun-slint:fix",
  "format": "prettier--write--loglevel=warn'src/**/*.{js,jsx,ts,tsx,gql,graphql,json}'",
  "lint": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
  "lint:fix": "eslint --fix 'src/**/*.{js,jsx,ts,tsx}'",
  "lint:conflict":"eslint--print-config.eslintrc.js|eslint-config-prettier-check",
  "preinstall": "typesync"
},
```

#### VSCodeの設定を行う

setting.jsonに追記

```json
"editor.defaultFormatter": "esbenp.prettier-vscode", 
  "[graphql]": {
    "editor.formatOnSave": true 
  },
  "[javascript]": { 
    "editor.formatOnSave": true
  }, 
  "[javascriptreact]": {
    "editor.formatOnSave": true 
  },
  "[json]": { 
    "editor.formatOnSave": true
  }, 
  "[typescript]": {
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.formatOnSave": true
  }
```

## Reactとフロントエンドの歴史

### React登場の背景と歴史
2005年 - Ajaxを取り入れた、GoogleMapがリリースされた。
2006年 - JQueryリリース
         prototype.jsやjQueryはフロントエンド第１世代。
2008年 - HTML5のドラフトが発表される。
　　　　　Wenアプリケーションのプラットフォームとしての機能やAPIを実装するための仕様。
        GoogleがChromeのJS園児にであるV8をオープンソース化
2011年 - AdobeのFlashPlayerの開発中止

#### AngularJSの限界
AngularJSは双方向データバインディングの実装アルゴリズムに難があったため、
関しする値が増えるとパフォーマンスが極端に悪くなる傾向があった。
この時、AngularJSはReactの勢いに影響を受けて後方互換性を
無視してまで一から作り直すという決断をした。

#### WebComponentsとは
2011年10月にHTMLをプログラマブルに拡張し、開発者が自ら作成した
カスタムタグを読み込んで使えるようにする**WebComponents**という
技術をWeb標準の使用として広くブラウザに実装しようと提唱した。
次の４つの仕様がある。
- Custom Elements
- Shadow DOM
- HTML TEmplates
- HTML Imports
この中のCustome Elementsの思想がReactではJSXで記述する
ReactElementオブジェクト、つまりReact Elementsになる。

しかしWeb Components の理想自体は多くの人が共感するものだったが、
それを具体的な形にした仕様とそこに至るプロセスに難があった。

#### Reactのコンセプト
- Declarative（宣言的）
- Component-Based（コンポーネントベース）
- Just The UI（UIにしか関知しない）
  ReactはMVCのうちVだけで説明がつく。
  (Vueはコンポーネント×MVVM)
  フルスタックでないことが逆にReactの強みになっている。
- Virtual DOM（仮想DOM）
  ルートのレンダリングが発火され、そこから連鎖的に
  コンポーネントをタッド定期、展開しつくされたツリーはリアルDOMに
  変換されてブラウザが実際にレンダリングをすることになる。
  このリアルDOMへの変換前の要素ツリーはメモリ上にキャッシュされる。
  **仮想DOMというのは、メモリに展開されたイミュータブルな要素ツリー**
- One-Way Dataflow（単方向データフロー）
  双方向なデータバインディングはシンプルなアプリでは直感的であっても、
  多くの状態を持つ大規模アプリでは簡単にスパゲッティになってしまう。
- Learn Once, Write Anywhere
  （一回習得すれば、あらゆるプラットフォームで開発できる）

**stateのリフトアップ**
フォームを実装する際は、その各パーツを子コンポーネントとして持つ単一の親コンポーネントをまず作成する。
そしてその親コンポーネントでフォームデータを自身の state(状態)として持つ。 
さらにそのstateを変更する関数を作り、それを子コンポーネントにpropsとして渡す。
子コンポーネントは渡された関数をフォームパーツに仕込んでおいて、
操作の際にそれが任意の引数でもって 実行されるようにする

### 他の第３世代フレームワーク

#### Angular 
Angularの安定版2.0.0は2016年に出た。
Angularの欠点はコンポーネントベースといいながら、モジュール、
サービス、プロバイダなど覚えなきゃいけなことが多い。
そして何かを定義するためには毎回でコレータ付きのクラスを作らなきゃいけない。

TypeScriptの特定のバージョンと密結合しているので、
TSのバージョンが上がってもAngularがそれに追随するまで最新の
機能が使えないということが起こり得る。

#### Vue
VueはAngularJSから派生したフレームワークである。
AngularJS の直感性を残しつつReactのコンポーネントベースアーキテクチャを取り入れた。
Vue で評価されてる SFC(Single-File Component)
も長期的に見ればコンポーネント の再分割を難しくし、
リファクタリングの障害となる。またコンポーネントへ再利用可能な
ロジックを追加するためにReactがはるか昔に捨てたmixinsという仕組みをずっと使い続けてる

## コンポーネントを知る
Reactは仮想DOMをリアルなDOMにレンダリングすることで
WEBアプリケーションとして動作する。
その仮想DOMを構成するのが**ReactElements**

### リストレンダリング時の注意
JSXで要素をループ処理によって記述する場合
各要素にユニークなkeyを明示する必要がある。
これをしないとReactがブラウザにWarningを吐き出す。

### state更新時の注意
単純なアプリではあまり問題にならないが、クラスのstateの値の更新は 
Reactによるレンダリング最適化処理の中で非同期に行われる。
そのためstate更新メソッドで参照するstateの値はその瞬間での
最新の値であることが厳密には保証されない。
なのでstateの前の状態に依存するような変更処理は以下の様にして変更する。

```tsx
// 変更したい要素名とその値を直接記述する変更方法
reset(): void { 
  this.setState({ count: 0 });
}

// 以前のstateを引数にとり、新しいstateを返す変更方法
increment(): void {
  this.setState((state) => ({ count: state.count + 1 }));
}
```

### eventを発火させる要素の特有の動きを抑制する
イベントメソッドを以下のように記述することで、例えば<a>や<input type="submit">
などの要素にイベントを与えた時のページリロードなどを防げる？


```tsx
reset = (e: SyntheticEvent) => { 
  e.preventDefault(); 
  this.setState({ count: 0 });
};

increment = (e: SyntheticEvent) => {
  e.preventDefault();
  this.setState((state) => ({ count: state.count + 1 }));
};
```

## Hooksを知る

### mixinsと交代したHOC
HOC(Higher Order Component)は**高階コンポーネント**と呼ばれるパターン
関数コンポーネントでありつつ、ContainerComponentを表現することができる。

### HOC(高階コンポーネント)を使う
- 高階関数
  関数を引数にとり、関数を戻り値として返す
- HOC
  コンポーネントを引数にとり、コンポーネントを戻り値として返す
 
 ```tsx
type Props = { target: string };

const Hoc: React.FC<Props> = ({ target }) => <h1>Hello! {target}</h1>;

const withTarget = (WrappedComponent: React.FC<Props>) =>
  WrappedComponent({ target: 'Patty' });

export default withTarget(Hoc);

 ```

 ### Hooksでstateを使う
 `useState`を使う。
 useStateは戻り値をしてstate変数とそのstate更新関数をタプルとして返す。
 
 ```tsx
 cont [count, setCount] = useState(0)
 ```

 TSでstateを使う際は、stateの方が推論できるかどうかということに
 注意する必要がある。

 ```tsx
 // authorはUserオブジェクトを格納で、初期値はundifined
 const [author, setAuthor] = useState<User>();
 // 初期値を渡しながらも型推論が使えない場合の書き方
 // オブジェクト配列だけど初期値は空配列にしたい場合、コンパイラは分からないので明示してあげる
 const [articles, setArticles] = useState<Article[]>([])
 ```

state更新時の書き方の注意
前者は１しか加算されない。
state変数はそのコンポーネントのレンダリングごとで一定になってしまうので
state変数を相対的に変更する処理を行うときは、前の値を直接参照、変更するのを避けて
必ず`setCount((c) => c + 1)`のように関数で書く

```tsx
const plusThreeDirectly = () => [0, 1, 2].forEach((_) => setCount(count + 1));
const plusThreeWithFunction = () => [0, 1, 2].forEach((_) => setCount((c) => c + 1));
```



