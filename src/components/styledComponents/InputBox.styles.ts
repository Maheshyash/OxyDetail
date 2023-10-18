import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
export const InputBox = styled(TextField)(({theme})=>({
    border:`1px light ${theme.palette.grey['50']}`,
    color:theme.palette.text.primary,
    fontSize:`${theme.typography.fontSize}px`,
    width:"100%"
}))
// Provide default values for InputLabelProps
InputBox.defaultProps = {
    InputLabelProps: {
        shrink: true,
    },
};
export const PhoneNumber = styled(InputBox)(({theme})=>({
    border:`1px light ${theme.palette.grey['50']}`,
    color:theme.palette.text.primary,
    fontSize:`${theme.typography.fontSize}px`,
    width:"100%"
}));
export const PaperContainer = styled(Paper)(()=>({
    padding:"10px"
}))
PhoneNumber.defaultProps = {
    size:"small",
    inputProps: {
      inputMode: 'numeric',
      pattern: '[0-9]*',
      maxLength: 10,
    },
  };
export const Label = styled('label')(({theme})=>({
    color:theme.palette.text.secondary,
    fontSize:`${theme.typography.subtitle1.fontSize}px`
}));

export const ActionButtonGroup = styled('section')(({theme})=>({
    textAlign:'end',
    '& > *:not(:last-child)': {
        marginRight: '10px',
      },
}));

export const CustomeAutoSelect = styled(Autocomplete)(({theme})=>({
    border:`1px light ${theme.palette.grey['50']}`,
    color:theme.palette.text.primary,
    fontSize:`${theme.typography.fontSize}px`,
    width:"100%",
    '& .MuiInputLabel-root': {
        transform: 'scale(1)',
        transformOrigin: 'top left',
    },
}));

export const PlainButton = styled('button')(({theme})=>({
    border:'none',
    background:"transparent"
}))
export const Layout = styled('div')(({theme})=>({
    marginTop:"20px",
    padding:"20px"
}))
export const HeaderTag = styled('header')(({theme})=>({
    marginBottom:"10px",
    '& .MuiPaper-root': {
        padding:"5px"
    },
}))
export const CustomButton = styled(Button)(({theme})=>({
    textTransform:'inherit'
}))
CustomButton.defaultProps ={
    size : 'small'
}