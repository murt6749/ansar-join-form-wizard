import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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
  AlertTriangle
} from 'lucide-react';
import Layout from '@/components/Layout';

interface Application {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  age: number;
  occupation: string;
  education: string;
  skills: string[];
  interests: string[];
  availability: string;
  experience: string;
  motivation: string;
  additional_info: string;
  status: 'pending' | 'approved' | 'rejected';
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
      
      // Check if user is admin
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();
      
      if (profile && profile.is_admin) {
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
      .from('applications')
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

  const updateApplicationStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Status Updated",
        description: `Application has been ${status}`,
      });
      
      // Update local state
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status } : app
      ));
      
      if (selectedApplication && selectedApplication.id === id) {
        setSelectedApplication({ ...selectedApplication, status });
      }
    }
  };

  const deleteApplication = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
      const { error } = await supabase
        .from('applications')
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

  const exportToCsv = () => {
    // Create CSV content
    const headers = [
      "Full Name", "Email", "Phone", "Location", "Age", "Occupation", 
      "Education", "Skills", "Interests", "Availability", "Experience", 
      "Motivation", "Additional Info", "Status", "Created At"
    ];
    
    const csvRows = [
      headers.join(','),
      ...applications.map(app => [
        `"${app.full_name}"`,
        `"${app.email}"`,
        `"${app.phone}"`,
        `"${app.location}"`,
        app.age,
        `"${app.occupation}"`,
        `"${app.education}"`,
        `"${app.skills.join('; ')}"`,
        `"${app.interests.join('; ')}"`,
        `"${app.availability}"`,
        `"${app.experience}"`,
        `"${app.motivation}"`,
        `"${app.additional_info}"`,
        app.status,
        new Date(app.created_at).toLocaleString()
      ].join(','))
    ];
    
    const csvContent = csvRows.join('\n');
    
    // Create download link
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
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
          <div className="container mx-auto max-w-6xl">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                <CardDescription className="text-green-100">Loading...</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
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
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardTitle className="text-2xl">Admin Access Required</CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
                <p className="text-gray-600 mb-6">
                  You need to be logged in to access the admin dashboard.
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
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
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                <CardTitle className="text-2xl">Access Denied</CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-4">Admin Access Required</h2>
                <p className="text-gray-600 mb-6">
                  You don't have permission to access the admin dashboard. Please contact the administrator if you believe this is an error.
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="container mx-auto">
          <Card className="shadow-lg mb-6">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
              <CardDescription className="text-green-100">
                Manage volunteer applications
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search applications..."
                    className="pl-10 w-full md:w-80"
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
                    Export to CSV
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

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left text-gray-600 font-semibold">Name</th>
                      <th className="p-3 text-left text-gray-600 font-semibold">Email</th>
                      <th className="p-3 text-left text-gray-600 font-semibold">Location</th>
                      <th className="p-3 text-left text-gray-600 font-semibold">Date</th>
                      <th className="p-3 text-left text-gray-600 font-semibold">Status</th>
                      <th className="p-3 text-left text-gray-600 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-gray-500">
                          {searchTerm ? "No applications match your search" : "No applications found"}
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map((app) => (
                        <tr 
                          key={app.id} 
                          className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedApplication(app)}
                        >
                          <td className="p-3">{app.full_name}</td>
                          <td className="p-3">{app.email}</td>
                          <td className="p-3">{app.location}</td>
                          <td className="p-3">{formatDate(app.created_at)}</td>
                          <td className="p-3">{getStatusBadge(app.status)}</td>
                          <td className="p-3">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedApplication(app);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {selectedApplication && (
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">Application Details</CardTitle>
                    <CardDescription className="text-blue-100">
                      Submitted on {formatDate(selectedApplication.created_at)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => updateApplicationStatus(selectedApplication.id, 'approved')}
                      disabled={selectedApplication.status === 'approved'}
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                      disabled={selectedApplication.status === 'rejected'}
                    >
                      Reject
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-white text-gray-700 hover:bg-gray-100"
                      onClick={() => setSelectedApplication(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Full Name</div>
                            <div className="font-medium">{selectedApplication.full_name}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Email</div>
                            <div className="font-medium">{selectedApplication.email}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Phone</div>
                            <div className="font-medium">{selectedApplication.phone}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Location</div>
                            <div className="font-medium">{selectedApplication.location}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Age</div>
                            <div className="font-medium">{selectedApplication.age} years</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Background</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Occupation</div>
                            <div className="font-medium">{selectedApplication.occupation}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Education</div>
                            <div className="font-medium">{selectedApplication.education}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Availability</div>
                            <div className="font-medium">{selectedApplication.availability}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills & Interests</h3>
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-2">Skills</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedApplication.skills.map((skill, index) => (
                            <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Interests</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedApplication.interests.map((interest, index) => (
                            <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-200">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Experience & Motivation</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Experience</div>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                            {selectedApplication.experience}
                          </p>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Motivation</div>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                            {selectedApplication.motivation}
                          </p>
                        </div>
                        {selectedApplication.additional_info && (
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Additional Information</div>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                              {selectedApplication.additional_info}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500 mr-2">Current Status:</span>
                      {getStatusBadge(selectedApplication.status)}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteApplication(selectedApplication.id)}
                        className="flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Application
                      </Button>
                    </div>
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
