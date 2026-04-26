import { BookOpen, Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const BlogPage = () => {
  const posts = [
    {
      title: 'How to Secure Your Crypto Assets in 2024',
      excerpt: 'Learn the best practices for keeping your digital assets safe from hackers and scams.',
      category: 'Security',
      date: 'Oct 24, 2024',
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80\u0026w=2000'
    },
    {
      title: 'The Ultimate Guide to Selling Gift Cards for Best Rates',
      excerpt: 'Discover why some gift cards value more than others and how to get the maximum Naira.',
      category: 'Guides',
      date: 'Oct 22, 2024',
      author: 'Baricoin Team',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80\u0026w=2000'
    },
    {
      title: 'Baricoin App 2.0: What is New in Our Latest Update',
      excerpt: 'We have completely redesigned our platform to offer you the smoothest trading experience yet.',
      category: 'Updates',
      date: 'Oct 20, 2024',
      author: 'Product',
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80\u0026w=2000'
    }
  ];

  return (
    <div className="bg-surface-50 min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 text-primary">
              <BookOpen size={16} />
              <span>Insights \u0026 Updates</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-brand-900 mb-8 max-w-4xl mx-auto leading-tight">
              Stay Ahead in the <span className="gradient-text">Digital Economy</span>.
            </h1>
            <p className="text-xl text-brand-500 max-w-2xl mx-auto leading-relaxed">
              Your daily source for market trends, security tips, and platform updates.
            </p>
          </div>
        </section>

        {/* Search \u0026 Categories */}
        <section className="pb-12 border-b border-surface-100">
           <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="flex flex-wrap gap-4">
                    {['All Posts', 'Trading', 'Security', 'Company', 'Guides'].map((cat, i) => (
                       <button key={i} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${i === 0 ? 'bg-brand-900 text-white' : 'bg-surface-100 text-brand-500 hover:bg-surface-200'}`}>
                          {cat}
                       </button>
                    ))}
                 </div>
                 <div className="w-full md:w-80 relative">
                    <input 
                       type="text" 
                       placeholder="Search articles..." 
                       className="w-full pl-12 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-2xl focus:border-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400 font-bold" size={18} />
                 </div>
              </div>
           </div>
        </section>

        {/* Blog Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
               {posts.map((post, i) => (
                  <article key={i} className="group bg-white rounded-[2.5rem] overflow-hidden border border-surface-100 shadow-sm hover:shadow-premium transition-all duration-500">
                     <div className="aspect-[16/10] overflow-hidden relative">
                        <div className="absolute inset-0 bg-brand-900/10 group-hover:bg-brand-900/0 transition-all z-10" />
                        {/* Note: In a real app we'd use the provided images, for now we use placeholders or stylized colors */}
                        <div className="w-full h-full bg-surface-200 flex items-center justify-center text-brand-300">
                           <BookOpen size={48} />
                        </div>
                        <div className="absolute top-6 left-6 z-20">
                           <span className="px-4 py-1.5 bg-brand-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                              {post.category}
                           </span>
                        </div>
                     </div>
                     <div className="p-10">
                        <div className="flex items-center gap-4 mb-6 text-[10px] font-black text-brand-400 uppercase tracking-widest">
                           <div className="flex items-center gap-1.5">
                              <Calendar size={14} className="text-primary" />
                              {post.date}
                           </div>
                           <div className="flex items-center gap-1.5">
                              <User size={14} className="text-primary" />
                              {post.author}
                           </div>
                        </div>
                        <h2 className="text-2xl font-black text-brand-900 mb-6 group-hover:text-primary transition-colors leading-tight">
                           {post.title}
                        </h2>
                        <p className="text-brand-500 text-sm leading-relaxed mb-8">
                           {post.excerpt}
                        </p>
                        <button className="flex items-center gap-2 text-brand-900 font-black text-sm uppercase tracking-wider group/btn hover:text-primary transition-all">
                           Read Article 
                           <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                     </div>
                  </article>
               ))}
            </div>

            <div className="mt-20 text-center">
               <button className="px-10 py-5 bg-white border-2 border-surface-200 rounded-2xl font-black text-brand-900 hover:border-primary hover:text-primary transition-all shadow-sm">
                  Load More Articles
               </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
