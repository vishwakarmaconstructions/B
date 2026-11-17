import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Star, 
  ShieldCheck, 
  HardHat, 
  MapPin, 
  Building2,
  Phone,
  Mail
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RippleButton } from '../components/ui/multi-type-ripple-buttons';
import { TEAM, TESTIMONIALS, CONTRACTORS } from '../constants';

const About: React.FC = () => {
  return (
    <div className="bg-black text-white">
      {/* About & Director Message Section */}
      <section className="pt-12 pb-24 bg-black overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(217,119,6,0.05),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-6 px-4 py-1">About Us</Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-8">Inspired by Lord Vishwakarma</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Inspired by Lord Vishwakarma, the divine architect, our firm is built on the principles of Creation, Precision, and Integrity. We are a unified team of architects, civil engineers, and skilled contractors dedicated to transforming empty plots into thriving spaces.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {[
                  { label: "Homes Built", val: "1000+" },
                  { label: "Sq. Ft Delivered", val: "5MN+" },
                  { label: "Quality Checks", val: "250+" },
                  { label: "Money Safety", val: "100%" },
                  { label: "Delays", val: "Zero" },
                  { label: "Warranty", val: "10yr" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-black text-amber-500 mb-1">{stat.val}</div>
                    <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-zinc-900/85 border border-white/10 rounded-[3rem] p-12 text-white relative overflow-hidden group"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-black tracking-tight mb-6 text-amber-500">Director's Message</h3>
                <p className="text-slate-300 italic mb-8 leading-relaxed text-lg">
                  "Welcome to Vishwakarma Constructions. Our mission is simple: to transform your vision into a tangible reality through superior craftsmanship and innovative design. We take immense pride in our attention to detail and our ability to tackle complex challenges with creative solutions."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                    <HardHat className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-black text-white">Arun Sain</div>
                    <div className="text-xs text-amber-600 font-bold uppercase tracking-widest">Co-Founder & CEO</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-amber-500/10 transition-colors duration-700"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vishwakarma Profile Section */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-4 px-4 py-1">The Vishwakarma Standard</Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">Your Trusted Construction Partner</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We take full ownership of your project, from the first brick to the final coat of paint.</p>
          </div>

          <div className="grid md:grid-cols-1 max-w-2xl mx-auto">
            {CONTRACTORS.map((contractor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="group bg-zinc-900/85 border-white/10 hover:border-amber-500/30 transition-colors shadow-2xl overflow-hidden rounded-[2rem]">
                  <div className="h-2 w-full bg-amber-600/50 group-hover:bg-amber-600 transition-colors"></div>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500">
                        <HardHat className="h-10 w-10" />
                      </div>
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" /> ISO Certified
                      </Badge>
                    </div>
                    <CardTitle className="text-3xl font-black tracking-tight text-white">{contractor.name}</CardTitle>
                    <div className="flex items-center gap-2 text-amber-500 mt-2">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="text-lg font-black text-white">{contractor.rating}</span>
                      <span className="text-slate-500 text-sm font-bold">({contractor.projects}+ Successful Projects)</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 mb-8">
                      <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                        <MapPin className="h-4 w-4 text-amber-500" /> {contractor.location}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                        <Building2 className="h-4 w-4 text-amber-500" /> {contractor.specialty}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Executing at Scale Section */}
      <section className="py-24 bg-black text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(217,119,6,0.05),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-6 px-4 py-1">Our Reach</Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-tight">Executing at Scale Across India</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                With a presence in over 130+ cities, we are delivering excellence at an unprecedented scale. Our team of 80+ professionals ensures every project meets the Vishwakarma standard.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "Area Delivered", val: "5MN+ Sqft" },
                  { label: "Active Projects", val: "100+" },
                  { label: "Professionals", val: "80+" },
                  { label: "Cities Covered", val: "130+" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-black text-amber-500 mb-1">{stat.val}</div>
                    <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex flex-wrap gap-3">
                {['Delhi', 'Noida', 'Gurgaon', 'Ghaziabad', 'Faridabad', 'Meerut', 'Hapur'].map((city) => (
                  <span key={city} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300">
                    {city}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, rotate: 5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video rounded-[3rem] bg-zinc-900/85 border border-white/10 flex items-center justify-center overflow-hidden group relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.18),transparent_65%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                <div className="relative z-10 text-center">
                  <MapPin className="h-16 w-16 text-amber-500 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <div className="text-xl font-black tracking-tight text-white">Pan-India Presence</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mt-1">130+ Cities Across NCR & North India</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-white/5 text-slate-400 border-white/10 mb-4 px-4 py-1">The Experts</Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {TEAM.map((member, i) => (
              <motion.div 
                key={i} 
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-500 group-hover:border-amber-500/50 group-hover:text-amber-500 transition-colors duration-300">
                  <Users className="h-10 w-10" />
                </div>
                <div className="font-black text-white tracking-tight">{member.name}</div>
                <div className="text-xs text-amber-500 font-bold uppercase tracking-widest mt-1">{member.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.03),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-4 px-4 py-1">Client Stories</Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="bg-zinc-900/85 border-white/10 shadow-2xl hover:border-amber-500/30 transition-colors rounded-3xl h-full group">
                  <CardContent className="pt-10">
                    <div className="flex gap-1 text-amber-500 mb-6">
                      {[...Array(5)].map((_, idx) => <Star key={idx} className="h-4 w-4 fill-current" />)}
                    </div>
                    <p className="text-slate-300 italic mb-8 leading-relaxed font-medium">"{t.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors">
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="font-black text-white tracking-tight">{t.name}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-4 px-4 py-1">Get In Touch</Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">Build Your Masterpiece</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8 text-center">Direct Contact Channels</h3>
            <div className="grid gap-4">
              {[
                { icon: Phone, title: 'Call Us', content: '+91 99971 73549', sub: '+91 80065 12858', color: 'text-amber-500', href: 'tel:+919997173549' },
                { icon: Mail, title: 'Email Us', content: 'vishwakarmaconstructions2023@gmail.com', sub: 'Official Inquiry Channel', color: 'text-amber-500', href: 'mailto:vishwakarmaconstructions2023@gmail.com' },
                { icon: MapPin, title: 'Visit Us', content: 'Murad Nagar, Ghaziabad', sub: 'Near Jalalpur Primary School, Asalatnagar Road, UP 201206', color: 'text-amber-500', href: '#footer-contact' },
              ].map((item, i) => (
                <a key={i} href={item.href} className="block">
                  <Card className="bg-zinc-900/85 border-white/10 hover:border-amber-500/40 hover:bg-zinc-900 transition-colors group rounded-3xl overflow-hidden">
                    <CardContent className="p-6 flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</h4>
                        <p className="text-white font-black text-lg tracking-tight group-hover:text-amber-400 transition-colors">{item.content}</p>
                        <p className="text-slate-400 text-xs font-medium">{item.sub}</p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
