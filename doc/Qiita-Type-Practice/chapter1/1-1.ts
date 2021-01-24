// 関数に型をつける
// function isPositive(num) {
//   return num >= 0;
// }

// // 使用例
// isPositive(3);

// // エラー例
// isPositive('123');
// const numVar: number = isPositive(-5);

function isPositive(num: number): boolean {
  return num >= 0;
}

// 使用例
isPositive(3);

// エラー例
isPositive('123');
const numVar: number = isPositive(-5);
