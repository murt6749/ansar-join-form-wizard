
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Eye, 
  Download, 
  Search, 
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  Trash2,
  AlertTriangle,
  Users,
  Settings,
  LogOut,
  Shield
} from 'lucide-react';
import Layout from '@/components/Layout';

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
  const { t } = useLanguage();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
      
      // Check if user is admin using the admin_users table
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
        
        // Update local state
        setApplications(applications.filter(app => app.id !== id));
        if (selectedApplication && selectedApplication.id === id) {
          setSelectedApplication(null);
        }
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
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

  const filteredApplications = applications.filter(app => 
    app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.country_city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
          <div className="container mx-auto max-w-6xl">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="text-3xl font-bold flex items-center">
                  <Shield className="h-8 w-8 mr-3" />
                  {t.admin.dashboard}
                </CardTitle>
                <CardDescription className="text-green-100 text-lg">
                  Loading...
                </CardDescription>
              </CardHeader>
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
          {/* Admin Header */}
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
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Applications</p>
                        <p className="text-2xl font-bold">{applications.length}</p>
                      </div>
                      <Users className="h-8 w-8" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Today</p>
                        <p className="text-2xl font-bold">
                          {applications.filter(app => 
                            new Date(app.created_at).toDateString() === new Date().toDateString()
                          ).length}
                        </p>
                      </div>
                      <Calendar className="h-8 w-8" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">This Week</p>
                        <p className="text-2xl font-bold">
                          {applications.filter(app => {
                            const appDate = new Date(app.created_at);
                            const weekAgo = new Date();
                            weekAgo.setDate(weekAgo.getDate() - 7);
                            return appDate >= weekAgo;
                          }).length}
                        </p>
                      </div>
                      <Clock className="h-8 w-8" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">System Status</p>
                        <p className="text-lg font-bold">Active</p>
                      </div>
                      <Settings className="h-8 w-8" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search applications..."
                    className="pl-10 w-full md:w-80 border-2 border-gray-200 focus:border-green-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Button 
                    onClick={exportToCsv}
                    className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button 
                    onClick={fetchApplications}
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-full md:w-auto"
                  >
                    Refresh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications Table */}
          <Card className="shadow-xl border-0 mb-6">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl text-gray-800">Applications Management</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4 text-left text-gray-600 font-semibold">Name</th>
                      <th className="p-4 text-left text-gray-600 font-semibold">Email</th>
                      <th className="p-4 text-left text-gray-600 font-semibold">Location</th>
                      <th className="p-4 text-left text-gray-600 font-semibold">Date</th>
                      <th className="p-4 text-left text-gray-600 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500">
                          {searchTerm ? "No applications match your search" : "No applications found"}
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map((app) => (
                        <tr 
                          key={app.id} 
                          className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4 font-medium">{app.full_name}</td>
                          <td className="p-4">
                            <a 
                              href={`mailto:${app.email_address}`}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {app.email_address}
                            </a>
                          </td>
                          <td className="p-4">{app.country_city}</td>
                          <td className="p-4 text-sm text-gray-600">{formatDate(app.created_at)}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-blue-500 text-blue-600 hover:bg-blue-50"
                                onClick={() => setSelectedApplication(app)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-red-500 text-red-600 hover:bg-red-50"
                                onClick={() => deleteApplication(app.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Application Details Modal */}
          {selectedApplication && (
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-bold">Application Details</CardTitle>
                    <CardDescription className="text-blue-100 text-lg">
                      Submitted on {formatDate(selectedApplication.created_at)}
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => setSelectedApplication(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <User className="h-5 w-5 mr-2 text-green-600" />
                        Personal Information
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Full Name</div>
                            <div className="font-medium text-lg">{selectedApplication.full_name}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Email</div>
                            <a 
                              href={`mailto:${selectedApplication.email_address}`}
                              className="font-medium text-lg text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {selectedApplication.email_address}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Phone</div>
                            <a 
                              href={`tel:${selectedApplication.phone_number}`}
                              className="font-medium text-lg text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {selectedApplication.phone_number}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Location</div>
                            <div className="font-medium text-lg">{selectedApplication.country_city}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Age & Gender</div>
                            <div className="font-medium text-lg">{selectedApplication.age} years, {selectedApplication.gender}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-green-600" />
                        Volunteer Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-2">Interest Areas</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedApplication.interest_areas.map((interest, index) => (
                              <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-200">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Hours Per Week</div>
                          <div className="font-medium">{selectedApplication.hours_per_week}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Working Style</div>
                          <div className="font-medium">{selectedApplication.working_style}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Weekly Meetings</div>
                          <div className="font-medium">{selectedApplication.weekly_meetings}</div>
                        </div>
                        {selectedApplication.telegram_username && (
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Telegram Username</div>
                            <div className="font-medium">@{selectedApplication.telegram_username}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Responses</h3>
                    <div className="grid gap-6">
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Why do you want to join Ansaru Youth?</div>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedApplication.why_join}</p>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Spiritual Motivation</div>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedApplication.spiritual_motivation}</p>
                      </div>
                      {selectedApplication.skills_experience && (
                        <div>
                          <div className="text-sm text-gray-500 mb-2">Skills & Experience</div>
                          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedApplication.skills_experience}</p>
                        </div>
                      )}
                      {selectedApplication.questions_notes && (
                        <div>
                          <div className="text-sm text-gray-500 mb-2">Additional Questions/Notes</div>
                          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedApplication.questions_notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <Button 
                      variant="destructive"
                      onClick={() => deleteApplication(selectedApplication.id)}
                      className="flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Application
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
