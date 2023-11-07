import { Routes, Route, RouteMatch, RouteObject, RouteProps } from 'react-router-dom';
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
import CategoryPage from '../pages/CategoryPage';
import RoleMapping from '../pages/RoleMapping';
import SubCategoryPage from '../pages/SubCategoryPage';
import { roleMenuArrayType } from '../types/roleTypes';
import { useState, useEffect } from 'react';
// import { Routes, Route } from "react-router-dom";
interface routeType {
  component: () => JSX.Element;
  path: string;
  ele: string;
}
const AuthorizeRoutes = ({ removeAuthToken }: { removeAuthToken: any }) => {
  const [routes, setRoutes] = useState<React.ReactElement[] | []>([]);
  const userRoutes: Array<routeType> = [
    { path: '/', component: MRPage, ele: 'MR' },
    { path: '/addMr', component: AddOrEditMRPage, ele: 'MR' },
    { path: '/product', component: ProductPage, ele: 'Product' },
    { path: '/product/addProduct', component: AddOrEditProduct, ele: 'Product' },
    { path: '/product/attributeMapping', component: AttributeMappingPage, ele: 'Product' },
    { path: '/attribute', component: AttributesPage, ele: 'Attribute' },
    { path: '/attribute/addAttribute', component: AddOrEditAttributes, ele: 'Attribute' },
    { path: '/organization', component: OrganizationPage, ele: 'Organization' },
    { path: '/organization/addOrganization', component: AddOrEditOrganization, ele: 'Organization' },
    { path: '/user', component: UserPage, ele: 'User' },
    { path: '/user/addUser', component: AddOrEditUser, ele: 'User' },
    { path: '/role', component: RolePage, ele: 'Role' },
    { path: '/role/addRole', component: AddOrEditRole, ele: 'Role' },
    { path: '/role/roleMapping', component: RoleMapping, ele: 'Role' },
    { path: '/category', component: CategoryPage, ele: 'Category' },
    { path: '/subCategory', component: SubCategoryPage, ele: 'SubCategory' },
    { path: '/organization_settings', component: OrganizationSettingPage, ele: 'Organization Settings' }
  ];
  const generateRoutesFromUserRoutes = (userRoutes: Array<routeType>) => {
    const routes: any = [];
    var haveAccessMenuList: roleMenuArrayType = [];
    let roleMenusList: roleMenuArrayType | string | null = localStorage.getItem('menu');
    if (roleMenusList) {
      roleMenusList = JSON.parse(roleMenusList);
    }
    if (Array.isArray(roleMenusList)) {
      haveAccessMenuList = roleMenusList.filter(ele => ele.haveAccess);
    }
    haveAccessMenuList.map(ele => {
      let data = userRoutes.filter(ele1 => ele1.ele === ele.menuName);
      if (data.length > 0) {
        data.map(ele => routes.push(<Route path={ele.path} Component={ele.component} key={ele.path} />));
      }
    });
    return routes;
  };
  useEffect(() => {
    dynamicRoutes();
    window.addEventListener('storage', () => {
      dynamicRoutes();
    });
  }, []);

  const dynamicRoutes = () => {
    const listOfRoutes = generateRoutesFromUserRoutes(userRoutes);
    setRoutes(listOfRoutes);
  };

  return (
    <>
      <Header removeAuthToken={removeAuthToken} />
      <Routes>
        {/* <Route path="/" Component={MRPage} />
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
        <Route path="/role/roleMapping" Component={RoleMapping} />
        <Route path="/organization_settings" Component={OrganizationSettingPage} />
        <Route path="/category" Component={CategoryPage} />
        <Route path="/subCategory" Component={SubCategoryPage} /> */}
        {routes}
        <Route path="*" Component={NotFound}/>
      </Routes>
    </>
  );
};

export default AuthorizeRoutes;

const NotFound = () =>{
  return(
    <div>
      Not Found 
    </div>
  )
}