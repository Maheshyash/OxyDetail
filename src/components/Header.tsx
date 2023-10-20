import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import user from '../assets/user.png';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { PlainButton, CustomButton } from './styledComponents/InputBox.styles';
import { CustomNavLink, HeaderBody, HeaderContainer, OxyDetailHeaderText } from './styledComponents/Header.styles';
const Header = ({ removeAuthToken }: { removeAuthToken: any }) => {
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
    navigate('./#', { replace: true });
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
              <CustomNavLink to={'/MrPage'} className={({ isActive }) => (isActive ? 'active' : '')}>
                MR
              </CustomNavLink>
            </div>
            <div>
              <CustomNavLink to={'/Product'} className={({ isActive }) => (isActive ? 'active' : '')}>
                Product
              </CustomNavLink>
            </div>
            <div>
              <CustomNavLink to={'/attributes'} className={({ isActive }) => (isActive ? 'active' : '')}>
                Attributes
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
