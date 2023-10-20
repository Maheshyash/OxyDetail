import { Grid, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export const HeaderContainer = styled('header')(({theme})=>({
    borderBottom:`1px solid ${theme.palette.divider}`,
    background:'#ffffff',
    position:'sticky',
    top:0,
    zIndex:999
}));

export const HeaderBody = styled(Grid)(({theme})=>({
    padding:theme.spacing(0.5),
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    background:'#ffffff'
}))
export const OxyDetailHeaderText = styled('h2')(({theme})=>({
    margin:0,
    color:theme.palette.primary.main
}))

export const CustomNavLink = styled(NavLink)(({theme})=>({
    textDecoration:'none',
    fontSize:'14px',
    color:`${theme.palette.text.secondary}`,
    '&.active': {
        color:`${theme.palette.primary.main}`
    },
}))