import { useEffect, useState } from 'react';
import UnAuthorizeRoutes from './Routes/UnAuthorizeRoutes';
import AuthorizeRoutes from './Routes/AuthorizeRoutes';
import { useAuth } from './Routes/useAuth';

const App = () => {
  const { token ,setAuthToken, removeAuthToken} = useAuth();
  console.log(token)
  if(token) return <AuthorizeRoutes removeAuthToken={removeAuthToken}/>
  return <UnAuthorizeRoutes setAuthToken={setAuthToken} />;
};

export default App;
