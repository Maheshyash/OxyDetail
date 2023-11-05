import { styled } from '@mui/material/styles';


export const ChangeOrResetPasswordContainer = styled('div')(({ theme }) => ({
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.primary.light,
    // cursor:'pointer'
}));

export const Span = styled('span')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.fontSize,
    cursor: 'pointer'
}));

export const LoginContainer = styled('main')(() => ({
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative',
    '& aside.login_left-side': {
        flex: '1 1 0%',
        display: 'flex',
        position: 'relative',
        //   -webkit-box-align: center,
        alignItems: 'center',
        //   -webkit-box-pack: center,
        justifyContent: 'center',
    },
    '& aside.login_right-side':{
        minWidth: 380
    }
}));


export const LoginRightContainer = styled('main')(() => ({
    padding: '3rem',
    height: '100%',
    display: 'flex',
    //   -webkit-box-align: center,
    alignItems: 'center',
    //   -webkit-box-pack: center,
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    '& form':{
        width:'100%'
    },
    '& section:not(.logo)': {
        marginBottom: 20
    }
}));