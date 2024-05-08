import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ProductList from './components/ProductList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/products' element={<ProductList/>}/>
        {/* <Route path='/products/create' element={<CreateProduct/>}/>
        <Route path='/products/:id' element={<Detail/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
