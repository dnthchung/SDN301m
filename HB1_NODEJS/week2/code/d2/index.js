const _ = require('lodash')

const nums = [1, 2, 3, 4, 5]

console.log('Random:', _.sample(nums))
console.log('Chunk:', _.chunk(nums, 2))
console.log('First:', _.first(nums))
