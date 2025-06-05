
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText, 
  Shield, 
  Users, 
  LogOut,
  X
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
  };

  const menuItems = [
    { 
      icon: Home, 
      label: t.nav.home, 
      path: '/',
      color: 'text-green-600 hover:bg-green-50'
    },
    { 
      icon: FileText, 
      label: t.nav.application, 
      path: '/application',
      color: 'text-blue-600 hover:bg-blue-50'
    },
    { 
      icon: Shield, 
      label: t.nav.admin, 
      path: '/admin',
      color: 'text-purple-600 hover:bg-purple-50'
    },
    { 
      icon: Users, 
      label: t.nav.login, 
      path: '/auth',
      color: 'text-orange-600 hover:bg-orange-50'
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
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-blue-500 p-2 shadow-lg">
              <img 
                src="/lovable-uploads/5e53261d-6466-445b-8439-cb514a2a1343.png" 
                alt="Ansaru Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Ansaru Youth</h2>
              <p className="text-sm text-gray-600">للدين خدمة</p>
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
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md' 
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
            <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-green-600 h-10">
              {t.nav.privacy}
            </Button>
          </Link>
          <Link to="/terms">
            <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-green-600 h-10">
              {t.nav.terms}
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50 h-10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t.nav.logout}
          </Button>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
