import React, { lazy, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// components;
import Loader from '../components/Loader';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';

const Home = lazy(() => import('../pages/Home'));
const Users = lazy(() => import('../pages/Users/List'));
const Actions = lazy(() => import('../pages/Users/Actions'));
const Error = lazy(() => import('../pages/Error'));

interface IPrivateRouteProps {
  children: JSX.Element;
  redirectTo: string;
  admin?: boolean;
}
const PrivateRoute = ({ children, redirectTo, admin }: IPrivateRouteProps): React.ReactElement => {
  const { signed, user } = useContext(AuthContext);

  const passed = admin ? user.permission === 'admin' : signed;

  return passed ? children : <Navigate to={signed ? redirectTo : '/'} />;
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
                    <PrivateRoute redirectTo="/usuarios" admin>
                      <Actions />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/usuarios/acao/:id"
                  element={
                    <PrivateRoute redirectTo="/usuarios" admin>
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
