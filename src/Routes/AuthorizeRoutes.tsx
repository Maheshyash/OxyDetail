import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import MRPage from '../pages/MRPage';
import ProductPage from '../pages/ProductPage';
import AddOrEditProduct from '../pages/AddOrEditProduct';
import AddOrEditMRPage from '../pages/AddOrEditMRPage';
const AuthorizeRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/MrPage" Component={MRPage}/>
        <Route path='/MrPage/addMr' Component={AddOrEditMRPage} />
        <Route path="/product" Component={ProductPage}/>
        <Route path="/product/addProduct" Component={AddOrEditProduct}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AuthorizeRoutes;
