import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-800 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-green-800">Information We Collect</h2>
                <p className="text-gray-700 leading-relaxed">
                  We collect information you provide directly to us when you apply to join our organization, 
                  create an account, or contact us for support.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-green-800">How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  We use the information we collect to process your application, communicate with you about 
                  our programs, and improve our services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-green-800">Information Sharing</h2>
                <p className="text-gray-700 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-green-800">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at info@ansaruyouth.org
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
