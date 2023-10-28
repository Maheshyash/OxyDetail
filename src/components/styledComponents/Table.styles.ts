import {styled} from "@mui/material";

export const TableContainer = styled('div')(({theme})=>({
    maxHeight:'70vh',
    overflow:'auto',
    borderRadius:10
}));

export const TH = styled('th')(({theme})=>({
    background:`${theme.palette.primary.dark}`,
    fontSize:`${theme.typography.fontSize}px`,
    fontWeight:500,
    color:"#ffffff",
    textAlign:'center'
}));
export const TD = styled('td')(({theme})=>({
    background:"#ffffff",
    fontSize:`${theme.typography.fontSize}px`,
    textAlign:'center',
    padding:5
}));