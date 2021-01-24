// オブジェクトの型
// function showUserInfo(user: User) {
//   // 省略
// }

// // 使用例
// showUserInfo({
//   name: 'John Smith',
//   age: 16,
//   private: false,
// });

// // エラー例
// showUserInfo({
//   name: 'Mary Sue',
//   private: false,
// });
// const usr: User = {
//   name: 'Gombe Nanashino',
//   age: 100,
// };

// typeで定義してもよい
interface User {
  name: string;
  age: number;
  private: boolean;
}

function showUserInfo(user: User) {
  // 省略
}

// 使用例
showUserInfo({
  name: 'John Smith',
  age: 16,
  private: false,
});

// エラー例
showUserInfo({
  name: 'Mary Sue',
  private: false,
});

const usr: User = {
  name: 'Gombe Nanashino',
  age: 100,
};
