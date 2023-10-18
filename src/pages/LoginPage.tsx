import { useState, ChangeEvent, FormEvent } from 'react';
import LabelValue from '../components/LabelValue';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { oxyDetailInstance } from '../utils/NetworkInstance';
import { loginDetails } from '../types/loginTypes';
import { fetchToken } from '../utils/APIs';
const LoginPage = ({ setAuthToken }: { setAuthToken: any }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
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
    const payload = {
      emailId: userName,
      password: password
    };
    await fetchToken(payload)
      .then(res => {
        if (res.statusCode === 1) {
          setAuthToken(res);
          navigate('/MrPage', { replace: true });
        }
      })
      .catch(err => {
        alert('err');
        console.log(err, 'err');
      });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <aside className="login_left-side"></aside>
      <aside className="login_right-side">
        <div className="login_right-side_container">
          <form className="w_100" onSubmit={handleLogin}>
            <section className="logo">
              <img src="" alt="OxyDetailLogo" />
            </section>
            <section>
              <h3 style={{ marginBottom: 0 }}>Welcome to OxyDetail</h3>
              <p style={{ fontSize: 14, marginTop: 0 }}>Please sign-in to your account</p>
            </section>
            <section className="user_inputs">
              <LabelValue label="UserName" value={userName} onChange={handleUserName} />
              <LabelValue label="Password" value={password} onChange={handlePassword} type="password" />
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
