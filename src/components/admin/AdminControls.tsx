
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search } from 'lucide-react';

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

interface AdminControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExportCsv: () => void;
  onRefresh: () => void;
}

const AdminControls = ({ searchTerm, onSearchChange, onExportCsv, onRefresh }: AdminControlsProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="relative w-full md:w-auto">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search applications..."
          className="pl-10 w-full md:w-80 border-2 border-gray-200 focus:border-green-500"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <Button 
          onClick={onExportCsv}
          className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
        <Button 
          onClick={onRefresh}
          variant="outline"
          className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-full md:w-auto"
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default AdminControls;
