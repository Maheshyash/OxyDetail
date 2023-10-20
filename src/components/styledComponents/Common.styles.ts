import { styled } from "@mui/material";

export const NoRecordsFound = styled('div')(({ theme }) => ({
    textAlign: "center",
    fontSize: `${theme.typography.fontSize}px`
}));

export const AddButtonContainer = styled('div')(({ theme }) => ({
    textAlign: 'end',
    marginBottom: 10
}));
export const StyledInput = styled('input')({
    display: 'none',
});
export const ActionButtons = styled('div')((theme) => ({

    '& .MuiSvgIcon-root:not(:last-child)': {
        marginRight: '5px',
    },
    '& .MuiSvgIcon-root': {
        cursor: 'pointer'
    }

}))
export const FilterContainer = styled('div')((theme) => ({
    display:'flex',
    gap:10
}))