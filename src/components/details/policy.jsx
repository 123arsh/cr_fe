import { Shield, AlertTriangle, FileText, Clock, Car, Phone, Mail } from 'lucide-react';

const Policy = () => {
  const policySections = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Responsibility for Damages",
      content: "The renter is fully responsible for any damage to the vehicle during the rental period, regardless of fault, unless caused by a proven mechanical failure or manufacturing defect."
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Minor Damage",
      content: "If the vehicle sustains minor damage (scratches, dents, broken lights, interior damage, etc.), the renter must pay the full cost of repairs as assessed by an authorized service provider or the rental company."
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: "Major Damage or Vandalism",
      content: "In cases where the vehicle is severely damaged, totaled, or vandalized beyond reasonable repair, the renter agrees to pay the full market value of the vehicle as determined at the time of the incident."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Insurance Coverage",
      content: "If the renter has provided valid insurance details, any claims will first be processed through their insurer. However, the renter is liable for any uncovered or denied amounts."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Security Deposit",
      content: "The rental company reserves the right to withhold part or all of the security deposit to cover damage costs."
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Reporting",
      content: "Any damage, theft, or incident must be reported to the rental company immediately, along with a police report (if applicable). Failure to report damage may result in additional charges or legal action."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Car Rental Policy</h1>
          <p className="text-lg text-gray-600">Please read our policy carefully before proceeding with your rental</p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {policySections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg text-blue-600">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
                  <p className="text-gray-600">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg text-blue-600">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Phone Support</h3>
                <p className="text-gray-600">24/7 Customer Service</p>
                <p className="text-blue-600 font-medium">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg text-blue-600">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
                <p className="text-gray-600">Response within 24 hours</p>
                <p className="text-blue-600 font-medium">support@carrental.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;