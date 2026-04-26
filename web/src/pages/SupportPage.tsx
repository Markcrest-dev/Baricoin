import { HelpCircle, MessageCircle, Mail, Phone, ArrowRight, Search, ChevronDown } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const SupportPage = () => {
  const faqs = [
    {
      q: 'How long does it take to get paid?',
      a: 'Most trades are verified and paid within 5 to 15 minutes. High-volume trades might take slightly longer but we always notify you of any delays.'
    },
    {
      q: 'Which gift cards do you accept?',
      a: 'We accept over 20+ gift cards including Amazon, iTunes, Steam, Google Play, Sephora, Nordstrom, and many others.'
    },
    {
      q: 'Is my crypto asset safe with Baricoin?',
      a: 'Yes, we use escrow systems and bank-grade encryption to ensure that all transactions are secure. Your funds are only released once verification is complete.'
    },
    {
      q: 'How do I withdraw my Naira balance?',
      a: 'You can withdraw directly to any Nigerian bank account from your dashboard. Withdrawals are processed instantly.'
    }
  ];

  return (
    <div className="bg-surface-50 min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[60%] h-full bg-primary/10 rounded-full blur-[120px] -mr-[30%]" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10">
                <HelpCircle size={16} className="text-primary" />
                <span>Help Center</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
                How can we <span className="text-primary">help</span> you today?
              </h1>
              <div className="w-full max-w-2xl mx-auto relative mt-12">
                 <input 
                    type="text" 
                    placeholder="Search for answers (e.g. 'how to trade')" 
                    className="w-full pl-16 pr-8 py-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] focus:bg-white focus:text-brand-900 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-lg font-medium placeholder:text-white/40"
                 />
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-bold" size={24} />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-24">
               {[
                 { icon: <MessageCircle size={32} />, title: 'Live Chat', desc: 'Average response: 2 mins', action: 'Start Chat', color: 'bg-primary' },
                 { icon: <Mail size={32} />, title: 'Email Support', desc: 'support@baricoin.com', action: 'Send Email', color: 'bg-brand-800' },
                 { icon: <Phone size={32} />, title: 'Phone Call', desc: 'Mon - Fri, 9am - 5pm', action: 'Call Us Now', color: 'bg-brand-600' }
               ].map((item, i) => (
                  <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-surface-100 shadow-sm hover:shadow-premium transition-all duration-300 text-center">
                     <div className={`w-16 h-16 rounded-2xl ${item.color} text-white flex items-center justify-center mx-auto mb-8 shadow-lg`}>
                        {item.icon}
                     </div>
                     <h3 className="text-2xl font-bold text-brand-900 mb-2">{item.title}</h3>
                     <p className="text-brand-500 font-medium mb-8 uppercase tracking-tighter text-xs">{item.desc}</p>
                     <button className="w-full py-4 border-2 border-surface-100 rounded-2xl font-black text-brand-900 hover:border-primary hover:text-primary transition-all uppercase tracking-widest text-xs">
                        {item.action}
                     </button>
                  </div>
               ))}
            </div>

            {/* FAQs */}
            <div className="max-w-3xl mx-auto">
               <h2 className="text-4xl font-black text-brand-900 mb-12 text-center underline decoration-primary decoration-4 underline-offset-8">Frequently Asked Questions</h2>
               <div className="space-y-4">
                  {faqs.map((faq, i) => (
                     <div key={i} className="bg-white border border-surface-100 rounded-[2rem] p-8 hover:border-primary/20 transition-all cursor-pointer group">
                        <div className="flex items-center justify-between gap-4">
                           <h4 className="text-lg font-bold text-brand-900">{faq.q}</h4>
                           <ChevronDown size={20} className="text-brand-300 group-hover:text-primary transition-colors" />
                        </div>
                        <p className="mt-4 text-brand-500 leading-relaxed font-medium hidden group-hover:block animate-fade-in">
                           {faq.a}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24 px-6">
           <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-[3.5rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
              <h2 className="text-4xl font-black mb-6">Still have questions?</h2>
              <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">Our premium support team is standing by to assist you with any issues you may have.</p>
              <button className="px-12 py-5 bg-white text-primary font-black rounded-2xl shadow-2xl hover:scale-105 transition-all flex items-center gap-2 mx-auto">
                 Speak with an Agent <ArrowRight size={20} />
              </button>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SupportPage;
