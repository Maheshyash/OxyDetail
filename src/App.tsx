import { useEffect, useState } from 'react';
import UnAuthorizeRoutes from './Routes/UnAuthorizeRoutes';
import AuthorizeRoutes from './Routes/AuthorizeRoutes';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true)
    }
  }, []);
  if(isLogin) return <AuthorizeRoutes />
  return <UnAuthorizeRoutes />;
};

export default App;
