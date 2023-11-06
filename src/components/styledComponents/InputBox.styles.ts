import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
export const InputBox = styled(TextField)(({ theme }) => ({
  border: `1px light ${theme.palette.grey['50']}`,
  color: theme.palette.text.primary,
  fontSize: `${theme.typography.fontSize}px`,
  width: '100%',
  '& .MuiInputBase-input': {
    fontSize: `${theme.typography.fontSize}px` // Apply the font size to the input field
  }
}));
// Provide default values for InputLabelProps
InputBox.defaultProps = {
  InputLabelProps: {
    shrink: true
  }
};
export const PhoneNumber = styled(InputBox)(({ theme }) => ({
  border: `1px light ${theme.palette.grey['50']}`,
  color: theme.palette.text.primary,
  width: '100%'
}));
export const PaperContainer = styled(Paper)(() => ({
  padding: '10px'
}));
PhoneNumber.defaultProps = {
  size: 'small',
  inputProps: {
    inputMode: 'tel',
    pattern: '[0-9]*',
    maxLength: 10
  }
};
export const Label = styled('label')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: `${theme.typography.subtitle1.fontSize}px`,
  display: 'block'
}));

export const ActionButtonGroup = styled('section')(() => ({
  textAlign: 'end',
  marginTop: 10,
  '& > *:not(:last-child)': {
    marginRight: '10px'
  }
}));

export const CustomeAutoSelect = styled(Autocomplete)(({ theme }) => ({
  border: `1px light ${theme.palette.grey['50']}`,
  color: theme.palette.text.primary,
  fontSize: `${theme.typography.fontSize}px`,
  width: '100%',
  '& .MuiInputLabel-root': {
    transform: 'scale(1)',
    transformOrigin: 'top left',
    fontSize: '12px'
  },
  root: {
    '& .MuiInputBase-input': {
      fontSize: '12px'
    }
  },
  '& .MuiInputBase-input': {
    fontSize: `${theme.typography.fontSize}px`
  }
}));

export const PlainButton = styled('button')(() => ({
  border: 'none',
  background: 'transparent'
}));
export const Layout = styled('div')(() => ({
  marginTop: '20px',
  padding: '20px'
}));
export const HeaderTag = styled('header')(() => ({
  marginBottom: '10px',
  '& .MuiPaper-root': {
    padding: '5px'
  }
}));
export const CustomButton = styled(Button)(() => ({
  textTransform: 'inherit',
  cursor: 'pointer'
}));
CustomButton.defaultProps = {
  size: 'small'
};
