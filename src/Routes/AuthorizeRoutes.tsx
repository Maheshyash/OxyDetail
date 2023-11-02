import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import MRPage from '../pages/MRPage';
import ProductPage from '../pages/ProductPage';
import AddOrEditProduct from '../pages/AddOrEditProduct';
import AddOrEditMRPage from '../pages/AddOrEditMRPage';
import AttributesPage from '../pages/AttributesPage';
import AddOrEditAttributes from '../pages/AddOrEditAtrributes';
import AttributeMappingPage from '../pages/AttributeMappingPage';
import OrganizationPage from '../pages/OrganizationPage';
import AddOrEditOrganization from '../pages/AddOrEditOrganization';
const AuthorizeRoutes = ({ removeAuthToken }: { removeAuthToken: any }) => {
  return (
    <>
      <Header removeAuthToken={removeAuthToken} />
      <Routes>
        <Route path="/" Component={MRPage} />
        <Route path="/addMr" Component={AddOrEditMRPage} />
        <Route path="/product" Component={ProductPage} />
        <Route path="/product/addProduct" Component={AddOrEditProduct} />
        <Route path="/product/attributeMapping" Component={AttributeMappingPage} />
        <Route path="/attribute" Component={AttributesPage} />
        <Route path="/attribute/addAttribute" Component={AddOrEditAttributes} />
        <Route path="/organization" Component={OrganizationPage} />
        <Route path="/organization/addOrganization" Component={AddOrEditOrganization} />
      </Routes>
    </>
  );
};

export default AuthorizeRoutes;
