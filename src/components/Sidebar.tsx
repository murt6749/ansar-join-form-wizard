
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: FileText, label: 'Join Us', path: '/application' },
    { icon: Users, label: 'Team Structure', path: 'https://ansaar.netlify.app', external: true },
    { icon: Shield, label: 'Privacy', path: '/privacy' },
    { icon: Settings, label: 'Terms', path: '/terms' },
    { icon: LogIn, label: 'Login', path: '/auth' },
  ];

  const isActiveLink = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <Button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg"
        size="sm"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-72 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white shadow-lg p-2">
              <img 
                src="/lovable-uploads/5e53261d-6466-445b-8439-cb514a2a1343.png" 
                alt="Ansaru Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h2 className="text-center text-xl font-bold text-green-800">Ansaru Youth</h2>
          <p className="text-center text-sm text-gray-600 mt-1">For Deen</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            
            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  <ExternalLink className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActiveLink(item.path)
                    ? 'bg-green-100 text-green-800 border-l-4 border-green-600'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Contact Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@ansaruyouth.org</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Global Organization</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
