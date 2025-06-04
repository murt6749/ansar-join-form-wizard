import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { useDraftSave } from '@/hooks/useDraftSave';
import { languages, type Language } from '@/translations';
import { Link } from 'react-router-dom';
import { Globe, Save } from 'lucide-react';
import CookieConsent from '@/components/CookieConsent';
import Layout from '@/components/Layout';

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
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<ApplicationFormData>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const { toast } = useToast();
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const { saveDraft, loadDraft, clearDraft, hasDraft } = useDraftSave('application-form');

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const formData = watch();
      if (Object.keys(formData).length > 0) {
        saveDraft({ ...formData, selectedInterests, currentSection });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [watch, saveDraft, selectedInterests, currentSection]);

  // Load draft on component mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      Object.keys(draft).forEach((key) => {
        if (key === 'selectedInterests') {
          setSelectedInterests(draft[key] || []);
        } else if (key === 'currentSection') {
          setCurrentSection(draft[key] || 1);
        } else {
          setValue(key as any, draft[key]);
        }
      });
    }
  }, [loadDraft, setValue]);

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

      clearDraft();
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

  const handleManualSave = () => {
    const formData = watch();
    saveDraft({ ...formData, selectedInterests, currentSection });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center shadow-2xl">
          <CardContent className="p-8 sm:p-12">
            <div className="text-6xl sm:text-8xl mb-6">✅</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">{t.applicationForm.success.title}</h2>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <p className="text-lg sm:text-xl text-gray-800 mb-4 leading-relaxed">
                <strong>{t.applicationForm.success.message}</strong>
              </p>
              <p className="text-base sm:text-lg text-gray-700">
                {t.applicationForm.success.description}
              </p>
            </div>
            <div className="space-y-4">
              <Link to="/">
                <Button className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg w-full sm:w-auto">
                  {t.applicationForm.buttons.returnHome}
                </Button>
              </Link>
              <p className="text-sm text-gray-600">
                {t.applicationForm.success.quote}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
        {/* Navigation */}
        <nav className="container mx-auto px-4 py-4 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-green-800 hover:text-green-900 transition-colors">
              {t.navigation.home}
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Payment Notice */}
              <div className="bg-green-100 px-3 py-1 rounded-full text-sm font-medium text-green-800 hidden sm:block">
                {t.payment.notice}
              </div>
              {/* Language Toggle */}
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-green-700" />
                <Select value={currentLanguage} onValueChange={(value: Language) => changeLanguage(value)}>
                  <SelectTrigger className="w-32 sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center space-x-2">
                          <span>{lang.flag}</span>
                          <span className="hidden sm:inline">{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Link to="/privacy" className="text-green-700 hover:text-green-800 transition-colors text-sm sm:text-base">{t.navigation.privacy}</Link>
              <Link to="/terms" className="text-green-700 hover:text-green-800 transition-colors text-sm sm:text-base">{t.navigation.terms}</Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <Card className="mb-8 shadow-lg">
            <CardHeader className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl sm:text-4xl font-bold">{t.applicationForm.title}</CardTitle>
              <p className="text-lg sm:text-xl text-green-100">{t.applicationForm.subtitle}</p>
              <div className="mt-4 text-base sm:text-lg">
                {t.applicationForm.description}
              </div>
              {/* Mobile Payment Notice */}
              <div className="bg-green-500/20 px-4 py-2 rounded-lg mt-4 text-sm sm:hidden">
                {t.payment.notice}
              </div>
            </CardHeader>
          </Card>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((section) => (
                <div key={section} className="flex items-center">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base ${
                    currentSection >= section ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    {section}
                  </div>
                  {section < 4 && <div className={`h-1 w-12 sm:w-20 mx-1 sm:mx-2 ${
                    currentSection > section ? 'bg-green-600' : 'bg-gray-300'
                  }`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs sm:text-sm text-gray-600">
              <span className="text-center">{t.applicationForm.sections.personalInfo}</span>
              <span className="text-center">{t.applicationForm.sections.interest}</span>
              <span className="text-center">{t.applicationForm.sections.availability}</span>
              <span className="text-center">{t.applicationForm.sections.finalDetails}</span>
            </div>
          </div>

          {/* Draft Save Button */}
          {hasDraft && (
            <div className="mb-4 flex justify-end">
              <Button 
                type="button" 
                onClick={handleManualSave}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {t.applicationForm.buttons.saveDraft}
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Section 1: Personal Info */}
            {currentSection === 1 && (
              <Card className="shadow-lg">
                <CardHeader className="bg-green-100">
                  <CardTitle className="text-xl sm:text-2xl text-green-800">🔹 {t.applicationForm.sections.personalInfo}</CardTitle>
                  <p className="text-green-700">{t.applicationForm.sections.personalInfoDesc}</p>
                </CardHeader>
                <CardContent className="space-y-6 p-4 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className="text-base sm:text-lg font-semibold">{t.applicationForm.fields.fullName} *</Label>
                      <Input
                        id="fullName"
                        {...register('fullName', { required: t.applicationForm.validation.required })}
                        className="mt-2 text-base sm:text-lg p-3"
                        placeholder={t.applicationForm.fields.fullName}
                      />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="age" className="text-base sm:text-lg font-semibold">{t.applicationForm.fields.age} *</Label>
                      <Input
                        id="age"
                        type="number"
                        {...register('age', { required: t.applicationForm.validation.required, min: 13, max: 99 })}
                        className="mt-2 text-base sm:text-lg p-3"
                        placeholder={t.applicationForm.fields.age}
                      />
                      {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base sm:text-lg font-semibold">{t.applicationForm.fields.gender} *</Label>
                    <Select onValueChange={(value) => setValue('gender', value as 'Male' | 'Female')}>
                      <SelectTrigger className="mt-2 text-base sm:text-lg p-3">
                        <SelectValue placeholder={t.applicationForm.fields.gender} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="countryCity" className="text-base sm:text-lg font-semibold">{t.applicationForm.fields.countryCity} *</Label>
                    <Input
                      id="countryCity"
                      {...register('countryCity', { required: t.applicationForm.validation.required })}
                      className="mt-2 text-base sm:text-lg p-3"
                      placeholder="e.g., London, UK or Cairo, Egypt"
                    />
                    {errors.countryCity && <p className="text-red-500 text-sm mt-1">{errors.countryCity.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phoneNumber" className="text-base sm:text-lg font-semibold">{t.applicationForm.fields.phoneNumber} *</Label>
                      <Input
                        id="phoneNumber"
                        {...register('phoneNumber', { required: t.applicationForm.validation.required })}
                        className="mt-2 text-base sm:text-lg p-3"
                        placeholder="+1234567890"
                      />
                      {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="telegramUsername" className="text-base sm:text-lg font-semibold">{t.applicationForm.fields.telegramUsername}</Label>
                      <p className="text-sm text-gray-600 mb-2">{t.applicationForm.fields.telegramUsernameDesc}</p>
                      <Input
                        id="telegramUsername"
                        {...register('telegramUsername')}
                        className="mt-2 text-base sm:text-lg p-3"
                        placeholder="@yourusername"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="emailAddress" className="text-base sm:text-lg font-semibold">{t.applicationForm.fields.emailAddress} *</Label>
                    <Input
                      id="emailAddress"
                      type="email"
                      {...register('emailAddress', { required: t.applicationForm.validation.required })}
                      className="mt-2 text-base sm:text-lg p-3"
                      placeholder="your.email@example.com"
                    />
                    {errors.emailAddress && <p className="text-red-500 text-sm mt-1">{errors.emailAddress.message}</p>}
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={nextSection} className="bg-green-600 hover:bg-green-700 px-8 py-3">
                      {t.applicationForm.buttons.next}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Section 2: Interest Areas */}
            {currentSection === 2 && (
              <Card className="shadow-lg">
                <CardHeader className="bg-blue-100">
                  <CardTitle className="text-2xl text-blue-800">🔹 {t.applicationForm.sections.interest}</CardTitle>
                  <p className="text-blue-700">{t.applicationForm.sections.interestDesc}</p>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div>
                    <Label htmlFor="whyJoin" className="text-lg font-semibold">{t.applicationForm.fields.whyJoin} *</Label>
                    <p className="text-sm text-gray-600 mb-2">{t.applicationForm.fields.whyJoinDesc}</p>
                    <Textarea
                      id="whyJoin"
                      {...register('whyJoin', { required: t.applicationForm.validation.required })}
                      className="mt-2 min-h-[120px] text-lg p-4"
                      placeholder="I want to join Ansar Youth because..."
                    />
                    {errors.whyJoin && <p className="text-red-500 text-sm mt-1">{errors.whyJoin.message}</p>}
                  </div>

                  <div>
                    <Label className="text-lg font-semibold">{t.applicationForm.fields.interestAreas} *</Label>
                    <p className="text-sm text-gray-600 mb-4">{t.applicationForm.fields.interestAreasDesc}</p>
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
                    {selectedInterests.length === 0 && <p className="text-red-500 text-sm mt-2">{t.applicationForm.validation.selectAtLeastOne}</p>}
                  </div>

                  <div>
                    <Label htmlFor="skillsExperience" className="text-lg font-semibold">{t.applicationForm.fields.skillsExperience}</Label>
                    <p className="text-sm text-gray-600 mb-2">{t.applicationForm.fields.skillsExperienceDesc}</p>
                    <Textarea
                      id="skillsExperience"
                      {...register('skillsExperience')}
                      className="mt-2 min-h-[100px] text-lg p-4"
                      placeholder="e.g., Adobe Photoshop, content writing, social media management, fundraising experience, project management..."
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" onClick={prevSection} variant="outline" className="px-8 py-3">
                      {t.applicationForm.buttons.previous}
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextSection} 
                      className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                      disabled={selectedInterests.length === 0}
                    >
                      {t.applicationForm.buttons.next}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Section 3: Availability */}
            {currentSection === 3 && (
              <Card className="shadow-lg">
                <CardHeader className="bg-purple-100">
                  <CardTitle className="text-2xl text-purple-800">🔹 {t.applicationForm.sections.availability}</CardTitle>
                  <p className="text-purple-700">{t.applicationForm.sections.availabilityDesc}</p>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div>
                    <Label className="text-lg font-semibold">{t.applicationForm.fields.hoursPerWeek} *</Label>
                    <Select onValueChange={(value) => setValue('hoursPerWeek', value as any)}>
                      <SelectTrigger className="mt-2 text-lg p-3">
                        <SelectValue placeholder={t.applicationForm.fields.hoursPerWeek} />
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
                    <Label className="text-lg font-semibold">{t.applicationForm.fields.workingStyle} *</Label>
                    <Select onValueChange={(value) => setValue('workingStyle', value as any)}>
                      <SelectTrigger className="mt-2 text-lg p-3">
                        <SelectValue placeholder={t.applicationForm.fields.workingStyle} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Online only">Online only (Remote work)</SelectItem>
                        <SelectItem value="On-ground only">On-ground only (Physical community work)</SelectItem>
                        <SelectItem value="Both online and on-ground">Both online and on-ground (Flexible)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-lg font-semibold">{t.applicationForm.fields.weeklyMeetings} *</Label>
                    <p className="text-sm text-gray-600 mb-2">{t.applicationForm.fields.weeklyMeetingsDesc}</p>
                    <Select onValueChange={(value) => setValue('weeklyMeetings', value as any)}>
                      <SelectTrigger className="mt-2 text-lg p-3">
                        <SelectValue placeholder={t.applicationForm.fields.weeklyMeetings} />
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
                      {t.applicationForm.buttons.previous}
                    </Button>
                    <Button type="button" onClick={nextSection} className="bg-purple-600 hover:bg-purple-700 px-8 py-3">
                      {t.applicationForm.buttons.final}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Section 4: Final Details */}
            {currentSection === 4 && (
              <Card className="shadow-lg">
                <CardHeader className="bg-orange-100">
                  <CardTitle className="text-xl sm:text-2xl text-orange-800">🔹 {t.applicationForm.sections.finalDetails}</CardTitle>
                  <p className="text-orange-700">{t.applicationForm.sections.finalDetailsDesc}</p>
                </CardHeader>
                <CardContent className="space-y-6 p-4 sm:p-8">
                  <div>
                    <Label htmlFor="spiritualMotivation" className="text-base sm:text-lg font-semibold">{t.applicationForm.fields.spiritualMotivation} *</Label>
                    <p className="text-sm text-gray-600 mb-2">{t.applicationForm.fields.spiritualMotivationDesc}</p>
                    <Textarea
                      id="spiritualMotivation"
                      {...register('spiritualMotivation', { required: t.applicationForm.validation.required })}
                      className="mt-2 min-h-[120px] text-base sm:text-lg p-4"
                      placeholder="My inspiration comes from..."
                    />
                    {errors.spiritualMotivation && <p className="text-red-500 text-sm mt-1">{errors.spiritualMotivation.message}</p>}
                  </div>

                  <div>
                    <Label className="text-base sm:text-lg font-semibold">{t.applicationForm.fields.joinTelegramGroup}</Label>
                    <p className="text-sm text-gray-600 mb-2">{t.applicationForm.fields.joinTelegramGroupDesc}</p>
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
                    <Label htmlFor="questionsNotes" className="text-base sm:text-lg font-semibold">{t.applicationForm.fields.questionsNotes}</Label>
                    <p className="text-sm text-gray-600 mb-2">{t.applicationForm.fields.questionsNotesDesc}</p>
                    <Textarea
                      id="questionsNotes"
                      {...register('questionsNotes')}
                      className="mt-2 min-h-[100px] text-base sm:text-lg p-4"
                      placeholder="Optional: Questions, special circumstances, additional information..."
                    />
                  </div>

                  <div className="bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200">
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
                    <div className="mt-2 text-xs text-green-600 font-medium">
                      {t.payment.description}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <Button type="button" onClick={prevSection} variant="outline" className="px-8 py-3 w-full sm:w-auto">
                      {t.applicationForm.buttons.previous}
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || selectedInterests.length === 0}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 sm:px-12 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                    >
                      {isSubmitting ? t.applicationForm.buttons.submitting : t.applicationForm.buttons.submit}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationForm;
