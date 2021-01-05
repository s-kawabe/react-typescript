# りあクト！
1. 言語・環境編

## yarnとは
npmはNode.js公式。
npm公式リポジトリで提供されているパッケージの追加・更新・削除に加えて
各パッケージ感のバージョン整合なども自動的に行ってくれる
**yarnはFacebook製の改良版npmコマンドのようなもの**

## nodeコマンド

```
% node
```
を入力するとREPLが起動される。

```
.help
```
でREPLコマンド一覧が表示される。<br>
.loadコマンドは指定したファイルの内容を現在のセッションに読み込んでくれるコマンド。

## CreateReactAppについて
Reactはフレームワークではなく、UI構築のための必要最小限のライブラリである。
JavascriptやJSXのコンパイラや、JSとCSSをminifyするためのバンドラなどを
導入した上で連携させて動作させる必要があった。

Facebook社ではReactを使うための環境が最初から整備されていて、
公開から4年後の**2016年7月**にそれ(CreateReactApp)がようやくリリースされた

**CreateReactAppが何をしてくれるか**
- react インストール
- react-dom インストール
- react-scripts インストール
- Babel(レガシーブラウザ対応),Webpack(ソースをまとめ最適化する)の構築
- webpack-dev-serverの構築
- Jestの構築
 
## create react appをする

```
npx create-react-app hello-world --templete typescript
```
--templete typescriptでTypeScriptテンプレートを指定する。

