import { useTheme } from '@mui/material';
import { CustomNavLink } from '../styledComponents/Header.styles';

const MenusList = () => {
  const theme = useTheme();
  const Menus = [
    { menu: 'MR', to: '/' },
    { menu: 'User', to: '/user' },
    { menu: 'Role', to: '/role' },
    { menu: 'Product', to: '/Product' },
    { menu: 'Attribute', to: '/attribute' },
    { menu: 'Organization', to: '/organization' },
    { menu: 'Organization Settings', to: '/organization_settings' }
  ];
  if (Menus.length === 0) return '';
  return (
    <>
      {Menus.map((menu,menuIndex) => {
        return (
          <CustomNavLink
            key={`${menu}_${menuIndex}`}
            to={menu.to}
            className={({ isActive }) => (isActive ? 'active' : '')}
            style={{
              color: location.href.includes('/addMR') && menu.to === '/' ? theme.palette.primary.main : 'inherit'
            }}
          >
            {menu.menu}
          </CustomNavLink>
        );
      })}
    </>
  );
};
export default MenusList;
