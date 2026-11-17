import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Layers, 
  PenTool,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ModernPricingPage, PricingCardProps } from "@/src/components/ui/animated-glassy-pricing";
import { RippleButton } from "@/src/components/ui/multi-type-ripple-buttons";
import ProjectGallery from "@/src/components/ProjectGallery";

const logo = "/assets/aistudio/vclogonobg_5fff1799.png";

const pricingPlans: PricingCardProps[] = [
  { 
    planName: 'Basic', 
    description: 'Essential construction with quality standard materials.', 
    price: '1,790', 
    features: ['Rathi Steel', '1.5ft Foundation', 'Shree/Ambuja Cement', 'Standard Red Bricks'], 
    buttonText: 'Calculate Basic', 
    buttonVariant: 'secondary'
  },
  { 
    planName: 'Classic', 
    description: 'Enhanced specifications for a more premium feel.', 
    price: '2,290', 
    features: ['JSW Neosteel', '2ft Foundation', 'Ultratech Cement', '9" Outer Walls'], 
    buttonText: 'Choose Classic', 
    isPopular: true, 
    buttonVariant: 'primary' 
  },
  { 
    planName: 'Premium', 
    description: 'High-end materials and superior finishing.', 
    price: '2,990', 
    features: ['TATA/SAIL Steel', '2.5ft Foundation', 'ACC/Wonder Cement', 'Premium Electricals'], 
    buttonText: 'Choose Premium', 
    buttonVariant: 'primary' 
  },
  { 
    planName: 'Royale', 
    description: 'The ultimate luxury construction experience.', 
    price: '3,750', 
    features: ['TATA/JSW Steel', 'Deep Foundation', 'Top-tier Cement', 'Designer Finishes'], 
    buttonText: 'Consult Expert', 
    buttonVariant: 'primary' 
  },
];

const StorySection = ({ 
  children, 
  bgImage, 
  title, 
  subtitle, 
  index 
}: { 
  children?: React.ReactNode; 
  bgImage: string; 
  title: string; 
  subtitle: string; 
  index: number;
}) => {
  const optimizedBgImage = bgImage
    .replace(/w=\d+/, 'w=1000')
    .replace(/q=\d+/, 'q=75');

  return (
    <section className="relative min-h-[85vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-24">
      <div className="absolute inset-0 z-0">
        <img 
          src={optimizedBgImage} 
          alt={title} 
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/75" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-4xl"
        >
          <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 mb-4 md:mb-6 px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
            Phase 0{index}
          </Badge>
          <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-none uppercase">
            {title}
          </h2>
          <p className="text-slate-300 text-base md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          {children}
        </motion.div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSelectPlan = (planName: string) => {
    const pkgId = planName.toLowerCase();
    navigate(`/comparison?package=${encodeURIComponent(pkgId)}#estimator`);
  };

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-amber-500 selection:text-black">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-amber-600 z-[200] origin-left"
        style={{ scaleX, willChange: "transform" }}
      />

      {/* 1. HERO SECTION - extends under the fixed transparent navbar */}
      <section className="relative -mt-24 pt-24 min-h-dvh w-full flex items-center justify-center overflow-hidden pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=75&w=1200&auto=format&fit=crop" 
            alt="Luxury Delhi House" 
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/80" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 mb-6 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase">
              Established in Delhi
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9] uppercase">
              We Don't Just<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Build Homes,</span><br />
              We Build Trust
            </h1>
            <p className="text-slate-300 text-base md:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              Crafting architectural masterpieces in the heart of India. Experience a construction journey that blends tradition with futuristic precision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <RippleButton 
                onClick={() => {
                  document.getElementById('journey-start')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white h-14 px-8 rounded-full text-base font-black shadow-xl shadow-amber-600/30 transition-transform transform hover:scale-105"
              >
                START YOUR JOURNEY
              </RippleButton>
              <Button 
                variant="outline" 
                onClick={() => {
                  navigate('/services#projects');
                }}
                className="border-white/25 text-white hover:bg-white/10 h-14 px-8 rounded-full text-base font-bold bg-zinc-900/70"
              >
                VIEW PROJECTS
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CLIENT MEETING */}
      <div id="journey-start" className="scroll-mt-24" />
      <StorySection 
        index={1}
        bgImage="https://images.unsplash.com/photo-1600607687940-47a04b629753?q=75&w=1000&auto=format&fit=crop"
        title="Understanding Your Vision"
        subtitle="Every great structure begins with a conversation. We listen to your dreams, your needs, and your lifestyle to create a blueprint for your future."
      >
        <div className="mt-12 flex justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-zinc-900/80 border border-white/10 flex items-center justify-center">
              <MessageSquare className="text-amber-500" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consultation</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-zinc-900/80 border border-white/10 flex items-center justify-center">
              <Layers className="text-amber-500" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Requirement</span>
          </div>
        </div>
      </StorySection>

      {/* 3. PLANNING & DESIGN */}
      <StorySection 
        index={2}
        bgImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=75&w=1000&auto=format&fit=crop"
        title="Precision Planning & Smart Design"
        subtitle="Our architects blend aesthetics with engineering. Watch as your floor plan comes to life with architectural lines and grid overlays."
      >
        <div className="mt-12 relative max-w-md mx-auto aspect-video border border-white/10 rounded-2xl overflow-hidden bg-zinc-900/85 p-8">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="w-full h-full border-2 border-amber-500/30 rounded-lg flex items-center justify-center">
            <PenTool className="text-amber-500 h-12 w-12 opacity-60" />
          </div>
          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-amber-500/60">SCALE 1:100</div>
        </div>
      </StorySection>

      {/* 4. CONSTRUCTION START */}
      <StorySection 
        index={3}
        bgImage="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=75&w=1000&auto=format&fit=crop"
        title="Strong Foundations, Quality Work"
        subtitle="The first brick is laid. Our structure rises with the strength of premium materials and the expertise of Delhi's finest craftsmen."
      >
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {['Concrete', 'Steel', 'Masonry', 'Finishing'].map((step, i) => (
            <div key={i} className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 text-center">
              <div className="text-amber-500 font-black text-xl mb-1 tabular-nums">0{i+1}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{step}</div>
            </div>
          ))}
        </div>
      </StorySection>

      {/* 5. FINAL DELIVERY */}
      <StorySection 
        index={4}
        bgImage="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=75&w=1000&auto=format&fit=crop"
        title="Delivered With Perfection"
        subtitle="The journey concludes as we hand over the keys to your masterpiece. A home built with trust, delivered with perfection."
      >
        <div className="mt-12">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-8 py-3 rounded-full text-sm font-black tracking-widest uppercase">
            Project Completed
          </Badge>
        </div>
      </StorySection>

      {/* PROJECT HIGHLIGHTS */}
      <section id="projects-section" className="py-16 md:py-32 px-4 bg-slate-950 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tighter uppercase">Project Highlights</h2>
            <div className="w-16 md:w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Luxury Villas', location: 'South Delhi', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=75&w=800&auto=format&fit=crop' },
              { title: 'Modern Apartments', location: 'Gurgaon', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=75&w=800&auto=format&fit=crop' },
              { title: 'Commercial Hubs', location: 'Noida', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=75&w=800&auto=format&fit=crop' },
            ].map((project, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -6 }}
                onClick={() => navigate('/services#projects')}
                className="group relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 cursor-pointer"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  loading="lazy" 
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-amber-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-2">{project.location}</p>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase">{project.title}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT GALLERY */}
      <ProjectGallery />

      {/* PRICING SECTION */}
      <div className="bg-black py-20">
        <ModernPricingPage 
          title={<>Transparent <span className="text-amber-500">Pricing Plans</span></>}
          subtitle="No hidden costs. No surprises. Just honest construction prices for your dream home."
          plans={pricingPlans}
          showAnimatedBackground={true}
          onSelectPlan={handleSelectPlan}
        />
      </div>

      {/* MAP SECTION */}
      <section className="py-16 md:py-32 px-4 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-4 md:mb-6 uppercase tracking-widest text-[10px] md:text-xs">Our Presence</Badge>
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8 tracking-tighter uppercase">Serving the Heart of India</h2>
            <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
              Headquartered in Muradnagar, Ghaziabad, we serve the entire National Capital Region (NCR). Our local expertise ensures we understand the unique architectural and regulatory landscape of the region.
            </p>
            <div className="space-y-4 md:space-y-6">
              {[
                { city: 'Muradnagar, Ghaziabad (HQ)', desc: 'T-Point, Asalat-Jalalpur, Near Primary School, UP 201206', href: 'https://share.google/v9vALRLmxbSHRD9mp' },
                { city: 'Delhi', desc: 'South, North, West & East Delhi' },
                { city: 'Gurgaon', desc: 'Premium Residential & Commercial' },
                { city: 'Noida', desc: 'Industrial & Modern Housing' },
              ].map((loc, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-zinc-900/80 border border-white/10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="text-amber-500 h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-white uppercase text-sm md:text-base">{loc.city}</h4>
                    <p className="text-slate-400 text-xs md:text-sm">{loc.desc}</p>
                  </div>
                  {loc.href && (
                    <a
                      href={loc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open Headquarters location in Google Maps"
                      className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-black transition-colors shrink-0"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
          <a
            href="https://share.google/v9vALRLmxbSHRD9mp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Headquarters — Muradnagar, Ghaziabad on Google Maps"
            className="group block relative aspect-square rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 hover:border-amber-500/40 transition-colors bg-slate-900 shadow-2xl mt-8 lg:mt-0"
          >
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,#d97706_0%,transparent_70%)]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-amber-500 shadow-[0_0_20px_rgba(217,119,6,0.8)]"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full border border-amber-500/15"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full border border-amber-500/10"></div>
              </div>
            </div>
            <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:right-12 flex items-end justify-between gap-4">
              <div>
                <div className="text-xl sm:text-2xl md:text-4xl font-black text-white uppercase leading-tight">Muradnagar, Ghaziabad</div>
                <div className="text-amber-500 font-bold tracking-widest text-[10px] md:text-xs uppercase mt-1">
                  Headquarters • View on Google Maps
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors shrink-0">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-16 md:py-32 px-4 bg-black overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#d97706_0%,transparent_50%)]"></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-6xl font-black text-white mb-8 md:mb-12 tracking-tighter uppercase leading-none">
            Start Your Dream<br />Project Today
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
            <a href="tel:+919997173549" className="w-full sm:w-auto">
              <RippleButton className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white h-14 md:h-20 px-8 md:px-16 rounded-full text-base md:text-xl font-black shadow-2xl shadow-amber-600/40 flex items-center justify-center gap-3">
                <Phone size={20} className="md:w-6 md:h-6" /> CALL US NOW
              </RippleButton>
            </a>
            <a href="https://wa.me/919997173549" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <RippleButton variant="hoverborder" hoverBorderEffectColor="#25D366" className="w-full sm:w-auto bg-zinc-900/90 hover:bg-zinc-800 text-white h-14 md:h-20 px-8 md:px-16 rounded-full text-base md:text-xl font-black flex items-center justify-center gap-3 border border-white/15">
                <MessageSquare size={20} className="md:w-6 md:h-6 text-[#25D366]" /> WHATSAPP
              </RippleButton>
            </a>
          </div>
          <p className="mt-8 md:mt-12 text-slate-500 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs">
            Architectural Consultation • Site Visit • Free Estimation
          </p>
        </div>
      </section>

      {/* BRAND EMBLEM */}
      <div className="py-20 border-t border-white/5 flex flex-col items-center justify-center bg-black">
        <img 
          src={logo} 
          alt="Vishwakarma Constructions Logo" 
          className="h-24 md:h-28 w-auto mb-8 object-contain bg-transparent"
          loading="lazy"
          decoding="async"
        />
        <div className="text-4xl md:text-7xl font-black text-white/10 tracking-tighter leading-none select-none">VISHWAKARMA</div>
        <div className="flex items-center gap-4 mt-6">
          <div className="h-px w-12 bg-amber-600/30"></div>
          <p className="text-amber-500/70 font-black tracking-[0.6em] uppercase text-[10px]">Excellence Since 2023</p>
          <div className="h-px w-12 bg-amber-600/30"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
