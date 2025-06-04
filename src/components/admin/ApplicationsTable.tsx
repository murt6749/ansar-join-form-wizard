
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';

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

interface ApplicationsTableProps {
  applications: Application[];
  searchTerm: string;
  onViewApplication: (app: Application) => void;
  onDeleteApplication: (id: string) => void;
}

const ApplicationsTable = ({ 
  applications, 
  searchTerm, 
  onViewApplication, 
  onDeleteApplication 
}: ApplicationsTableProps) => {
  const filteredApplications = applications.filter(app => 
    app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.country_city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
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
                          onClick={() => onViewApplication(app)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-red-500 text-red-600 hover:bg-red-50"
                          onClick={() => onDeleteApplication(app.id)}
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
  );
};

export default ApplicationsTable;
