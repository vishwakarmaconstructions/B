import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ComparisonTable from "@/components/ui/comparison-table";
import { 
  Calculator,
  Info,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSliderWithInput } from '../hooks/use-slider-with-input';
import { CONSTRUCTION_PACKAGES, MATERIAL_BREAKDOWN_PERCENTAGES, ICON_MAP } from '../constants';

export default function ComparisonDemo() {
  const [searchParams] = useSearchParams();
  const [selectedPackageId, setSelectedPackageId] = useState<string>('classic');
  const [floors, setFloors] = useState<number>(1);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    const pkgParam = searchParams.get('package')?.toLowerCase();
    if (pkgParam && CONSTRUCTION_PACKAGES.some((p) => p.id === pkgParam)) {
      setSelectedPackageId(pkgParam);
    }
  }, [searchParams]);

  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
    resetToDefault,
  } = useSliderWithInput({ 
    minValue: 100, 
    maxValue: 10000, 
    initialValue: [1000], 
    defaultValue: [1000] 
  });

  const plotSize = sliderValue[0];
  const plotSizeInput = inputValues[0];

  const selectedPackage = useMemo(() => 
    CONSTRUCTION_PACKAGES.find(p => p.id === selectedPackageId) || CONSTRUCTION_PACKAGES[1]
  , [selectedPackageId]);

  const totalArea = plotSize * floors;
  const totalEstimate = totalArea * selectedPackage.pricePerSqft;

  const materialBreakdown = useMemo(() => {
    return MATERIAL_BREAKDOWN_PERCENTAGES.map(item => ({
      ...item,
      cost: (totalEstimate * item.percentage) / 100
    }));
  }, [totalEstimate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleDownloadSpecification = () => {
    const lines = [
      '==============================================================',
      '               VISHWAKARMA CONSTRUCTIONS                      ',
      '        DETAILED PACKAGE SPECIFICATION & COST ESTIMATE        ',
      '==============================================================',
      '',
      `Selected Package : ${selectedPackage.name} (₹${selectedPackage.pricePerSqft}/sq.ft.)`,
      `Package Overview : ${selectedPackage.description}`,
      `Plot Area        : ${plotSize} sq. ft.`,
      `Number of Floors : ${floors} (${totalArea} sq. ft. Total Built-up Area)`,
      `Total Estimated  : ${formatCurrency(totalEstimate)}`,
      '',
      '--------------------------------------------------------------',
      'INCLUDED SPECIFICATIONS:',
      '--------------------------------------------------------------',
      ...selectedPackage.features.map((f, idx) => `${idx + 1}. ${f}`),
      '',
      '--------------------------------------------------------------',
      'ESTIMATED MATERIAL & STAGE BREAKDOWN:',
      '--------------------------------------------------------------',
      ...materialBreakdown.map(
        (m) => `• ${m.name.padEnd(28, ' ')} (${String(m.percentage).padStart(2, ' ')}%) : ${formatCurrency(m.cost)}`
      ),
      '',
      '--------------------------------------------------------------',
      'Contact Us: +91 99971 73549 | +91 80065 12858',
      'Email     : vishwakarmaconstructions2023@gmail.com',
      'Address   : Murad Nagar, Ghaziabad, UP 201206',
      '==============================================================',
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vishwakarma-${selectedPackage.name}-Specification.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="pb-20 pt-8 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-4 px-4 py-1 uppercase tracking-widest font-black text-[10px]">Showcase</Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">Component Showcase</h1>
          <p className="text-slate-400 font-medium">Explore our interactive comparison table and cost estimation tools.</p>
        </div>
        
        <div className="space-y-24">
          <section>
            <div className="text-center mb-12">
              <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-4 px-4 py-1 uppercase tracking-widest font-black text-[10px]">Comparison Table</Badge>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">Feature Comparison</h2>
            </div>
            <div className="bg-zinc-900/85 border border-white/10 rounded-[2.5rem] overflow-hidden p-1 shadow-2xl">
              <ComparisonTable />
            </div>
          </section>

          {/* Estimator Section */}
          <section id="estimator" className="scroll-mt-28">
            <div className="text-center mb-16">
              <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-4 px-4 py-1 uppercase tracking-widest font-black text-[10px]">Cost Estimator</Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">Calculate Your Construction Cost</h2>
              <p className="text-slate-400 max-w-2xl mx-auto font-medium">Get an instant estimate for your dream project based on your requirements.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-8">
                <Card className="bg-zinc-900/85 border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white font-black tracking-tight">
                      <Calculator className="h-5 w-5 text-amber-500" />
                      Project Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="plot-size" className="text-base font-bold text-slate-300">Plot Size (sq. ft.)</Label>
                        <div className="flex items-center gap-2">
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="size-8 text-slate-500 hover:text-amber-500 hover:bg-white/5"
                                  aria-label="Reset"
                                  onClick={resetToDefault}
                                >
                                  <RotateCcw size={16} strokeWidth={2} aria-hidden="true" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="px-2 py-1 text-xs bg-slate-900 border-white/10 text-white">Reset to default</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <Input 
                            type="text" 
                            inputMode="numeric"
                            value={plotSizeInput} 
                            onChange={(e) => handleInputChange(e, 0)}
                            onBlur={() => validateAndUpdateValue(plotSizeInput, 0)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                validateAndUpdateValue(plotSizeInput, 0);
                              }
                            }}
                            className="w-24 h-9 text-right font-black text-amber-500 bg-white/5 border-white/10 focus:border-amber-500 transition-colors rounded-lg tabular-nums"
                          />
                        </div>
                      </div>
                      <Slider 
                        id="plot-size"
                        min={100} 
                        max={10000} 
                        step={1} 
                        value={sliderValue} 
                        onValueChange={handleSliderChange}
                        showTooltip={true}
                        tooltipContent={(v) => `${v} sqft`}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-slate-500 font-bold uppercase tracking-wider tabular-nums">
                        <span>100 sqft</span>
                        <span>10,000 sqft</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="floors" className="text-base font-bold text-slate-300">Number of Floors</Label>
                      <Select value={floors?.toString() || "1"} onValueChange={(v) => setFloors(parseInt(v))}>
                        <SelectTrigger id="floors" className="w-full bg-white/5 border-white/10 text-white rounded-xl h-12">
                          <SelectValue placeholder="Select floors" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                          <SelectItem value="1">Ground Floor (G)</SelectItem>
                          <SelectItem value="2">G + 1 Floor</SelectItem>
                          <SelectItem value="3">G + 2 Floors</SelectItem>
                          <SelectItem value="4">G + 3 Floors</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base font-bold text-slate-300">Select Construction Package</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {CONSTRUCTION_PACKAGES.map((pkg) => (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => setSelectedPackageId(pkg.id)}
                            className={`p-4 rounded-xl border-2 text-left transition-colors ${
                              selectedPackageId === pkg.id 
                                ? 'border-amber-500 bg-amber-500/10' 
                                : 'border-white/5 bg-white/5 hover:border-white/20'
                            }`}
                          >
                            <div className="font-black text-sm mb-1 text-white">{pkg.name}</div>
                            <div className="text-xs text-amber-500 font-bold tabular-nums">₹{pkg.pricePerSqft}/sqft</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-amber-500 text-black border-none shadow-2xl shadow-amber-500/20 rounded-[2.5rem] overflow-hidden group">
                  <CardContent className="pt-8 pb-8 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="text-black/70 text-sm font-black uppercase tracking-wider mb-2">Total Estimated Cost</div>
                      <div className="text-4xl md:text-5xl font-black mb-4 tracking-tighter tabular-nums">{formatCurrency(totalEstimate)}</div>
                      <Separator className="bg-black/15 mb-4" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-black/70 text-xs font-bold uppercase tracking-wider mb-1">Total Built-up Area</div>
                          <div className="font-black text-lg tabular-nums">{totalArea} sq. ft.</div>
                        </div>
                        <div>
                          <div className="text-black/70 text-xs font-bold uppercase tracking-wider mb-1">Package Rate</div>
                          <div className="font-black text-lg tabular-nums">₹{selectedPackage.pricePerSqft}/sqft</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-7">
                <Tabs defaultValue="breakdown" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/5 p-1 rounded-full border border-white/10">
                    <TabsTrigger value="breakdown" className="rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-black font-black uppercase tracking-widest text-[10px]">Material Breakdown</TabsTrigger>
                    <TabsTrigger value="specifications" className="rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-black font-black uppercase tracking-widest text-[10px]">Package Specs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="breakdown" className="mt-0">
                    <Card className="bg-zinc-900/85 border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden">
                      <Table>
                        <TableHeader className="bg-white/5">
                          <TableRow className="border-white/10">
                            <TableHead className="w-[250px] text-slate-400 font-black uppercase tracking-widest text-[10px]">Material Category</TableHead>
                            <TableHead className="text-slate-400 font-black uppercase tracking-widest text-[10px]">%</TableHead>
                            <TableHead className="text-right text-slate-400 font-black uppercase tracking-widest text-[10px]">Estimated Cost</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {materialBreakdown.map((item) => {
                            const Icon = ICON_MAP[item.icon] || Info;
                            return (
                              <TableRow key={item.name} className="border-white/5 hover:bg-white/5 transition-colors">
                                <TableCell className="font-bold text-white">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500">
                                      <Icon className="h-4 w-4" />
                                    </div>
                                    {item.name}
                                  </div>
                                </TableCell>
                                <TableCell className="text-slate-400 font-bold tabular-nums">{item.percentage}%</TableCell>
                                <TableCell className="text-right font-black text-white tabular-nums">{formatCurrency(item.cost)}</TableCell>
                              </TableRow>
                            );
                          })}
                          <TableRow className="bg-amber-500/10 hover:bg-amber-500/20 border-t-2 border-amber-500/30">
                            <TableCell className="font-black text-amber-500 text-lg">Total Estimate</TableCell>
                            <TableCell className="font-black text-amber-500 text-lg tabular-nums">100%</TableCell>
                            <TableCell className="text-right font-black text-amber-500 text-lg tabular-nums">{formatCurrency(totalEstimate)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Card>
                    <p className="mt-4 text-xs text-slate-400 font-bold flex items-center gap-1 uppercase tracking-wider">
                      <Info className="h-3 w-3 text-amber-500 shrink-0" />
                      Costs are indicative and may vary based on local market conditions and specific brand choices.
                    </p>
                  </TabsContent>

                  <TabsContent value="specifications" className="mt-0">
                    <Card className="bg-zinc-900/85 border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-white font-black tracking-tight text-2xl">{selectedPackage.name} Package Details</CardTitle>
                        <CardDescription className="text-slate-400 font-medium">{selectedPackage.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="grid sm:grid-cols-2 gap-4">
                        {selectedPackage.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-amber-500/30 transition-colors">
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{feature}</span>
                          </div>
                        ))}
                      </CardContent>
                      <CardFooter className="bg-white/5 border-t border-white/10 py-6 flex flex-wrap items-center justify-between gap-4">
                        <Button 
                          variant="link" 
                          onClick={handleDownloadSpecification}
                          className="text-amber-500 p-0 h-auto font-black uppercase tracking-widest text-xs hover:text-amber-400 flex items-center gap-1.5"
                        >
                          <Download className="h-4 w-4" />
                          Download Detailed Specification Sheet
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        {downloadSuccess && (
                          <span className="text-xs font-bold text-green-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> Specification sheet downloaded!
                          </span>
                        )}
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
