
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Menu, X, Users, Shield, Heart, Globe, Phone, Mail, MapPin } from 'lucide-react';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/5e53261d-6466-445b-8439-cb514a2a1343.png" 
              alt="Ansaru Logo" 
              className="h-12 w-12 object-contain"
            />
            <div className="text-2xl font-bold text-green-800">Ansaru Youth</div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-green-700 hover:text-green-800 transition-colors">Home</Link>
            <Link to="/application" className="text-green-700 hover:text-green-800 transition-colors">Join Us</Link>
            <a href="https://ansaar.netlify.app" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-800 transition-colors">Team Structure</a>
            <Link to="/privacy" className="text-green-700 hover:text-green-800 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-green-700 hover:text-green-800 transition-colors">Terms</Link>
            <Link to="/auth" className="text-blue-600 hover:text-blue-800 transition-colors">Login</Link>
            <Link to="/admin" className="text-gray-500 hover:text-gray-600 transition-colors text-sm">Admin</Link>
            <Link to="/application">
              <Button className="bg-green-600 hover:bg-green-700">Join Us</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-2 p-4 z-50 md:hidden">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-green-700 hover:text-green-800 transition-colors p-2">Home</Link>
              <Link to="/application" className="text-green-700 hover:text-green-800 transition-colors p-2">Join Us</Link>
              <a href="https://ansaar.netlify.app" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-800 transition-colors p-2">Team Structure</a>
              <Link to="/privacy" className="text-green-700 hover:text-green-800 transition-colors p-2">Privacy</Link>
              <Link to="/terms" className="text-green-700 hover:text-green-800 transition-colors p-2">Terms</Link>
              <Link to="/auth" className="text-blue-600 hover:text-blue-800 transition-colors p-2">Login</Link>
              <Link to="/admin" className="text-gray-500 hover:text-gray-600 transition-colors p-2">Admin</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/5e53261d-6466-445b-8439-cb514a2a1343.png" 
              alt="Ansaru Logo" 
              className="h-24 w-24 object-contain"
            />
          </div>
          <h1 className="text-6xl font-bold text-green-800 mb-6">
            Ansaru Youth for Deen
          </h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join us in spreading Islamic knowledge and making a positive impact in the Muslim community through organized da'wah, content creation, and community support
          </p>
          <div className="text-2xl text-green-700 mb-12 font-arabic">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/application">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                Apply to Join Our Mission
              </Button>
            </Link>
            <a href="https://ansaar.netlify.app" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                Explore Team Structure
              </Button>
            </a>
          </div>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-xl transition-shadow duration-300 border-green-200">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-green-800 text-xl">📚 Islamic Education</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Creating and sharing authentic Islamic content to educate and inspire the Muslim community through various digital platforms
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow duration-300 border-green-200">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-green-800 text-xl">🤝 Community Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Supporting fellow Muslims through organized outreach programs, charitable activities, and rural da'wah initiatives
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow duration-300 border-green-200">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-green-800 text-xl">🌍 Global Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Working together as a professional organization to create positive change in Muslim communities worldwide
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Teams Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">Our Professional Teams</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center bg-green-600 text-white rounded-t-lg">
                <CardTitle className="text-lg">👑 Leadership</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• General Manager</li>
                  <li>• Spiritual Advisor</li>
                  <li>• Team Relations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center bg-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-lg">📝 Content & Media</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• Islamic Writers</li>
                  <li>• Graphic Designers</li>
                  <li>• Video Editors</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center bg-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-lg">🌍 Outreach</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• Social Media Admin</li>
                  <li>• Rural Da'wah Team</li>
                  <li>• Community Recruiters</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center bg-orange-600 text-white rounded-t-lg">
                <CardTitle className="text-lg">💼 Finance & Tech</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• Donations Manager</li>
                  <li>• Web Administrators</li>
                  <li>• Project Coordinators</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-green-800">Ready to Make a Difference?</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6 p-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Join our team of dedicated volunteers and help us spread the beautiful message of Islam. 
              Whether you're skilled in content creation, design, technology, fundraising, or simply have the passion 
              to help, we have a place for you in our organized professional structure.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-800 mb-4">We Need 18-22 Committed Volunteers</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <h4 className="font-semibold text-green-700">Content & Media Teams:</h4>
                  <p className="text-sm text-gray-600">Writers, designers, video editors</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">Management & Finance:</h4>
                  <p className="text-sm text-gray-600">Project managers, donation coordinators</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">Outreach & Da'wah:</h4>
                  <p className="text-sm text-gray-600">Social media, rural outreach, recruitment</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">Tech & Administration:</h4>
                  <p className="text-sm text-gray-600">Website management, task coordination</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/application">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                    Apply to Join Our Team
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                    Member Login
                  </Button>
                </Link>
              </div>
              <p className="text-base text-gray-700 italic">
                "And whoever volunteers good - then indeed, Allah is appreciative and Knowing." (Quran 2:158)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-8">Contact Us</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Email</h4>
                <p className="text-gray-600">info@ansaruyouth.org</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Phone</h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Location</h4>
                <p className="text-gray-600">Global Organization</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 space-y-6">
          <p className="text-lg text-gray-700">
            May Allah accept our efforts and guide us on the straight path
          </p>
          <div className="text-base text-gray-600 space-x-6 flex flex-wrap justify-center">
            <Link to="/privacy" className="hover:text-green-600 transition-colors underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-green-600 transition-colors underline">Terms of Service</Link>
            <span>•</span>
            <Link to="/application" className="hover:text-green-600 transition-colors underline">Join Application</Link>
            <span>•</span>
            <a href="https://ansaar.netlify.app" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors underline">Team Structure</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
