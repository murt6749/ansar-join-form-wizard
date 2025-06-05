
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
  fullName: string;
  age: number;
  gender: string;
  countryCity: string;
  phoneNumber: string;
  telegramUsername: string;
  emailAddress: string;
  whyJoin: string;
  interestAreas: string[];
  skillsExperience: string;
  hoursPerWeek: string;
  workingStyle: string;
  weeklyMeetings: string;
  spiritualMotivation: string;
  joinTelegramGroup: boolean;
  questionsNotes: string;
}

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: 18,
    gender: '',
    countryCity: '',
    phoneNumber: '',
    telegramUsername: '',
    emailAddress: '',
    whyJoin: '',
    interestAreas: [],
    skillsExperience: '',
    hoursPerWeek: '',
    workingStyle: '',
    weeklyMeetings: '',
    spiritualMotivation: '',
    joinTelegramGroup: false,
    questionsNotes: ''
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <Card className="mb-8 shadow-xl border-0 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold">
                    {t.applicationForm.title}
                  </CardTitle>
                  <CardDescription className="text-green-100 text-lg">
                    {t.applicationForm.subtitle}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{currentStep}/{totalSteps}</div>
                  <div className="text-green-100">Steps</div>
                </div>
              </div>
              <div className="mt-4">
                <Progress value={progress} className="bg-green-700" />
              </div>
            </CardHeader>
          </Card>

          {/* Payment Notice */}
          <Card className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                  {t.payment.notice}
                </h3>
                <p className="text-emerald-700">
                  {t.payment.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Form Steps */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
            <CardContent className="p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {t.applicationForm.sections.personalInfo}
                    </h2>
                    <p className="text-gray-600">
                      {t.applicationForm.sections.personalInfoDesc}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{t.applicationForm.fields.fullName}</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => updateFormData('fullName', e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">{t.applicationForm.fields.age}</Label>
                      <Input
                        id="age"
                        type="number"
                        min="16"
                        max="30"
                        value={formData.age}
                        onChange={(e) => updateFormData('age', parseInt(e.target.value))}
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t.applicationForm.fields.gender}</Label>
                      <RadioGroup 
                        value={formData.gender} 
                        onValueChange={(value) => updateFormData('gender', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="countryCity">{t.applicationForm.fields.countryCity}</Label>
                      <Input
                        id="countryCity"
                        value={formData.countryCity}
                        onChange={(e) => updateFormData('countryCity', e.target.value)}
                        className="h-12"
                        placeholder="e.g., Ethiopia, Addis Ababa"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">{t.applicationForm.fields.phoneNumber}</Label>
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                        className="h-12"
                        placeholder="+251..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emailAddress">{t.applicationForm.fields.emailAddress}</Label>
                      <Input
                        id="emailAddress"
                        type="email"
                        value={formData.emailAddress}
                        onChange={(e) => updateFormData('emailAddress', e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telegramUsername">
                      {t.applicationForm.fields.telegramUsername}
                    </Label>
                    <Input
                      id="telegramUsername"
                      value={formData.telegramUsername}
                      onChange={(e) => updateFormData('telegramUsername', e.target.value)}
                      className="h-12"
                      placeholder="@username"
                    />
                    <p className="text-sm text-gray-500">
                      {t.applicationForm.fields.telegramUsernameDesc}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Interest */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {t.applicationForm.sections.interest}
                    </h2>
                    <p className="text-gray-600">
                      {t.applicationForm.sections.interestDesc}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="whyJoin">{t.applicationForm.fields.whyJoin}</Label>
                      <Textarea
                        id="whyJoin"
                        value={formData.whyJoin}
                        onChange={(e) => updateFormData('whyJoin', e.target.value)}
                        rows={4}
                        className="resize-none"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        {t.applicationForm.fields.whyJoinDesc}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Label>{t.applicationForm.fields.interestAreas}</Label>
                      <div className="grid md:grid-cols-2 gap-4">
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
                          <div key={area} className="flex items-center space-x-2">
                            <Checkbox
                              id={area}
                              checked={formData.interestAreas.includes(area)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  updateFormData('interestAreas', [...formData.interestAreas, area]);
                                } else {
                                  updateFormData('interestAreas', formData.interestAreas.filter(item => item !== area));
                                }
                              }}
                            />
                            <Label htmlFor={area} className="text-sm">{area}</Label>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        {t.applicationForm.fields.interestAreasDesc}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="skillsExperience">{t.applicationForm.fields.skillsExperience}</Label>
                      <Textarea
                        id="skillsExperience"
                        value={formData.skillsExperience}
                        onChange={(e) => updateFormData('skillsExperience', e.target.value)}
                        rows={4}
                        className="resize-none"
                        placeholder="e.g., Adobe Photoshop, Microsoft Office, Previous volunteer experience..."
                      />
                      <p className="text-sm text-gray-500">
                        {t.applicationForm.fields.skillsExperienceDesc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Availability */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {t.applicationForm.sections.availability}
                    </h2>
                    <p className="text-gray-600">
                      {t.applicationForm.sections.availabilityDesc}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label>{t.applicationForm.fields.hoursPerWeek}</Label>
                      <RadioGroup 
                        value={formData.hoursPerWeek} 
                        onValueChange={(value) => updateFormData('hoursPerWeek', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1-3 hours" id="1-3" />
                          <Label htmlFor="1-3">1-3 hours per week</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4-6 hours" id="4-6" />
                          <Label htmlFor="4-6">4-6 hours per week</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="7-10 hours" id="7-10" />
                          <Label htmlFor="7-10">7-10 hours per week</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="10+ hours" id="10plus" />
                          <Label htmlFor="10plus">More than 10 hours per week</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label>{t.applicationForm.fields.workingStyle}</Label>
                      <RadioGroup 
                        value={formData.workingStyle} 
                        onValueChange={(value) => updateFormData('workingStyle', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Independent" id="independent" />
                          <Label htmlFor="independent">Independent work</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Team-based" id="team" />
                          <Label htmlFor="team">Team-based collaboration</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Mixed" id="mixed" />
                          <Label htmlFor="mixed">Mix of both</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label>{t.applicationForm.fields.weeklyMeetings}</Label>
                      <RadioGroup 
                        value={formData.weeklyMeetings} 
                        onValueChange={(value) => updateFormData('weeklyMeetings', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Yes, regularly" id="yes-regular" />
                          <Label htmlFor="yes-regular">Yes, I can attend regularly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Sometimes" id="sometimes" />
                          <Label htmlFor="sometimes">Sometimes, depending on schedule</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Rarely" id="rarely" />
                          <Label htmlFor="rarely">Rarely available for meetings</Label>
                        </div>
                      </RadioGroup>
                      <p className="text-sm text-gray-500">
                        {t.applicationForm.fields.weeklyMeetingsDesc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Final Details */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {t.applicationForm.sections.finalDetails}
                    </h2>
                    <p className="text-gray-600">
                      {t.applicationForm.sections.finalDetailsDesc}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="spiritualMotivation">{t.applicationForm.fields.spiritualMotivation}</Label>
                      <Textarea
                        id="spiritualMotivation"
                        value={formData.spiritualMotivation}
                        onChange={(e) => updateFormData('spiritualMotivation', e.target.value)}
                        rows={4}
                        className="resize-none"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        {t.applicationForm.fields.spiritualMotivationDesc}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="joinTelegram"
                          checked={formData.joinTelegramGroup}
                          onCheckedChange={(checked) => updateFormData('joinTelegramGroup', checked)}
                        />
                        <Label htmlFor="joinTelegram" className="text-sm">
                          {t.applicationForm.fields.joinTelegramGroup}
                        </Label>
                      </div>
                      <p className="text-sm text-gray-500">
                        {t.applicationForm.fields.joinTelegramGroupDesc}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="questionsNotes">{t.applicationForm.fields.questionsNotes}</Label>
                      <Textarea
                        id="questionsNotes"
                        value={formData.questionsNotes}
                        onChange={(e) => updateFormData('questionsNotes', e.target.value)}
                        rows={4}
                        className="resize-none"
                        placeholder="Any questions or additional information you'd like to share..."
                      />
                      <p className="text-sm text-gray-500">
                        {t.applicationForm.fields.questionsNotesDesc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <div className="flex gap-3">
                  {currentStep > 1 && (
                    <Button 
                      onClick={prevStep}
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t.applicationForm.buttons.previous}
                    </Button>
                  )}
                  
                  <Button 
                    onClick={saveDraft}
                    variant="outline"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    {t.applicationForm.buttons.saveDraft}
                  </Button>
                </div>
                
                {currentStep < totalSteps ? (
                  <Button 
                    onClick={nextStep}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
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
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
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
