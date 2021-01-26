// type PartiallyPartial<T,K> = {
//   [NormalP in Exclude<keyof T, K>]: T[NormalP];
//   [PartialP in Extract<keyof T, K>]?: T[PartialP];
// }

// オプショナルにする対象を選んでPartialにしたもの　と  オプショナルにする対象を除外したもの
// のIntersection型
type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> &
  Pick<T, Exclude<keyof T, K>>;

// 使用例

// 元のデータ
interface Data {
  foo: number;
  bar: string;
  baz: string;
}
/*
 * T1は { foo?: number; bar?: string; baz: string } 型
 */
type hogegege = PartiallyPartial<Data, 'foo' | 'bar'>;
