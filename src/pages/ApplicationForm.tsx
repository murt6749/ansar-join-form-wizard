
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';

interface FormData {
  full_name: string;
  age: number;
  gender: string;
  country_city: string;
  phone_number: string;
  telegram_username: string;
  email_address: string;
  why_join: string;
  interest_areas: string[];
  skills_experience: string;
  hours_per_week: string;
  working_style: string;
  weekly_meetings: string;
  spiritual_motivation: string;
  join_telegram_group: boolean;
  questions_notes: string;
}

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    age: 18,
    gender: '',
    country_city: '',
    phone_number: '',
    telegram_username: '',
    email_address: '',
    why_join: '',
    interest_areas: [],
    skills_experience: '',
    hours_per_week: '',
    working_style: '',
    weekly_meetings: '',
    spiritual_motivation: '',
    join_telegram_group: false,
    questions_notes: ''
  });

  // Load draft from localStorage
  useEffect(() => {
    const draft = localStorage.getItem('ansaru-application-draft');
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        setFormData(parsedDraft);
        toast({
          title: t.draft.restored,
          description: "Your previous application draft has been restored.",
        });
      } catch (error) {
        console.error('Error parsing draft:', error);
      }
    }
  }, []);

  // Save draft to localStorage
  const saveDraft = () => {
    localStorage.setItem('ansaru-application-draft', JSON.stringify(formData));
    toast({
      title: t.draft.saved,
      description: "Your application has been saved as a draft.",
    });
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('ansar_applications')
        .insert([formData]);

      if (error) throw error;

      setSubmitted(true);
      localStorage.removeItem('ansaru-application-draft');
      
      toast({
        title: t.applicationForm.success.title,
        description: t.applicationForm.success.message,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/95 backdrop-blur">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 p-4 shadow-lg">
                  <CheckCircle className="w-full h-full text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-green-800">
                {t.applicationForm.success.title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                {t.applicationForm.success.message}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-gray-700 leading-relaxed">
                {t.applicationForm.success.description}
              </p>
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <p className="text-green-800 italic font-medium">
                  {t.applicationForm.success.quote}
                </p>
              </div>
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-lg"
              >
                {t.applicationForm.buttons.returnHome}
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-4 px-4 lg:py-8">
        <div className="container mx-auto max-w-4xl">
          {/* Mobile-First Header */}
          <Card className="mb-4 lg:mb-8 shadow-xl border-0 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-t-lg p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl lg:text-3xl font-bold">
                    {t.applicationForm.title}
                  </CardTitle>
                  <CardDescription className="text-green-100 text-sm lg:text-lg mt-1">
                    {t.applicationForm.subtitle}
                  </CardDescription>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg lg:text-2xl font-bold">{currentStep}/{totalSteps}</div>
                  <div className="text-green-100 text-xs lg:text-sm">Steps</div>
                </div>
              </div>
              <div className="mt-3 lg:mt-4">
                <Progress value={progress} className="bg-green-700 h-2" />
              </div>
            </CardHeader>
          </Card>

          {/* Payment Notice */}
          <Card className="mb-4 lg:mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardContent className="p-3 lg:p-4">
              <div className="text-center">
                <h3 className="text-base lg:text-lg font-semibold text-emerald-800 mb-2">
                  {t.payment.notice}
                </h3>
                <p className="text-sm lg:text-base text-emerald-700">
                  {t.payment.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mobile-Optimized Form Steps */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
            <CardContent className="p-4 lg:p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4 lg:space-y-6">
                  <div className="text-center mb-6 lg:mb-8">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                      {t.applicationForm.sections.personalInfo}
                    </h2>
                    <p className="text-sm lg:text-base text-gray-600">
                      {t.applicationForm.sections.personalInfoDesc}
                    </p>
                  </div>

                  <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium">{t.applicationForm.fields.fullName}</Label>
                      <Input
                        id="fullName"
                        value={formData.full_name}
                        onChange={(e) => updateFormData('full_name', e.target.value)}
                        className="h-11 lg:h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-sm font-medium">{t.applicationForm.fields.age}</Label>
                      <Input
                        id="age"
                        type="number"
                        min="16"
                        max="30"
                        value={formData.age}
                        onChange={(e) => updateFormData('age', parseInt(e.target.value))}
                        className="h-11 lg:h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2 lg:col-span-2">
                      <Label className="text-sm font-medium">{t.applicationForm.fields.gender}</Label>
                      <RadioGroup 
                        value={formData.gender} 
                        onValueChange={(value) => updateFormData('gender', value)}
                        className="flex flex-row space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male" className="text-sm">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female" className="text-sm">Female</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="countryCity" className="text-sm font-medium">{t.applicationForm.fields.countryCity}</Label>
                      <Input
                        id="countryCity"
                        value={formData.country_city}
                        onChange={(e) => updateFormData('country_city', e.target.value)}
                        className="h-11 lg:h-12"
                        placeholder="e.g., Ethiopia, Addis Ababa"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-sm font-medium">{t.applicationForm.fields.phoneNumber}</Label>
                      <Input
                        id="phoneNumber"
                        value={formData.phone_number}
                        onChange={(e) => updateFormData('phone_number', e.target.value)}
                        className="h-11 lg:h-12"
                        placeholder="+251..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emailAddress" className="text-sm font-medium">{t.applicationForm.fields.emailAddress}</Label>
                      <Input
                        id="emailAddress"
                        type="email"
                        value={formData.email_address}
                        onChange={(e) => updateFormData('email_address', e.target.value)}
                        className="h-11 lg:h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telegramUsername" className="text-sm font-medium">
                        {t.applicationForm.fields.telegramUsername}
                      </Label>
                      <Input
                        id="telegramUsername"
                        value={formData.telegram_username}
                        onChange={(e) => updateFormData('telegram_username', e.target.value)}
                        className="h-11 lg:h-12"
                        placeholder="@username"
                      />
                      <p className="text-xs text-gray-500">
                        {t.applicationForm.fields.telegramUsernameDesc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Interest */}
              {currentStep === 2 && (
                <div className="space-y-4 lg:space-y-6">
                  <div className="text-center mb-6 lg:mb-8">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                      {t.applicationForm.sections.interest}
                    </h2>
                    <p className="text-sm lg:text-base text-gray-600">
                      {t.applicationForm.sections.interestDesc}
                    </p>
                  </div>

                  <div className="space-y-4 lg:space-y-6">
                    <div className="space-y-3 lg:space-y-4">
                      <Label htmlFor="whyJoin" className="text-sm font-medium">{t.applicationForm.fields.whyJoin}</Label>
                      <Textarea
                        id="whyJoin"
                        value={formData.why_join}
                        onChange={(e) => updateFormData('why_join', e.target.value)}
                        rows={4}
                        className="resize-none"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        {t.applicationForm.fields.whyJoinDesc}
                      </p>
                    </div>

                    <div className="space-y-3 lg:space-y-4">
                      <Label className="text-sm font-medium">{t.applicationForm.fields.interestAreas}</Label>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                        {[
                          'Leadership & Management',
                          'Content Writing',
                          'Graphic Design',
                          'Video Editing',
                          'Social Media Management',
                          'Web Development',
                          'Finance & Donations',
                          'Rural Da\'wah Outreach'
                        ].map((area) => (
                          <div key={area} className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
                            <Checkbox
                              id={area}
                              checked={formData.interest_areas.includes(area)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  updateFormData('interest_areas', [...formData.interest_areas, area]);
                                } else {
                                  updateFormData('interest_areas', formData.interest_areas.filter(item => item !== area));
                                }
                              }}
                            />
                            <Label htmlFor={area} className="text-sm cursor-pointer flex-1">{area}</Label>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        {t.applicationForm.fields.interestAreasDesc}
                      </p>
                    </div>

                    <div className="space-y-3 lg:space-y-4">
                      <Label htmlFor="skillsExperience" className="text-sm font-medium">{t.applicationForm.fields.skillsExperience}</Label>
                      <Textarea
                        id="skillsExperience"
                        value={formData.skills_experience}
                        onChange={(e) => updateFormData('skills_experience', e.target.value)}
                        rows={4}
                        className="resize-none"
                        placeholder="e.g., Adobe Photoshop, Microsoft Office, Previous volunteer experience..."
                      />
                      <p className="text-xs text-gray-500">
                        {t.applicationForm.fields.skillsExperienceDesc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Availability */}
              {currentStep === 3 && (
                <div className="space-y-4 lg:space-y-6">
                  <div className="text-center mb-6 lg:mb-8">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                      {t.applicationForm.sections.availability}
                    </h2>
                    <p className="text-sm lg:text-base text-gray-600">
                      {t.applicationForm.sections.availabilityDesc}
                    </p>
                  </div>

                  <div className="space-y-4 lg:space-y-6">
                    <div className="space-y-3 lg:space-y-4">
                      <Label className="text-sm font-medium">{t.applicationForm.fields.hoursPerWeek}</Label>
                      <RadioGroup 
                        value={formData.hours_per_week} 
                        onValueChange={(value) => updateFormData('hours_per_week', value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
                          <RadioGroupItem value="1-3 hours" id="1-3" />
                          <Label htmlFor="1-3" className="text-sm cursor-pointer flex-1">1-3 hours per week</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
                          <RadioGroupItem value="4-6 hours" id="4-6" />
                          <Label htmlFor="4-6" className="text-sm cursor-pointer flex-1">4-6 hours per week</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
                          <RadioGroupItem value="7-10 hours" id="7-10" />
                          <Label htmlFor="7-10" className="text-sm cursor-pointer flex-1">7-10 hours per week</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
                          <RadioGroupItem value="10+ hours" id="10plus" />
                          <Label htmlFor="10plus" className="text-sm cursor-pointer flex-1">More than 10 hours per week</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3 lg:space-y-4">
                      <Label className="text-sm font-medium">{t.applicationForm.fields.workingStyle}</Label>
                      <RadioGroup 
                        value={formData.working_style} 
                        onValueChange={(value) => updateFormData('working_style', value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
                          <RadioGroupItem value="Independent" id="independent" />
                          <Label htmlFor="independent" className="text-sm cursor-pointer flex-1">Independent work</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
                          <RadioGroupItem value="Team-based" id="team" />
                          <Label htmlFor="team" className="text-sm cursor-pointer flex-1">Team-based collaboration</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
                          <RadioGroupItem value="Mixed" id="mixed" />
                          <Label htmlFor="mixed" className="text-sm cursor-pointer flex-1">Mix of both</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3 lg:space-y-4">
                      <Label className="text-sm font-medium">{t.applicationForm.fields.weeklyMeetings}</Label>
                      <RadioGroup 
                        value={formData.weekly_meetings} 
                        onValueChange={(value) => updateFormData('weekly_meetings', value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
                          <RadioGroupItem value="Yes, regularly" id="yes-regular" />
                          <Label htmlFor="yes-regular" className="text-sm cursor-pointer flex-1">Yes, I can attend regularly</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
                          <RadioGroupItem value="Sometimes" id="sometimes" />
                          <Label htmlFor="sometimes" className="text-sm cursor-pointer flex-1">Sometimes, depending on schedule</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded border hover:bg-gray-50">
                          <RadioGroupItem value="Rarely" id="rarely" />
                          <Label htmlFor="rarely" className="text-sm cursor-pointer flex-1">Rarely available for meetings</Label>
                        </div>
                      </RadioGroup>
                      <p className="text-xs text-gray-500">
                        {t.applicationForm.fields.weeklyMeetingsDesc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Final Details */}
              {currentStep === 4 && (
                <div className="space-y-4 lg:space-y-6">
                  <div className="text-center mb-6 lg:mb-8">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                      {t.applicationForm.sections.finalDetails}
                    </h2>
                    <p className="text-sm lg:text-base text-gray-600">
                      {t.applicationForm.sections.finalDetailsDesc}
                    </p>
                  </div>

                  <div className="space-y-4 lg:space-y-6">
                    <div className="space-y-3 lg:space-y-4">
                      <Label htmlFor="spiritualMotivation" className="text-sm font-medium">{t.applicationForm.fields.spiritualMotivation}</Label>
                      <Textarea
                        id="spiritualMotivation"
                        value={formData.spiritual_motivation}
                        onChange={(e) => updateFormData('spiritual_motivation', e.target.value)}
                        rows={4}
                        className="resize-none"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        {t.applicationForm.fields.spiritualMotivationDesc}
                      </p>
                    </div>

                    <div className="space-y-3 lg:space-y-4">
                      <div className="flex items-start space-x-2 p-3 rounded border hover:bg-gray-50">
                        <Checkbox
                          id="joinTelegram"
                          checked={formData.join_telegram_group}
                          onCheckedChange={(checked) => updateFormData('join_telegram_group', checked)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label htmlFor="joinTelegram" className="text-sm cursor-pointer">
                            {t.applicationForm.fields.joinTelegramGroup}
                          </Label>
                          <p className="text-xs text-gray-500 mt-1">
                            {t.applicationForm.fields.joinTelegramGroupDesc}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 lg:space-y-4">
                      <Label htmlFor="questionsNotes" className="text-sm font-medium">{t.applicationForm.fields.questionsNotes}</Label>
                      <Textarea
                        id="questionsNotes"
                        value={formData.questions_notes}
                        onChange={(e) => updateFormData('questions_notes', e.target.value)}
                        rows={4}
                        className="resize-none"
                        placeholder="Any questions or additional information you'd like to share..."
                      />
                      <p className="text-xs text-gray-500">
                        {t.applicationForm.fields.questionsNotesDesc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile-Optimized Navigation Buttons */}
              <div className="flex flex-col space-y-3 lg:flex-row lg:justify-between lg:items-center lg:space-y-0 mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
                <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-3">
                  {currentStep > 1 && (
                    <Button 
                      onClick={prevStep}
                      variant="outline"
                      className="w-full lg:w-auto border-gray-300 hover:bg-gray-50 h-11"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t.applicationForm.buttons.previous}
                    </Button>
                  )}
                  
                  <Button 
                    onClick={saveDraft}
                    variant="outline"
                    className="w-full lg:w-auto border-blue-300 text-blue-600 hover:bg-blue-50 h-11"
                  >
                    {t.applicationForm.buttons.saveDraft}
                  </Button>
                </div>
                
                {currentStep < totalSteps ? (
                  <Button 
                    onClick={nextStep}
                    className="w-full lg:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-11"
                  >
                    {currentStep === totalSteps - 1 ? 
                      t.applicationForm.buttons.final : 
                      t.applicationForm.buttons.next}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full lg:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-11"
                  >
                    {loading ? 
                      t.applicationForm.buttons.submitting : 
                      t.applicationForm.buttons.submit}
                    {!loading && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationForm;
