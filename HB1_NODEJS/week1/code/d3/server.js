//node server.js
async function callAPI() {
  try {
    const res = await fetch("https://dummyjson.com/products/1"); // ví dụ lấy 1 product
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();
    console.log(" Response từ API:", data);
  } catch (err) {
    console.error(" Lỗi khi gọi API:", err.message);
  }
}

callAPI();
