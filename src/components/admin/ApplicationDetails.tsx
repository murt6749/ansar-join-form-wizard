
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Trash2 } from 'lucide-react';

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
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">Application Details</CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Submitted on {formatDate(application.created_at)}
            </CardDescription>
          </div>
          <Button 
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={onClose}
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
                    <div className="font-medium text-lg">{application.full_name}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <a 
                      href={`mailto:${application.email_address}`}
                      className="font-medium text-lg text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {application.email_address}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <a 
                      href={`tel:${application.phone_number}`}
                      className="font-medium text-lg text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {application.phone_number}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-medium text-lg">{application.country_city}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Age & Gender</div>
                    <div className="font-medium text-lg">{application.age} years, {application.gender}</div>
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
                    {application.interest_areas.map((interest, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-200">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Hours Per Week</div>
                  <div className="font-medium">{application.hours_per_week}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Working Style</div>
                  <div className="font-medium">{application.working_style}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Weekly Meetings</div>
                  <div className="font-medium">{application.weekly_meetings}</div>
                </div>
                {application.telegram_username && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Telegram Username</div>
                    <div className="font-medium">@{application.telegram_username}</div>
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
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{application.why_join}</p>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">Spiritual Motivation</div>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{application.spiritual_motivation}</p>
              </div>
              {application.skills_experience && (
                <div>
                  <div className="text-sm text-gray-500 mb-2">Skills & Experience</div>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{application.skills_experience}</p>
                </div>
              )}
              {application.questions_notes && (
                <div>
                  <div className="text-sm text-gray-500 mb-2">Additional Questions/Notes</div>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{application.questions_notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-end">
            <Button 
              variant="destructive"
              onClick={() => onDelete(application.id)}
              className="flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Application
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationDetails;
