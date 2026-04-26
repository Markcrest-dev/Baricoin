import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-surface-50 min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24 lg:pt-48">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-[3rem] p-10 lg:p-20 shadow-premium border border-surface-100">
            <h1 className="text-4xl lg:text-5xl font-black text-brand-900 mb-4">Privacy Policy</h1>
            <p className="text-brand-400 font-bold mb-12 uppercase tracking-widest text-xs">Last Updated: October 26, 2024</p>
            
            <div className="prose prose-brand max-w-none space-y-10 text-brand-700">
               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">1. Information We Collect</h2>
                  <p className="leading-relaxed">
                     We collect personal information that you provide to us when you create an account, such as your name, email address, phone number, and bank details for withdrawals. We also collect transaction data and device information to improve our services and ensure security.
                  </p>
               </section>

               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">2. How We Use Your Information</h2>
                  <p className="leading-relaxed">
                     Your information is used to process trades, facilitate withdrawals, send transaction updates, and protect against fraudulent activities. We may also use your data to communicate platform updates and marketing offers, which you can opt out of at any time.
                  </p>
               </section>

               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">3. Data Sharing and Disclosure</h2>
                  <p className="leading-relaxed">
                     We do not sell your personal data to third parties. We may share information with trusted service providers (e.g., payment processors) necessary to deliver our services, or when required by law to comply with legal obligations.
                  </p>
               </section>

               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">4. Data Security</h2>
                  <p className="leading-relaxed">
                     We implement industry-standard security measures, including SSL encryption and secure server environments, to protect your personal information from unauthorized access, disclosure, or alteration.
                  </p>
               </section>

               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">5. Your Rights</h2>
                  <p className="leading-relaxed">
                     You have the right to access, update, or request the deletion of your personal information. You can manage your profile settings within the dashboard or contact our support team for assistance with data-related requests.
                  </p>
               </section>

               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">6. Cookies</h2>
                  <p className="leading-relaxed">
                     We use cookies and similar tracking technologies to enhance your browsing experience and analyze platform traffic. You can control cookie preferences through your browser settings.
                  </p>
               </section>

               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">7. Contact Us</h2>
                  <p className="leading-relaxed">
                     If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact our Data Protection Officer at privacy@baricoin.com.
                  </p>
               </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
