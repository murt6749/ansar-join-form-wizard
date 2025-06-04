
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Home, 
  FileText, 
  Users, 
  Shield, 
  Settings, 
  LogIn, 
  Menu, 
  X, 
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Globe,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { currentLanguage, changeLanguage, t } = useLanguage();

  const navigationItems = [
    { icon: Home, label: t.nav?.home || 'Home', path: '/' },
    { icon: FileText, label: t.nav?.joinUs || 'Join Us', path: '/application' },
    { icon: Users, label: t.nav?.teamStructure || 'Team Structure', path: 'https://ansaar.netlify.app', external: true },
    { icon: Shield, label: t.nav?.privacy || 'Privacy', path: '/privacy' },
    { icon: Settings, label: t.nav?.terms || 'Terms', path: '/terms' },
    { icon: LogIn, label: t.nav?.login || 'Login', path: '/auth' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'am', name: 'አማርኛ', flag: '🇪🇹' },
    { code: 'om', name: 'Afaan Oromoo', flag: '🇪🇹' }
  ];

  const isActiveLink = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const currentLanguageData = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <Button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110"
        size="sm"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto border-r border-gray-200
      `}>
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-xl p-2 border-4 border-green-100 transition-transform duration-300 hover:scale-105">
                <img 
                  src="/lovable-uploads/5e53261d-6466-445b-8439-cb514a2a1343.png" 
                  alt="Ansaru Logo" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-emerald-800 bg-clip-text text-transparent">
              Ansaru Youth
            </h2>
            <p className="text-gray-600 mt-1 font-medium">For Deen</p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="p-4 border-b border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between bg-gray-50 hover:bg-gray-100 border-gray-200"
              >
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>{currentLanguageData.flag} {currentLanguageData.name}</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full min-w-[200px]">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => changeLanguage(language.code as any)}
                  className={`cursor-pointer ${
                    currentLanguage === language.code ? 'bg-green-50 text-green-800' : ''
                  }`}
                >
                  <span className="mr-2">{language.flag}</span>
                  {language.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            
            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-800 transition-all duration-200 group hover:shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-green-100 transition-colors duration-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium flex-1">{item.label}</span>
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 group hover:shadow-md ${
                  isActiveLink(item.path)
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-l-4 border-green-600 shadow-md'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className={`p-2 rounded-lg transition-colors duration-200 ${
                  isActiveLink(item.path) 
                    ? 'bg-green-200' 
                    : 'bg-gray-100 group-hover:bg-green-100'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium flex-1">{item.label}</span>
                {isActiveLink(item.path) && (
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Contact Info */}
        <div className="p-4 border-t border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Contact Information</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <a 
              href="mailto:info@ansaruyouth.org"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 group"
            >
              <div className="p-1 rounded bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <span className="group-hover:text-blue-600 transition-colors duration-200">info@ansaruyouth.org</span>
            </a>
            <a 
              href="tel:+15551234567"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 group"
            >
              <div className="p-1 rounded bg-green-100 group-hover:bg-green-200 transition-colors duration-200">
                <Phone className="h-4 w-4 text-green-600" />
              </div>
              <span className="group-hover:text-green-600 transition-colors duration-200">+1 (555) 123-4567</span>
            </a>
            <div className="flex items-center space-x-3 p-2 rounded-lg">
              <div className="p-1 rounded bg-purple-100">
                <MapPin className="h-4 w-4 text-purple-600" />
              </div>
              <span>Global Organization</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
