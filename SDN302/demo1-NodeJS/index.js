const myFun = require("./myFunction");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function printSeparator() {
  console.log("==========");
}

function menu() {
  printSeparator();
  console.log("Chọn một chức năng:");
  console.log("1. Demo1 - Hiển thị các số nguyên tố từ a đến b");
  console.log("2. Hiển thị mảng số nguyên cho trước");
  console.log("3. Hiển thị n hợp số > n");
  console.log("4. Tách họ, tên đệm, và tên từ chuỗi họ tên");
  console.log("5. Thoát");
  printSeparator();

  rl.question("Nhập lựa chọn của bạn: ", (choice) => {
    switch (choice) {
      case "1":
        rl.question("Nhập giá trị a: ", (a) => {
          rl.question("Nhập giá trị b: ", (b) => {
            printSeparator();
            execute(parseInt(a), parseInt(b));
            printSeparator();
            menu();
          });
        });
        break;
      case "2":
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        printSeparator();
        myFun.displayArray(array);
        printSeparator();
        menu();
        break;
      case "3":
        rl.question("Nhập giá trị n: ", (n) => {
          rl.question("Nhập số lượng hợp số: ", (count) => {
            printSeparator();
            myFun.displayCompositeNumbers(parseInt(n), parseInt(count));
            printSeparator();
            menu();
          });
        });
        break;
      case "4":
        rl.question("Nhập chuỗi họ tên: ", (fullName) => {
          printSeparator();
          myFun.splitFullName(fullName);
          printSeparator();
          menu();
        });
        break;
      case "5":
        printSeparator();
        rl.close();
        break;
      default:
        printSeparator();
        console.log("Lựa chọn không hợp lệ. Vui lòng chọn lại.");
        printSeparator();
        menu();
    }
  });
}

function execute(a, b) {
  let primes = [];
  for (let i = a; i <= b; i++) {
    if (myFun.isPrime(i)) {
      primes.push(i);
    }
  }
  console.log("Prime numbers:", primes.join(", "));
}

menu();
