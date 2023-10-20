import { Input, styled, keyframes, Switch, alpha } from '@mui/material';

export const NoRecordsFound = styled('div')(({ theme }) => ({
  textAlign: 'center',
  fontSize: `${theme.typography.fontSize}px`
}));

export const AddButtonContainer = styled('div')(({ theme }) => ({
  textAlign: 'end',
  marginBottom: 10
}));
export const StyledInput = styled('input')({
  display: 'none'
});
export const ActionButtons = styled('div')(theme => ({
  '& .MuiSvgIcon-root:not(:last-child)': {
    marginRight: '5px'
  },
  '& .MuiSvgIcon-root': {
    cursor: 'pointer'
  }
}));
export const FilterContainer = styled('div')(theme => ({
  display: 'flex',
  gap: 10
}));

export const CustomeFileUpload = styled(Input)(({ theme }) => ({
  // display:'block',
  width: '100%'
}));
const spinAnimation = keyframes`
  0% { transform: rotate(0deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(360deg) }
`;
export const LoaderSpinnerContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'inline-block',
  overflow: 'hidden',
  position: 'absolute',
  background: 'rgb(228 191 191 / 50%)',
  zIndex: 1000,
  left: 0,
  right: 0,
  bottom: 0,
  top: 0
}));
export const LoaderContainer = styled('div')(({ theme }) => ({
  backfaceVisibility: 'hidden',
  transformOrigin: '0 0',
  width: 'fit-content',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)'
}));

export const LoaderContainerInner = styled('div')(({ theme }) => ({
  animation: `${spinAnimation} 1.28s linear infinite`,
  width: '90.62px',
  height: '90.62px',
  borderRadius: '50%',
  boxShadow: '0 2.955px 0 0 #df5959',
  transformOrigin: '45.31px 46.7875px',
  boxSizing: 'content-box',
  transform: 'translate(-50%, -50%)'
}));
export const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: `${theme.palette.success.main}`,
    '&:hover': {
      backgroundColor: alpha(`${theme.palette.success.main}`, theme.palette.action.hoverOpacity)
    }
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: `${theme.palette.success.main}`
  },
  '& .MuiSwitch-switchBase + .MuiSwitch-track': {
    backgroundColor: `${theme.palette.error.light}`
  },
  '& .MuiSwitch-switchBase': {
    color: `${theme.palette.error.light}`, // Change the color for the "off" state (unchecked)
    '&:hover': {
      backgroundColor: alpha(`${theme.palette.error.light}`, theme.palette.action.hoverOpacity)
    }
  }
}));