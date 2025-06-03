
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Download, Edit, Eye, LogOut, Mail, Phone, MessageCircle, User } from 'lucide-react';
import { format } from 'date-fns';

interface Application {
  id: string;
  full_name: string;
  email_address: string;
  phone_number: string;
  country_city: string;
  age: number;
  gender: string;
  telegram_username?: string;
  why_join: string;
  interest_areas: string[];
  skills_experience?: string;
  hours_per_week: string;
  working_style: string;
  weekly_meetings: string;
  spiritual_motivation: string;
  questions_notes?: string;
  join_telegram_group: boolean;
  created_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [viewingApplication, setViewingApplication] = useState<Application | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const ADMIN_PASSWORD = "1234Ansar&!";

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin-authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin-authenticated', 'true');
      toast({
        title: "Access Granted",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin-authenticated');
    navigate('/');
  };

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ansar_applications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Application[];
    },
    enabled: isAuthenticated
  });

  const openTelegram = (username: string) => {
    if (username) {
      const telegramUrl = `https://t.me/${username.replace('@', '')}`;
      window.open(telegramUrl, '_blank');
    }
  };

  const openEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const openPhone = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  const downloadPDF = (application: Application) => {
    const content = `
════════════════════════════════════════════════════════════
                    ANSAR-YOUTH VOLUNTEER APPLICATION
════════════════════════════════════════════════════════════

📋 PERSONAL INFORMATION
────────────────────────────────────────────────────────────
Full Name: ${application.full_name}
Email: ${application.email_address}
Phone: ${application.phone_number}
Location: ${application.country_city}
Age: ${application.age}
Gender: ${application.gender}
Telegram: ${application.telegram_username || 'Not provided'}

📝 APPLICATION DETAILS
────────────────────────────────────────────────────────────
Why Join Ansar-Youth:
${application.why_join}

Interest Areas:
${application.interest_areas.map(area => `• ${area}`).join('\n')}

Skills & Experience:
${application.skills_experience || 'Not provided'}

🕐 AVAILABILITY & COMMITMENT
────────────────────────────────────────────────────────────
Hours per Week: ${application.hours_per_week}
Working Style: ${application.working_style}
Weekly Meetings: ${application.weekly_meetings}

🤲 SPIRITUAL MOTIVATION
────────────────────────────────────────────────────────────
${application.spiritual_motivation}

📞 ADDITIONAL INFORMATION
────────────────────────────────────────────────────────────
Questions/Notes: ${application.questions_notes || 'None'}
Join Telegram Group: ${application.join_telegram_group ? 'Yes' : 'No'}

📅 APPLICATION SUBMITTED
────────────────────────────────────────────────────────────
Date: ${format(new Date(application.created_at), 'PPpp')}

════════════════════════════════════════════════════════════
                    End of Application
════════════════════════════════════════════════════════════
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ansar_Youth_Application_${application.full_name.replace(/\s+/g, '_')}_${format(new Date(application.created_at), 'yyyy-MM-dd')}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Download Complete",
      description: `${application.full_name}'s application has been downloaded`,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">🔐 Admin Access</CardTitle>
            <CardDescription className="text-green-100">Secure Administration Panel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <p className="text-gray-600 mb-6">Enter the administration password to access the volunteer applications dashboard</p>
            </div>
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="text-center text-lg py-6"
            />
            <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-6 text-lg font-semibold">
              🚀 Access Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 flex-1 mr-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              🎯 Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg mt-2">Manage Ansar-Youth Volunteer Applications</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Total Applications: {applications?.length || 0}
              </span>
              <span>•</span>
              <span>Last Updated: {format(new Date(), 'PPp')}</span>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-white shadow-lg hover:shadow-xl transition-all">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Applications Table */}
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle className="text-2xl flex items-center gap-2">
              📊 Applications Dashboard
            </CardTitle>
            <CardDescription className="text-green-100">
              View, manage and download volunteer applications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading applications...</p>
              </div>
            ) : applications && applications.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">👤 Applicant</TableHead>
                      <TableHead className="font-semibold">📧 Contact</TableHead>
                      <TableHead className="font-semibold">📍 Location</TableHead>
                      <TableHead className="font-semibold">📅 Applied</TableHead>
                      <TableHead className="font-semibold text-center">⚡ Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app, index) => (
                      <TableRow key={app.id} className={`hover:bg-green-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <TableCell>
                          <div className="font-semibold text-green-800">{app.full_name}</div>
                          <div className="text-sm text-gray-600">{app.age} years • {app.gender}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <button
                              onClick={() => openEmail(app.email_address)}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Mail className="h-3 w-3" />
                              <span className="text-xs">{app.email_address}</span>
                            </button>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openWhatsApp(app.phone_number)}
                                className="text-green-600 hover:text-green-800 transition-colors"
                                title="WhatsApp"
                              >
                                <MessageCircle className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => openPhone(app.phone_number)}
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                title="Call"
                              >
                                <Phone className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{app.country_city}</TableCell>
                        <TableCell className="text-sm">{format(new Date(app.created_at), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => setViewingApplication(app)}
                                  className="hover:bg-green-50 hover:border-green-300"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl text-green-800 flex items-center gap-2">
                                    👤 {app.full_name}'s Application
                                  </DialogTitle>
                                </DialogHeader>
                                {viewingApplication && (
                                  <div className="space-y-6">
                                    {/* Personal Info Card */}
                                    <Card className="border-green-200">
                                      <CardHeader className="bg-green-50">
                                        <CardTitle className="text-lg text-green-800">📋 Personal Information</CardTitle>
                                      </CardHeader>
                                      <CardContent className="p-4 space-y-3">
                                        <div className="grid md:grid-cols-2 gap-4">
                                          <div>
                                            <strong className="text-green-700">Full Name:</strong>
                                            <p className="text-gray-800">{viewingApplication.full_name}</p>
                                          </div>
                                          <div>
                                            <strong className="text-green-700">Age & Gender:</strong>
                                            <p className="text-gray-800">{viewingApplication.age} years • {viewingApplication.gender}</p>
                                          </div>
                                          <div>
                                            <strong className="text-green-700">Location:</strong>
                                            <p className="text-gray-800">{viewingApplication.country_city}</p>
                                          </div>
                                          <div>
                                            <strong className="text-green-700">Applied:</strong>
                                            <p className="text-gray-800">{format(new Date(viewingApplication.created_at), 'PPpp')}</p>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>

                                    {/* Contact Info Card */}
                                    <Card className="border-blue-200">
                                      <CardHeader className="bg-blue-50">
                                        <CardTitle className="text-lg text-blue-800">📞 Contact Information</CardTitle>
                                      </CardHeader>
                                      <CardContent className="p-4 space-y-3">
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-2">
                                            <strong className="text-blue-700">Email:</strong>
                                            <button
                                              onClick={() => openEmail(viewingApplication.email_address)}
                                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 underline"
                                            >
                                              <Mail className="h-4 w-4" />
                                              {viewingApplication.email_address}
                                            </button>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <strong className="text-blue-700">Phone:</strong>
                                            <div className="flex gap-2">
                                              <button
                                                onClick={() => openWhatsApp(viewingApplication.phone_number)}
                                                className="flex items-center gap-1 text-green-600 hover:text-green-800 underline"
                                              >
                                                <MessageCircle className="h-4 w-4" />
                                                WhatsApp
                                              </button>
                                              <span>•</span>
                                              <button
                                                onClick={() => openPhone(viewingApplication.phone_number)}
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 underline"
                                              >
                                                <Phone className="h-4 w-4" />
                                                Call {viewingApplication.phone_number}
                                              </button>
                                            </div>
                                          </div>
                                          {viewingApplication.telegram_username && (
                                            <div className="flex items-center gap-2">
                                              <strong className="text-blue-700">Telegram:</strong>
                                              <button
                                                onClick={() => openTelegram(viewingApplication.telegram_username!)}
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 underline"
                                              >
                                                <MessageCircle className="h-4 w-4" />
                                                @{viewingApplication.telegram_username}
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      </CardContent>
                                    </Card>

                                    {/* Application Details */}
                                    <Card className="border-purple-200">
                                      <CardHeader className="bg-purple-50">
                                        <CardTitle className="text-lg text-purple-800">📝 Application Details</CardTitle>
                                      </CardHeader>
                                      <CardContent className="p-4 space-y-4">
                                        <div>
                                          <strong className="text-purple-700">Why Join Ansar-Youth:</strong>
                                          <p className="mt-1 p-3 bg-gray-50 rounded text-gray-800">{viewingApplication.why_join}</p>
                                        </div>
                                        <div>
                                          <strong className="text-purple-700">Interest Areas:</strong>
                                          <div className="mt-1 flex flex-wrap gap-2">
                                            {viewingApplication.interest_areas.map((area, index) => (
                                              <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                                {area}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                        {viewingApplication.skills_experience && (
                                          <div>
                                            <strong className="text-purple-700">Skills & Experience:</strong>
                                            <p className="mt-1 p-3 bg-gray-50 rounded text-gray-800">{viewingApplication.skills_experience}</p>
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>

                                    {/* Availability */}
                                    <Card className="border-orange-200">
                                      <CardHeader className="bg-orange-50">
                                        <CardTitle className="text-lg text-orange-800">🕐 Availability & Commitment</CardTitle>
                                      </CardHeader>
                                      <CardContent className="p-4 space-y-3">
                                        <div className="grid md:grid-cols-3 gap-4">
                                          <div>
                                            <strong className="text-orange-700">Hours/Week:</strong>
                                            <p className="text-gray-800">{viewingApplication.hours_per_week}</p>
                                          </div>
                                          <div>
                                            <strong className="text-orange-700">Working Style:</strong>
                                            <p className="text-gray-800">{viewingApplication.working_style}</p>
                                          </div>
                                          <div>
                                            <strong className="text-orange-700">Weekly Meetings:</strong>
                                            <p className="text-gray-800">{viewingApplication.weekly_meetings}</p>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>

                                    {/* Spiritual Motivation */}
                                    <Card className="border-emerald-200">
                                      <CardHeader className="bg-emerald-50">
                                        <CardTitle className="text-lg text-emerald-800">🤲 Spiritual Motivation</CardTitle>
                                      </CardHeader>
                                      <CardContent className="p-4">
                                        <p className="p-3 bg-gray-50 rounded text-gray-800">{viewingApplication.spiritual_motivation}</p>
                                      </CardContent>
                                    </Card>

                                    {/* Additional Information */}
                                    <Card className="border-gray-200">
                                      <CardHeader className="bg-gray-50">
                                        <CardTitle className="text-lg text-gray-800">📋 Additional Information</CardTitle>
                                      </CardHeader>
                                      <CardContent className="p-4 space-y-3">
                                        <div>
                                          <strong className="text-gray-700">Questions/Notes:</strong>
                                          <p className="mt-1 p-3 bg-gray-50 rounded text-gray-800">{viewingApplication.questions_notes || 'None provided'}</p>
                                        </div>
                                        <div>
                                          <strong className="text-gray-700">Join Telegram Group:</strong>
                                          <span className={`ml-2 px-3 py-1 rounded-full text-sm ${viewingApplication.join_telegram_group ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {viewingApplication.join_telegram_group ? '✅ Yes' : '❌ No'}
                                          </span>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => downloadPDF(app)}
                              className="hover:bg-blue-50 hover:border-blue-300"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Yet</h3>
                <p className="text-gray-500">Applications will appear here once volunteers start submitting them.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
