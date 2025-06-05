
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users, Shield, Heart, Globe, Phone, Mail, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/hooks/useLanguage';

const Index = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        {/* Mobile-optimized Hero Section */}
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-white shadow-xl p-3 lg:p-4">
                <img 
                  src="/lovable-uploads/5e53261d-6466-445b-8439-cb514a2a1343.png" 
                  alt="Ansaru Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl lg:text-6xl font-bold text-green-800 mb-4 lg:mb-6">
              Ansaru Youth for Deen
            </h1>
            <p className="text-base lg:text-2xl text-gray-700 mb-6 lg:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Join us in spreading Islamic knowledge and making a positive impact in the Muslim community through organized da'wah, content creation, and community support
            </p>
            <div className="text-lg lg:text-2xl text-green-700 mb-8 lg:mb-12 font-arabic">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 lg:gap-4 px-4">
              <Link to="/application" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                  Apply to Join Our Mission
                </Button>
              </Link>
              <a href="https://ansaar.netlify.app" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                  Explore Team Structure
                </Button>
              </a>
            </div>
          </div>

          {/* Mobile-optimized Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mb-12 lg:mb-16">
            <Card className="text-center hover:shadow-xl transition-shadow duration-300 border-green-200">
              <CardHeader className="pb-3">
                <div className="mx-auto w-12 h-12 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 lg:mb-4">
                  <Heart className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800 text-lg lg:text-xl">📚 Islamic Education</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                  Creating and sharing authentic Islamic content to educate and inspire the Muslim community through various digital platforms
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow duration-300 border-green-200">
              <CardHeader className="pb-3">
                <div className="mx-auto w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 lg:mb-4">
                  <Users className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
                </div>
                <CardTitle className="text-green-800 text-lg lg:text-xl">🤝 Community Support</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                  Supporting fellow Muslims through organized outreach programs, charitable activities, and rural da'wah initiatives
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow duration-300 border-green-200">
              <CardHeader className="pb-3">
                <div className="mx-auto w-12 h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 lg:mb-4">
                  <Globe className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600" />
                </div>
                <CardTitle className="text-green-800 text-lg lg:text-xl">🌍 Global Impact</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                  Working together as a professional organization to create positive change in Muslim communities worldwide
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mobile-optimized Teams Section */}
          <div className="mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold text-center text-green-800 mb-8 lg:mb-12">Our Professional Teams</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center bg-green-600 text-white rounded-t-lg p-4">
                  <CardTitle className="text-base lg:text-lg">👑 Leadership</CardTitle>
                </CardHeader>
                <CardContent className="p-3 lg:p-4">
                  <ul className="text-xs lg:text-sm space-y-1 lg:space-y-2 text-gray-700">
                    <li>• General Manager</li>
                    <li>• Spiritual Advisor</li>
                    <li>• Team Relations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center bg-blue-600 text-white rounded-t-lg p-4">
                  <CardTitle className="text-base lg:text-lg">📝 Content & Media</CardTitle>
                </CardHeader>
                <CardContent className="p-3 lg:p-4">
                  <ul className="text-xs lg:text-sm space-y-1 lg:space-y-2 text-gray-700">
                    <li>• Islamic Writers</li>
                    <li>• Graphic Designers</li>
                    <li>• Video Editors</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center bg-purple-600 text-white rounded-t-lg p-4">
                  <CardTitle className="text-base lg:text-lg">🌍 Outreach</CardTitle>
                </CardHeader>
                <CardContent className="p-3 lg:p-4">
                  <ul className="text-xs lg:text-sm space-y-1 lg:space-y-2 text-gray-700">
                    <li>• Social Media Admin</li>
                    <li>• Rural Da'wah Team</li>
                    <li>• Community Recruiters</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center bg-orange-600 text-white rounded-t-lg p-4">
                  <CardTitle className="text-base lg:text-lg">💼 Finance & Tech</CardTitle>
                </CardHeader>
                <CardContent className="p-3 lg:p-4">
                  <ul className="text-xs lg:text-sm space-y-1 lg:space-y-2 text-gray-700">
                    <li>• Donations Manager</li>
                    <li>• Web Administrators</li>
                    <li>• Project Coordinators</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mobile-optimized Call to Action */}
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
            <CardHeader className="text-center p-4 lg:p-6">
              <CardTitle className="text-2xl lg:text-3xl text-green-800">Ready to Make a Difference?</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4 lg:space-y-6 p-4 lg:p-8">
              <p className="text-sm lg:text-lg text-gray-700 leading-relaxed">
                Join our team of dedicated volunteers and help us spread the beautiful message of Islam. 
                Whether you're skilled in content creation, design, technology, fundraising, or simply have the passion 
                to help, we have a place for you in our organized professional structure.
              </p>
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
                <h3 className="text-lg lg:text-xl font-semibold text-green-800 mb-3 lg:mb-4">We Need 18-22 Committed Volunteers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 text-left">
                  <div>
                    <h4 className="font-semibold text-green-700 text-sm lg:text-base">Content & Media Teams:</h4>
                    <p className="text-xs lg:text-sm text-gray-600">Writers, designers, video editors</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 text-sm lg:text-base">Management & Finance:</h4>
                    <p className="text-xs lg:text-sm text-gray-600">Project managers, donation coordinators</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 text-sm lg:text-base">Outreach & Da'wah:</h4>
                    <p className="text-xs lg:text-sm text-gray-600">Social media, rural outreach, recruitment</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 text-sm lg:text-base">Tech & Administration:</h4>
                    <p className="text-xs lg:text-sm text-gray-600">Website management, task coordination</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 lg:space-y-4">
                <div className="flex flex-col sm:flex-row justify-center gap-3 lg:gap-4">
                  <Link to="/application" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                      Apply to Join Our Team
                    </Button>
                  </Link>
                  <Link to="/auth" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                      Member Login
                    </Button>
                  </Link>
                </div>
                <p className="text-sm lg:text-base text-gray-700 italic">
                  "And whoever volunteers good - then indeed, Allah is appreciative and Knowing." (Quran 2:158)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mobile-optimized Contact Section */}
          <div className="mt-16 lg:mt-20 text-center">
            <h3 className="text-xl lg:text-2xl font-bold text-green-800 mb-6 lg:mb-8">Contact Us</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center space-y-2 lg:space-y-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 text-sm lg:text-base">Email</h4>
                  <p className="text-gray-600 text-xs lg:text-sm">info@ansaruyouth.org</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 lg:space-y-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 text-sm lg:text-base">Phone</h4>
                  <p className="text-gray-600 text-xs lg:text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 lg:space-y-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 text-sm lg:text-base">Location</h4>
                  <p className="text-gray-600 text-xs lg:text-sm">Global Organization</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 lg:mt-20 space-y-4 lg:space-y-6">
            <p className="text-base lg:text-lg text-gray-700">
              May Allah accept our efforts and guide us on the straight path
            </p>
            <div className="text-sm lg:text-base text-gray-600 space-y-2 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row flex-wrap justify-center">
              <Link to="/privacy" className="hover:text-green-600 transition-colors underline">Privacy Policy</Link>
              <span className="hidden sm:inline">•</span>
              <Link to="/terms" className="hover:text-green-600 transition-colors underline">Terms of Service</Link>
              <span className="hidden sm:inline">•</span>
              <Link to="/application" className="hover:text-green-600 transition-colors underline">Join Application</Link>
              <span className="hidden sm:inline">•</span>
              <a href="https://ansaar.netlify.app" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors underline">Team Structure</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
