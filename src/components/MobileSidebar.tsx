
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText, 
  Shield,
  X,
  Heart
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    // Close sidebar when route changes
    onClose();
  }, [location.pathname, onClose]);

  useEffect(() => {
    // Prevent body scroll when sidebar is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { 
      icon: Home, 
      label: t.nav.home, 
      path: '/',
      color: 'text-teal-600 hover:bg-teal-50'
    },
    { 
      icon: FileText, 
      label: 'Join Us', 
      path: '/application',
      color: 'text-orange-600 hover:bg-orange-50'
    },
    { 
      icon: Shield, 
      label: t.nav.admin, 
      path: '/admin',
      color: 'text-amber-600 hover:bg-amber-50'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          onClick={onClose}
        />
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-orange-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-orange-500 p-2 shadow-lg">
              <img 
                src="/lovable-uploads/9ffdc7fa-be78-4a04-8b3e-673407016278.png" 
                alt="Fadis Youth Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Fadis Youth</h2>
              <p className="text-sm text-gray-600 flex items-center">
                <Heart className="h-3 w-3 mr-1 text-red-500" />
                Building futures
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-red-100 text-gray-600"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`w-full justify-start space-x-3 h-12 text-left ${
                    isActive(item.path) 
                      ? 'bg-gradient-to-r from-teal-600 to-orange-600 text-white shadow-md' 
                      : `${item.color} border border-transparent hover:border-gray-200`
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Footer Links */}
        <div className="p-4 border-t border-gray-200 space-y-2 bg-gray-50">
          <Link to="/privacy">
            <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-teal-600 h-10">
              {t.nav.privacy}
            </Button>
          </Link>
          <Link to="/terms">
            <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-teal-600 h-10">
              {t.nav.terms}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
