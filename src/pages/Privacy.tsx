import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 mb-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-green-800 hover:text-green-900 transition-colors">
            ← Ansar Youth
          </Link>
          <div className="space-x-4">
            <Link to="/application" className="text-green-700 hover:text-green-800 transition-colors">Application</Link>
            <Link to="/terms" className="text-green-700 hover:text-green-800 transition-colors">Terms</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="bg-green-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <p className="text-green-100 text-lg">Ansar Youth Organization</p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                When you apply to join Ansar Youth, we collect the following information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Personal information (name, age, gender, location)</li>
                <li>Contact information (email, phone number, Telegram username)</li>
                <li>Information about your interests and skills</li>
                <li>Your availability and working preferences</li>
                <li>Your spiritual motivation and reasons for joining</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>To review and process your application</li>
                <li>To contact you regarding your application status</li>
                <li>To match you with appropriate volunteer opportunities</li>
                <li>To add you to relevant communication channels (with your consent)</li>
                <li>To coordinate Islamic outreach and educational activities</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Information Sharing</h2>
              <p className="text-gray-700">
                We do not sell, trade, or otherwise transfer your personal information to outside parties. 
                Your information is only accessible to Ansar Youth administrators and team leads who need 
                it to coordinate volunteer activities and Islamic outreach efforts.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. Your data is stored securely 
                and access is limited to authorized personnel only.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Your Rights</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Request access to your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Withdraw from volunteer activities at any time</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about this Privacy Policy or wish to exercise your rights, 
                please contact us through our official communication channels.
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <Link to="/application">
                <Button className="bg-green-600 hover:bg-green-700">
                  Back to Application
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline">
                  Home
                </Button>
              </Link>
              <Link to="/terms">
                <Button variant="outline">
                  Terms of Service
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
