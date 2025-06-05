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
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(8, {
    message: "Phone number must be at least 8 characters.",
  }),
  date_of_birth: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  education_level: z.enum(['high_school', 'bachelor', 'master', 'phd']),
  skills: z.string().min(10, {
    message: "Skills must be at least 10 characters.",
  }),
  experience: z.string().min(10, {
    message: "Experience must be at least 10 characters.",
  }),
  volunteer_areas: z.string().min(10, {
    message: "Volunteer areas must be at least 10 characters.",
  }),
  motivation: z.string().min(20, {
    message: "Motivation must be at least 20 characters.",
  }),
  availability: z.string().min(10, {
    message: "Availability must be at least 10 characters.",
  }),
  previous_volunteer: z.string().min(10, {
    message: "Previous volunteer experience must be at least 10 characters.",
  }),
  references: z.string().min(20, {
    message: "References must be at least 20 characters.",
  }),
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
      email: '',
      phone: '',
      date_of_birth: '',
      gender: '',
      address: '',
      education_level: '',
      skills: '',
      experience: '',
      volunteer_areas: '',
      motivation: '',
      availability: '',
      previous_volunteer: '',
      references: ''
    }
  });

  // Auto-save draft
  useDraftSave('volunteer-application', form.watch());

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
        .from('volunteer_applications')
        .insert([values]);

      if (error) throw error;

      notificationFeedback();
      toast({
        title: t.form.success.title,
        description: t.form.success.description,
      });

      form.reset();
      setCurrentStep(1);
    } catch (error: any) {
      toast({
        title: t.form.error.title,
        description: error.message || t.form.error.description,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepIcons = [
    { icon: User, label: t.form.steps.personal },
    { icon: BookOpen, label: t.form.steps.education },
    { icon: Target, label: t.form.steps.volunteer },
    { icon: CheckCircle, label: t.form.steps.review }
  ];

  const getStepFields = (step: number) => {
    switch(step) {
      case 1:
        return ['full_name', 'email', 'phone', 'date_of_birth', 'gender', 'address'];
      case 2:
        return ['education_level', 'skills', 'experience'];
      case 3:
        return ['volunteer_areas', 'motivation', 'availability', 'previous_volunteer'];
      case 4:
        return ['references'];
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

  return (
    <Layout>
      <div ref={swipeRef} className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-4 md:py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Header */}
          <div className="mb-6 md:mb-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {t.form.title}
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                {t.form.subtitle}
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
                {currentStep === 1 && t.form.steps.personalDesc}
                {currentStep === 2 && t.form.steps.educationDesc}
                {currentStep === 3 && t.form.steps.volunteerDesc}
                {currentStep === 4 && t.form.steps.reviewDesc}
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
                                {t.form.fullName} *
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t.form.fullNamePlaceholder}
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
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                {t.form.email} *
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder={t.form.emailPlaceholder}
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
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                {t.form.phone} *
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t.form.phonePlaceholder}
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
                          name="date_of_birth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                {t.form.dateOfBirth} *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
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
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.form.gender} *
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                                  <SelectValue placeholder={t.form.genderPlaceholder} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">{t.form.male}</SelectItem>
                                <SelectItem value="female">{t.form.female}</SelectItem>
                                <SelectItem value="other">{t.form.other}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.form.address} *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.form.addressPlaceholder}
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

                  {/* Step 2: Education & Skills */}
                  {currentStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <FormField
                        control={form.control}
                        name="education_level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.form.educationLevel} *
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                                  <SelectValue placeholder={t.form.educationLevelPlaceholder} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="high_school">{t.form.highSchool}</SelectItem>
                                <SelectItem value="bachelor">{t.form.bachelor}</SelectItem>
                                <SelectItem value="master">{t.form.master}</SelectItem>
                                <SelectItem value="phd">{t.form.phd}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.form.skills} *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.form.skillsPlaceholder}
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
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.form.experience} *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.form.experiencePlaceholder}
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

                  {/* Step 3: Volunteer Preferences */}
                  {currentStep === 3 && (
                    <div className="space-y-4 animate-fade-in">
                      <FormField
                        control={form.control}
                        name="volunteer_areas"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.form.volunteerAreas} *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.form.volunteerAreasPlaceholder}
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
                        name="motivation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.form.motivation} *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.form.motivationPlaceholder}
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
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.form.availability} *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.form.availabilityPlaceholder}
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
                        name="previous_volunteer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.form.previousVolunteer} *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.form.previousVolunteerPlaceholder}
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

                  {/* Step 4: References */}
                  {currentStep === 4 && (
                    <div className="space-y-4 animate-fade-in">
                      <FormField
                        control={form.control}
                        name="references"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {t.form.references} *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.form.referencesPlaceholder}
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
                      <span>{t.form.previous}</span>
                    </Button>

                    {currentStep < totalSteps ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3"
                      >
                        <span>{t.form.next}</span>
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
                        <span>{isSubmitting ? t.form.submitting : t.form.submit}</span>
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
              💡 {t.form.swipeHint || "Swipe left/right to navigate between steps"}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationForm;
