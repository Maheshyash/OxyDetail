import { useLocation } from 'react-router-dom';
import { fetchMenuList } from '../utils/APIActions';
import { useEffect, useState } from 'react';
import { roleMenuArrayType, roleMenuItemType, subItemType } from '../types/roleTypes';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { TD, TH } from '../components/styledComponents/Table.styles';

const RoleMapping = () => {
  const location = useLocation();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [menuDetails, setMenuDetails] = useState<roleMenuArrayType>([]);
  useEffect(() => {
    fetchMenuDetails();
  }, []);
  const fetchMenuDetails = () => {
    setIsLoader(true);
    fetchMenuList(location.state.roleDetails.roleId)
      .then(res => {
        setMenuDetails(res);
        setIsLoader(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoader(false);
      });
  };
  
  return (
    <BodyContainer>
      <table>
        <thead>
          <tr>
            <TH>Menu</TH>
            <TH>SubMenu</TH>
            <TH></TH>
          </tr>
        </thead>
        <tbody>
          {menuDetails.map((menuItem: roleMenuItemType) => {
            return (
              <>
              <tr key={menuItem.menuId}>
                <TD rowSpan={menuItem.subMenus.length + 1}>
                  {menuItem.menuName}
                </TD>
                <TD></TD>
                <TD><input type="checkbox" checked={menuItem.haveAccess}/></TD>
              </tr>
              {menuItem.subMenus.map((subMenu: subItemType) => {
                return (
                  <tr key={subMenu.subMenuId}>
                    <TD>{subMenu.subMenuName}</TD>
                    <TD>
                      <input type="checkbox" checked={subMenu.haveAccess}/>
                    </TD>
                  </tr>
                );
              })}
              </>
            );
          })}
        </tbody>
      </table>
    </BodyContainer>
  );
};

export default RoleMapping;
