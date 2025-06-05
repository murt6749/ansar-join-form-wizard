
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminStats from '@/components/admin/AdminStats';
import AdminControls from '@/components/admin/AdminControls';
import ApplicationsTable from '@/components/admin/ApplicationsTable';
import ApplicationDetails from '@/components/admin/ApplicationDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Lock, Eye, EyeOff } from 'lucide-react';

interface Application {
  id: string;
  created_at: string;
  full_name: string;
  email_address: string;
  phone_number: string;
  country_city: string;
  age: number;
  gender: string;
  why_join: string;
  interest_areas: string[];
  skills_experience: string;
  hours_per_week: string;
  working_style: string;
  weekly_meetings: string;
  spiritual_motivation: string;
  questions_notes: string;
  telegram_username: string;
  join_telegram_group: boolean;
}

const Admin = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const { toast } = useToast();

  // Simple password protection - in production, this should be more secure
  const ADMIN_PASSWORD = 'fadisyouth2024';

  useEffect(() => {
    // Check if admin is already authenticated
    const isAdminAuth = localStorage.getItem('fadis_admin_auth');
    if (isAdminAuth === 'true') {
      setIsAuthenticated(true);
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, []);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    // Simple password check
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('fadis_admin_auth', 'true');
      setIsAuthenticated(true);
      fetchApplications();
      toast({
        title: "Access Granted",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password",
        variant: "destructive"
      });
    }
    setLoginLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('fadis_admin_auth');
    setIsAuthenticated(false);
    setPassword('');
    window.location.href = '/';
  };

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ansar_applications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({
        title: "Error fetching applications",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const deleteApplication = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
      const { error } = await supabase
        .from('ansar_applications')
        .delete()
        .eq('id', id);
      
      if (error) {
        toast({
          title: "Error deleting application",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Application Deleted",
          description: "The application has been permanently removed",
        });
        
        setApplications(applications.filter(app => app.id !== id));
        if (selectedApplication && selectedApplication.id === id) {
          setSelectedApplication(null);
        }
      }
    }
  };

  const exportToCsv = () => {
    const headers = [
      "Full Name", "Email", "Phone", "Location", "Age", "Gender", "Why Join",
      "Interest Areas", "Skills", "Hours Per Week", "Working Style", "Meetings",
      "Spiritual Motivation", "Notes", "Telegram", "Join Telegram", "Created At"
    ];
    
    const csvRows = [
      headers.join(','),
      ...applications.map(app => [
        `"${app.full_name}"`,
        `"${app.email_address}"`,
        `"${app.phone_number}"`,
        `"${app.country_city}"`,
        app.age,
        `"${app.gender}"`,
        `"${app.why_join}"`,
        `"${app.interest_areas.join('; ')}"`,
        `"${app.skills_experience || ''}"`,
        `"${app.hours_per_week}"`,
        `"${app.working_style}"`,
        `"${app.weekly_meetings}"`,
        `"${app.spiritual_motivation}"`,
        `"${app.questions_notes || ''}"`,
        `"${app.telegram_username || ''}"`,
        app.join_telegram_group ? 'Yes' : 'No',
        new Date(app.created_at).toLocaleString()
      ].join(','))
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `fadis-youth-applications-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <Layout showSidebar={false}>
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-teal-600 to-orange-600 text-white rounded-t-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white shadow-lg p-3">
                  <img 
                    src="/lovable-uploads/9ffdc7fa-be78-4a04-8b3e-673407016278.png" 
                    alt="Fadis Youth Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold flex items-center justify-center">
                <Lock className="h-6 w-6 mr-2" />
                Admin Access
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handlePasswordLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter admin password"
                      className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-teal-500 rounded-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full h-12 bg-gradient-to-r from-teal-600 to-orange-600 hover:from-teal-700 hover:to-orange-700 text-white font-medium rounded-lg"
                >
                  {loginLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    'Access Dashboard'
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <Button
                  variant="link"
                  onClick={() => window.location.href = '/'}
                  className="text-teal-600 hover:text-teal-800"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 p-4">
          <div className="container mx-auto max-w-6xl">
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-orange-50 to-amber-50 p-4">
        <div className="container mx-auto">
          <AdminHeader onLogout={handleLogout} />
          
          <Card className="shadow-xl border-0 mb-6">
            <CardContent className="p-6">
              <AdminStats applications={applications} />
              <AdminControls
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onExportCsv={exportToCsv}
                onRefresh={fetchApplications}
              />
            </CardContent>
          </Card>

          <ApplicationsTable
            applications={applications}
            searchTerm={searchTerm}
            onViewApplication={setSelectedApplication}
            onDeleteApplication={deleteApplication}
          />

          {selectedApplication && (
            <ApplicationDetails
              application={selectedApplication}
              onClose={() => setSelectedApplication(null)}
              onDelete={deleteApplication}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
