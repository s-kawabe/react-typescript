// 配列の型
// function sumOfPos(arr) {
//   return arr.filter(num => num >= 0).reduce((acc, num) => acc + num, 0);
// }

// // 使用例
// const sum: number = sumOfPos([1, 3, -2, 0]);

// // エラー例
// sumOfPos(123, 456);
// sumOfPos([123, "foobar"]);

function sumOfPos(arr: number[]): number {
  return arr.filter((num) => num >= 0).reduce((acc, num) => acc + num, 0);
}

// 使用例
const sum: number = sumOfPos([1, 3, -2, 0]);

// エラー例
sumOfPos(123, 456);
sumOfPos([123, 'foobar']);
