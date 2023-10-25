import { useState, ChangeEvent, FormEvent } from 'react';
import LabelValue from '../components/LabelValue';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { fetchToken } from '../utils/APIs';
import { toaster } from '../components/Toaster/Toaster';
import Loader from '../components/Loader/Loader';
import Logo from '../assets/logo.png';
import { ErrorMessage, ImgLogo } from '../components/styledComponents/Common.styles';
const LoginPage = ({ setAuthToken }: { setAuthToken: any }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setUserName(value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setPassword(value);
  };
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(userName.trim()==="" || password.trim()===""){
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
          navigate('/MrPage', { replace: true });
        }
      })
      .catch(err => {
        setIsLoader(false);
        console.log(err, 'err');
      });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      {isLoader && <Loader />}
      <aside className="login_left-side"></aside>
      <aside className="login_right-side">
        <div className="login_right-side_container">
          <form className="w_100" onSubmit={handleLogin}>
            <section className="logo">
              <ImgLogo src={Logo} alt="OxyDetailLogo" />
            </section>
            <section>
              <h3 style={{ marginBottom: 0 }}>Welcome to OxyDetail</h3>
              <p style={{ fontSize: 14, marginTop: 0 }}>Please sign-in to your account</p>
            </section>
            <section className="user_inputs">
              <LabelValue label="UserName" value={userName} onChange={handleUserName} />
              {userName.trim() === "" && isSubmit && <ErrorMessage>Please enter UserName</ErrorMessage>}
              <LabelValue label="Password" value={password} onChange={handlePassword} type="password" />
              {password.trim() === "" && isSubmit && <ErrorMessage>Please enter Password</ErrorMessage>}
            </section>
            <section>
              <Button variant="contained" fullWidth type="submit">
                Login
              </Button>
            </section>
          </form>
        </div>
      </aside>
    </div>
  );
};

export default LoginPage;
