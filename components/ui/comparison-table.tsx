"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Check, X, Search, Info, Phone, ArrowRight } from "lucide-react"

type PackageKey = 'basic' | 'classic' | 'premium' | 'royale';

interface SpecRow {
  name: string;
  basic: string;
  classic: string;
  premium: string;
  royale: string;
}

interface SpecGroup {
  category: string;
  specs: SpecRow[];
}

const constructionData: SpecGroup[] = [
  {
    category: "STRUCTURE",
    specs: [
      { name: "Steel (Fe 5500)", basic: "Rathi", classic: "JSW Neosteel/ Steel Max", premium: "TATA / JSW Neosteel / SAIL / Vizag", royale: "TATA / JSW Neosteel / SAIL / Vizag" },
      { name: "Foundation", basic: "Upto 1.5 ft above/below 5 ft from Road", classic: "Upto 2 ft above/below 6 ft from Road", premium: "Upto 2.5 ft above/below 7 ft from Road", royale: "Upto 2.5 ft above/below 7 ft from Road" },
      { name: "Cement", basic: "Shree / Ambuja / JK / Birla", classic: "Ambuja / JK / Birla/ Ultratech", premium: "ACC / Ultratech / Wonder/ equivalent", royale: "ACC /Wonder/ Ultratech / equivalent" },
      { name: "Aggregates (20mm & 40mm)", basic: "Yes", classic: "Yes", premium: "Yes", royale: "Yes" },
      { name: "Block work", basic: "4\" (outer), 4\" (inner) - Red brick", classic: "9\" (outer), 4\" (inner) - Standard Red Brick", premium: "9\" (outer), 4\" (inner) - Standard Red Brick", royale: "9\" (outer), 4\" (inner) - Standard Red Brick" },
      { name: "Floor to Floor height", basic: "10 ft", classic: "10 ft", premium: "10 ft", royale: "10 ft" },
    ]
  },
  {
    category: "KITCHEN",
    specs: [
      { name: "Ceramic Wall Dado", basic: "Upto ₹40 per sqft", classic: "Upto ₹60 per sqft", premium: "Upto ₹80 per sqft", royale: "Upto ₹90 per sqft" },
      { name: "Sink", basic: "Upto ₹2000 (Single bowl SS)", classic: "Upto ₹5000 (Single bowl SS)", premium: "Upto ₹8000 (Futura, Carysil)", royale: "Upto ₹8000 (Futura, Carysil)" },
      { name: "Sink Faucet", basic: "Upto ₹1300", classic: "Upto ₹2000", premium: "Upto ₹3500", royale: "Upto ₹3500" },
      { name: "Sink Accessories", basic: "ISI Marked", classic: "Parryware / Hindware", premium: "Parryware / Hindware / Jaquar", royale: "Parryware / Hindware / Jaquar" },
      { name: "Modular Kitchen", basic: "No", classic: "No", premium: "Upto 50k to 100k Finishing", royale: "Upto 100k to 200k Finishing" },
    ]
  },
  {
    category: "BATHROOM",
    specs: [
      { name: "Ceramic Wall Dado", basic: "Upto ₹25 per sqft", classic: "Upto ₹50 per sqft", premium: "Upto ₹80 per sqft", royale: "Upto ₹90 per sqft" },
      { name: "Bathroom Doors", basic: "Waterproof flush doors/WPC", classic: "Waterproof flush doors/WPC", premium: "Waterproof flush doors/WPC", royale: "Waterproof flush doors/WPC" },
      { name: "Solar Water Heater Provision", basic: "No", classic: "No", premium: "Yes", royale: "Yes" },
      { name: "Bathroom Accessories", basic: "No", classic: "No", premium: "Mirror, Soap Dish, Towel rail (₹7k/1000sqft)", royale: "Mirror, Soap Dish, Towel rail (₹9k/1000sqft)" },
      { name: "Taps", basic: "Prestige/Cera or Eq.", classic: "Cera/Parryware or Eq.", premium: "Hindware or Eq.", royale: "Jaquar or Eq." },
      { name: "Toilet Seat", basic: "Upto 3k", classic: "Upto 8k", premium: "Upto 15k", royale: "Upto 30k" },
      { name: "Drainage Pipes", basic: "Kishan or Eq.", classic: "Tirupati or Eq.", premium: "Tirupati Supreme or Eq.", royale: "Tirupati Supreme or Eq." },
      { name: "Fitting Pipes", basic: "Paras or Eq.", classic: "Vectus or Eq.", premium: "Ashirwad or Eq.", royale: "Apollo or Eq." },
    ]
  },
  {
    category: "DOORS AND WINDOWS",
    specs: [
      { name: "Main Door", basic: "MS Door (upto 20k)", classic: "MS Door (upto 50k)", premium: "SS 304 (upto 80k)", royale: "SS 304 (upto 140k)" },
      { name: "Internal Doors", basic: "Wooden Veener (MS Sambhav) upto 15k", classic: "Wooden Veener (MS Appolo) upto 20k", premium: "Wooden Teak (Teak Frame) upto 25k", royale: "Wooden Teak (Teak Frame) upto 30k" },
      { name: "Windows (Frame + Panel)", basic: "MS Sambhav + Chap Wood", classic: "MS Appolo + Chap wood", premium: "Teak Frame (₹500/sqft) + Teak Panel", royale: "Teak Frame (₹1000/sqft) + Teak Panel" },
      { name: "Puja Room Door", basic: "No", classic: "No", premium: "Teak Shutter/Frame (₹20k/2000sqft)", royale: "Teak Shutter/Frame (₹24k/2000sqft)" },
    ]
  },
  {
    category: "PAINTING AND POP",
    specs: [
      { name: "Interior Painting", basic: "Tractor Emulsion", classic: "Tractor Shyne Emulsion", premium: "Apcolite Premium Emulsion", royale: "Royale Luxury Emulsion" },
      { name: "Exterior Painting", basic: "ACE Exterior Emulsion", classic: "Apex Exterior Emulsion", premium: "Apex Exterior Emulsion", royale: "Apex Ultima Exterior Emulsion" },
      { name: "POP", basic: "Plus minus POP", classic: "PVC False ceiling", premium: "POP/PVC upto 100/sqft", royale: "POP/PVC upto 100/sqft" },
    ]
  },
  {
    category: "FLOORING",
    specs: [
      { name: "Living & Dining", basic: "Tiles upto ₹35/sqft", classic: "Tiles upto ₹60/sqft", premium: "Tiles/Granite/Marble upto ₹140/sqft", royale: "Tiles/Granite/Marble upto ₹160/sqft" },
      { name: "Rooms & Kitchen", basic: "Tiles upto ₹35/sqft", classic: "Tiles upto ₹60/sqft", premium: "Tiles/Granite upto ₹140/sqft", royale: "Tiles/Granite/Marble upto ₹160/sqft" },
      { name: "Balcony (Anti-skid)", basic: "Tiles ₹40/sqft", classic: "Tiles ₹60/sqft", premium: "Tiles ₹80/sqft", royale: "Tiles ₹90/sqft" },
      { name: "Staircase", basic: "Granite (₹50/sqft)", classic: "Granite (₹80/sqft)", premium: "Granite (₹110/sqft)", royale: "Granite (₹140/sqft)" },
      { name: "Parking", basic: "Granite (₹50/sqft)", classic: "Granite (₹80/sqft)", premium: "Granite (₹110/sqft)", royale: "Granite (₹140/sqft)" },
    ]
  },
  {
    category: "WIRING",
    specs: [
      { name: "Fireproof Wiring", basic: "Finolex / Rajdhani", classic: "Finolex / Anchor / Havells", premium: "Finolex / Anchor / Havells", royale: "Finolex / Polycab / Havells" },
      { name: "Switch", basic: "Hosper/Anchor", classic: "GM Modular / Havells", premium: "Legrand mylinc / Havells Coral", royale: "Schneider unica pure / legrand myrius" },
      { name: "Socket", basic: "Hosper/Anchor", classic: "GM Modular / Havells", premium: "Legrand mylinc / Havells Coral", royale: "Schneider unica pure / legrand myrius" },
      { name: "AC Wiring", basic: "No", classic: "Yes", premium: "Yes", royale: "Yes" },
      { name: "EV Charging Point", basic: "No", classic: "No", premium: "No", royale: "Yes" },
    ]
  },
  {
    category: "OTHERS",
    specs: [
      { name: "Overhead Tank", basic: "750L Spiral", classic: "1000L Spiral", premium: "1500L Sintex/Apollo", royale: "2000L Sintex/Apollo" },
      { name: "Staircase Railing", basic: "MS Railing", classic: "SS 204 Railing", premium: "SS 304 Railing", royale: "SS 304 Railing with glass" },
      { name: "Wardrobe", basic: "No", classic: "No", premium: "Upto 50k", royale: "Upto 80k" },
      { name: "TV Panel", basic: "No", classic: "No", premium: "Upto 40k", royale: "Upto 80k" },
      { name: "Gypsum POP Punning", basic: "No", classic: "No", premium: "Yes", royale: "Yes" },
      { name: "Submersible Boring", basic: "180 ft", classic: "180 ft", premium: "220 ft", royale: "220 ft" },
    ]
  }
];

const packages = [
  { key: 'basic' as PackageKey, name: "Basic", price: "₹1790", color: "bg-slate-100 text-slate-700" },
  { key: 'classic' as PackageKey, name: "Classic", price: "₹2290", color: "bg-blue-100 text-blue-700" },
  { key: 'premium' as PackageKey, name: "Premium", price: "₹2990", color: "bg-amber-100 text-amber-700" },
  { key: 'royale' as PackageKey, name: "Royale", price: "₹3750", color: "bg-purple-100 text-purple-700" },
];

export default function ComparisonTable() {
  const [search, setSearch] = React.useState("");
  const [highlightDifferences, setHighlightDifferences] = React.useState(false);
  const [visiblePackages, setVisiblePackages] = React.useState<PackageKey[]>(['basic', 'classic', 'premium', 'royale']);

  const togglePackage = (key: PackageKey) => {
    setVisiblePackages(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key) 
        : [...prev, key].sort((a, b) => {
            const order = ['basic', 'classic', 'premium', 'royale'];
            return order.indexOf(a) - order.indexOf(b);
          })
    );
  };

  const filteredData = React.useMemo(() => {
    return constructionData.map(group => ({
      ...group,
      specs: group.specs.filter(spec => 
        spec.name.toLowerCase().includes(search.toLowerCase()) ||
        group.category.toLowerCase().includes(search.toLowerCase())
      )
    })).filter(group => group.specs.length > 0);
  }, [search]);

  const isDifferent = React.useCallback((spec: SpecRow) => {
    const values = visiblePackages.map(k => spec[k]);
    return new Set(values).size > 1;
  }, [visiblePackages]);

  return (
    <div className="space-y-8">
      {/* Branding Header */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-3xl font-black tracking-tighter mb-2 text-white uppercase">Vishwakarma Constructions</h2>
            <p className="text-slate-400 flex items-center gap-2 font-bold">
              <Phone className="h-4 w-4 text-amber-500" /> +91 99971 73549 | Ghaziabad
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Projects', 'Plans', 'Estimator', 'Commercial'].map(item => (
              <Badge key={item} className="bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500/20 cursor-pointer uppercase tracking-widest font-black text-[10px] px-3 py-1">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Card className="border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="border-b border-white/10 bg-black/40 sticky top-0 z-20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <CardTitle className="text-2xl font-black text-white tracking-tight uppercase">Package Comparison</CardTitle>
              <CardDescription className="text-slate-400 font-medium">Compare our construction packages side-by-side</CardDescription>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-grow lg:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Search specifications..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 w-full lg:w-64 bg-white/5 border-white/10 text-white focus:border-amber-500 transition-all rounded-xl"
                />
              </div>
              
              <Button 
                variant={highlightDifferences ? "default" : "outline"}
                onClick={() => setHighlightDifferences(!highlightDifferences)}
                className={cn(
                  "transition-all rounded-xl font-bold uppercase tracking-widest text-[10px] h-10",
                  highlightDifferences ? "bg-amber-500 text-black hover:bg-amber-400" : "border-white/10 text-white hover:bg-white/5"
                )}
              >
                {highlightDifferences ? "Showing Differences" : "Highlight Differences"}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {packages.map(pkg => (
              <button
                key={pkg.key}
                onClick={() => togglePackage(pkg.key)}
                className={cn(
                  "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border flex items-center gap-2",
                  visiblePackages.includes(pkg.key) 
                    ? `bg-amber-500 border-transparent text-black ring-2 ring-offset-2 ring-amber-500/20 ring-offset-black` 
                    : "bg-white/5 border-white/10 text-slate-500 hover:border-white/20"
                )}
              >
                {visiblePackages.includes(pkg.key) ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                {pkg.name} ({pkg.price})
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="hover:bg-transparent border-b border-white/10">
                  <TableHead className="w-[250px] font-black text-slate-400 py-6 uppercase tracking-widest text-[10px]">Specification</TableHead>
                  {packages.filter(p => visiblePackages.includes(p.key)).map(pkg => (
                    <TableHead key={pkg.key} className="min-w-[200px] py-6">
                      <div className="flex flex-col">
                        <span className="text-white font-black text-lg uppercase tracking-tight">{pkg.name}</span>
                        <span className="text-amber-500 font-bold text-sm tracking-widest">{pkg.price} / sqft</span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((group) => (
                  <React.Fragment key={group.category}>
                    <TableRow className="bg-white/5 hover:bg-white/5 border-white/5">
                      <TableCell 
                        colSpan={visiblePackages.length + 1} 
                        className="py-4 px-6 font-black text-amber-500/50 tracking-[0.3em] text-[10px] uppercase"
                      >
                        {group.category}
                      </TableCell>
                    </TableRow>
                    {group.specs.map((spec, idx) => {
                      const different = isDifferent(spec);
                      if (highlightDifferences && !different) return null;

                      return (
                        <TableRow 
                          key={idx} 
                          className={cn(
                            "transition-colors group border-white/5",
                            different && highlightDifferences ? "bg-amber-500/5" : "hover:bg-white/5"
                          )}
                        >
                          <TableCell className="font-bold text-slate-300 py-5 px-6 border-r border-white/5 group-hover:text-white transition-colors">
                            {spec.name}
                          </TableCell>
                          {visiblePackages.map(pkgKey => (
                            <TableCell 
                              key={pkgKey} 
                              className={cn(
                                "py-5 px-6 text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors",
                                different && "text-slate-300"
                              )}
                            >
                              {spec[pkgKey] === "Yes" ? (
                                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 border-none uppercase tracking-widest font-black text-[10px]">Available</Badge>
                              ) : spec[pkgKey] === "No" ? (
                                <span className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Not Included</span>
                              ) : (
                                spec[pkgKey]
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="bg-amber-500 rounded-[2.5rem] p-10 text-black flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-amber-500/20 group overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-2 tracking-tighter uppercase">Ready to start your dream project?</h3>
          <p className="text-black/70 font-bold">Get a detailed quote based on your specific requirements today.</p>
        </div>
        <Button size="lg" className="relative z-10 bg-black text-white hover:bg-slate-900 rounded-full font-black uppercase tracking-widest text-xs px-10 h-14 shadow-xl">
          Contact Us Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-black/5 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
      </div>
    </div>
  )
}
