//xử lý tính chu vi và diện tích hình chữ nhật
// es 6 : import { area, perimeter } from "./rectangle";
const Rectangle = require("./rectangle");

function calcRectangle(length, width) {
  if (length <= 0 || width <= 0) {
    console.log("Invalid input");
    return;
  } else {
    console.log("Area: " + Rectangle.area(length, width));
    console.log("Perimeter: " + Rectangle.perimeter(length, width));
  }
}

calcRectangle(5, 10);
calcRectangle(-5, 10);
calcRectangle(5, -10);
