import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const TermsPage = () => {
  return (
    <div className="bg-surface-50 min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24 lg:pt-48">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-[3rem] p-10 lg:p-20 shadow-premium border border-surface-100">
            <h1 className="text-4xl lg:text-5xl font-black text-brand-900 mb-4">Terms of Service</h1>
            <p className="text-brand-400 font-bold mb-12 uppercase tracking-widest text-xs">Last Updated: October 26, 2024</p>
            
            <div className="prose prose-brand max-w-none space-y-10 text-brand-700">
               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="leading-relaxed">
                     By accessing and using the Baricoin platform, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services.
                  </p>
               </section>

               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">2. Eligibility</h2>
                  <p className="leading-relaxed">
                     You must be at least 18 years old and have the legal capacity to enter into a binding agreement to use our services. By using Baricoin, you represent and warrant that you meet these requirements.
                  </p>
               </section>

               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">3. User Accounts</h2>
                  <p className="leading-relaxed">
                     To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use.
                  </p>
               </section>

               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">4. Trading Policies</h2>
                  <p className="leading-relaxed">
                     All trades, including giftcard sales and crypto exchanges, are subject to verification. Baricoin reserves the right to reject any trade that does not meet our quality or security standards. Rates are subject to market fluctuations and are finalized at the time of trade execution.
                  </p>
               </section>

               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">5. Prohibited Activities</h2>
                  <p className="leading-relaxed">
                     Users are prohibited from using the platform for any illegal activities, including but not limited to money laundering, fraud, or the sale of stolen digital assets. Any suspicious activity will be reported to the relevant authorities.
                  </p>
               </section>

               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">6. Limitation of Liability</h2>
                  <p className="leading-relaxed">
                     Baricoin shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, even if we have been advised of the possibility of such damages.
                  </p>
               </section>

               <section>
                  <h2 className="text-2xl font-black text-brand-900 mb-4">7. Changes to Terms</h2>
                  <p className="leading-relaxed">
                     We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the platform. Your continued use of the platform constitutes your acceptance of the modified terms.
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

export default TermsPage;
