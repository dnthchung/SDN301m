import {Add, Sub, Mul} from './calc.js';

// Array of objects
const data = [
    {"id": 1, "Name": "John", "Age": 20},
    {"id": 2, "Name": "David", "Age": 21},
    {"id": 3, "Name": "Marry", "Age": 19}
];


console.log(`x + y = ${Add(10, 20)}`);
console.log(`x - y = ${Sub(10, 20)}`);
console.log(`x * y = ${Mul(10, 20)}`);

ShowData(data);
