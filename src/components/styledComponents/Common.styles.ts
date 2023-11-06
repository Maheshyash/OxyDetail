import styled from '@mui/material/styles/styled';
import Input from '@mui/material/Input';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { keyframes, alpha } from '@mui/material';
import { MultiSelect } from 'react-multi-select-component';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { DatePicker } from '@mui/x-date-pickers';
import Checkbox from '@mui/material/Checkbox';

export const NoRecordsFound = styled('div')(({ theme }) => ({
  textAlign: 'center',
  fontSize: `${theme.typography.fontSize}px`
}));

export const AddButtonContainer = styled('div')(() => ({
  textAlign: 'end',
  marginBottom: 10
}));
export const StyledInput = styled('input')({
  display: 'none'
});
export const ActionButtons = styled('div')(() => ({
  '& .MuiSvgIcon-root:not(:last-child)': {
    marginRight: '5px'
  },
  '& .MuiSvgIcon-root': {
    cursor: 'pointer'
  }
}));
export const FilterContainer = styled('div')(() => ({
  display: 'flex',
  gap: 10
}));

export const CustomeFileUpload = styled(Input)(() => ({
  // display:'block',
  width: '100%'
}));
const spinAnimation = keyframes`
  0% { transform: rotate(0deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(360deg) }
`;
export const LoaderSpinnerContainer = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'inline-block',
  overflow: 'hidden',
  position: 'fixed',
  background: 'rgb(228 191 191 / 50%)',
  // background: theme.palette.primary.light,
  zIndex: 1000,
  left: 0,
  right: 0,
  bottom: 0,
  top: 0
}));
export const LoaderContainer = styled('div')(() => ({
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
  boxShadow: `0 2.955px 0 0 ${theme.palette.primary.dark}`,
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

export const CustomMultiSelect = styled(MultiSelect)(({ theme }) => ({
  '& .dropdown-heading': {
    fontSize: `${theme.typography.fontSize}px`,
    height: '33px'
  },
  '& .dropdown-container:focus-within': {
    boxShadow: `${theme.palette.primary.main} 0 0 0 1px`,
    borderColor: `${theme.palette.primary.main}`
  },
  '& .dropdown-content': {
    fontSize: `${theme.typography.fontSize}px`
  }
}));
export const CustomTextArea = styled(TextareaAutosize)(({ theme }) => ({
  fontSize: `${theme.typography.fontSize}px`,
  width: '100%',
  borderRadius: '4px',
  fontFamily: `${theme.typography.fontFamily}`,
  color: `${theme.palette.text.primary}`,
  border: `1px solid ${theme.palette.grey['50']}`,
  resize: 'vertical',
  '&:focus-visible': {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
    outline: 'none',
    borderRadius: '4px'
  }
}));

export const FlexItemBetweenContent = styled('div')(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.main}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px',
  borderRadius: '5px',
  margin: '10px 0',
  '& h5': {
    margin: 0,
    color: '#fff'
  },
  '& svg': {
    cursor: 'pointer'
  }
}));

export const ErrorMessage = styled('span')(({ theme }) => ({
  display: 'block',
  color: `${theme.palette.error.main}`,
  fontSize: `${theme.typography.fontSize}px`
}));

export const ImgLogo = styled('img')(() => ({
  width: 200
}));

export const StyledModalBackdrop = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999999999
}));
export const StyledModalBody = styled('div')(() => ({
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  display: 'flex',
  justifyContent: 'center'
}));

export const StyledModalContent = styled('div')(({ theme }) => ({
  background: '#fff',
  padding: '20px',
  borderRadius: '4px',
  boxShadow: theme.shadows[10],
  width: '400px'
}));

export const CustomParagraph = styled('p')(({ theme }) => ({
  fontSize: theme.typography.fontSize,
  margin: 0
}));

export const CustomDatepicker = styled(DatePicker)(({ theme }) => ({
  '.MuiFormControl-root': {
    width: '100%'
  },
  '& .MuiOutlinedInput-input': {
    fontSize: theme.typography.fontSize
  }
}));

CustomDatepicker.defaultProps = {
  slotProps: {
    textField: { size: 'small' },
    field: { clearable: true }
  }
};

export const DatePickerContainer = styled(Stack)({
  width: '100%'
});

export const CustomCheckBox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.error.main,
  '&.Mui-checked': {
    color: theme.palette.success.dark
  }
}));
