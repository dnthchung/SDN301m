//cách 1, export các thành phần trong module
// export function area(l, w) {
//   return l * w;
// }
// export function perimeter(l, w) {
//   return 2 * (l + w);
// }
//cách 2, export object chứa các thành phần
function area(l, w) {
  return l * w;
}
function perimeter(l, w) {
  return 2 * (l + w);
}
module.exports = { area, perimeter };
//es 6export default { area, perimeter };
