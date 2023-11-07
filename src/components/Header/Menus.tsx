import { useTheme } from '@mui/material';
import { CustomNavLink } from '../styledComponents/Header.styles';
import { useEffect, useState } from 'react';
import React from 'react';
import { roleMenuArrayType, roleMenuItemType } from '../../types/roleTypes';

const MenusList = () => {
  const theme = useTheme();
  const [Menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    updateHeaderMenus();
    window.addEventListener('storage', () => {
      updateHeaderMenus();
    });
  }, []);

  const updateHeaderMenus = () => {
    const localMenus: roleMenuArrayType | string | null = localStorage.getItem('menu');
    const Menuss = localMenus ? JSON.parse(localMenus) : [];
    const HaveAccessMenu = Menuss.filter((ele: roleMenuItemType) => ele.haveAccess);
    setMenus(HaveAccessMenu);
  };
  if (Menus.length === 0) return '';
  return (
    <React.Fragment>
      {Menus.map((menu: any, menuIndex: number) => {
        return (
          <CustomNavLink
            key={`${menu.menuId}_${menuIndex}`}
            to={menu.menuUrl}
            className={({ isActive }) => (isActive ? 'active' : '')}
            style={{
              color: location.href.includes('addMR') && menu.menuUrl === '' ? theme.palette.primary.main : 'inherit'
            }}
          >
            {menu.menuName}
          </CustomNavLink>
        );
      })}
    </React.Fragment>
  );
};
export default MenusList;
