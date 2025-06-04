
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminHeader = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
  };

  return (
    <Card className="shadow-xl border-0 mb-6">
      <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-3xl font-bold flex items-center">
              <Shield className="h-8 w-8 mr-3" />
              Admin Dashboard
            </CardTitle>
            <CardDescription className="text-green-100 text-lg">
              Manage volunteer applications and system settings
            </CardDescription>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => window.location.href = '/'}
            >
              <Users className="h-4 w-4 mr-2" />
              Main Site
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={handleLogout}
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
