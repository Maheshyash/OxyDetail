import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const UnAuthorizeRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={LoginPage} path="/" />
      </Routes>
    </BrowserRouter>
  );
};

export default UnAuthorizeRoutes;
