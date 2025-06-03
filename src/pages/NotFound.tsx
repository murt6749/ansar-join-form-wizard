
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, MessageCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-green-100 select-none animate-pulse">
            404
          </h1>
          <div className="relative -mt-16 md:-mt-20">
            <div className="text-6xl mb-4">🕌</div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you've wandered off the path. Let's guide you back to the right direction.
            </p>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mb-8 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="text-green-700 mb-4">
              <Search className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">What you were looking for might be:</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <Link to="/" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="font-semibold text-green-800">🏠 Home Page</div>
                  <div className="text-gray-600">Learn about Ansar-Youth</div>
                </Link>
                <Link to="/application" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="font-semibold text-green-800">📝 Application</div>
                  <div className="text-gray-600">Join our volunteer team</div>
                </Link>
              </div>
              <div className="space-y-2">
                <Link to="/privacy" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="font-semibold text-green-800">🔒 Privacy Policy</div>
                  <div className="text-gray-600">Your data protection</div>
                </Link>
                <Link to="/terms" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="font-semibold text-green-800">📋 Terms of Service</div>
                  <div className="text-gray-600">Our terms and conditions</div>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-50">
            <Link to="/application">
              <MessageCircle className="h-4 w-4" />
              Apply to Join
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Islamic Quote */}
        <div className="mt-12 p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200">
          <p className="text-green-800 font-medium mb-2">
            "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose."
          </p>
          <p className="text-green-600 text-sm">- Quran 65:3</p>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Still can't find what you're looking for?</p>
          <p className="mt-1">
            Contact us through our application form and we'll be happy to help!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
