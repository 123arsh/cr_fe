const HelpAndSupport = () => {
  return (
    <div className="min-h-screen w-full px-10 py-10">
      <div className="max-w-4xl mx-auto border border-gray-300 p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Help & Customer Support</h1>
        <ol className="list-decimal list-inside space-y-6">
          <li>
            <h2 className="font-semibold text-lg">💳 Payment Issues</h2>
            <p className="ml-4 mb-2">
              If your payment has failed, been deducted without confirmation, or you’re facing trouble completing a transaction:
            </p>
            <ul className="list-disc ml-10 space-y-1">
              <li>Make sure your internet connection is stable.</li>
              <li>Try using a different payment method.</li>
              <li>Wait a few minutes and try again.</li>
              <li>Send us your Transaction ID or screenshot with time and date via:
                <ul className="list-disc ml-6 mt-1">
                  <li>📧 Email: arshhhhdip@gmail.com</li>
                  <li>📞 WhatsApp: +91-7973766551</li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            <h2 className="font-semibold text-lg">🌐 Server or Booking Errors</h2>
            <ul className="list-disc ml-10 space-y-1">
              <li>If the platform isn’t loading or you face issues during car selection, form submission, or document upload:</li>
              <li>Refresh the page or clear your cache.</li>
              <li>Try incognito mode or another browser.</li>
              <li>If the problem persists, share the following with us:
                <ul className="list-disc ml-6 mt-1">
                  <li>A screenshot of the issue</li>
                  <li>A short description of the error</li>
                  <li>Time and action you were trying to perform</li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            <h2 className="font-semibold text-lg">📞 Need Customer Support?</h2>
            <ul className="list-disc ml-10 space-y-1">
              <li>Support is available 7 days a week from 9 AM to 9 PM.</li>
              <li>For immediate help or inquiries, contact us at:</li>
              <ul className="list-disc ml-6 mt-1">
                <li>📨 Email: help@yourapp.com</li>
                <li>☎️ Call/WhatsApp: +91-XXXXXXXXXX</li>
                <li>💬 Live Chat: Available on the bottom-right of our website</li>
              </ul>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HelpAndSupport;
