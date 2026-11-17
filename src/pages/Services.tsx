import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import industrialShedImg from '../assets/images/industrial_shed_1782625277514.jpg';
import educationalBlockImg from '../assets/images/educational_block_1782625291228.jpg';
import { 
  Building2, 
  Check, 
  ShieldCheck, 
  MapPin, 
  Play, 
  Factory, 
  GraduationCap, 
  ShoppingBag, 
  TrendingUp,
  X,
  Compass,
  Layers
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlowCard } from '../components/ui/spotlight-card';
import { CONSTRUCTION_PACKAGES } from '../constants';

const PORTFOLIO_PROJECTS = [
  { title: "Luxury Villa", location: "Raj Nagar Extension", type: "Residential", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=75&w=800&auto=format&fit=crop" },
  { title: "Modern Apartment", location: "Vasundhara", type: "Residential", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=75&w=800&auto=format&fit=crop" },
  { title: "Corporate Office", location: "Indirapuram", type: "Commercial", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=75&w=800&auto=format&fit=crop" },
  { title: "Educational Block", location: "Muradnagar", type: "Institutional", img: educationalBlockImg },
  { title: "Industrial Shed", location: "Loni", type: "Industrial", img: industrialShedImg },
  { title: "Boutique Hotel", location: "Ghaziabad", type: "Commercial", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=75&w=800&auto=format&fit=crop" }
];

const PROJECT_CATEGORIES = ['All', 'Residential', 'Commercial', 'Institutional', 'Industrial'] as const;

const Services: React.FC = () => {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('classic');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const navigate = useNavigate();

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) => p.type === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-black text-white">
      {/* Floor Plans Section */}
      <section id="floor-plans" className="pt-12 pb-24 bg-black overflow-hidden relative scroll-mt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,119,6,0.05),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-6 px-4 py-1">Expert Design</Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-8 leading-tight">Custom 2D & 3D Floor Plans</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Our architects use advanced software like Revit and AutoCAD to create precise floor plans that optimize space and follow Vastu principles.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Vastu Compliant", desc: "Every plan is reviewed for Vastu compliance to ensure positive energy flow." },
                  { title: "Space Optimization", desc: "We maximize usable area without compromising on ventilation or aesthetics." },
                  { title: "3D Walkthroughs", desc: "Experience your home before it's built with immersive 3D walkthroughs." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-200">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-black tracking-tight text-white mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div 
                onClick={() => setIsWalkthroughOpen(true)}
                className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group cursor-pointer"
              >
                <img 
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=75&w=900&auto=format&fit=crop" 
                  alt="3D Architectural Floor Plan" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button
                  type="button"
                  onClick={() => setIsWalkthroughOpen(true)}
                  aria-label="Open 3D Walkthrough Preview"
                  className="w-20 h-20 rounded-full bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform"
                >
                  <Play className="h-8 w-8 ml-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QASCON Section */}
      <section id="qascon" className="py-24 bg-slate-950 text-white overflow-hidden relative scroll-mt-28">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-600/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-6 px-4 py-1">Quality First</Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-tight">QASCON: Our Proprietary Quality Framework</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Quality Assessment for Construction (QASCON) is our patented framework for quality management. Every project is audited at 3 levels to ensure zero defects.
              </p>
              <div className="space-y-8">
                {[
                  { title: "3-Level Audit System", desc: "Site Team -> Project Manager -> Central Quality Audit Team." },
                  { title: "250+ Quality Checks", desc: "Mandatory, No-Go, and Critical checks performed on every site." },
                  { title: "Stage-Gate Process", desc: "Construction cannot proceed unless the current stage passes all No-Go checks." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 shrink-0 group-hover:border-amber-500/50 transition-colors">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black tracking-tight mb-2 text-white">{item.title}</h4>
                      <p className="text-slate-400 text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-amber-600/20 to-transparent p-1">
                <div className="w-full h-full rounded-[2.9rem] bg-black p-8 md:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <GlowCard customSize={true} className="p-6 rounded-2xl bg-white/5 border border-white/10" glowColor="orange">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm font-black tracking-tight text-amber-500">Structural Integrity</span>
                          <Badge className="bg-green-500/10 text-green-400 border-none">Passed</Badge>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-full"></div>
                        </div>
                      </div>
                    </GlowCard>
                    <GlowCard customSize={true} className="p-6 rounded-2xl bg-white/5 border border-white/10" glowColor="orange">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm font-black tracking-tight text-amber-500">Material Quality</span>
                          <Badge className="bg-green-500/10 text-green-400 border-none">Passed</Badge>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-full"></div>
                        </div>
                      </div>
                    </GlowCard>
                    <GlowCard customSize={true} className="p-6 rounded-2xl bg-white/5 border border-white/10" glowColor="orange">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm font-black tracking-tight text-amber-500">Finishing Audit</span>
                          <Badge className="bg-amber-500/10 text-amber-400 border-none">In Progress</Badge>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 w-[75%]"></div>
                        </div>
                      </div>
                    </GlowCard>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" className="py-24 bg-black overflow-hidden relative scroll-mt-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-4 px-4 py-1">Our Portfolio</Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">Recent Projects</h2>
              <p className="text-slate-400 font-medium">Explore our diverse range of residential and commercial projects delivered with excellence.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {PROJECT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                    activeCategory === category
                      ? 'bg-amber-500 text-black'
                      : 'bg-zinc-900 text-slate-300 border border-white/10 hover:border-amber-500/50 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <GlowCard 
                  customSize={true}
                  onClick={() => navigate('/comparison#estimator')}
                  className="group relative rounded-[2.5rem] overflow-hidden bg-zinc-900/80 border border-white/10 p-0 gap-0 hover:border-amber-500/30 transition-colors cursor-pointer"
                  glowColor="orange"
                >
                  <div className="flex flex-col h-full">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={project.img} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <Badge className="bg-amber-500/10 text-amber-500 border-none">{project.type}</Badge>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-black uppercase tracking-wider">
                          <MapPin className="h-3 w-3" /> {project.location}
                        </div>
                      </div>
                      <h4 className="text-xl font-black tracking-tight text-white mb-2">{project.title}</h4>
                      <p className="text-slate-400 text-sm font-medium">Delivered with premium finishes and structural integrity.</p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial & Industrial Expertise Section */}
      <section className="py-24 bg-slate-950 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(217,119,6,0.03),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900/85 border border-white/10 rounded-[3rem] p-8 md:p-20 text-white relative overflow-hidden group"
          >
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-6 px-4 py-1">Beyond Residential</Badge>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-tight">Commercial & Industrial Expertise</h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                  We provide comprehensive architectural and construction services for educational, industrial, and commercial projects. Our expertise ensures large-scale projects are delivered with the same precision as our homes.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { title: "Warehouses & Factories", icon: Factory },
                    { title: "Educational Institutions", icon: GraduationCap },
                    { title: "Retail & Office Spaces", icon: ShoppingBag },
                    { title: "Healthcare Facilities", icon: ShieldCheck }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover/item:bg-amber-500 group-hover/item:text-black transition-colors">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="font-bold text-sm text-slate-300 group-hover/item:text-white transition-colors">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[3rem] bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-500/30 transition-colors duration-500">
                  <Building2 className="h-32 w-32 text-amber-500/20 group-hover:text-amber-500/35 transition-colors duration-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-24 bg-black relative overflow-hidden scroll-mt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,119,6,0.05),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-4 px-4 py-1">Pricing Tiers</Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">Transparent Construction Packages</h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium">Select a package that aligns with your lifestyle. Every tier includes our core structural guarantee and project management.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {CONSTRUCTION_PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <GlowCard
                  customSize={true}
                  glowColor="orange"
                  className={`relative p-8 rounded-[2.5rem] border-2 transition-colors cursor-pointer group h-full ${
                    selectedPackageId === pkg.id 
                      ? 'border-amber-600 bg-zinc-900/95 shadow-2xl shadow-amber-600/20' 
                      : 'border-white/10 bg-zinc-900/75 hover:bg-zinc-900/90 hover:border-white/20 shadow-sm'
                  }`}
                  onClick={() => setSelectedPackageId(pkg.id)}
                >
                  <div className="flex flex-col h-full">
                    <AnimatePresence>
                      {selectedPackageId === pkg.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg z-20"
                        >
                          Recommended
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className={`w-14 h-14 ${pkg.color} rounded-2xl mb-8 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}>
                      <Building2 className="h-7 w-7" />
                    </div>
                    
                    <h3 className="text-2xl font-black tracking-tight text-white mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl font-black text-amber-500 tabular-nums">₹{pkg.pricePerSqft}</span>
                      <span className="text-slate-500 font-bold">/sqft</span>
                    </div>
                    
                    <p className="text-sm text-slate-400 mb-8 leading-relaxed font-medium">{pkg.description}</p>
                    
                    <div className="space-y-4 mb-10">
                      {pkg.features.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                            <Check className="h-3 w-3 text-amber-500" />
                          </div>
                          <span className="text-xs font-bold text-slate-300">{f}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant={selectedPackageId === pkg.id ? "default" : "outline"} 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackageId(pkg.id);
                        navigate(`/comparison?package=${encodeURIComponent(pkg.id)}#estimator`);
                      }}
                      className={`w-full h-12 rounded-2xl font-black tracking-tight transition-colors mt-auto ${
                        selectedPackageId === pkg.id 
                          ? 'bg-amber-600 hover:bg-amber-700 text-white border-none' 
                          : 'border-white/15 text-white hover:border-amber-500 hover:text-amber-400 bg-transparent'
                      }`}
                    >
                      {selectedPackageId === pkg.id ? "Calculate With This Plan" : "Select & Estimate"}
                    </Button>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Vishwakarma Advantage Section */}
      <section className="py-24 bg-slate-950 overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 rounded-[2.5rem] bg-zinc-900/80 border border-white/10 p-8 md:p-12 text-white relative overflow-hidden group"
            >
              <div className="relative z-10">
                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-6 px-4 py-1">Technology First</Badge>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">Digital Twin & BIM Integration</h3>
                <p className="text-slate-400 mb-8 max-w-lg font-medium">
                  We create a Digital Twin of your home before construction begins. Using BIM (Building Information Modeling), we identify structural clashes and design errors in the virtual world, ensuring zero rework on site.
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {['Revit', 'AutoCAD', '3ds Max', 'ETABS', 'STAAD Pro', 'SketchUp', 'ArchiCAD'].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black text-amber-500">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Building2 className="text-amber-500" />
                  </div>
                  <span className="font-black tracking-tight">Zero Design Errors Guaranteed</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-600/10 to-transparent pointer-events-none"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              <GlowCard customSize={true} className="rounded-[2.5rem] bg-zinc-900/80 border border-white/10 p-8 flex flex-col justify-between group hover:border-amber-500/30 transition-colors h-full" glowColor="orange">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black tracking-tight text-white mb-2">Escrow Protection</h4>
                    <p className="text-sm text-slate-400 font-medium">Your money is safe. Payments are released only after milestone approval.</p>
                  </div>
                </div>
              </GlowCard>
              
              <GlowCard customSize={true} className="rounded-[2.5rem] bg-zinc-900/80 border border-white/10 p-8 flex flex-col justify-between group hover:border-amber-500/30 transition-colors h-full" glowColor="orange">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black tracking-tight text-white mb-2">250+ Quality Checks</h4>
                    <p className="text-sm text-slate-400 font-medium">Rigorous QASCON framework ensuring structural integrity at every stage.</p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <GlowCard customSize={true} className="rounded-[2.5rem] bg-zinc-900/80 border border-white/10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-amber-500/30 transition-colors" glowColor="orange">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
                  <div className="max-w-xl text-center md:text-left">
                    <h3 className="text-3xl font-black tracking-tight text-white mb-4">Absolute Transparency - 10+ Apps</h3>
                    <p className="text-slate-400 font-medium">
                      We use 10+ iOS and Android apps and an advanced Project Management System for efficient management and minimal human errors. Get 360° images/videos and real-time updates on our Customer App.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Project Progress</div>
                      <div className="text-2xl font-black text-amber-500 tabular-nums">74%</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Quality Score</div>
                      <div className="text-2xl font-black text-green-500 tabular-nums">9.8/10</div>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3D Floor Plan & Walkthrough Modal */}
      <AnimatePresence>
        {isWalkthroughOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/85 flex items-center justify-center p-4"
            onClick={() => setIsWalkthroughOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full bg-zinc-900 border border-white/15 rounded-3xl p-6 md:p-8 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">BIM & Revit Preview</span>
                  <h3 className="text-2xl font-black tracking-tight text-white">3D Architectural Walkthrough</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsWalkthroughOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black">
                <img
                  src="https://images.unsplash.com/photo-1600607687940-47a04b629753?q=75&w=1000&auto=format&fit=crop"
                  alt="3D Interior & Structural BIM Model"
                  className="w-full h-full object-cover opacity-80"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <div className="grid grid-cols-3 gap-3 text-left">
                    <div className="bg-zinc-900/90 border border-white/10 rounded-xl p-3">
                      <Compass className="w-4 h-4 text-amber-500 mb-1" />
                      <div className="text-xs font-bold text-white">100% Vastu</div>
                      <div className="text-[10px] text-slate-400">Directional Grid</div>
                    </div>
                    <div className="bg-zinc-900/90 border border-white/10 rounded-xl p-3">
                      <Layers className="w-4 h-4 text-amber-500 mb-1" />
                      <div className="text-xs font-bold text-white">BIM Clash-Free</div>
                      <div className="text-[10px] text-slate-400">MEP & Structural</div>
                    </div>
                    <div className="bg-zinc-900/90 border border-white/10 rounded-xl p-3">
                      <ShieldCheck className="w-4 h-4 text-amber-500 mb-1" />
                      <div className="text-xs font-bold text-white">IS-456 Seismic</div>
                      <div className="text-[10px] text-slate-400">Zone IV Compliant</div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Every Vishwakarma project includes custom 2D working drawings, 3D exterior elevations, and an interactive virtual walkthrough before foundation excavation begins.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => {
                    setIsWalkthroughOpen(false);
                    navigate('/comparison#estimator');
                  }}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl h-12"
                >
                  Estimate Construction Cost
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsWalkthroughOpen(false)}
                  className="border-white/15 text-white hover:bg-white/10 rounded-xl h-12"
                >
                  Close Preview
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
