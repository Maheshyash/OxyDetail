import UnAuthorizeRoutes from './Routes/UnAuthorizeRoutes';
import AuthorizeRoutes from './Routes/AuthorizeRoutes';
import { useAuth } from './Routes/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TimeoutLogic } from './components/TimeoutLogic';
import { Navigate } from 'react-router-dom';
import { getCookie } from './utils/common';
const App = () => {
  const { token, setAuthToken, removeAuthToken } = useAuth();
  const cookieToken = getCookie('token');
  return (
    <>
      <ToastContainer />
      {token || cookieToken ? (
        <>
          <AuthorizeRoutes removeAuthToken={removeAuthToken} />
          <TimeoutLogic />
        </>
      ) : (
        <>
          {!cookieToken && <Navigate to="/" />}
          <UnAuthorizeRoutes setAuthToken={setAuthToken} />
        </>
      )}
    </>
  );
};

export default App;
