import React from 'react';
import {  lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { useAuth } from 'utils/hooks/useAuth';
import Loader from './Loader/Loader';

const Home = lazy(() => import('../pages/Home'));
const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));
const Contacts = lazy(() => import('../pages/Contacts'));

export const App = () => {

  const { isRefreshing } = useAuth();

  return isRefreshing ? (
    <Loader />
  ) : (
      
<Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
        <Route path="register" element={
            <RestrictedRoute redirectTo="/contacts" component={<Register />} />} />
          
        <Route path="login"element={
            <RestrictedRoute redirectTo="/contacts" component={<Login />} />}
          />
          
        <Route path="contacts"element={
            <PrivateRoute redirectTo="/login" component={<Contacts />} />}
        />
      </Route>
    </Routes>
      
  );
};

 export default App;


        