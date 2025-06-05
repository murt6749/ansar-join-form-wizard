
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Shield, Users } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const BottomNavigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    {
      icon: Home,
      label: t.nav.home,
      path: '/',
      color: 'text-green-600'
    },
    {
      icon: FileText,
      label: t.nav.application,
      path: '/application',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      label: t.nav.admin,
      path: '/admin',
      color: 'text-purple-600'
    },
    {
      icon: Users,
      label: t.nav.login,
      path: '/auth',
      color: 'text-orange-600'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg md:hidden">
      <div className="flex items-center justify-around py-2 px-4 safe-area-pb">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-all duration-200 rounded-lg ${
                active 
                  ? 'bg-gradient-to-t from-green-50 to-transparent text-green-600 scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon 
                className={`h-5 w-5 mb-1 transition-all duration-200 ${
                  active ? 'scale-110' : ''
                }`} 
              />
              <span className={`text-xs font-medium truncate transition-all duration-200 ${
                active ? 'text-green-600' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
