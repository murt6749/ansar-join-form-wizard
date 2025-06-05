
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Trash2, Mail, Phone, MapPin, User, Calendar, Clock, Heart } from 'lucide-react';

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
  application: Application;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const ApplicationDetails = ({ application, onClose, onDelete }: ApplicationDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white shadow-2xl">
        {/* Mobile-optimized header */}
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg lg:text-2xl font-bold truncate">
                {application.full_name}
              </CardTitle>
              <CardDescription className="text-green-100 text-sm lg:text-base">
                Application Details
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(application.id)}
                className="text-red-100 hover:text-red-500 hover:bg-red-100/20"
              >
                <Trash2 className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Scrollable content */}
        <CardContent className="p-0 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <User className="h-5 w-5 mr-2 text-green-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{application.email_address}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-4 w-4 text-green-600" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{application.phone_number}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                    <p className="text-sm font-medium text-gray-900">{application.country_city}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Age & Gender</p>
                    <p className="text-sm font-medium text-gray-900">{application.age} years old, {application.gender}</p>
                  </div>
                </div>
              </div>

              {application.telegram_username && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-600 uppercase tracking-wide mb-1">Telegram Username</p>
                  <p className="text-sm font-medium text-blue-900">{application.telegram_username}</p>
                </div>
              )}

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Application Submitted</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(application.created_at)}</p>
              </div>
            </div>

            <Separator />

            {/* Interest Areas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Interest Areas</h3>
              <div className="flex flex-wrap gap-2">
                {application.interest_areas.map((area, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 border border-green-200">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Availability */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Availability & Work Style
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600 uppercase tracking-wide mb-1">Hours per Week</p>
                  <p className="text-sm font-medium text-blue-900">{application.hours_per_week}</p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-purple-600 uppercase tracking-wide mb-1">Working Style</p>
                  <p className="text-sm font-medium text-purple-900">{application.working_style}</p>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-xs text-orange-600 uppercase tracking-wide mb-1">Weekly Meetings</p>
                  <p className="text-sm font-medium text-orange-900">{application.weekly_meetings}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Text Responses */}
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-semibold text-gray-800 mb-2">Why do you want to join?</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 leading-relaxed">{application.why_join}</p>
                </div>
              </div>

              {application.skills_experience && (
                <div>
                  <h4 className="text-base font-semibold text-gray-800 mb-2">Skills & Experience</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 leading-relaxed">{application.skills_experience}</p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-red-600" />
                  Spiritual Motivation
                </h4>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 leading-relaxed">{application.spiritual_motivation}</p>
                </div>
              </div>

              {application.questions_notes && (
                <div>
                  <h4 className="text-base font-semibold text-gray-800 mb-2">Additional Notes</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 leading-relaxed">{application.questions_notes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Telegram Group */}
            {application.join_telegram_group && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  ✅ Wants to join the Telegram group for coordination
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationDetails;
