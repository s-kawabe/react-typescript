// プロパティを上書きする関数

// function giveId(obj) {
//   const id = '本当はランダムがいいけどここではただの文字列';
//   return {
//     ...obj,
//     id,
//   };
// }

// Pick: 要素を指定してオブジェクトから抽出する
// Exclude: 要素を指定して要素の集合から除外する
function giveId<T>(obj: T): Pick<T, Exclude<keyof T, 'id'>> & { id: string } { 
  const id = '本当はランダムがいいけどここではただの文字列';
  return {
    ...obj,
    id,
  };


// 使用例
/*
 * obj1の型は { foo: number; id: string } 型
 */
const obj1 = giveId({ foo: 123 });
/*
 * obj2の型は { num : number; id: string } 型
 */
const obj2 = giveId({
  num: 0,
  id: 100,
});
// obj2のidはstring型なので別の文字列を代入できる
obj2.id = '';
