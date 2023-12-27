import MainView from '@components/connectorCards/MetaMaskCard';
import PageNotFoundView from '@components/Lib/PageNotFoundView';
import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import MainLayout from '@pages/MainLayout';
import Loading from '@components/Lib/Loading';

const Layout = () => (
  <Suspense fallback={<Loading />}>
    <MainLayout />
  </Suspense>
);

const Demo = lazy(() => import('@components/Demo'));
const Routes: RouteObject[] = [];

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { path: '*', element: <Navigate to="/404" /> },
    { path: '/', element: <MainView /> },
    { path: '404', element: <PageNotFoundView /> },
  ],
};

const demoRoutes = {
  path: 'demo',
  element: <Layout />,
  children: [
    { path: '*', element: <Navigate to="/404" /> },
    { path: ':id', element: <Demo /> },
  ],
};

Routes.push(mainRoutes, demoRoutes);
export default Routes;
