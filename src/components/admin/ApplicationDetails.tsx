
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, Mail, Phone, Calendar, Map, User } from 'lucide-react';

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

interface ApplicationDetailsProps {
  application: Application | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const ApplicationDetails = ({ application, onClose, onDelete }: ApplicationDetailsProps) => {
  if (!application) return null;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <Dialog open={!!application} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center space-x-2">
            <User className="h-6 w-6 text-green-600" />
            <span>{application.full_name}</span>
          </DialogTitle>
        </DialogHeader>

        {/* Contact Information */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-medium text-gray-800 mb-3">Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-blue-500" />
              <a 
                href={`mailto:${application.email_address}`}
                className="text-blue-600 hover:underline"
              >
                {application.email_address}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-green-500" />
              <a 
                href={`tel:${application.phone_number}`}
                className="text-blue-600 hover:underline"
              >
                {application.phone_number}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Map className="h-4 w-4 text-purple-500" />
              <span>{application.country_city}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-orange-500" />
              <span>{formatDate(application.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Age</h3>
            <p>{application.age} years old</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Gender</h3>
            <p>{application.gender}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Telegram</h3>
            <p>{application.telegram_username || 'Not provided'}</p>
            <p className="text-sm text-gray-500 mt-1">
              {application.join_telegram_group ? 'Wants to join Telegram group' : 'Does not want to join Telegram group'}
            </p>
          </div>
        </div>

        {/* Interest Areas */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-2">Areas of Interest</h3>
          <div className="flex flex-wrap gap-2">
            {application.interest_areas.map((area, index) => (
              <span 
                key={index} 
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Volunteer Details */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Why they want to join</h3>
            <p className="text-gray-700 whitespace-pre-line">{application.why_join}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Skills & Experience</h3>
            <p className="text-gray-700 whitespace-pre-line">{application.skills_experience || 'Not provided'}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Availability</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <span className="font-medium">Hours per week:</span>
                <p>{application.hours_per_week}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <span className="font-medium">Working style:</span>
                <p>{application.working_style}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <span className="font-medium">Weekly meetings:</span>
                <p>{application.weekly_meetings}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Spiritual Motivation</h3>
            <p className="text-gray-700 whitespace-pre-line">{application.spiritual_motivation}</p>
          </div>
          {application.questions_notes && (
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Additional Notes & Questions</h3>
              <p className="text-gray-700 whitespace-pre-line">{application.questions_notes}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <Button 
            variant="destructive" 
            className="flex items-center"
            onClick={() => onDelete(application.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Application
          </Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetails;
