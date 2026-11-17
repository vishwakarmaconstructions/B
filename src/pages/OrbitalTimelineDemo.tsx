"use client";

import { FileText, Code, Zap, Shield, Box, Clock } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Pre-Design Excellence",
    date: "Stage 1",
    content: "2D Layouts, Floor Plans. 57 Quality Checks, 2 Milestones Tracked. Scientific approach for project estimation.",
    category: "Pre-Design",
    icon: FileText,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Design Excellence",
    date: "Stage 2",
    content: "3D elevations, structural designs. 84 Quality Checks, 3 Milestones Tracked. We use advanced BIM enabled Revit Software for design.",
    category: "Design",
    icon: Code,
    relatedIds: [1, 3, 5],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Execution Excellence",
    date: "Stage 3",
    content: "QASCON framework tracking. 250+ unique Quality Checks. 3 Level Audit System through execution team and Project Managers.",
    category: "Execution",
    icon: Zap,
    relatedIds: [2, 5, 6],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "Money Safety (Escrow)",
    date: "Finance",
    content: "Safe money Mechanism for Advance Retention Guarantee. Client transfers money to ESCROW, released past stage completion.",
    category: "Finance",
    icon: Shield,
    relatedIds: [3, 6],
    status: "in-progress" as const,
    energy: 100,
  },
  {
    id: 5,
    title: "Digital Twin (BIM)",
    date: "Technology",
    content: "Virtual representor for physical asset. Real-time project schedules, monitor safety, and conduct regular QASCON quality checks.",
    category: "Tech",
    icon: Box,
    relatedIds: [2, 3],
    status: "in-progress" as const,
    energy: 90,
  },
  {
    id: 6,
    title: "On-Time Delivery",
    date: "Delivery",
    content: "Assured Project Tracking with Customer Refund on delay. 10+ Apps and communication with Advanced Project Management System.",
    category: "Delivery",
    icon: Clock,
    relatedIds: [3, 4],
    status: "in-progress" as const,
    energy: 95,
  },
];

export default function OrbitalTimelineDemo() {
  return (
    <div className="min-h-screen bg-black text-white pt-8 overflow-hidden">
      <div className="relative z-10 text-center pointer-events-none pt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
          <Zap className="w-3 h-3 text-amber-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">The QASCON Framework</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
          Excellence in <span className="text-amber-500">Every Orbit</span>
        </h1>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto px-4 font-medium text-lg leading-relaxed">
          Our proprietary QASCON framework and BIM-enabled technology ensure absolute transparency and zero cost overrun.
        </p>
      </div>
      
      <div className="relative z-0 -mt-20">
        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>
    </div>
  );
}
