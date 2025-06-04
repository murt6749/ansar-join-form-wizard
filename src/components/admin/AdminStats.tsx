
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, Clock, Settings } from 'lucide-react';

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

interface AdminStatsProps {
  applications: Application[];
}

const AdminStats = ({ applications }: AdminStatsProps) => {
  const todayApplications = applications.filter(app => 
    new Date(app.created_at).toDateString() === new Date().toDateString()
  ).length;

  const weekApplications = applications.filter(app => {
    const appDate = new Date(app.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return appDate >= weekAgo;
  }).length;

  return (
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
              <p className="text-2xl font-bold">{todayApplications}</p>
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
              <p className="text-2xl font-bold">{weekApplications}</p>
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
  );
};

export default AdminStats;
