
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  { id: 'leadership-management', label: '👑 Leadership & Management', description: 'General Manager, Project Coordinator, Team Relations' },
  { id: 'content-writing', label: '📜 Islamic Content Writing', description: 'Articles, social media posts, educational content' },
  { id: 'graphic-design', label: '🎨 Graphic Design', description: 'Social media graphics, infographics, Islamic designs' },
  { id: 'video-editing', label: '🎥 Video Editing', description: 'Reels, shorts, educational videos' },
  { id: 'social-media', label: '📢 Social Media & Outreach', description: 'Instagram, Facebook, Twitter management' },
  { id: 'fundraising', label: '💼 Fundraising & Donation Management', description: 'PayPal, Stripe setup, donor outreach' },
  { id: 'rural-dawah', label: '🧑‍🏫 Rural Da\'wah (On-ground)', description: 'Community visits, masjid programs' },
  { id: 'project-management', label: '🧠 Project & Task Management', description: 'Planning, coordination, deadline tracking' },
  { id: 'tech-admin', label: '🖥️ Website & Tech Admin', description: 'Website maintenance, technical support' },
  { id: 'photography', label: '📷 Photography & Event Coverage', description: 'Event documentation, content creation' },
  { id: 'translation', label: '✍️ Translating Islamic Content', description: 'Arabic to local languages' },
  { id: 'finance-records', label: '📊 Finance & Record Keeping', description: 'Zakat/Sadaqah transparency, accounting' },
  { id: 'not-sure', label: '❓ Not sure, but I want to help', description: 'We\'ll help you find the right role' },
];

const ApplicationForm = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ApplicationFormData>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
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

  const nextSection = () => setCurrentSection(prev => Math.min(prev + 1, 4));
  const prevSection = () => setCurrentSection(prev => Math.max(prev - 1, 1));

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center shadow-2xl">
          <CardContent className="p-12">
            <div className="text-8xl mb-6">✅</div>
            <h2 className="text-3xl font-bold text-green-800 mb-6">Application Submitted Successfully!</h2>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <p className="text-xl text-gray-800 mb-4 leading-relaxed">
                <strong>Jazakum Allahu Khayran</strong> for applying to join Ansar Youth!
              </p>
              <p className="text-lg text-gray-700">
                Our admin team will review your application and contact you shortly. May Allah accept your intention and effort.
              </p>
            </div>
            <div className="space-y-4">
              <Link to="/">
                <Button className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg">
                  Return to Home
                </Button>
              </Link>
              <p className="text-sm text-gray-600">
                "And whoever volunteers good - then indeed, Allah is appreciative and Knowing." (Quran 2:158)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 mb-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-green-800 hover:text-green-900 transition-colors">
            ← Ansar Youth
          </Link>
          <div className="space-x-4">
            <Link to="/privacy" className="text-green-700 hover:text-green-800 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-green-700 hover:text-green-800 transition-colors">Terms</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-4xl font-bold">Join Ansar Youth</CardTitle>
            <p className="text-xl text-green-100">Professional Islamic Organization Application</p>
            <div className="mt-4 text-lg">
              Help us build a team of 18-22 dedicated volunteers
            </div>
          </CardHeader>
        </Card>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((section) => (
              <div key={section} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  currentSection >= section ? 'bg-green-600' : 'bg-gray-300'
                }`}>
                  {section}
                </div>
                {section < 4 && <div className={`h-1 w-20 mx-2 ${
                  currentSection > section ? 'bg-green-600' : 'bg-gray-300'
                }`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Personal Info</span>
            <span>Interest & Skills</span>
            <span>Availability</span>
            <span>Final Details</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section 1: Personal Info */}
          {currentSection === 1 && (
            <Card className="shadow-lg">
              <CardHeader className="bg-green-100">
                <CardTitle className="text-2xl text-green-800">🔹 Section 1: Personal Information</CardTitle>
                <p className="text-green-700">Tell us about yourself</p>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-lg font-semibold">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...register('fullName', { required: 'Full name is required' })}
                      className="mt-2 text-lg p-3"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="age" className="text-lg font-semibold">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      {...register('age', { required: 'Age is required', min: 13, max: 99 })}
                      className="mt-2 text-lg p-3"
                      placeholder="Your age"
                    />
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Gender *</Label>
                  <Select onValueChange={(value) => setValue('gender', value as 'Male' | 'Female')}>
                    <SelectTrigger className="mt-2 text-lg p-3">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="countryCity" className="text-lg font-semibold">Country & City *</Label>
                  <Input
                    id="countryCity"
                    {...register('countryCity', { required: 'Country and city are required' })}
                    className="mt-2 text-lg p-3"
                    placeholder="e.g., London, UK or Cairo, Egypt"
                  />
                  {errors.countryCity && <p className="text-red-500 text-sm mt-1">{errors.countryCity.message}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phoneNumber" className="text-lg font-semibold">Phone Number (WhatsApp) *</Label>
                    <Input
                      id="phoneNumber"
                      {...register('phoneNumber', { required: 'Phone number is required' })}
                      className="mt-2 text-lg p-3"
                      placeholder="+1234567890"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="telegramUsername" className="text-lg font-semibold">Telegram Username</Label>
                    <p className="text-sm text-gray-600 mb-2">Optional - for team communication</p>
                    <Input
                      id="telegramUsername"
                      {...register('telegramUsername')}
                      className="mt-2 text-lg p-3"
                      placeholder="@yourusername"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="emailAddress" className="text-lg font-semibold">Email Address *</Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    {...register('emailAddress', { required: 'Email is required' })}
                    className="mt-2 text-lg p-3"
                    placeholder="your.email@example.com"
                  />
                  {errors.emailAddress && <p className="text-red-500 text-sm mt-1">{errors.emailAddress.message}</p>}
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={nextSection} className="bg-green-600 hover:bg-green-700 px-8 py-3">
                    Next Section →
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 2: Interest Areas */}
          {currentSection === 2 && (
            <Card className="shadow-lg">
              <CardHeader className="bg-blue-100">
                <CardTitle className="text-2xl text-blue-800">🔹 Section 2: Your Interest in Ansar Youth</CardTitle>
                <p className="text-blue-700">Help us understand your motivation and skills</p>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div>
                  <Label htmlFor="whyJoin" className="text-lg font-semibold">Why do you want to join Ansar Youth? *</Label>
                  <p className="text-sm text-gray-600 mb-2">Share your motivation and what draws you to Islamic work</p>
                  <Textarea
                    id="whyJoin"
                    {...register('whyJoin', { required: 'Please tell us why you want to join' })}
                    className="mt-2 min-h-[120px] text-lg p-4"
                    placeholder="I want to join Ansar Youth because..."
                  />
                  {errors.whyJoin && <p className="text-red-500 text-sm mt-1">{errors.whyJoin.message}</p>}
                </div>

                <div>
                  <Label className="text-lg font-semibold">Which team(s) do you want to help with? *</Label>
                  <p className="text-sm text-gray-600 mb-4">Select one or more areas where you'd like to contribute</p>
                  <div className="grid grid-cols-1 gap-4">
                    {interestOptions.map((option) => (
                      <div key={option.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id={option.id}
                            checked={selectedInterests.includes(option.id)}
                            onCheckedChange={(checked) => handleInterestChange(option.id, !!checked)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label htmlFor={option.id} className="text-base font-medium cursor-pointer">
                              {option.label}
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedInterests.length === 0 && <p className="text-red-500 text-sm mt-2">Please select at least one area</p>}
                </div>

                <div>
                  <Label htmlFor="skillsExperience" className="text-lg font-semibold">What skills or experience do you have?</Label>
                  <p className="text-sm text-gray-600 mb-2">List any relevant skills, tools you know, or past experience</p>
                  <Textarea
                    id="skillsExperience"
                    {...register('skillsExperience')}
                    className="mt-2 min-h-[100px] text-lg p-4"
                    placeholder="e.g., Adobe Photoshop, content writing, social media management, fundraising experience, project management..."
                  />
                </div>

                <div className="flex justify-between">
                  <Button type="button" onClick={prevSection} variant="outline" className="px-8 py-3">
                    ← Previous
                  </Button>
                  <Button 
                    type="button" 
                    onClick={nextSection} 
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                    disabled={selectedInterests.length === 0}
                  >
                    Next Section →
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 3: Availability */}
          {currentSection === 3 && (
            <Card className="shadow-lg">
              <CardHeader className="bg-purple-100">
                <CardTitle className="text-2xl text-purple-800">🔹 Section 3: Your Availability</CardTitle>
                <p className="text-purple-700">Help us understand your time commitment</p>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div>
                  <Label className="text-lg font-semibold">How many hours can you commit per week? *</Label>
                  <Select onValueChange={(value) => setValue('hoursPerWeek', value as any)}>
                    <SelectTrigger className="mt-2 text-lg p-3">
                      <SelectValue placeholder="Select your weekly commitment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1–2 hours">1–2 hours (Light volunteer)</SelectItem>
                      <SelectItem value="3–5 hours">3–5 hours (Regular volunteer)</SelectItem>
                      <SelectItem value="5–10 hours">5–10 hours (Active volunteer)</SelectItem>
                      <SelectItem value="10+ hours">10+ hours (Core team member)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Preferred Working Style *</Label>
                  <Select onValueChange={(value) => setValue('workingStyle', value as any)}>
                    <SelectTrigger className="mt-2 text-lg p-3">
                      <SelectValue placeholder="How do you prefer to work?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online only">Online only (Remote work)</SelectItem>
                      <SelectItem value="On-ground only">On-ground only (Physical community work)</SelectItem>
                      <SelectItem value="Both online and on-ground">Both online and on-ground (Flexible)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Are you able to join weekly virtual meetings? *</Label>
                  <p className="text-sm text-gray-600 mb-2">We have team coordination meetings every week</p>
                  <Select onValueChange={(value) => setValue('weeklyMeetings', value as any)}>
                    <SelectTrigger className="mt-2 text-lg p-3">
                      <SelectValue placeholder="Select your availability for meetings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes, I can attend regularly</SelectItem>
                      <SelectItem value="Sometimes">Sometimes, depending on my schedule</SelectItem>
                      <SelectItem value="No">No, I prefer asynchronous communication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between">
                  <Button type="button" onClick={prevSection} variant="outline" className="px-8 py-3">
                    ← Previous
                  </Button>
                  <Button type="button" onClick={nextSection} className="bg-purple-600 hover:bg-purple-700 px-8 py-3">
                    Final Section →
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 4: Final Details */}
          {currentSection === 4 && (
            <Card className="shadow-lg">
              <CardHeader className="bg-orange-100">
                <CardTitle className="text-2xl text-orange-800">🔹 Section 4: Final Details</CardTitle>
                <p className="text-orange-700">Complete your application</p>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div>
                  <Label htmlFor="spiritualMotivation" className="text-lg font-semibold">What inspires you to do Islamic work? *</Label>
                  <p className="text-sm text-gray-600 mb-2">Share your spiritual motivation and what drives your desire to serve</p>
                  <Textarea
                    id="spiritualMotivation"
                    {...register('spiritualMotivation', { required: 'Please share your spiritual motivation' })}
                    className="mt-2 min-h-[120px] text-lg p-4"
                    placeholder="My inspiration comes from..."
                  />
                  {errors.spiritualMotivation && <p className="text-red-500 text-sm mt-1">{errors.spiritualMotivation.message}</p>}
                </div>

                <div>
                  <Label className="text-lg font-semibold">Would you like to be added to our team Telegram group?</Label>
                  <p className="text-sm text-gray-600 mb-2">This is where we coordinate daily activities and stay connected</p>
                  <RadioGroup onValueChange={(value) => setValue('joinTelegramGroup', value === 'Yes')} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Yes" id="telegram-yes" />
                      <Label htmlFor="telegram-yes" className="text-base">Yes, add me right away</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="No" id="telegram-no" />
                      <Label htmlFor="telegram-no" className="text-base">Not now, contact me first</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="questionsNotes" className="text-lg font-semibold">Any questions or additional notes?</Label>
                  <p className="text-sm text-gray-600 mb-2">Feel free to ask questions or share anything else you'd like us to know</p>
                  <Textarea
                    id="questionsNotes"
                    {...register('questionsNotes')}
                    className="mt-2 min-h-[100px] text-lg p-4"
                    placeholder="Optional: Questions, special circumstances, additional information..."
                  />
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    By submitting this application, you agree to our{' '}
                    <Link to="/privacy" className="text-green-600 hover:underline font-medium">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link to="/terms" className="text-green-600 hover:underline font-medium">
                      Terms of Service
                    </Link>
                    . You understand that this is a volunteer position with Ansar Youth, a professional Islamic organization.
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button type="button" onClick={prevSection} variant="outline" className="px-8 py-3">
                    ← Previous
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || selectedInterests.length === 0}
                    className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application ✨'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
