// getFooに渡したオブジェクトのfooプロパティを返す　無い場合はunknown
// オブジェクト以外をgetFooに渡してはいけないß
// fooプロパティの型によって戻り値の型も変わるようにする

// function getFoo(obj) {
//   return obj.foo;
// }

// 🤔
// type Return<T> = 'foo' extends keyof T ? T['foo'] : unknown;

// interface Argument {
//   foo?: any;
//   [index: string]: any;
// }

// function getFoo<T extends Argument>(obj: T): Return<T> {
//   return obj.foo;
// }

// T extends { foo: infer E }  : Tがfooプロパティを持つ型かどうか
function getFoo<T extends object>(
  obj: T,
): T extends { foo: infer E } ? E : unknown {
  return (obj as any).foo;
}

// 使用例
// numはnumber型
const num = getFoo({
  foo: 123,
});
// strはstring型
const str = getFoo({
  foo: 'hoge',
  bar: 0,
});
// unkはunknown型
const unk = getFoo({
  hoge: true,
});

// エラー例
getFoo(123);
getFoo(null);
