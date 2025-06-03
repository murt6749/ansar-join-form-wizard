
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
import { Download, Edit, Eye, LogOut } from 'lucide-react';
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
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
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

  const updateMutation = useMutation({
    mutationFn: async (updatedApp: Application) => {
      const { error } = await supabase
        .from('ansar_applications')
        .update({
          full_name: updatedApp.full_name,
          email_address: updatedApp.email_address,
          phone_number: updatedApp.phone_number,
          country_city: updatedApp.country_city,
          age: updatedApp.age,
          gender: updatedApp.gender,
          telegram_username: updatedApp.telegram_username,
          why_join: updatedApp.why_join,
          interest_areas: updatedApp.interest_areas,
          skills_experience: updatedApp.skills_experience,
          hours_per_week: updatedApp.hours_per_week,
          working_style: updatedApp.working_style,
          weekly_meetings: updatedApp.weekly_meetings,
          spiritual_motivation: updatedApp.spiritual_motivation,
          questions_notes: updatedApp.questions_notes,
          join_telegram_group: updatedApp.join_telegram_group
        })
        .eq('id', updatedApp.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({
        title: "Application Updated",
        description: "Changes saved successfully",
      });
      setEditingApplication(null);
      setIsEditMode(false);
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Could not save changes",
        variant: "destructive"
      });
    }
  });

  const downloadPDF = (application: Application) => {
    const content = `
ANSAR-YOUTH APPLICATION

Name: ${application.full_name}
Email: ${application.email_address}
Phone: ${application.phone_number}
Location: ${application.country_city}
Age: ${application.age}
Gender: ${application.gender}
Telegram: ${application.telegram_username || 'Not provided'}

Why Join: ${application.why_join}

Interest Areas: ${application.interest_areas.join(', ')}

Skills & Experience: ${application.skills_experience || 'Not provided'}

Hours per Week: ${application.hours_per_week}
Working Style: ${application.working_style}
Weekly Meetings: ${application.weekly_meetings}

Spiritual Motivation: ${application.spiritual_motivation}

Questions/Notes: ${application.questions_notes || 'None'}

Join Telegram Group: ${application.join_telegram_group ? 'Yes' : 'No'}

Applied: ${format(new Date(application.created_at), 'PPpp')}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${application.full_name}_application.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: `Downloading ${application.full_name}'s application`,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-800">Admin Access</CardTitle>
            <CardDescription>Enter password to access admin panel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full bg-green-600 hover:bg-green-700">
              Access Admin Panel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Admin Dashboard</h1>
            <p className="text-gray-600">Manage Ansar-Youth Applications</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Applications ({applications?.length || 0})</CardTitle>
            <CardDescription>View and manage submitted applications</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading applications...</div>
            ) : applications && applications.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.full_name}</TableCell>
                      <TableCell>{app.email_address}</TableCell>
                      <TableCell>{app.country_city}</TableCell>
                      <TableCell>{format(new Date(app.created_at), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setEditingApplication(app)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{app.full_name}'s Application</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 text-sm">
                                <div><strong>Email:</strong> {app.email_address}</div>
                                <div><strong>Phone:</strong> {app.phone_number}</div>
                                <div><strong>Location:</strong> {app.country_city}</div>
                                <div><strong>Age:</strong> {app.age}</div>
                                <div><strong>Gender:</strong> {app.gender}</div>
                                <div><strong>Telegram:</strong> {app.telegram_username || 'Not provided'}</div>
                                <div><strong>Why Join:</strong> {app.why_join}</div>
                                <div><strong>Interest Areas:</strong> {app.interest_areas.join(', ')}</div>
                                <div><strong>Skills:</strong> {app.skills_experience || 'Not provided'}</div>
                                <div><strong>Hours/Week:</strong> {app.hours_per_week}</div>
                                <div><strong>Working Style:</strong> {app.working_style}</div>
                                <div><strong>Weekly Meetings:</strong> {app.weekly_meetings}</div>
                                <div><strong>Spiritual Motivation:</strong> {app.spiritual_motivation}</div>
                                <div><strong>Questions/Notes:</strong> {app.questions_notes || 'None'}</div>
                                <div><strong>Join Telegram:</strong> {app.join_telegram_group ? 'Yes' : 'No'}</div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="outline" onClick={() => downloadPDF(app)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">No applications submitted yet</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
