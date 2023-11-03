import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import user from '../assets/user.png';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { PlainButton, CustomButton } from './styledComponents/InputBox.styles';
import { CustomNavLink, HeaderBody, HeaderContainer, OxyDetailHeaderText } from './styledComponents/Header.styles';
import { useTheme } from '@mui/material';
const Header = ({ removeAuthToken }: { removeAuthToken: any }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    removeAuthToken();
    navigate('./', { replace: true });
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <HeaderContainer>
      <HeaderBody>
        <section>
          <OxyDetailHeaderText>OxyDetail</OxyDetailHeaderText>
        </section>
        <section className="header_right">
          <div className="header_right_container">
            <div>
              <CustomNavLink
                to={'/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
                style={{ color: location.href.includes('/addMR') ? theme.palette.primary.main : 'inherit' }}
              >
                MR
              </CustomNavLink>
            </div>
            <div>
              <CustomNavLink to={'/user'} className={({ isActive }) => (isActive ? 'active' : '')}>
                User
              </CustomNavLink>
            </div>
            <div>
              <CustomNavLink to={'/role'} className={({ isActive }) => (isActive ? 'active' : '')}>
                Role
              </CustomNavLink>
            </div>
            <div>
              <CustomNavLink to={'/Product'} className={({ isActive }) => (isActive ? 'active' : '')}>
                Product
              </CustomNavLink>
            </div>
            <div>
              <CustomNavLink to={'/attribute'} className={({ isActive }) => (isActive ? 'active' : '')}>
                Attribute
              </CustomNavLink>
            </div>
            <div>
              <CustomNavLink to={'/organization'} className={({ isActive }) => (isActive ? 'active' : '')}>
                Organization
              </CustomNavLink>
            </div>
            <div>
              <CustomNavLink to={'/organization_settings'} className={({ isActive }) => (isActive ? 'active' : '')}>
                Organization Settings
              </CustomNavLink>
            </div>
            <div>
              <PlainButton aria-describedby={id} onClick={handleClick}>
                <Avatar alt="Remy Sharp" src={user} />
              </PlainButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
              >
                <Box>
                  <Paper elevation={0}>
                    <CustomButton variant="text" onClick={() => handleLogout()}>
                      Log out
                    </CustomButton>
                  </Paper>
                </Box>
              </Popover>
            </div>
          </div>
        </section>
      </HeaderBody>
    </HeaderContainer>
  );
};

export default Header;
