import "./App.css";
import Layout from "./components/layout";
import Home from "./pages/home";
import Detail from "./pages/detail";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* if there is any other route it will be pointed to the detail */}
          <Route path="/:slug" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
