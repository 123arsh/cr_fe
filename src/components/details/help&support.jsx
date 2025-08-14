import { useState } from 'react';
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  ChevronRight,
  Search,
  FileText,
  Car,
  CreditCard,
  User,
  MapPin,
  Calendar,
  Shield,
  AlertTriangle,
  Star,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  FileQuestion,
  MessageCircle,
  X
} from 'lucide-react';

const HelpSupport = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const categories = [
    { id: 'general', name: 'General Questions', icon: <HelpCircle className="h-5 w-5" /> },
    { id: 'booking', name: 'Booking & Reservations', icon: <Car className="h-5 w-5" /> },
    { id: 'locations', name: 'Locations & Pickup', icon: <MapPin className="h-5 w-5" /> },
    { id: 'safety', name: 'Safety & Security', icon: <Shield className="h-5 w-5" /> },
  ];

  const faqs = {
    general: [
      {
        question: "What documents do I need to rent a car?",
        answer: "You'll need a valid driver's license, proof of insurance, and a credit card in your name. International renters may need additional documentation.",
        helpful: 0,
        notHelpful: 0
      },
      {
        question: "What is your cancellation policy?",
        answer: "You can cancel your reservation up to 24 hours before the pickup time without any charges. Late cancellations may incur a fee.",
        helpful: 0,
        notHelpful: 0
      },
      {
        question: "Do you offer roadside assistance?",
        answer: "Yes, we provide 24/7 roadside assistance for all our rental vehicles. The contact number is provided in your rental agreement.",
        helpful: 0,
        notHelpful: 0
      }
    ],
    booking: [
      {
        question: "How do I modify my reservation?",
        answer: "You can modify your reservation through your account dashboard or by contacting our customer service team.",
        helpful: 0,
        notHelpful: 0
      },
      {
        question: "Can I extend my rental period?",
        answer: "Yes, you can extend your rental period by contacting us at least 24 hours before your scheduled return time.",
        helpful: 0,
        notHelpful: 0
      }
    ],
    locations: [
      {
        question: "Where are your pickup locations?",
        answer: "We have multiple pickup locations across major cities. You can find the nearest location using our location finder tool.",
        helpful: 0,
        notHelpful: 0
      },
      {
        question: "Do you offer airport pickup?",
        answer: "Yes, we offer airport pickup services at major airports. Please select the airport location when making your reservation.",
        helpful: 0,
        notHelpful: 0
      }
    ],
    safety: [
      {
        question: "What safety features do your vehicles have?",
        answer: "All our vehicles are equipped with standard safety features including airbags, ABS, and stability control. Premium vehicles may have additional safety features.",
        helpful: 0,
        notHelpful: 0
      },
      {
        question: "What happens in case of an accident?",
        answer: "In case of an accident, please contact our 24/7 emergency line immediately. We'll guide you through the process and arrange for a replacement vehicle if needed.",
        helpful: 0,
        notHelpful: 0
      }
    ]
  };

  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [faqFeedback, setFaqFeedback] = useState({});
  const [chatMessage, setChatMessage] = useState('');

  const toggleFaq = (index) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleFeedback = (category, index, isHelpful) => {
    setFaqFeedback(prev => ({
      ...prev,
      [`${category}-${index}`]: isHelpful
    }));
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Here you would typically send the message to your chat backend
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };

  const filteredFaqs = faqs[activeCategory].filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
          <p className="text-lg text-gray-600">Find answers to your questions or contact our support team</p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span className="font-medium">View User Guide</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
            <FileQuestion className="h-5 w-5 text-blue-600" />
            <span className="font-medium">Common Issues</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <span className="font-medium">Contact Support</span>
          </button>
        </div>


        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 justify-center mx-auto w-fit">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center justify-center space-x-2 p-4 rounded-lg transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              {category.icon}
              <span className="font-medium text-sm">{category.name}</span>
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {expandedFaqs[index] ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {expandedFaqs[index] && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-600 mb-4">{faq.answer}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-500">Was this helpful?</span>
                    <button
                      onClick={() => handleFeedback(activeCategory, index, true)}
                      className={`flex items-center space-x-1 ${
                        faqFeedback[`${activeCategory}-${index}`] === true
                          ? 'text-green-600'
                          : 'text-gray-500 hover:text-green-600'
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>Yes</span>
                    </button>
                    <button
                      onClick={() => handleFeedback(activeCategory, index, false)}
                      className={`flex items-center space-x-1 ${
                        faqFeedback[`${activeCategory}-${index}`] === false
                          ? 'text-red-600'
                          : 'text-gray-500 hover:text-red-600'
                      }`}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>No</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Feedback Toast */}
        {showFeedback && (
          <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Thank you for your feedback!</span>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Still Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg text-blue-600">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Phone Support</h3>
                <p className="text-gray-600">24/7 Customer Service</p>
                <p className="text-blue-600 font-medium">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg text-blue-600">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
                <p className="text-gray-600">Response within 24 hours</p>
                <p className="text-blue-600 font-medium">support@carrental.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg text-blue-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
                <p className="text-gray-600">Available 9 AM - 6 PM</p>
                <button 
                  onClick={() => setShowChat(true)}
                  className="text-blue-600 font-medium hover:text-blue-700 flex items-center space-x-1"
                >
                  <span>Start Chat</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 bg-red-50 rounded-xl p-6 border border-red-100">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 p-3 bg-red-100 rounded-lg text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-red-900">Emergency Support</h3>
              <p className="text-red-600">For urgent assistance, call our 24/7 emergency line</p>
              <p className="text-red-700 font-bold">+1 (555) 999-8888</p>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        {showChat && (
          <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-900">Live Chat Support</h3>
              <button 
                onClick={() => setShowChat(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-96 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-700">Hello! How can I help you today?</p>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpSupport; 