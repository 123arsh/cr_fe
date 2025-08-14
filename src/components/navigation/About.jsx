import { Car, Users, ShieldCheck, Smile, HelpCircle, Calendar, CreditCard, FileText, Globe, Leaf, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center py-10 px-2">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-blue-800 drop-shadow-lg">
          Welcome to Car Rental
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-700 mb-10 font-serif">
          Where Every Journey Begins with Ease
        </p>
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <Car className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Redefining Car Rentals</h3>
              <p className="text-gray-700">We blend convenience, technology, and trust to provide a fast, seamless, and reliable car rental experience. Travel on your own terms—whether commuting or exploring new destinations.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Users className="h-8 w-8 text-purple-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Diverse Fleet</h3>
              <p className="text-gray-700">Choose from hatchbacks, sedans, SUVs, and premium vehicles. Every car is regularly maintained and sanitized for your safety and comfort.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-8 w-8 text-pink-500 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Simple & Secure Platform</h3>
              <ul className="list-none space-y-1 mt-2">
                <li className="flex items-center gap-2 text-gray-700"><FileText className="h-5 w-5 text-blue-400" /> Quick document uploads</li>
                <li className="flex items-center gap-2 text-gray-700"><Calendar className="h-5 w-5 text-purple-400" /> Flexible start and end dates</li>
                <li className="flex items-center gap-2 text-gray-700"><CreditCard className="h-5 w-5 text-pink-400" /> Secure payment options</li>
                <li className="flex items-center gap-2 text-gray-700"><ShieldCheck className="h-5 w-5 text-green-400" /> Transparent pricing — no hidden charges</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <HelpCircle className="h-8 w-8 text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">24/7 Support</h3>
              <p className="text-gray-700">Our dedicated support team is always available to assist with your booking, queries, or on-road issues. We believe in building lasting relationships with our customers, ensuring you always have someone to rely on during your journey.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Smile className="h-8 w-8 text-yellow-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Trusted by Thousands</h3>
              <p className="text-gray-700">Join thousands of happy customers who trust us for their car rental needs. Read our customer stories to see how we've helped people make their journeys memorable and stress-free.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Globe className="h-8 w-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Nationwide Reach</h3>
              <p className="text-gray-700">With pickup locations in major cities and airports, we make it easy for you to start your trip wherever you are. Our expanding network ensures you're never far from a Car Rental location.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Leaf className="h-8 w-8 text-green-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Sustainability Commitment</h3>
              <p className="text-gray-700">We are committed to a greener future. Our fleet includes eco-friendly and hybrid vehicles, and we're constantly working to reduce our environmental impact through sustainable practices.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <TrendingUp className="h-8 w-8 text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Driven by Innovation</h3>
              <p className="text-gray-700">We leverage the latest technology to make your rental experience smoother—from instant booking confirmations to real-time vehicle tracking and digital key access. Our vision is to set new standards in the car rental industry.</p>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">
            Drive your way. Drive with Car Rental.
          </h2>
          <div className="mx-auto w-24 h-1 bg-blue-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
