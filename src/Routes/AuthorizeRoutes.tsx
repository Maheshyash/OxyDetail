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
import UserPage from '../pages/UserPage';
import AddOrEditUser from '../pages/AddOrEditUser';
import RolePage from '../pages/RolePage';
import AddOrEditRole from '../pages/AddOrEditRole';
import OrganizationSettingPage from '../pages/OrganizationSettingPage';
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
        <Route path="/user" Component={UserPage} />
        <Route path="/user/addUser" Component={AddOrEditUser} />
        <Route path="/role" Component={RolePage} />
        <Route path="/role/addRole" Component={AddOrEditRole} />
        <Route path='/organization_settings' Component={OrganizationSettingPage}/>
      </Routes>
    </>
  );
};

export default AuthorizeRoutes;
