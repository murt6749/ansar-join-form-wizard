
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import MobileSidebar from './MobileSidebar';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Mobile Header - Fixed at top */}
      {showSidebar && (
        <MobileHeader 
          onMenuToggle={toggleMobileSidebar}
          isMenuOpen={mobileSidebarOpen}
        />
      )}

      {/* Desktop sidebar - always visible on large screens */}
      {showSidebar && (
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      )}

      {/* Mobile sidebar */}
      {showSidebar && (
        <MobileSidebar 
          isOpen={mobileSidebarOpen}
          onClose={closeMobileSidebar}
        />
      )}

      {/* Main content with mobile header spacing */}
      <main className={`flex-1 w-full ${showSidebar ? 'lg:ml-64' : ''} ${showSidebar ? 'pt-16 lg:pt-0' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
