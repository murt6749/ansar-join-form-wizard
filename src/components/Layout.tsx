
import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {showSidebar && <Sidebar />}
      <main className={`flex-1 ${showSidebar ? 'lg:ml-0' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
