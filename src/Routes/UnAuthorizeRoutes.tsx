import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const UnAuthorizeRoutes = ({ setAuthToken }: { setAuthToken: any }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setAuthToken={setAuthToken} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default UnAuthorizeRoutes;
