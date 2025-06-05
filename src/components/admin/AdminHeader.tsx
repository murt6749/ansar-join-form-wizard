
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, LogOut, Home } from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
    <Card className="shadow-xl border-0 mb-6">
      <CardHeader className="bg-gradient-to-r from-teal-600 via-orange-600 to-amber-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-lg p-2">
              <img 
                src="/lovable-uploads/9ffdc7fa-be78-4a04-8b3e-673407016278.png" 
                alt="Fadis Youth Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold flex items-center">
                <Shield className="h-8 w-8 mr-3" />
                Fadis Youth Admin
              </CardTitle>
              <CardDescription className="text-orange-100 text-lg">
                Manage volunteer applications and community growth
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => window.location.href = '/'}
            >
              <Home className="h-4 w-4 mr-2" />
              Main Site
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default AdminHeader;
