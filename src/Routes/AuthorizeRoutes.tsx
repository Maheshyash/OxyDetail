import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import MRPage from '../pages/MRPage';
import ProductPage from '../pages/ProductPage';
import AddOrEditProduct from '../pages/AddOrEditProduct';
import AddOrEditMRPage from '../pages/AddOrEditMRPage';
import AttributesPage from '../pages/AttributesPage';
import AddOrEditAttributes from '../pages/AddOrEditAtrributes';
import AttributeMappingPage from '../pages/AttributeMappingPage';
const AuthorizeRoutes = ({removeAuthToken}:{removeAuthToken:any}) => {
  return (
    <BrowserRouter>
      <Header removeAuthToken={removeAuthToken}/>
      <Routes>
        <Route path="/MrPage" Component={MRPage}/>
        <Route path='/MrPage/addMr' Component={AddOrEditMRPage} />
        <Route path="/product" Component={ProductPage}/>
        <Route path="/product/addProduct" Component={AddOrEditProduct}/>
        <Route path="/product/attributeMapping" Component={AttributeMappingPage}/>
        <Route path="/attribute" Component={AttributesPage}/>
        <Route path="/attribute/addAttribute" Component={AddOrEditAttributes}/>

      </Routes>
    </BrowserRouter>
  );
};

export default AuthorizeRoutes;
