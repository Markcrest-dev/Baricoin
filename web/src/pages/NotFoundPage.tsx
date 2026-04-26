import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import logo from '../assets/images/icon.png';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-surface-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-12">
        <img src={logo} alt="Baricoin" className="h-12 mx-auto" />
      </div>

      <div className="relative mb-12">
        <div className="text-[12rem] lg:text-[18rem] font-black text-brand-900/5 leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
           <Search size={80} className="text-primary/40" />
        </div>
      </div>

      <h1 className="text-4xl lg:text-5xl font-black text-brand-900 mb-6">Lost in the Flip?</h1>
      <p className="text-lg text-brand-500 mb-12 max-w-md mx-auto">
        The page you are looking for doesn't exist or has been moved. Let's get you back to trading.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="px-10 py-5 bg-brand-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all"
        >
          <Home size={20} />
          Go to Home
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="px-10 py-5 bg-white text-brand-900 border-2 border-surface-200 rounded-2xl font-black flex items-center justify-center gap-3 hover:border-primary transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>

      <div className="mt-24 pt-8 border-t border-surface-200 w-full max-w-xs">
         <p className="text-xs font-bold text-brand-400 uppercase tracking-widest">Need help? <Link to="/support" className="text-primary">Contact Support</Link></p>
      </div>
    </div>
  );
};

export default NotFoundPage;
