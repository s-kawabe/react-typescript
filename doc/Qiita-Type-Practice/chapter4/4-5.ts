// testは、foo, bar及びbazプロパティを持つオプションオブジェクトを受け取る関数。
// これらのプロパティはどれも省略可能としたいが、全部省略する（すなわち、{}を渡される）のだけは型エラーとしたい。

type PartiallyPartial333<T, K extends keyof T> = Partial<Pick<T, K>> &
  Pick<T, Exclude<keyof T, K>>;

type AtLeastOne<T> = Spread333<T, keyof T>;

type Spread333<T, K extends keyof T> = K extends keyof T
  ? PartiallyPartial333<T, Exclude<keyof T, K>>
  : never;

// 使用例
interface Options {
  foo: number;
  bar: string;
  baz: boolean;
}
function test3333(options: AtLeastOne<Options>) {
  const { foo, bar, baz } = options;
  // 省略
}
test3333({
  foo: 123,
  bar: 'bar',
});
test3333({
  baz: true,
});

// エラー例
test3333({});
