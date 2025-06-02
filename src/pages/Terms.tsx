import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Terms = () => {
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
            <Link to="/privacy" className="text-green-700 hover:text-green-800 transition-colors">Privacy</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="bg-green-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
            <p className="text-green-100 text-lg">Ansar Youth Organization</p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Volunteer Agreement</h2>
              <p className="text-gray-700">
                By applying to join Ansar Youth, you agree to volunteer your time and skills in accordance 
                with Islamic principles and our organization's mission to spread Islamic knowledge and 
                support the Muslim community.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Commitment and Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Commit to the hours and responsibilities you indicate in your application</li>
                <li>Participate in assigned tasks with dedication and Islamic ethics</li>
                <li>Maintain respectful communication with team members</li>
                <li>Follow Islamic guidelines in all organizational activities</li>
                <li>Represent Ansar Youth positively in all interactions</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Code of Conduct</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>All activities must align with Islamic values and teachings</li>
                <li>Respect for all individuals regardless of background</li>
                <li>Professional and courteous communication</li>
                <li>Confidentiality of sensitive organizational information</li>
                <li>No promotion of content contrary to Islamic principles</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Intellectual Property</h2>
              <p className="text-gray-700">
                Content created as part of Ansar Youth activities will be used for the organization's 
                Islamic outreach mission. Contributors will be credited appropriately, and all content 
                should be permissible according to Islamic guidelines.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Termination</h2>
              <p className="text-gray-700">
                Either party may terminate the volunteer relationship at any time. We reserve the right 
                to remove volunteers who do not adhere to Islamic principles or our code of conduct.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Disclaimer</h2>
              <p className="text-gray-700">
                Ansar Youth is a volunteer-based Islamic organization. While we strive for excellence 
                in our activities, volunteers participate at their own discretion and responsibility.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Islamic Principles</h2>
              <p className="text-gray-700">
                All activities and communications within Ansar Youth must adhere to Islamic teachings 
                and values. We seek Allah's guidance in all our endeavors and aim to earn His pleasure 
                through our service to the Muslim community.
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
              <Link to="/privacy">
                <Button variant="outline">
                  Privacy Policy
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
