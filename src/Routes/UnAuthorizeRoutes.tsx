import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const UnAuthorizeRoutes = ({ setAuthToken }: { setAuthToken: any }) => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage setAuthToken={setAuthToken} />} />
    </Routes>
  );
};

export default UnAuthorizeRoutes;
