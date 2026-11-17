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
  HardHat,
  Users,
  Star,
  Package,
  Layers,
  Square,
  Waves,
  Grid,
  Droplets,
  Zap,
  Paintbrush,
  Info
} from 'lucide-react';

export const ICON_MAP: Record<string, any> = {
  Package,
  Layers,
  Square,
  Waves,
  Grid,
  Droplets,
  Zap,
  Paintbrush,
  Info
};

export const CONSTRUCTION_PACKAGES = [
  {
    id: 'basic',
    name: 'Basic',
    pricePerSqft: 1790,
    description: 'Essential construction with quality standard materials.',
    color: 'bg-slate-500',
    features: ['Rathi Steel', '1.5ft Foundation', 'Shree/Ambuja Cement', 'Standard Red Bricks']
  },
  {
    id: 'classic',
    name: 'Classic',
    pricePerSqft: 2290,
    description: 'Enhanced specifications for a more premium feel.',
    color: 'bg-amber-500',
    features: ['JSW Neosteel', '2ft Foundation', 'Ultratech Cement', '9" Outer Walls']
  },
  {
    id: 'premium',
    name: 'Premium',
    pricePerSqft: 2990,
    description: 'High-end materials and superior finishing.',
    color: 'bg-cyan-600',
    features: ['TATA/SAIL Steel', '2.5ft Foundation', 'ACC/Wonder Cement', 'Premium Electricals']
  },
  {
    id: 'royale',
    name: 'Royale',
    pricePerSqft: 3750,
    description: 'The ultimate luxury construction experience.',
    color: 'bg-teal-600',
    features: ['TATA/JSW Steel', 'Deep Foundation', 'Top-tier Cement', 'Designer Finishes']
  }
];

export const PACKAGE_COMPARISON = [
  {
    category: "Structure",
    items: [
      { feature: "Steel (Fe 550)", basic: "Rathi", classic: "JSW Neosteel", premium: "TATA / JSW / SAIL", royale: "TATA / JSW / SAIL" },
      { feature: "Foundation", basic: "Upto 1.5ft", classic: "Upto 2ft", premium: "Upto 2.5ft", royale: "Upto 2.5ft" },
      { feature: "Cement", basic: "Shree / Ambuja", classic: "Ambuja / Birla", premium: "ACC / Ultratech", royale: "ACC / Wonder" },
      { feature: "Block work", basic: "4\" Red Brick", classic: "9\" Outer Brick", premium: "9\" Outer Brick", royale: "9\" Outer Brick" }
    ]
  },
  {
    category: "Finishing",
    items: [
      { feature: "Flooring", basic: "Standard Tiles", classic: "Premium Vitrified", premium: "Italian Marble Look", royale: "Imported Marble" },
      { feature: "Electrical", basic: "Anchor", classic: "Havells", premium: "Legrand", royale: "Schneider / Premium" },
      { feature: "Plumbing", basic: "Supreme", classic: "Astral", premium: "Kohler / Jaquar", royale: "Grohe / Toto" }
    ]
  }
];

export const TEAM = [
  { name: "Arun Sain", role: "Co-Founder & CEO" },
  { name: "Deepak Kumar", role: "Chief Architect" },
  { name: "Sanjay Sharma", role: "Project Director" },
  { name: "Vikram Singh", role: "Quality Head" },
  { name: "Rahul Verma", role: "Site Engineer" }
];

export const TESTIMONIALS = [
  { name: "Amit Tyagi", text: "Vishwakarma Constructions transformed our vision into a beautiful reality. Their transparency and quality are unmatched." },
  { name: "Priya Sharma", text: "The QASCON framework gave us peace of mind. We knew exactly what was happening at every stage of construction." },
  { name: "Rajesh Gupta", text: "On-time delivery and zero cost overrun. They are truly the most professional builders in Ghaziabad." }
];

export const CONTRACTORS = [
  {
    name: "Vishwakarma Constructions",
    rating: 4.9,
    projects: 1000,
    location: "Ghaziabad, UP",
    specialty: "Full-Stack Construction"
  }
];

export const MATERIAL_BREAKDOWN_PERCENTAGES = [
  { name: 'Cement', percentage: 16, color: '#d97706', icon: 'Package' },
  { name: 'Steel', percentage: 14, color: '#0f172a', icon: 'Layers' },
  { name: 'Sand', percentage: 8, color: '#94a3b8', icon: 'Waves' },
  { name: 'Aggregate', percentage: 7, color: '#64748b', icon: 'Grid' },
  { name: 'Bricks', percentage: 10, color: '#b91c1c', icon: 'Square' },
  { name: 'Flooring', percentage: 12, color: '#0891b2', icon: 'Paintbrush' },
  { name: 'Electrical', percentage: 8, color: '#0d9488', icon: 'Zap' },
  { name: 'Plumbing', percentage: 8, color: '#2563eb', icon: 'Droplets' },
  { name: 'Labor', percentage: 17, color: '#475569', icon: 'Users' }
];
