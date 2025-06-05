
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  ArrowRight, 
  Heart, 
  Users, 
  BookOpen, 
  Globe, 
  Star,
  MessageCircle,
  Shield,
  Target,
  Zap,
  Award,
  TrendingUp
} from 'lucide-react';
import Layout from '@/components/Layout';

const Index = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Heart,
      title: 'Faith-Driven Mission',
      description: 'Building a better future through Islamic values and community service',
      color: 'text-red-600 bg-red-50'
    },
    {
      icon: Users,
      title: 'Youth Empowerment',
      description: 'Engaging young minds in meaningful projects and leadership development',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: BookOpen,
      title: 'Educational Impact',
      description: 'Providing learning opportunities and skill development programs',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting communities worldwide for positive change',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: Target,
      title: 'Focused Goals',
      description: 'Strategic initiatives that create lasting impact in communities',
      color: 'text-orange-600 bg-orange-50'
    },
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'Transparent operations built on Islamic principles of honesty',
      color: 'text-teal-600 bg-teal-50'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Volunteers', icon: Users },
    { number: '50+', label: 'Projects Completed', icon: Award },
    { number: '25+', label: 'Countries Reached', icon: Globe },
    { number: '98%', label: 'Satisfaction Rate', icon: TrendingUp }
  ];

  const impactAreas = [
    'Community Outreach',
    'Youth Education',
    'Social Media Dawah',
    'Emergency Relief',
    'Skill Development',
    'Mentorship Programs'
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-orange-50 to-amber-50">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-teal-400"></div>
            <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-orange-400"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-amber-400"></div>
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-12">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-orange-500 p-4 shadow-2xl">
                  <img 
                    src="/lovable-uploads/9ffdc7fa-be78-4a04-8b3e-673407016278.png" 
                    alt="Fadis Youth Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent">
                  Fadis Youth
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Empowering young Muslims to create positive change in their communities through 
                faith-based initiatives and collaborative action.
              </p>

              {/* Arabic Text */}
              <div className="mb-8">
                <p className="text-lg text-teal-700 font-medium mb-2">
                  "إنما المؤمنون إخوة"
                </p>
                <p className="text-gray-600 italic">
                  "The believers are brothers" - Quran 49:10
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-orange-600 hover:from-teal-700 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                  onClick={() => window.location.href = '/application'}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Join Our Mission
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-200"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 bg-white/70 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-6">
                      <Icon className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">{stat.number}</h3>
                      <p className="text-gray-600 font-medium">{stat.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="about" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Why Choose Fadis Youth?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're dedicated to creating meaningful change through Islamic values and modern approaches
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-800">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Impact Areas */}
        <section className="py-16 px-4 bg-gradient-to-r from-teal-600/10 to-orange-600/10">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Our Impact Areas
              </h2>
              <p className="text-xl text-gray-600">
                Making a difference across multiple domains
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {impactAreas.map((area, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="text-lg px-6 py-3 bg-gradient-to-r from-teal-100 to-orange-100 text-gray-800 border border-teal-200 hover:from-teal-200 hover:to-orange-200 transition-all duration-200 cursor-default"
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-teal-600 to-orange-600 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <CardContent className="p-8 lg:p-12 text-center relative z-10">
                <Star className="h-16 w-16 text-yellow-300 mx-auto mb-6" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Ready to Make a Difference?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Join thousands of young Muslims who are actively building a better tomorrow. 
                  Your journey towards meaningful impact starts here.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    variant="secondary"
                    className="bg-white text-teal-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => window.location.href = '/application'}
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Start Your Journey
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                  
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-teal-600 font-semibold px-8 py-4 rounded-full transition-all duration-200"
                    onClick={() => window.open('https://t.me/fadisyouth', '_blank')}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Join Community
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
