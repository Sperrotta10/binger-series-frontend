import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Search, X, ChevronRight, Lock } from 'lucide-react';
import { SeriesCard } from '../components/SeriesCard';

const trendingShows = [
  { title: "Neon Chronicles", subtitle: "Sci-Fi • Cyberpunk", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop", badge: "TRENDING" },
  { title: "The Last Watcher", subtitle: "Mystery • Drama", imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop" },
  { title: "Mirror Protocol", subtitle: "Thriller • Tech", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" },
  { title: "Velocity Noir", subtitle: "Action • Crime", imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop" },
];

export const Landing = () => {
    const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleShowClick = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-white font-sans overflow-x-hidden selection:bg-primary/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0d0e12]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              Binger
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#bec7d6]">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#discover" className="hover:text-primary transition-colors">Discover</a>
            <a href="#community" className="hover:text-primary transition-colors">Community</a>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/auth/login" 
              className="text-sm font-medium text-white hover:text-primary transition-colors px-4 py-2"
            >
              Sign In
            </Link>
            <Link 
              to="/auth/register" 
              className="text-sm font-medium bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-200 transition-transform active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-xs font-medium text-[#bec7d6] uppercase tracking-wider">Now in Open Beta</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent">
          The Ultimate TV Tracker & Social Network
        </h1>
        
        <p className="text-lg md:text-xl text-[#bec7d6] mb-10 max-w-2xl leading-relaxed">
          Log every episode, review your favorites, and discover what your friends are obsessed with. The cinematic universe for series lovers.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            to="/auth/register" 
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-[#dcb8ff] text-white px-8 py-4 rounded-full font-bold hover:shadow-[0_0_30px_rgba(220,184,255,0.4)] transition-all hover:-translate-y-1"
          >
            <Play size={18} fill="currentColor" />
            Start Tracking Free
          </Link>
        </div>
      </section>

      {/* Search Hook Section */}
      <section id="discover" className="py-20 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl transition-all group-focus-within:bg-primary/30 group-focus-within:blur-2xl"></div>
            <div className="relative flex items-center bg-[#1a1b22] border border-white/10 rounded-2xl p-2 shadow-2xl transition-colors focus-within:border-primary/50">
              <div className="pl-4 pr-2 text-[#bec7d6]">
                <Search size={24} />
              </div>
              <input 
                type="text" 
                placeholder="Search for any TV show or movie..." 
                className="w-full bg-transparent text-lg text-white placeholder:text-[#6a7181] py-4 outline-none font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                onClick={handleShowClick}
                className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-medium transition-colors border border-white/5"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Preview */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-serif text-white flex items-center gap-3">
            Trending This Week
            <span className="text-sm font-sans font-normal text-primary bg-primary/10 px-2 py-0.5 rounded">HOT</span>
          </h2>
          <button onClick={handleShowClick} className="text-sm font-semibold text-[#bec7d6] hover:text-white flex items-center gap-1 transition-colors">
            VIEW ALL <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trendingShows.map((show, idx) => (
            <div key={idx} onClick={handleShowClick} className="cursor-pointer">
              <SeriesCard {...show} />
            </div>
          ))}
        </div>
      </section>

      {/* Auth Modal (Glassmorphic) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowAuthModal(false)}></div>
          <div className="relative bg-[#121317]/90 border border-white/10 backdrop-blur-xl rounded-2xl w-[90%] max-w-[400px] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-[#bec7d6] hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6 border border-primary/30">
              <Lock className="text-primary" size={24} />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Unlock the Full Experience</h3>
            <p className="text-[#bec7d6] mb-8 leading-relaxed">
              Create a free account to track episodes, write reviews, and explore the complete catalog.
            </p>
            
            <div className="flex flex-col gap-3">
              <Link 
                to="/auth/register" 
                className="w-full bg-white text-black font-bold py-3.5 rounded-xl flex justify-center items-center hover:bg-gray-200 transition-colors"
              >
                Create Account
              </Link>
              <Link 
                to="/auth/login" 
                className="w-full bg-transparent border border-white/20 text-white font-bold py-3.5 rounded-xl flex justify-center items-center hover:bg-white/5 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
