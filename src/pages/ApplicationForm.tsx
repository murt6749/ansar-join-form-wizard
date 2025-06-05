
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ChevronLeft, ChevronRight, Send, User, BookOpen, Target, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { useDraftSave } from '@/hooks/useDraftSave';
import Layout from '@/components/Layout';

const formSchema = z.object({
  full_name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  age: z.number().min(18).max(22),
  gender: z.string().min(1, "Gender is required"),
  country_city: z.string().min(2, {
    message: "Country and city must be at least 2 characters.",
  }),
  phone_number: z.string().min(8, {
    message: "Phone number must be at least 8 characters.",
  }),
  telegram_username: z.string().optional(),
  email_address: z.string().email({
    message: "Please enter a valid email address.",
  }),
  why_join: z.string().min(20, {
    message: "Why join must be at least 20 characters.",
  }),
  interest_areas: z.array(z.string()).min(1, "Select at least one interest area"),
  skills_experience: z.string().optional(),
  hours_per_week: z.string().min(1, "Hours per week is required"),
  working_style: z.string().min(1, "Working style is required"),
  weekly_meetings: z.string().min(1, "Weekly meetings preference is required"),
  spiritual_motivation: z.string().min(20, {
    message: "Spiritual motivation must be at least 20 characters.",
  }),
  join_telegram_group: z.boolean().default(false),
  questions_notes: z.string().optional(),
});

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const { lightTap, mediumTap, notificationFeedback } = useHapticFeedback();

  const totalSteps = 4;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    }
  });

  // Auto-save draft
  useDraftSave('ansar-application', form.watch());

  // Swipe gesture support
  const swipeRef = useSwipeGesture({
    onSwipeLeft: () => {
      if (currentStep < totalSteps) {
        nextStep();
      }
    },
    onSwipeRight: () => {
      if (currentStep > 1) {
        prevStep();
      }
    }
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      lightTap();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      lightTap();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      mediumTap();

      const { error } = await supabase
        .from('ansar_applications')
        .insert([values]);

      if (error) throw error;

      notificationFeedback();
      toast({
        title: t.applicationForm.success.title,
        description: t.applicationForm.success.message,
      });

      form.reset();
      setCurrentStep(1);
    } catch (error: any) {
      toast({
        title: t.common.error,
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepIcons = [
    { icon: User, label: t.applicationForm.sections.personalInfo },
    { icon: BookOpen, label: t.applicationForm.sections.interest },
    { icon: Target, label: t.applicationForm.sections.availability },
    { icon: CheckCircle, label: t.applicationForm.sections.finalDetails }
  ];

  const getStepFields = (step: number) => {
    switch(step) {
      case 1:
        return ['full_name', 'age', 'gender', 'country_city', 'phone_number', 'telegram_username', 'email_address'];
      case 2:
        return ['why_join', 'interest_areas', 'skills_experience'];
      case 3:
        return ['hours_per_week', 'working_style', 'weekly_meetings', 'spiritual_motivation'];
      case 4:
        return ['join_telegram_group', 'questions_notes'];
      default:
        return [];
    }
  };

  const validateCurrentStep = async () => {
    const fields = getStepFields(currentStep);
    const isValid = await form.trigger(fields as any);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      nextStep();
    } else {
      mediumTap();
    }
  };

  const interestOptions = [
    "Education & Outreach",
    "Community Support",
    "Digital Media",
    "Event Organization",
    "Research & Development",
    "Translation Services",
    "Youth Mentoring",
    "Social Services"
  ];

  return (
    <Layout>
      <div ref={swipeRef} className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-4 md:py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Header */}
          <div className="mb-6 md:mb-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {t.applicationForm.title}
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                {t.applicationForm.subtitle}
              </p>
            </div>

            {/* Step Progress */}
            <div className="flex items-center justify-between mb-4 overflow-x-auto">
              {stepIcons.map((step, index) => {
                const StepIcon = step.icon;
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;

                return (
                  <div 
                    key={stepNumber}
                    className="flex flex-col items-center min-w-0 flex-1"
                  >
                    <div className={`
                      relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-110' 
                        : isCompleted 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }
                    `}>
                      <StepIcon className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <span className={`
                      text-xs md:text-sm font-medium text-center px-1 transition-all duration-300
                      ${isActive ? 'text-green-600' : 'text-gray-500'}
                    `}>
                      {step.label}
                    </span>
                    
                    {/* Progress line */}
                    {index < stepIcons.length - 1 && (
                      <div className={`
                        absolute top-5 md:top-6 left-1/2 w-full h-0.5 -z-10 transition-all duration-300
                        ${stepNumber < currentStep ? 'bg-green-500' : 'bg-gray-200'}
                      `} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl md:text-2xl text-gray-800">
                {stepIcons[currentStep - 1].label}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {currentStep === 1 && t.applicationForm.sections.personalInfoDesc}
                {currentStep === 2 && t.applicationForm.sections.interestDesc}
                {currentStep === 3 && t.applicationForm.sections.availabilityDesc}
                {currentStep === 4 && t.applicationForm.sections.finalDetailsDesc}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="full_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                {t.applicationForm.fields.fullName} *
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your full name"
                                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                {t.applicationForm.fields.age} *
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  type="number"
                                  min="18"
                                  max="22"
                                  placeholder="Age (18-22)"
                                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                {t.applicationForm.fields.gender} *
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="country_city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                {t.applicationForm.fields.countryCity} *
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Country, City"
                                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                {t.applicationForm.fields.phoneNumber} *
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="WhatsApp number"
                                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="telegram_username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                {t.applicationForm.fields.telegramUsername}
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="@username"
                                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email_address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.applicationForm.fields.emailAddress} *
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="your@email.com"
                                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 2: Interest & Motivation */}
                  {currentStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <FormField
                        control={form.control}
                        name="why_join"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.applicationForm.fields.whyJoin} *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.applicationForm.fields.whyJoinDesc}
                                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="interest_areas"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.applicationForm.fields.interestAreas} *
                            </FormLabel>
                            <div className="grid grid-cols-2 gap-2">
                              {interestOptions.map((option) => (
                                <label key={option} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                                  <input
                                    type="checkbox"
                                    checked={field.value?.includes(option) || false}
                                    onChange={(e) => {
                                      const currentValue = field.value || [];
                                      if (e.target.checked) {
                                        field.onChange([...currentValue, option]);
                                      } else {
                                        field.onChange(currentValue.filter(v => v !== option));
                                      }
                                    }}
                                    className="rounded border-gray-300"
                                  />
                                  <span className="text-sm">{option}</span>
                                </label>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="skills_experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.applicationForm.fields.skillsExperience}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.applicationForm.fields.skillsExperienceDesc}
                                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 3: Availability */}
                  {currentStep === 3 && (
                    <div className="space-y-4 animate-fade-in">
                      <FormField
                        control={form.control}
                        name="hours_per_week"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.applicationForm.fields.hoursPerWeek} *
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                                  <SelectValue placeholder="Select hours per week" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1-3">1-3 hours</SelectItem>
                                <SelectItem value="4-6">4-6 hours</SelectItem>
                                <SelectItem value="7-10">7-10 hours</SelectItem>
                                <SelectItem value="10+">10+ hours</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="working_style"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.applicationForm.fields.workingStyle} *
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                                  <SelectValue placeholder="Select working style" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="independent">Independent work</SelectItem>
                                <SelectItem value="collaborative">Collaborative work</SelectItem>
                                <SelectItem value="both">Both independent and collaborative</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="weekly_meetings"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.applicationForm.fields.weeklyMeetings} *
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                                  <SelectValue placeholder="Can you attend weekly meetings?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes, I can attend</SelectItem>
                                <SelectItem value="no">No, I cannot attend</SelectItem>
                                <SelectItem value="sometimes">Sometimes, depends on schedule</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="spiritual_motivation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.applicationForm.fields.spiritualMotivation} *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.applicationForm.fields.spiritualMotivationDesc}
                                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 4: Final Details */}
                  {currentStep === 4 && (
                    <div className="space-y-4 animate-fade-in">
                      <FormField
                        control={form.control}
                        name="join_telegram_group"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="rounded border-gray-300"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                {t.applicationForm.fields.joinTelegramGroup}
                              </FormLabel>
                              <p className="text-sm text-muted-foreground">
                                {t.applicationForm.fields.joinTelegramGroupDesc}
                              </p>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="questions_notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.applicationForm.fields.questionsNotes}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.applicationForm.fields.questionsNotesDesc}
                                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center space-x-2 px-6 py-3"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>{t.applicationForm.buttons.previous}</span>
                    </Button>

                    {currentStep < totalSteps ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3"
                      >
                        <span>{t.applicationForm.buttons.next}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3"
                      >
                        {isSubmitting ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                        <span>{isSubmitting ? t.applicationForm.buttons.submitting : t.applicationForm.buttons.submit}</span>
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Mobile Swipe Hint */}
          <div className="text-center mt-4 md:hidden">
            <p className="text-sm text-gray-500">
              💡 Swipe left/right to navigate between steps
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationForm;
