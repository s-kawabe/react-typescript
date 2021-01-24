// 省略可能なプロパティ

interface arg3 {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
}
// declare => アンビエント宣言 (関数や変数の型を中身なしで宣言できる)
declare function addEventListener(
  one: string,
  two: () => void,
  three: arg3 | boolean,
): void;

// 使用例
addEventListener('foobar', () => {});
addEventListener('event', () => {}, true);
addEventListener('event2', () => {}, {});
addEventListener('event3', () => {}, {
  capture: true,
  once: false,
});

// エラー例
addEventListener('foobar', () => {}, 'string');
addEventListener('hoge', () => {}, {
  capture: true,
  once: false,
  excess: true,
});
