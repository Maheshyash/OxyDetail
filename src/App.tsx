import UnAuthorizeRoutes from './Routes/UnAuthorizeRoutes';
import AuthorizeRoutes from './Routes/AuthorizeRoutes';
import { useAuth } from './Routes/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TimeoutLogic } from './components/TimeoutLogic';
const App = () => {
  const { token, setAuthToken, removeAuthToken } = useAuth();
  return (
    <>
      <ToastContainer />
      {token ? (
        <>
        <AuthorizeRoutes removeAuthToken={removeAuthToken} />
        <TimeoutLogic/>
        </>
      ) : (
        <UnAuthorizeRoutes setAuthToken={setAuthToken} />
      )}
    </>
  );
};

export default App;
