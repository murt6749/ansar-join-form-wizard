
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('ansar-cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ansar-cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('ansar-cookie-consent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
      <Card className="shadow-lg border-green-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-green-800 mb-2">{t.cookies.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{t.cookies.message}</p>
          <div className="flex gap-2 flex-col sm:flex-row">
            <Button 
              onClick={handleAccept}
              className="bg-green-600 hover:bg-green-700 flex-1"
              size="sm"
            >
              {t.cookies.accept}
            </Button>
            <Button 
              onClick={handleDecline}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              {t.cookies.decline}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
