
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';
import { useSmartCache } from '@/hooks/useSmartCache';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Calendar,
  BookOpen,
  Users,
  MessageSquare
} from 'lucide-react';
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
  questions_notes: string;
  join_telegram_group: boolean;
}

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const { triggerHaptic } = useHapticFeedback();
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    age: 18,
    gender: 'male',
    country_city: '',
    phone_number: '',
    telegram_username: '',
    email_address: '',
    why_join: '',
    interest_areas: [],
    skills_experience: '',
    hours_per_week: '1-5 hours',
    working_style: 'individual',
    weekly_meetings: 'yes',
    spiritual_motivation: '',
    questions_notes: '',
    join_telegram_group: false
  });

  const { cacheData, getCachedData } = useSmartCache('applicationForm', formData, 5 * 60 * 1000);

  // Load cached data on component mount
  React.useEffect(() => {
    const cached = getCachedData();
    if (cached) {
      setFormData(cached);
    }
  }, [getCachedData]);

  // Cache form data whenever it changes
  React.useEffect(() => {
    cacheData(formData);
  }, [formData, cacheData]);

  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: () => nextStep(),
    onSwipeRight: () => prevStep(),
    threshold: 100
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const interestOptions = [
    'Community Outreach',
    'Youth Programs',
    'Educational Initiatives',
    'Social Media',
    'Event Organization',
    'Fundraising',
    'Content Creation',
    'Translation',
    'Technical Support',
    'Mentorship'
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      triggerHaptic('medium');
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      triggerHaptic('light');
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    const updated = formData.interest_areas.includes(interest)
      ? formData.interest_areas.filter(item => item !== interest)
      : [...formData.interest_areas, interest];
    handleInputChange('interest_areas', updated);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.full_name && formData.age && formData.gender && formData.country_city);
      case 2:
        return !!(formData.phone_number && formData.email_address);
      case 3:
        return !!(formData.why_join && formData.interest_areas.length > 0 && formData.hours_per_week);
      case 4:
        return !!(formData.spiritual_motivation);
      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('ansar_applications')
        .insert([formData]);

      if (error) throw error;

      triggerHaptic('success');
      toast({
        title: t.application.form.submitSuccess,
        description: t.application.form.submitSuccessDescription,
      });

      // Clear form and cache
      setFormData({
        full_name: '',
        age: 18,
        gender: 'male',
        country_city: '',
        phone_number: '',
        telegram_username: '',
        email_address: '',
        why_join: '',
        interest_areas: [],
        skills_experience: '',
        hours_per_week: '1-5 hours',
        working_style: 'individual',
        weekly_meetings: 'yes',
        spiritual_motivation: '',
        questions_notes: '',
        join_telegram_group: false
      });
      setCurrentStep(1);
    } catch (error: any) {
      triggerHaptic('error');
      toast({
        title: t.application.form.submitError,
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = validateStep(currentStep);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-orange-50 to-amber-50 py-4 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-orange-500 p-3 shadow-lg">
                <img 
                  src="/lovable-uploads/9ffdc7fa-be78-4a04-8b3e-673407016278.png" 
                  alt="Fadis Youth Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Fadis Youth</h1>
            <p className="text-gray-600 mb-4">Building a better future through faith and action</p>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm font-medium text-teal-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3 bg-gray-200" />
            </div>
          </div>

          {/* Form */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6" ref={formRef} {...swipeHandlers}>
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="text-center mb-6">
                      <User className="h-12 w-12 text-teal-600 mx-auto mb-2" />
                      <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                      <p className="text-gray-600">Tell us about yourself</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="full_name" className="text-gray-700 font-medium">Full Name *</Label>
                        <Input
                          id="full_name"
                          type="text"
                          value={formData.full_name}
                          onChange={(e) => handleInputChange('full_name', e.target.value)}
                          placeholder="Enter your full name"
                          className="mt-1 border-2 focus:border-teal-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="age" className="text-gray-700 font-medium">Age *</Label>
                          <Input
                            id="age"
                            type="number"
                            min="15"
                            max="80"
                            value={formData.age}
                            onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 18)}
                            className="mt-1 border-2 focus:border-teal-500"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="gender" className="text-gray-700 font-medium">Gender *</Label>
                          <Select
                            value={formData.gender}
                            onValueChange={(value) => handleInputChange('gender', value)}
                          >
                            <SelectTrigger className="mt-1 border-2 focus:border-teal-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="country_city" className="text-gray-700 font-medium">Location (Country, City) *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="country_city"
                            type="text"
                            value={formData.country_city}
                            onChange={(e) => handleInputChange('country_city', e.target.value)}
                            placeholder="e.g., Somalia, Mogadishu"
                            className="mt-1 pl-10 border-2 focus:border-teal-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="text-center mb-6">
                      <Phone className="h-12 w-12 text-teal-600 mx-auto mb-2" />
                      <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
                      <p className="text-gray-600">How can we reach you?</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="phone_number" className="text-gray-700 font-medium">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone_number"
                            type="tel"
                            value={formData.phone_number}
                            onChange={(e) => handleInputChange('phone_number', e.target.value)}
                            placeholder="+252 XX XXX XXXX"
                            className="mt-1 pl-10 border-2 focus:border-teal-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email_address" className="text-gray-700 font-medium">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email_address"
                            type="email"
                            value={formData.email_address}
                            onChange={(e) => handleInputChange('email_address', e.target.value)}
                            placeholder="your.email@example.com"
                            className="mt-1 pl-10 border-2 focus:border-teal-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="telegram_username" className="text-gray-700 font-medium">Telegram Username</Label>
                        <Input
                          id="telegram_username"
                          type="text"
                          value={formData.telegram_username}
                          onChange={(e) => handleInputChange('telegram_username', e.target.value)}
                          placeholder="@username (optional)"
                          className="mt-1 border-2 focus:border-teal-500"
                        />
                        <p className="text-sm text-gray-500 mt-1">Optional: For coordination and updates</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Involvement & Interests */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="text-center mb-6">
                      <Users className="h-12 w-12 text-teal-600 mx-auto mb-2" />
                      <h2 className="text-xl font-semibold text-gray-800">Your Involvement</h2>
                      <p className="text-gray-600">How would you like to contribute?</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label className="text-gray-700 font-medium">Why do you want to join Fadis Youth? *</Label>
                        <Textarea
                          value={formData.why_join}
                          onChange={(e) => handleInputChange('why_join', e.target.value)}
                          placeholder="Share your motivation and goals..."
                          className="mt-1 min-h-[100px] border-2 focus:border-teal-500"
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-gray-700 font-medium">Areas of Interest * (Select all that apply)</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {interestOptions.map((interest) => (
                            <div key={interest} className="flex items-center space-x-2">
                              <Checkbox
                                id={interest}
                                checked={formData.interest_areas.includes(interest)}
                                onCheckedChange={() => handleInterestToggle(interest)}
                                className="border-2 border-teal-300 data-[state=checked]:bg-teal-600"
                              />
                              <Label htmlFor={interest} className="text-sm">{interest}</Label>
                            </div>
                          ))}
                        </div>
                        {formData.interest_areas.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {formData.interest_areas.map((interest) => (
                              <Badge key={interest} variant="secondary" className="bg-teal-100 text-teal-800">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="hours_per_week" className="text-gray-700 font-medium">Time Commitment (per week) *</Label>
                        <Select
                          value={formData.hours_per_week}
                          onValueChange={(value) => handleInputChange('hours_per_week', value)}
                        >
                          <SelectTrigger className="mt-1 border-2 focus:border-teal-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-5 hours">1-5 hours</SelectItem>
                            <SelectItem value="6-10 hours">6-10 hours</SelectItem>
                            <SelectItem value="11-15 hours">11-15 hours</SelectItem>
                            <SelectItem value="16+ hours">16+ hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-gray-700 font-medium">Skills & Experience</Label>
                        <Textarea
                          value={formData.skills_experience}
                          onChange={(e) => handleInputChange('skills_experience', e.target.value)}
                          placeholder="Tell us about your relevant skills, experience, or education..."
                          className="mt-1 border-2 focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Final Details */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="text-center mb-6">
                      <Heart className="h-12 w-12 text-teal-600 mx-auto mb-2" />
                      <h2 className="text-xl font-semibold text-gray-800">Final Steps</h2>
                      <p className="text-gray-600">Almost done!</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label className="text-gray-700 font-medium">What motivates you spiritually to serve? *</Label>
                        <Textarea
                          value={formData.spiritual_motivation}
                          onChange={(e) => handleInputChange('spiritual_motivation', e.target.value)}
                          placeholder="Share what drives your desire to contribute to this cause..."
                          className="mt-1 min-h-[100px] border-2 focus:border-teal-500"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="working_style" className="text-gray-700 font-medium">Preferred Working Style</Label>
                        <Select
                          value={formData.working_style}
                          onValueChange={(value) => handleInputChange('working_style', value)}
                        >
                          <SelectTrigger className="mt-1 border-2 focus:border-teal-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Individual work</SelectItem>
                            <SelectItem value="team">Team collaboration</SelectItem>
                            <SelectItem value="both">Both individual and team</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="weekly_meetings" className="text-gray-700 font-medium">Available for weekly coordination meetings?</Label>
                        <Select
                          value={formData.weekly_meetings}
                          onValueChange={(value) => handleInputChange('weekly_meetings', value)}
                        >
                          <SelectTrigger className="mt-1 border-2 focus:border-teal-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes, I can attend</SelectItem>
                            <SelectItem value="sometimes">Sometimes</SelectItem>
                            <SelectItem value="no">No, I prefer updates only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-gray-700 font-medium">Additional Notes or Questions</Label>
                        <Textarea
                          value={formData.questions_notes}
                          onChange={(e) => handleInputChange('questions_notes', e.target.value)}
                          placeholder="Any questions, special considerations, or additional information..."
                          className="mt-1 border-2 focus:border-teal-500"
                        />
                      </div>

                      <div className="flex items-center space-x-2 p-4 bg-teal-50 rounded-lg">
                        <Checkbox
                          id="join_telegram_group"
                          checked={formData.join_telegram_group}
                          onCheckedChange={(checked) => handleInputChange('join_telegram_group', checked)}
                          className="border-2 border-teal-300 data-[state=checked]:bg-teal-600"
                        />
                        <Label htmlFor="join_telegram_group" className="text-sm">
                          I would like to join the Telegram group for coordination and updates
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2 border-2 border-gray-300 disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Button>

                  <div className="flex space-x-1">
                    {Array.from({ length: totalSteps }, (_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          i + 1 === currentStep 
                            ? 'bg-teal-600' 
                            : i + 1 < currentStep 
                              ? 'bg-teal-400' 
                              : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid}
                      className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-orange-600 hover:from-teal-700 hover:to-orange-700 disabled:opacity-50"
                    >
                      <span>Next</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!isStepValid || loading}
                      className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-orange-600 hover:from-teal-700 hover:to-orange-700 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationForm;
