
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-800 mb-4">
            Ansar Youth
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join us in spreading Islamic knowledge and making a positive impact in the Muslim community
          </p>
          <div className="text-lg text-green-700 mb-8">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-green-800">📚 Islamic Education</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Creating and sharing authentic Islamic content to educate and inspire the Muslim community
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-green-800">🤝 Community Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Supporting fellow Muslims through various outreach programs and charitable activities
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-green-800">🌍 Global Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Working together to create positive change in Muslim communities worldwide
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-800">Ready to Make a Difference?</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-700">
              Join our team of dedicated volunteers and help us spread the beautiful message of Islam. 
              Whether you're skilled in content creation, design, technology, or simply have the passion 
              to help, we have a place for you.
            </p>
            <div className="space-y-3">
              <Link to="/application">
                <Button size="lg" className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Apply to Join Us
                </Button>
              </Link>
              <p className="text-sm text-gray-600">
                "And whoever volunteers good - then indeed, Allah is appreciative and Knowing." (Quran 2:158)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-600">
            May Allah accept our efforts and guide us on the straight path
          </p>
          <div className="text-sm text-gray-500 space-x-4">
            <Link to="/privacy" className="hover:text-green-600">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-green-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
