import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = (): JSX.Element => {
  return (
    <div className="app">
      <section className="px-16">
        <h1 className="my-6 font-mono text-2xl"> React for 京程一灯🏮 </h1>
        <Outlet />
      </section>
    </div>
  );
};
export default React.memo(MainLayout);
