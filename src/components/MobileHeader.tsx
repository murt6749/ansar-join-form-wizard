
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { languages } from '@/translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileHeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const MobileHeader = ({ onMenuToggle, isMenuOpen }: MobileHeaderProps) => {
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Menu Button & Logo */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className={`lg:hidden transition-all duration-200 hover:bg-green-100 ${
              isMenuOpen ? 'bg-green-100' : ''
            }`}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-green-600" />
            ) : (
              <Menu className="h-5 w-5 text-green-600" />
            )}
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-blue-500 p-1.5 shadow-md">
              <img 
                src="/lovable-uploads/5e53261d-6466-445b-8439-cb514a2a1343.png" 
                alt="Ansaru Logo" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-gray-800 leading-tight">Ansaru Youth</h1>
              <p className="text-xs text-gray-600">للدين خدمة</p>
            </div>
          </div>
        </div>

        {/* Right: Language Selector */}
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="h-9 px-2 sm:px-3 border-gray-300 hover:bg-green-50 hover:border-green-300"
              >
                <Globe className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">
                  {languages.find(lang => lang.code === currentLanguage)?.flag}
                </span>
                <span className="sm:hidden text-xs">
                  {languages.find(lang => lang.code === currentLanguage)?.flag}
                </span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`cursor-pointer text-sm ${
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
      </div>
    </header>
  );
};

export default MobileHeader;
