
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText, 
  Shield, 
  Globe,
  ChevronDown,
  Heart,
  Users
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { languages } from '@/translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sidebar = () => {
  const location = useLocation();
  const { t, currentLanguage, changeLanguage } = useLanguage();

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
    <div className="w-64 h-screen bg-white border-r border-gray-200 shadow-lg flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
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
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                className={`w-full justify-start space-x-3 ${
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

      {/* Language Selector */}
      <div className="p-4 border-t border-gray-200">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>
                  {languages.find(lang => lang.code === currentLanguage)?.flag}{' '}
                  {languages.find(lang => lang.code === currentLanguage)?.name}
                </span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`cursor-pointer ${
                  currentLanguage === language.code ? 'bg-teal-50 text-teal-600' : ''
                }`}
              >
                <span className="mr-2">{language.flag}</span>
                {language.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Footer Links */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link to="/privacy">
          <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-teal-600">
            {t.nav.privacy}
          </Button>
        </Link>
        <Link to="/terms">
          <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-teal-600">
            {t.nav.terms}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
