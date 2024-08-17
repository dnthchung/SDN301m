export class ResponseData<myData> {
  data: myData | myData[]; // Union type : (OR) |
  statusCode: number;
  message: string;

  //constructor to use this class
  constructor(data: myData | myData[], statusCode: number, message: string) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;

    return this; // maybe don't need this line
  }
}
