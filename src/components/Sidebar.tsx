
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText, 
  Shield, 
  Settings, 
  Users, 
  LogOut,
  Globe,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { languages } from '@/translations';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sidebar = () => {
  const location = useLocation();
  const { t, currentLanguage, changeLanguage } = useLanguage();

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
    <div className="w-64 h-screen bg-white border-r border-gray-200 shadow-lg flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
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
                  currentLanguage === language.code ? 'bg-green-50 text-green-600' : ''
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
          <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-green-600">
            {t.nav.privacy}
          </Button>
        </Link>
        <Link to="/terms">
          <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-green-600">
            {t.nav.terms}
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t.nav.logout}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
