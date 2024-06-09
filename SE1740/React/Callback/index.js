function taskA() {
  setTimeout(() => {
    console.log("Task A done");
    resolve();
  }, 3000);
}

function taskB() {
  setTimeout(() => {
    console.log("Task B done");
    callback();
  }, 2000);
}

function taskC() {
  setTimeout(() => {
    console.log("Task C done");
    //cosole.log("All done");
    callback();
  }, 1000);
}
// taskA(taskB);
// taskB();
// taskC();
// taskA(() => {
//   taskB(() => {
//     taskC(() => {
//       console.log("All done");
//     });
//   });
// });

/**
 * taskA(taskB) => cách viết này gọi là callback hell, truyền hàm này vào làm tham số của hàm khác
 * taskA(taskB())
 *      => viết như này thì khi mà taskA được gọi thì taskB() sẽ được thực hiện luôn => vì có lời gọi hàm
 *      => nên ngta sẽ viết : tasA(() => taskB()) // như này tức là chúng ta đang dùng 1 ham ẩn danh/ hàm khác trong taskA để gọi taskB
 *
 * Callback hell là quá nhiều hàm lồng nhau, khó đọc, khó hiểu, mất thời gian, khó bảo trì
 *
 */

//async await
/**
 * async await là cách viết code đồng bộ nhưng chạy bất đồng bộ
 * async make a function return a promise
 * await dùng để chờ cho đến khi promise được resolved
 */
async function run() {
  //nếu taskA trả về 1 promise/ data gì đó, thì ta có thể viết như sau const result = await taskA();
  await taskA();
  await taskB();
  await taskC();
  console.log("All done");
}
run();
