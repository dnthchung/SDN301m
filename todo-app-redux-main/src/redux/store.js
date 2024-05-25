import redux from "redux";
import { legacy_createStore as createStore } from "redux";

//rootReducer là 1 cái function nhận vào 2 tham số là state và action để quản lý các state
//initValue là giá trị khởi tạo của store (có thể ko có )
//ehancer là để cấu hình các middleware như redux saga, redux thunk
// const store = createStore(rootReducer, initValue, enhancer);
const store = createStore(rootReducer);

export default store;
