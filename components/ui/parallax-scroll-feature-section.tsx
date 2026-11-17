'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils";

export const ParallaxScrollSection = () => {
    // Array of section data
    const sections = [
        {
            id: 1,
            title: "Feature 1",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maxime sequi, pariatur illum, adipisci ullam optio quod tempora necessitatibus consectetur eaque deleniti id totam possimus unde dolorum inventore incidunt. Ea.",
            imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop',
            reverse: false
        },
        {
            id: 2,
            title: "Feature 2",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maxime sequi, pariatur illum, adipisci ullam optio quod tempora necessitatibus consectetur eaque deleniti id totam possimus unde dolorum inventore incidunt. Ea.",
            imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
            reverse: true
        },
        {
            id: 3,
            title: "Feature 3",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maxime sequi, pariatur illum, adipisci ullam optio quod tempora necessitatibus consectetur eaque deleniti id totam possimus unde dolorum inventore incidunt. Ea.",
            imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
            reverse: false
        }
    ]

    // Create refs and animations for each section
    const sectionRefs = sections.map(() => useRef(null));
    
    const scrollYProgress = sections.map((_, index) => {
        return useScroll({
            target: sectionRefs[index],
            offset: ["start end", "center start"]
        }).scrollYProgress;
    });

    // Create animations for each section
    const opacityContents = scrollYProgress.map(progress => 
        useTransform(progress, [0, 0.7], [0, 1])
    );
    
    const clipProgresses = scrollYProgress.map(progress => 
        useTransform(progress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])
    );
    
    const translateContents = scrollYProgress.map(progress => 
        useTransform(progress, [0, 1], [-50, 0])
    );

  return (
    <div className="bg-black text-white">
      <div className='min-h-screen w-full flex flex-col items-center justify-center'>
        <h1 className='text-6xl max-w-2xl text-center font-bold tracking-tighter'>PARALLAX SCROLL FEATURE SECTION</h1>
        <p className='mt-20 flex items-center gap-1.5 text-sm tracking-widest uppercase'>SCROLL <ArrowDown size={15} /></p>
      </div>
      
       <div className="flex flex-col md:px-0 px-10">
            {sections.map((section, index) => (
                <div 
                    key={section.id}
                    ref={sectionRefs[index]} 
                    className={`h-screen flex items-center justify-center md:gap-40 gap-20 ${section.reverse ? 'flex-row-reverse' : ''}`}
                >
                    <motion.div style={{ y: translateContents[index] }}>
                        <div className="text-6xl max-w-sm font-bold tracking-tighter">{section.title}</div>
                        <motion.p 
                            style={{ y: translateContents[index] }} 
                            className="text-white/70 max-w-sm mt-10 leading-relaxed"
                        >
                            {section.description}
                        </motion.p>
                    </motion.div>
                    <motion.div 
                        style={{ 
                            opacity: opacityContents[index],
                            clipPath: clipProgresses[index],
                        }}
                        className="relative"
                    >
                        <img 
                            src={section.imageUrl} 
                            className="size-80 object-cover rounded-2xl shadow-2xl shadow-white/10" 
                            alt={`Section ${section.id}` }
                            referrerPolicy="no-referrer"
                        />
                    </motion.div>
                </div>
            ))}
        </div>

       <div className='min-h-screen w-full flex flex-col items-center justify-center'>
        <h1 className='text-8xl font-bold tracking-tighter'>The End</h1>
      </div>
    </div>
  );
};
