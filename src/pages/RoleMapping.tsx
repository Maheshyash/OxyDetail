import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMenuList, updateRoleMapping } from '../utils/APIActions';
import { ChangeEvent, useEffect, useState } from 'react';
import { roleMenuArrayType, roleMenuItemType } from '../types/roleTypes';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { TD, TH } from '../components/styledComponents/Table.styles';
import Loader from '../components/Loader/Loader';
import FormActionsButtons from '../components/FormActionsButtons';
import { toaster } from '../components/Toaster/Toaster';
import { CustomCheckBox } from '../components/styledComponents/Common.styles';
import { userListItem } from '../types/userTypes';

const RoleMapping = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [menuDetails, setMenuDetails] = useState<roleMenuArrayType>([]);

  useEffect(() => {
    fetchMenuDetails();
  }, []);
  const fetchMenuDetails = async () => {
    setIsLoader(true);
    await fetchMenuList(location.state.roleDetails.roleId)
      .then(res => {
        setMenuDetails(res);
        setIsLoader(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoader(false);
      });
  };

  const handleMenuItem = (event: ChangeEvent<HTMLInputElement>, menuIndex: number) => {
    const value = event.target.checked;
    const clonedData: roleMenuArrayType = JSON.parse(JSON.stringify(menuDetails));
    clonedData[menuIndex].haveAccess = value;
    setMenuDetails(clonedData);
  };

  // const handleSubMenuItem = (event: ChangeEvent<HTMLInputElement>, menuIndex: number, submenuIndex: number) => {
  //   const value = event.target.checked;
  //   const clonedData: roleMenuArrayType = JSON.parse(JSON.stringify(menuDetails));
  //   clonedData[menuIndex].subMenus[submenuIndex].haveAccess = value;
  //   setMenuDetails(clonedData);
  // };

  const handleMapping = async () => {
    const roleMappingList: roleMenuArrayType = menuDetails.filter(menu => menu.haveAccess);
    const data = roleMappingList.map(menu => ({
      menuId: menu.menuId,
      subMenus: {
        subMenuIds: menu.subMenus
          // .filter(ele => ele.haveAccess)
          .map(submenu => ({ subMenuIds: submenu.subMenuId, access: submenu.haveAccess }))
          .map(ele => ele.subMenuIds)
          .toString()
      }
    }));
    const payload = {
      RoleId: location.state.roleDetails.roleId,
      MenuIds: JSON.stringify(data)
    };
    setIsLoader(true);
    await updateRoleMapping(payload)
      .then(async res => {
        if (res.statusCode === 0 || res.statusCode === 1) {
          let userDetails: userListItem | string | any = localStorage.getItem('userDetails');
          if (userDetails) {
            userDetails = JSON.parse(userDetails);
          }
          await fetchMenuList(userDetails.roleId)
            .then(res => {
              localStorage.setItem('menu', JSON.stringify(res));
              window.dispatchEvent(new Event('storage'));
            })
            .catch(err => {
              console.log(err, 'err');
              setIsLoader(false);
            });
          toaster('success', res.statusMessage);
          setIsLoader(false);
          navigate(-1);
        } else {
          setIsLoader(false);
          toaster('error', res.statusMessage);
        }
      })
      .catch(err => {
        console.log(err, 'err');
        setIsLoader(false);
      });
  };
  return (
    <BodyContainer>
      {isLoader && <Loader />}
      <div style={{ width: '100%' }}>
        <table style={{ width: 'inherit', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <TH>Menu</TH>
              {/* <TH>SubMenu</TH> */}
              <TH style={{ width: 100 }}></TH>
            </tr>
          </thead>
          <tbody>
            {menuDetails.map((menuItem: roleMenuItemType, menuIndex: number) => {
              return (
                <>
                  <tr key={menuItem.menuId}>
                    {/* <TD rowSpan={menuItem.subMenus.length + 1}>{menuItem.menuName}</TD> */}
                    <TD>{menuItem.menuName}</TD>
                    {/* <TD></TD> */}
                    <TD>
                      <CustomCheckBox
                        checked={menuItem.haveAccess}
                        onChange={event => handleMenuItem(event, menuIndex)}
                      />
                    </TD>
                  </tr>
                  {/* {menuItem.subMenus.map((subMenu: subItemType, submenIndex: number) => {
                    return (
                      <tr key={subMenu.subMenuId}>
                        <TD>{subMenu.subMenuName}</TD>
                        <TD>
                          <CustomCheckBox
                            checked={subMenu.haveAccess}
                            onChange={event => handleSubMenuItem(event, menuIndex, submenIndex)}
                          />
                        </TD>
                      </tr>
                    );
                  })} */}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <FormActionsButtons handleForm={handleMapping} />
    </BodyContainer>
  );
};

export default RoleMapping;
