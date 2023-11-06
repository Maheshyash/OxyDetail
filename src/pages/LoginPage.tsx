import { useState, ChangeEvent, FormEvent } from 'react';
import LabelValue from '../components/LabelValue';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { fetchToken } from '../utils/APIActions';
import { toaster } from '../components/Toaster/Toaster';
import Loader from '../components/Loader/Loader';
import Logo from '../assets/logo.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ErrorMessage, ImgLogo } from '../components/styledComponents/Common.styles';
import {
  ChangeOrResetPasswordContainer,
  LoginContainer,
  LoginRightContainer,
  Span
} from '../components/styledComponents/Login.styles';
const LoginPage = ({ setAuthToken }: { setAuthToken: any }) => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [loginDetails, setLoginDetails] = useState({
    userName: '',
    password: ''
  });
  const [resetPasswordDetails, setResetPasswordDetails] = useState({
    userName:'',
    oldPassword: '',
    newPassword: ''
  });
  const handleLoginDetails = (event: ChangeEvent<HTMLInputElement>, variableName: string) => {
    setLoginDetails({ ...loginDetails, [variableName]: event.target.value });
  };

  const handleResetPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>, variableName: string) => {
    setResetPasswordDetails({ ...resetPasswordDetails, [variableName]: event.target.value });
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userName, password } = loginDetails;
    if (userName.trim() === '' || password.trim() === '') {
      setIsSubmit(true);
      return;
    }
    const payload = {
      emailId: userName,
      password: password
    };
    setIsLoader(true);
    await fetchToken(payload)
      .then(res => {
        if (res.statusCode === 1) {
          setAuthToken(res);
          toaster('success', 'Successfully Logged in.');
          setIsLoader(false);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        setIsLoader(false);
        console.log(err, 'err');
      });
  };

  return (
    <LoginContainer>
      {isLoader && <Loader />}
      <aside className="login_left-side"></aside>
      <aside className="login_right-side">
        <LoginRightContainer>
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              if (isForgotPassword) {
                handleResetPassword(event);
              } else {
                handleLogin(event);
              }
            }}
          >
            <section className="logo">
              <ImgLogo src={Logo} alt="OxyDetailLogo" />
            </section>
            <section>
              <h3 style={{ marginBottom: 0 }}>Welcome to OxyDetail</h3>
              <p style={{ fontSize: 14, marginTop: 0 }}>Please sign-in to your account</p>
            </section>
            {!isForgotPassword ? (
              <section>
                <LabelValue
                  label="UserName"
                  value={loginDetails.userName}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleLoginDetails(event, 'userName')}
                  placeholder="UserName"
                />
                {loginDetails.userName.trim() === '' && isSubmit && <ErrorMessage>Please enter UserName</ErrorMessage>}
                <LabelValue
                  label="Password"
                  value={loginDetails.password}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleLoginDetails(event, 'password')}
                  type="password"
                  placeholder="Password"
                />
                {loginDetails.password.trim() === '' && isSubmit && <ErrorMessage>Please enter Password</ErrorMessage>}
                <ChangeOrResetPasswordContainer>
                  <Span onClick={() => setIsForgotPassword(true)}>Change Password</Span>
                  <Span onClick={() => setIsForgotPassword(true)}>Forgot Password</Span>
                </ChangeOrResetPasswordContainer>
              </section>
            ) : (
              <section>
                <ChangeOrResetPasswordContainer>
                  <Span onClick={() => setIsForgotPassword(false)}>
                    <ArrowBackIcon /> Back
                  </Span>
                </ChangeOrResetPasswordContainer>
                <LabelValue
                  label="UserName"
                  placeholder="Enter Username"
                  value={resetPasswordDetails.userName}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangePassword(event, 'userName')}
                />
                {resetPasswordDetails.userName.trim() === '' && isSubmit && (
                  <ErrorMessage>Please enter UserName</ErrorMessage>
                )}
                <LabelValue
                  label="Old Password"
                  placeholder="Old Password"
                  value={resetPasswordDetails.oldPassword}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangePassword(event, 'oldPassword')}
                />
                {resetPasswordDetails.oldPassword.trim() === '' && isSubmit && (
                  <ErrorMessage>Please enter Old Password</ErrorMessage>
                )}
                <LabelValue
                  label="New Password"
                  value={resetPasswordDetails.newPassword}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangePassword(event, 'newPassword')}
                  type="password"
                  placeholder="New Password"
                />
                {resetPasswordDetails.newPassword.trim() === '' && isSubmit && (
                  <ErrorMessage>Please enter New Password</ErrorMessage>
                )}
                {/* <CustomParagraph onClick={() => console.log()}>Forgot Password</CustomParagraph> */}
              </section>
            )}
            <section>
              <Button variant="contained" fullWidth type="submit">
                Login
              </Button>
            </section>
          </form>
        </LoginRightContainer>
      </aside>
    </LoginContainer>
  );
};

export default LoginPage;
