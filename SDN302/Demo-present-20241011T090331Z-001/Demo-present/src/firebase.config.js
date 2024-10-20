const { initializeApp } = require("firebase/app");
const { getStorage, ref } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyCyWxvsnPjOqFonFVszcZ3D2QruLIZUSY8",
  authDomain: "fir-upload-sdn.firebaseapp.com",
  projectId: "fir-upload-sdn",
  storageBucket: "fir-upload-sdn.appspot.com",
  messagingSenderId: "48478008113",
  appId: "1:48478008113:web:7bab62c17b6151be883610",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const storageRef = ref(storage);

module.exports = { firebaseConfig, storage, storageRef };
