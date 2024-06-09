import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.scss";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetail from "./pages/ProductDetail";

import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";

import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import ProductForm from "./pages/admin/ProductForm";

import instance from "./axios/index";
import { set } from "react-hook-form";

function App() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  //fetch data from backend / api
  useEffect(() => {
    /**
     * Cách viết code này được gọi là Immediately Invoked Function Expression (IIFE). Đây là một hàm JavaScript được định nghĩa và thực thi ngay lập tức. Trong trường hợp của bạn, hàm IIFE được sử dụng bên trong một useEffect hook trong React.
     */
    (async () => {
      try {
        const { data } = await instance.get("/products");
        // console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //post cần đi kèm body(ở đây là cái data)
  const handleMySubmit = (data) => {
    (async () => {
      try {
        const result = await instance.post("/products", data);
        // console.log(result.data);

        // setProducts(data);
        //dải dữ liệu products mới vào trước,và thêm 1 pần tử và ouối mảng
        setProducts([...products, result.data]);
        if (
          confirm("add ok , Bạn có muốn chuyển hướng đến trang admin không?")
        ) {
          navigate("/admin/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const handleDeleteApp = async (id) => {
    console.log("Delete product with id: ", id);
    (async () => {
      try {
        if (confirm("Bạn có chắc chắn muốn xóa không?")) {
          await instance.delete(`/products/${id}`);
          //2 cách cập nhật dữ liệu m : cách 1 là t ra 1 mảng mới, cách 2 là dùng filter bỏ qua cái id đó
          //cách 1
          // const newProducts = products.filter(
          //   (product) => product.id !== id && product
          // );
          // setProducts(newProducts);

          //cách 2 - ngắn hơn những không thực sự tối ưu,
          //vì chỉ vì xóa 1 sản pẩm mà gọi là api => server mệt mỏi
          //hơn nữa lúc set lại data, c phải thêm cấm data, không là không được
          //vì newData trả về là 1 object, bên trong nó chứa thằng Data
          const newData2 = await instance.get("/products");
          setProducts(newData2.data);
          //reload lại trang
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const handleProductApp = async (data) => {
    if (data.id) {
      //edit
      try {
        await instance.put(`/products/${data.id}`, data);
        const newProducts = await instance.get("/products");
        setProducts(newProducts.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      //add
      try {
        const result = await instance.post("/products", data);
        setProducts([...products, result.data]);
      } catch (error) {
        console.log(error);
      }
    }
    if (confirm("FOrm ok , Bạn có muốn chuyển hướng đến trang admin không?")) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage dataTrans={products} />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/about" element={<AboutPage />} />
          {/* roduct detail */}

          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard - Private admin */}
          <Route path="/admin" element={<PrivateRoute />}>
            <Route
              path="/admin/dashboard"
              element={<Dashboard handleDelete={handleDeleteApp} />}
            />
            <Route
              path="/admin/add-product"
              element={<AddProduct onMyAdd={handleMySubmit} />}
            />

            <Route
              path="/admin/add"
              element={<ProductForm handleProduct={handleProductApp} />}
            />
            <Route
              path="/admin/add/:id"
              element={<ProductForm handleProduct={handleProductApp} />}
            />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
