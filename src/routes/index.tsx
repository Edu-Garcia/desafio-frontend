import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// components;
import Loader from '../components/Loader';
import { AuthProvider } from '../contexts/AuthContext';
import checkTokenIsValid from '../utils/checkTokenIsValid';
import { useAuth } from '../contexts/AuthContext/useAuth';

const Home = lazy(() => import('../pages/Home'));
const Users = lazy(() => import('../pages/Users/List'));
const Actions = lazy(() => import('../pages/Users/Actions'));
const Error = lazy(() => import('../pages/Error'));

interface IPrivateRouteProps {
  children: JSX.Element;
  redirectTo: string;
}
const PrivateRoute = ({ children, redirectTo }: IPrivateRouteProps): React.ReactElement => {
  const { signed } = useAuth();

  const isValid = checkTokenIsValid('TOKEN_KEY');

  return isValid && signed ? children : <Navigate to={redirectTo} />;
};

const AppRoutes: React.FunctionComponent = () => (
  <div className="d-flex">
    <div className="d-flex flex-column p-0 w-100">
      <main>
        <Container fluid>
          <React.Suspense fallback={<Loader />}>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/usuarios"
                  element={
                    <PrivateRoute redirectTo="/">
                      <Users />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/usuarios/acao"
                  element={
                    <PrivateRoute redirectTo="/usuarios">
                      <Actions />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/usuarios/acao/:id"
                  element={
                    <PrivateRoute redirectTo="/usuarios">
                      <Actions />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Error />} />
              </Routes>
            </AuthProvider>
          </React.Suspense>
        </Container>
      </main>
    </div>
  </div>
);

export default AppRoutes;
