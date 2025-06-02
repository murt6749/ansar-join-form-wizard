
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { languages, type Language } from '@/translations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

const Privacy = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-green-800 hover:text-green-900 transition-colors">
            {t.navigation.home}
          </Link>
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-green-700" />
              <Select value={currentLanguage} onValueChange={(value: Language) => changeLanguage(value)}>
                <SelectTrigger className="w-32 sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center space-x-2">
                        <span>{lang.flag}</span>
                        <span className="hidden sm:inline">{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Link to="/application" className="text-green-700 hover:text-green-800 transition-colors">{t.navigation.application}</Link>
            <Link to="/terms" className="text-green-700 hover:text-green-800 transition-colors">{t.navigation.terms}</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="bg-green-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl sm:text-3xl font-bold">{t.privacy.title}</CardTitle>
            <p className="text-green-100 text-lg">{t.privacy.subtitle}</p>
          </CardHeader>
          <CardContent className="p-4 sm:p-8 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">{t.privacy.sections.infoWeCollect}</h2>
              <p className="text-gray-700 leading-relaxed">{t.privacy.content.infoWeCollect}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">{t.privacy.sections.howWeUse}</h2>
              <p className="text-gray-700 leading-relaxed">{t.privacy.content.howWeUse}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">{t.privacy.sections.infoSharing}</h2>
              <p className="text-gray-700 leading-relaxed">{t.privacy.content.infoSharing}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">{t.privacy.sections.dataSecurity}</h2>
              <p className="text-gray-700 leading-relaxed">{t.privacy.content.dataSecurity}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">{t.privacy.sections.yourRights}</h2>
              <p className="text-gray-700 leading-relaxed">{t.privacy.content.yourRights}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">{t.privacy.sections.contactUs}</h2>
              <p className="text-gray-700 leading-relaxed">{t.privacy.content.contactUs}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Link to="/application">
                <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                  {t.navigation.application}
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  {t.navigation.home}
                </Button>
              </Link>
              <Link to="/terms">
                <Button variant="outline" className="w-full sm:w-auto">
                  {t.navigation.terms}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
