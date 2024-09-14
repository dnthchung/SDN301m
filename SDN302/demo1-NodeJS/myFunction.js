//C1
isPrime = (n) => {
  let count = 0;
  for (let i = 1; i <= n / 2; i++) if (n % i == 0) count++;
  return count == 1; // True if it's prime
};

//C2
function ChuVi(a, b) {
  return (a + b) * 2;
}

//C3
function DienTich(a, b) {
  return a * b;
}

// Function to display an array of integers
function displayArray(arr) {
  console.log(arr.join(", "));
}

// Function to display n composite numbers > n
function displayCompositeNumbers(n, count) {
  let composites = [];
  let i = n + 1;
  while (composites.length < count) {
    if (!isPrime(i)) {
      composites.push(i);
    }
    i++;
  }
  console.log("Composite numbers:", composites.join(", "));
}

// Function to split full name
function splitFullName(fullName) {
  let nameParts = fullName.trim().split(" ");
  let firstName = nameParts.pop();
  let lastName = nameParts.shift();
  let middleName = nameParts.join(" ");
  console.log(`Họ: ${lastName}, Tên đệm: ${middleName}, Tên: ${firstName}`);
}

module.exports = {
  ChuVi,
  isPrime,
  DienTich,
  displayArray,
  displayCompositeNumbers,
  splitFullName,
};
