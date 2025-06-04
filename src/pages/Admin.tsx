
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
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
      
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('role')
        .eq('user_id', session.user.id)
        .single();
      
      if (adminUser && adminUser.role === 'admin') {
        setIsAdmin(true);
        fetchApplications();
      }
    } else {
      setLoading(false);
    }
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
    link.setAttribute('download', `ansaru-applications-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
          <div className="container mx-auto max-w-6xl">
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
          <div className="container mx-auto max-w-md">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-center">Authentication Required</CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-20 w-20 text-red-500 mx-auto mb-6" />
                <h2 className="text-xl font-semibold mb-4">Access Restricted</h2>
                <p className="text-gray-600 mb-6">
                  You need to be logged in to access the admin dashboard.
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700 w-full"
                  onClick={() => window.location.href = '/auth'}
                >
                  Go to Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
          <div className="container mx-auto max-w-md">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-center">Access Denied</CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-20 w-20 text-red-500 mx-auto mb-6" />
                <h2 className="text-xl font-semibold mb-4">Admin Access Required</h2>
                <p className="text-gray-600 mb-6">
                  You don't have permission to access the admin dashboard.
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700 w-full"
                  onClick={() => window.location.href = '/'}
                >
                  Return to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
        <div className="container mx-auto">
          <AdminHeader />
          
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
