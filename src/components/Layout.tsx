import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Menu, 
  X,
  Search,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { RippleButton } from './ui/multi-type-ripple-buttons';

const logo = "/assets/aistudio/vclogonobg_5fff1799.png";

interface LayoutProps {
  children: React.ReactNode;
}

interface SearchTarget {
  title: string;
  category: string;
  path: string;
  keywords: string[];
}

const SEARCH_INDEX: SearchTarget[] = [
  { title: 'Home Overview', category: 'Page', path: '/', keywords: ['home', 'start', 'delhi', 'hero', 'trust'] },
  { title: 'Custom 2D & 3D Floor Plans', category: 'Services', path: '/services#floor-plans', keywords: ['floor', 'plan', '2d', '3d', 'vastu', 'revit', 'autocad', 'design', 'architect'] },
  { title: 'QASCON Quality Framework', category: 'Quality', path: '/services#qascon', keywords: ['qascon', 'quality', 'audit', 'check', 'inspection', 'structural'] },
  { title: 'Recent Projects Portfolio', category: 'Portfolio', path: '/services#projects', keywords: ['project', 'villa', 'apartment', 'office', 'industrial', 'shed', 'educational', 'hotel', 'portfolio'] },
  { title: 'Construction Packages & Pricing', category: 'Pricing', path: '/services#packages', keywords: ['package', 'price', 'basic', 'classic', 'premium', 'royale', 'rate', 'sqft'] },
  { title: 'Construction Cost Estimator', category: 'Calculator', path: '/comparison#estimator', keywords: ['cost', 'estimator', 'calculator', 'budget', 'quote', 'estimate', 'plot', 'material'] },
  { title: 'Package Feature Comparison', category: 'Showcase', path: '/comparison', keywords: ['compare', 'comparison', 'table', 'specification', 'steel', 'cement'] },
  { title: 'Project Execution Timeline', category: 'Process', path: '/timeline', keywords: ['process', 'timeline', 'orbit', 'escrow', 'bim', 'digital twin', 'delivery'] },
  { title: 'About Us, Leadership & Team', category: 'Company', path: '/about', keywords: ['about', 'team', 'director', 'arun', 'testimonial', 'reviews', 'company'] },
  { title: 'Contact & Project Inquiry', category: 'Contact', path: '#footer-contact', keywords: ['contact', 'phone', 'email', 'whatsapp', 'address', 'ghaziabad', 'inquire'] },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [inquiryFeedback, setInquiryFeedback] = useState<string | null>(null);

  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [footerName, setFooterName] = useState('');
  const [footerEmail, setFooterEmail] = useState('');
  const [footerPhone, setFooterPhone] = useState('');
  const [footerMessage, setFooterMessage] = useState('');

  const filteredSearchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SEARCH_INDEX.slice(0, 5);
    return SEARCH_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
    );
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchResultSelect = (target: SearchTarget) => {
    setIsSearchOpen(false);
    setIsMenuOpen(false);
    setSearchQuery('');
    if (target.path === '#footer-contact') {
      document.getElementById('footer-contact')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate(target.path);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredSearchResults.length > 0) {
      e.preventDefault();
      handleSearchResultSelect(filteredSearchResults[0]);
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    if (!footerName.trim() && !footerPhone.trim() && !footerMessage.trim()) {
      setInquiryFeedback('Please enter your name, phone number, or project details first.');
      setTimeout(() => setInquiryFeedback(null), 4000);
      return;
    }
    const message = `Hello Vishwakarma Constructions, I am ${footerName || 'a prospective client'}. Email: ${footerEmail || 'N/A'}, Phone: ${footerPhone || 'N/A'}. Message: ${footerMessage || 'I would like to inquire about your construction services.'}`;
    const whatsappUrl = `https://wa.me/919997173549?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setInquiryFeedback('Opening WhatsApp with your inquiry details...');
    setTimeout(() => setInquiryFeedback(null), 4000);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services & Projects', path: '/services' },
    { name: 'Showcase', path: '/comparison' },
    { name: 'Process', path: '/timeline' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <div className="dark min-h-screen bg-black text-white font-sans selection:bg-amber-500 selection:text-black flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/35 backdrop-blur-md border-b border-white/10 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between gap-6">
            {/* Left: Transparent Logo Section */}
            <Link to="/" className="flex items-center gap-3 group bg-transparent shrink-0">
              <img 
                src={logo} 
                alt="Vishwakarma Constructions Logo" 
                className="h-12 md:h-14 w-auto object-contain bg-transparent transition-transform duration-300 group-hover:scale-105"
                decoding="async"
                fetchPriority="high"
              />
              <div className="flex flex-col bg-transparent">
                <span className="text-xl md:text-2xl font-black tracking-tighter text-white leading-none">VISHWAKARMA</span>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-amber-500 uppercase">Constructions</span>
              </div>
            </Link>
            
            {/* Center: Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className={`px-3 xl:px-4 py-2 text-[10px] xl:text-[11px] font-black uppercase tracking-widest transition-colors duration-200 rounded-full whitespace-nowrap ${
                      location.pathname === link.path ? 'text-black bg-amber-500' : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Right: Search & Contact */}
            <div className="hidden md:flex items-center justify-end gap-4 lg:gap-6">
              <div ref={searchContainerRef} className="relative hidden xl:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <Input 
                  placeholder="Search pages, plans..." 
                  value={searchQuery}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onKeyDown={handleSearchKeyDown}
                  className="pl-9 pr-4 py-2 w-44 focus:w-56 bg-white/10 border-white/15 focus:bg-zinc-900/95 focus:border-amber-500/60 rounded-full text-xs transition-all duration-200 text-white placeholder:text-slate-400"
                />

                {isSearchOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-zinc-950/95 border border-white/15 shadow-2xl overflow-hidden z-[150]">
                    <div className="px-3 py-2 border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {searchQuery.trim() ? 'Matching Sections' : 'Quick Navigation'}
                    </div>
                    {filteredSearchResults.length > 0 ? (
                      <div className="max-h-64 overflow-y-auto py-1">
                        {filteredSearchResults.map((item) => (
                          <button
                            key={item.path + item.title}
                            type="button"
                            onClick={() => handleSearchResultSelect(item)}
                            className="w-full px-3.5 py-2.5 text-left hover:bg-amber-500/15 flex items-center justify-between gap-2 transition-colors group"
                          >
                            <div>
                              <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">{item.title}</div>
                              <div className="text-[10px] text-slate-400 uppercase tracking-wider">{item.category}</div>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-3 text-xs text-slate-400">
                        No matches found. Try "packages", "estimator", or "projects".
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-end gap-0.5 pl-4 lg:pl-6 border-l border-white/10">
                <a href="tel:+919997173549" className="flex items-center gap-2 text-amber-500 font-black text-[10px] lg:text-xs whitespace-nowrap hover:text-white transition-colors">
                  <Phone className="h-3 w-3 text-amber-500" />
                  <span>+91 99971 73549</span>
                </a>
                <a href="tel:+918006512858" className="flex items-center gap-2 text-amber-500 font-black text-[10px] lg:text-xs whitespace-nowrap hover:text-white transition-colors">
                  <Phone className="h-3 w-3 text-amber-500" />
                  <span>+91 80065 12858</span>
                </a>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex justify-end">
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/10 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-zinc-950/95 border-b border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search pages, packages, estimator..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    className="pl-10 bg-white/5 border-white/10 rounded-xl text-white"
                  />
                  {searchQuery.trim() && (
                    <div className="mt-2 rounded-xl bg-zinc-900 border border-white/10 divide-y divide-white/5 overflow-hidden">
                      {filteredSearchResults.map((item) => (
                        <button
                          key={item.path + item.title}
                          type="button"
                          onClick={() => handleSearchResultSelect(item)}
                          className="w-full px-3.5 py-2.5 text-left hover:bg-amber-500/15 flex items-center justify-between text-xs text-white font-bold"
                        >
                          <span>{item.title}</span>
                          <span className="text-[10px] text-amber-500 uppercase">{item.category}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path} 
                      to={link.path} 
                      className={`block text-lg font-bold py-1 ${
                        location.pathname === link.path ? 'text-amber-500' : 'text-white hover:text-amber-400'
                      }`} 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact Us</p>
                  <a href="tel:+919997173549" className="flex items-center gap-3 text-white font-bold hover:text-amber-500 transition-colors">
                    <Phone className="h-4 w-4 text-amber-500" />
                    <span>+91 99971 73549</span>
                  </a>
                  <a href="tel:+918006512858" className="flex items-center gap-3 text-white font-bold hover:text-amber-500 transition-colors">
                    <Phone className="h-4 w-4 text-amber-500" />
                    <span>+91 80065 12858</span>
                  </a>
                </div>
                <Button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/comparison#estimator');
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-6 rounded-xl"
                >
                  Get Free Quote
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer id="footer-contact" className="relative text-slate-400 border-t border-white/10 overflow-hidden bg-zinc-950">
        {/* Lightweight Architectural Ambient Backdrop (replaces heavy external video stream) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.12),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(217,119,6,0.08),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        <div className="relative z-10 py-20 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-4">
                <Link to="/" className="flex items-center gap-3 mb-6 bg-transparent group">
                  <img 
                    src={logo} 
                    alt="Vishwakarma Constructions Logo" 
                    className="h-12 md:h-14 w-auto object-contain bg-transparent transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
                    VISHWAKARMA <span className="text-amber-500">CONSTRUCTIONS</span>
                  </span>
                </Link>
                <p className="text-sm leading-relaxed mb-6 text-slate-300 font-medium">
                  We provide comprehensive architectural and construction services for residential, educational, industrial, and commercial projects. Your dream project, our responsibility.
                </p>
                <div className="flex gap-5 mb-8">
                  <a href="https://www.facebook.com/vishwakarmaconstruction" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-300 hover:text-amber-500 transition-transform transform hover:scale-110"><Facebook className="h-5 w-5" /></a>
                  <a href="https://www.instagram.com/vishwakarmaconstructions.2023" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-300 hover:text-amber-500 transition-transform transform hover:scale-110"><Instagram className="h-5 w-5" /></a>
                  <a href="https://x.com/VishwakarmaCons" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-slate-300 hover:text-amber-500 transition-transform transform hover:scale-110"><Twitter className="h-5 w-5" /></a>
                  <a href="https://www.linkedin.com/in/vishwakarmaconstructions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-300 hover:text-amber-500 transition-transform transform hover:scale-110"><Linkedin className="h-5 w-5" /></a>
                </div>
                
                <h4 className="text-white font-bold text-lg mb-4">Contact Info</h4>
                <ul className="space-y-4 text-sm text-slate-200">
                  <li className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                      <Phone className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="font-medium space-x-2">
                      <a href="tel:+919997173549" className="hover:text-amber-400 transition-colors">+91 99971 73549</a>
                      <span>,</span>
                      <a href="tel:+918006512858" className="hover:text-amber-400 transition-colors">+91 80065 12858</a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                      <Mail className="h-4 w-4 text-amber-500" />
                    </div>
                    <a href="mailto:vishwakarmaconstructions2023@gmail.com" className="font-medium hover:text-amber-400 transition-colors">
                      vishwakarmaconstructions2023@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-amber-500/10 border border-amber-500/20 mt-1">
                      <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
                    </div>
                    <span className="font-medium">Near Jalalpur primary school, Asalatnagar road, Murad Nagar, Ghaziabad, UP 201206</span>
                  </li>
                </ul>
              </div>
              
              <div className="lg:col-span-2">
                <h4 className="text-white font-bold text-lg mb-6">Services</h4>
                <ul className="space-y-4 text-sm text-slate-200">
                  <li><Link to="/services#projects" className="hover:text-amber-500 transition-colors font-medium">Civil Construction</Link></li>
                  <li><Link to="/services#qascon" className="hover:text-amber-500 transition-colors font-medium">Architectural Consultancy</Link></li>
                  <li><Link to="/services#floor-plans" className="hover:text-amber-500 transition-colors font-medium">2D & 3D Building Plans</Link></li>
                  <li><Link to="/services#floor-plans" className="hover:text-amber-500 transition-colors font-medium">Vastu Planning</Link></li>
                </ul>
              </div>

              <div className="lg:col-span-2">
                <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
                <ul className="space-y-4 text-sm text-slate-200">
                  <li><Link to="/about" className="hover:text-amber-500 transition-colors font-medium">About Us</Link></li>
                  <li><Link to="/services#packages" className="hover:text-amber-500 transition-colors font-medium">Packages</Link></li>
                  <li><Link to="/comparison#estimator" className="hover:text-amber-500 transition-colors font-medium">Cost Estimator</Link></li>
                  <li><Link to="/services#projects" className="hover:text-amber-500 transition-colors font-medium">Our Projects</Link></li>
                </ul>
              </div>

              <div className="lg:col-span-4">
                <Card className="bg-zinc-900/90 border border-white/10 text-white shadow-2xl overflow-hidden rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Inquire About Services</CardTitle>
                    <CardDescription className="text-slate-300">Send us a message and we'll get back to you immediately via WhatsApp.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="footer-name" className="text-xs font-bold uppercase tracking-wider text-slate-300">Name</Label>
                        <Input id="footer-name" placeholder="Arjun Sharma" value={footerName} onChange={(e) => setFooterName(e.target.value)} className="bg-black/50 border-white/10 text-white h-10 focus:border-amber-500 transition-colors rounded-xl placeholder:text-slate-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="footer-email" className="text-xs font-bold uppercase tracking-wider text-slate-300">Email</Label>
                        <Input id="footer-email" type="email" placeholder="arjun@example.com" value={footerEmail} onChange={(e) => setFooterEmail(e.target.value)} className="bg-black/50 border-white/10 text-white h-10 focus:border-amber-500 transition-colors rounded-xl placeholder:text-slate-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="footer-phone" className="text-xs font-bold uppercase tracking-wider text-slate-300">Phone Number</Label>
                      <Input id="footer-phone" type="tel" placeholder="+91 98765 43210" value={footerPhone} onChange={(e) => setFooterPhone(e.target.value)} className="bg-black/50 border-white/10 text-white h-10 focus:border-amber-500 transition-colors rounded-xl placeholder:text-slate-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="footer-message" className="text-xs font-bold uppercase tracking-wider text-slate-300">Message</Label>
                      <Textarea id="footer-message" placeholder="Tell us about your plot size, location, and requirements..." value={footerMessage} onChange={(e) => setFooterMessage(e.target.value)} className="bg-black/50 border-white/10 text-white min-h-[96px] focus:border-amber-500 transition-colors rounded-xl placeholder:text-slate-500" />
                    </div>
                    {inquiryFeedback && (
                      <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{inquiryFeedback}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <RippleButton onClick={handleWhatsAppSubmit} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-amber-600/30 transition-transform transform hover:scale-[1.01]">
                      SEND MESSAGE
                    </RippleButton>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <Separator className="bg-white/10 mb-8" />
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-300 font-medium">
              <p>© 2026 Vishwakarma Constructions. All rights reserved.</p>
              <div className="flex gap-8">
                <button type="button" onClick={() => setActiveLegalModal('privacy')} className="hover:text-amber-400 transition-colors">Privacy Policy</button>
                <button type="button" onClick={() => setActiveLegalModal('terms')} className="hover:text-amber-400 transition-colors">Terms of Service</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Info Modal */}
      <AnimatePresence>
        {activeLegalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setActiveLegalModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full bg-zinc-900 border border-white/15 rounded-3xl p-8 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black tracking-tight text-amber-500">
                  {activeLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setActiveLegalModal(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {activeLegalModal === 'privacy'
                  ? 'Vishwakarma Constructions respects your privacy. Any contact details, plot specifications, or architectural preferences shared through our inquiry forms or cost estimator are used strictly to prepare your customized project consultation and estimate. We never sell or share client data with third-party marketers.'
                  : 'All construction package rates (Basic, Classic, Premium, and Royale) are indicative per-square-foot estimates subject to site soil testing, local municipal bylaws across Delhi NCR, and final architectural drawings approved under our stage-gate QASCON quality framework and escrow payment schedule.'}
              </p>
              <Button onClick={() => setActiveLegalModal(null)} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl">
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
