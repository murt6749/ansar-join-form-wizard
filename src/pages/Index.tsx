
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-green-800">Ansar Youth</div>
          <div className="space-x-4">
            <Link to="/privacy" className="text-green-700 hover:text-green-800 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-green-700 hover:text-green-800 transition-colors">Terms</Link>
            <Link to="/application">
              <Button className="bg-green-600 hover:bg-green-700">Join Us</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-green-800 mb-6">
            Ansar Youth
          </h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join us in spreading Islamic knowledge and making a positive impact in the Muslim community through organized da'wah, content creation, and community support
          </p>
          <div className="text-2xl text-green-700 mb-12 font-arabic">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>
          <Link to="/application">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
              Apply to Join Our Mission
            </Button>
          </Link>
        </div>

        {/* Our Teams Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">Our Professional Teams</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Leadership & Management */}
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

            {/* Content & Media */}
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

            {/* Outreach & Da'wah */}
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

            {/* Finance & Tech */}
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

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-green-800 text-xl">📚 Islamic Education</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Creating and sharing authentic Islamic content to educate and inspire the Muslim community through various digital platforms
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-green-800 text-xl">🤝 Community Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Supporting fellow Muslims through organized outreach programs, charitable activities, and rural da'wah initiatives
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-green-800 text-xl">🌍 Global Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Working together as a professional organization to create positive change in Muslim communities worldwide
              </p>
            </CardContent>
          </Card>
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
              <Link to="/application">
                <Button size="lg" className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                  Apply to Join Our Team
                </Button>
              </Link>
              <p className="text-base text-gray-700 italic">
                "And whoever volunteers good - then indeed, Allah is appreciative and Knowing." (Quran 2:158)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-20 space-y-6">
          <p className="text-lg text-gray-700">
            May Allah accept our efforts and guide us on the straight path
          </p>
          <div className="text-base text-gray-600 space-x-6">
            <Link to="/privacy" className="hover:text-green-600 transition-colors underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-green-600 transition-colors underline">Terms of Service</Link>
            <span>•</span>
            <Link to="/application" className="hover:text-green-600 transition-colors underline">Join Application</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
