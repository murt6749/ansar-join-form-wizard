
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="min-h-screen flex w-full">
      {/* Mobile sidebar toggle button */}
      {showSidebar && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileSidebar}
          className="lg:hidden fixed top-4 left-4 z-50 bg-white/80 backdrop-blur shadow-md"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Desktop sidebar - always visible on large screens */}
      {showSidebar && (
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      )}

      {/* Mobile sidebar - shown/hidden based on state */}
      {showSidebar && (
        <div 
          className={`fixed inset-0 z-40 transform transition-transform duration-300 lg:hidden ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div 
            className="absolute inset-0 bg-gray-600 bg-opacity-75"
            onClick={toggleMobileSidebar}
          />
          <div className="relative">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className={`flex-1 ${showSidebar ? 'lg:ml-64' : ''} w-full`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
