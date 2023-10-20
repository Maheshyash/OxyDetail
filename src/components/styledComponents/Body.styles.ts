import {styled } from "@mui/material";

export const BodyContainer = styled('main')(({theme})=>({
    // borderBottom:`1px solid ${theme.palette.grey['50']}`
    background:'white',
    borderRadius:'12px',
    padding:'12px',
    margin:'20px',
    boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
}));

export const NormalContainer = styled('div')(({theme})=>({
    padding:'12px',
    margin:'20px',
}));