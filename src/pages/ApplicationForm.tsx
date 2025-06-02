
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface ApplicationFormData {
  fullName: string;
  age: number;
  gender: 'Male' | 'Female';
  countryCity: string;
  phoneNumber: string;
  telegramUsername?: string;
  emailAddress: string;
  whyJoin: string;
  interestAreas: string[];
  skillsExperience?: string;
  hoursPerWeek: '1–2 hours' | '3–5 hours' | '5–10 hours' | '10+ hours';
  workingStyle: 'Online only' | 'On-ground only' | 'Both online and on-ground';
  weeklyMeetings: 'Yes' | 'No' | 'Sometimes';
  spiritualMotivation: string;
  joinTelegramGroup: boolean;
  questionsNotes?: string;
}

const interestOptions = [
  { id: 'content-writing', label: '📜 Islamic Content Writing' },
  { id: 'graphic-design', label: '🎨 Graphic Design' },
  { id: 'video-editing', label: '🎥 Video Editing (Reels, Shorts)' },
  { id: 'social-media', label: '📢 Social Media & Outreach' },
  { id: 'fundraising', label: '💼 Fundraising / Donation Management' },
  { id: 'rural-dawah', label: '🧑‍🏫 Rural Da\'wah (on-ground work)' },
  { id: 'project-management', label: '🧠 Project & Task Management' },
  { id: 'tech-admin', label: '🖥️ Website & Tech Admin' },
  { id: 'photography', label: '📷 Photography / Event Coverage' },
  { id: 'translation', label: '✍️ Translating Islamic Content' },
  { id: 'not-sure', label: '❓ Not sure, but I want to help' },
];

const ApplicationForm = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ApplicationFormData>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('ansar_applications')
        .insert({
          full_name: data.fullName,
          age: data.age,
          gender: data.gender,
          country_city: data.countryCity,
          phone_number: data.phoneNumber,
          telegram_username: data.telegramUsername || null,
          email_address: data.emailAddress,
          why_join: data.whyJoin,
          interest_areas: selectedInterests,
          skills_experience: data.skillsExperience || null,
          hours_per_week: data.hoursPerWeek,
          working_style: data.workingStyle,
          weekly_meetings: data.weeklyMeetings,
          spiritual_motivation: data.spiritualMotivation,
          join_telegram_group: data.joinTelegramGroup,
          questions_notes: data.questionsNotes || null,
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Jazakum Allahu Khayran for applying. We'll contact you shortly.",
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests([...selectedInterests, interestId]);
    } else {
      setSelectedInterests(selectedInterests.filter(id => id !== interestId));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Application Submitted Successfully!</h2>
            <p className="text-lg text-gray-700 mb-6">
              Jazakum Allahu Khayran for applying to join Ansar Youth. Our admin will review your form and contact you shortly. May Allah accept your intention and effort.
            </p>
            <Button onClick={() => window.location.href = '/'} className="bg-green-600 hover:bg-green-700">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="text-center bg-green-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">Ansar Youth - Join Us Application Form</CardTitle>
            <p className="text-green-100">Help us spread Islamic knowledge and make a difference</p>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section 1: Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-800">🔹 Section 1: Personal Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  {...register('fullName', { required: 'Full name is required' })}
                  className="mt-1"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  {...register('age', { required: 'Age is required', min: 13, max: 99 })}
                  className="mt-1"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
              </div>

              <div>
                <Label>Gender *</Label>
                <RadioGroup onValueChange={(value) => setValue('gender', value as 'Male' | 'Female')} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="countryCity">Country & City *</Label>
                <Input
                  id="countryCity"
                  {...register('countryCity', { required: 'Country and city are required' })}
                  className="mt-1"
                />
                {errors.countryCity && <p className="text-red-500 text-sm mt-1">{errors.countryCity.message}</p>}
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number (WhatsApp) *</Label>
                <Input
                  id="phoneNumber"
                  {...register('phoneNumber', { required: 'Phone number is required' })}
                  className="mt-1"
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
              </div>

              <div>
                <Label htmlFor="telegramUsername">Telegram Username (optional)</Label>
                <Input
                  id="telegramUsername"
                  {...register('telegramUsername')}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="emailAddress">Email Address *</Label>
                <Input
                  id="emailAddress"
                  type="email"
                  {...register('emailAddress', { required: 'Email is required' })}
                  className="mt-1"
                />
                {errors.emailAddress && <p className="text-red-500 text-sm mt-1">{errors.emailAddress.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Interest in Ansar Youth */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-800">🔹 Section 2: Your Interest in Ansar Youth</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="whyJoin">Why do you want to join Ansar Youth? *</Label>
                <Textarea
                  id="whyJoin"
                  {...register('whyJoin', { required: 'Please tell us why you want to join' })}
                  className="mt-1 min-h-[100px]"
                />
                {errors.whyJoin && <p className="text-red-500 text-sm mt-1">{errors.whyJoin.message}</p>}
              </div>

              <div>
                <Label>Which area(s) do you want to help with? (Select one or more) *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {interestOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={selectedInterests.includes(option.id)}
                        onCheckedChange={(checked) => handleInterestChange(option.id, !!checked)}
                      />
                      <Label htmlFor={option.id} className="text-sm">{option.label}</Label>
                    </div>
                  ))}
                </div>
                {selectedInterests.length === 0 && <p className="text-red-500 text-sm mt-1">Please select at least one area</p>}
              </div>

              <div>
                <Label htmlFor="skillsExperience">What skill(s) or experience do you already have?</Label>
                <Textarea
                  id="skillsExperience"
                  {...register('skillsExperience')}
                  className="mt-1"
                  placeholder="List your relevant skills and experience..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-800">🔹 Section 3: Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>How many hours can you commit per week? *</Label>
                <RadioGroup onValueChange={(value) => setValue('hoursPerWeek', value as any)} className="mt-2">
                  {['1–2 hours', '3–5 hours', '5–10 hours', '10+ hours'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label>Preferred Working Style *</Label>
                <RadioGroup onValueChange={(value) => setValue('workingStyle', value as any)} className="mt-2">
                  {['Online only', 'On-ground only', 'Both online and on-ground'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option.replace(/\s+/g, '-')} />
                      <Label htmlFor={option.replace(/\s+/g, '-')}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label>Are you able to join weekly virtual meetings? *</Label>
                <RadioGroup onValueChange={(value) => setValue('weeklyMeetings', value as any)} className="mt-2">
                  {['Yes', 'No', 'Sometimes'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`meetings-${option}`} />
                      <Label htmlFor={`meetings-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Spiritual Motivation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-800">🔹 Section 4: Spiritual Motivation</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="spiritualMotivation">What inspires you to do Islamic work? *</Label>
                <Textarea
                  id="spiritualMotivation"
                  {...register('spiritualMotivation', { required: 'Please share your spiritual motivation' })}
                  className="mt-1 min-h-[100px]"
                />
                {errors.spiritualMotivation && <p className="text-red-500 text-sm mt-1">{errors.spiritualMotivation.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Final Submission */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-800">🔹 Final Submission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Would you like to be added to the team Telegram group right away?</Label>
                <RadioGroup onValueChange={(value) => setValue('joinTelegramGroup', value === 'Yes')} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="telegram-yes" />
                    <Label htmlFor="telegram-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="telegram-no" />
                    <Label htmlFor="telegram-no">Not now</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="questionsNotes">Any questions or notes you want to tell us?</Label>
                <Textarea
                  id="questionsNotes"
                  {...register('questionsNotes')}
                  className="mt-1"
                  placeholder="Optional message..."
                />
              </div>

              <div className="text-sm text-gray-600">
                By submitting this form, you agree to our{' '}
                <Link to="/privacy" className="text-green-600 hover:underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link to="/terms" className="text-green-600 hover:underline">
                  Terms of Service
                </Link>
                .
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || selectedInterests.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
