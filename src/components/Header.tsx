import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import user from '../assets/user.png';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { PlainButton , HeaderTag, CustomButton} from './styledComponents/InputBox.styles';
const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <HeaderTag>
      <Paper>
        <section></section>
        <section className="header_right">
          <div className="header_right_container">
            <div>
              <NavLink to={'/MrPage'}>MR Page</NavLink>
            </div>
            <div>
              <NavLink to={'/Product'}>Product Page</NavLink>
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
                    <CustomButton variant="text">Log out</CustomButton>
                  </Paper>
                </Box>
              </Popover>
            </div>
          </div>
        </section>
      </Paper>
    </HeaderTag>
  );
};

export default Header;
