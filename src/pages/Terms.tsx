import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';

const Terms = () => {
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
              <CardTitle className="text-3xl">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-green-800">Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using this website, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-green-800">Use License</h2>
                <p className="text-gray-700 leading-relaxed">
                  Permission is granted to temporarily download one copy of the materials on Ansaru Youth's 
                  website for personal, non-commercial transitory viewing only.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-green-800">Disclaimer</h2>
                <p className="text-gray-700 leading-relaxed">
                  The materials on Ansaru Youth's website are provided on an 'as is' basis. Ansaru Youth 
                  makes no warranties, expressed or implied.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-green-800">Contact Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at info@ansaruyouth.org
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
