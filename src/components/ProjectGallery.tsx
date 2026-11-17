import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  MapPin,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  PROJECT_GALLERY_ITEMS,
  MIN_ZOOM,
  MAX_ZOOM,
  ZOOM_STEP,
  getNextGalleryIndex,
  getPrevGalleryIndex,
  clampZoomLevel,
} from '@/src/utils/gallery';

const ProjectGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number>(MIN_ZOOM);

  const isOpen = activeIndex !== null;
  const activeItem = isOpen ? PROJECT_GALLERY_ITEMS[activeIndex] : null;

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setZoom(MIN_ZOOM);
  };

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    setZoom(MIN_ZOOM);
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : getNextGalleryIndex(prev, PROJECT_GALLERY_ITEMS.length)
    );
    setZoom(MIN_ZOOM);
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : getPrevGalleryIndex(prev, PROJECT_GALLERY_ITEMS.length)
    );
    setZoom(MIN_ZOOM);
  }, []);

  const handleZoomIn = () => setZoom((z) => clampZoomLevel(z + ZOOM_STEP));
  const handleZoomOut = () => setZoom((z) => clampZoomLevel(z - ZOOM_STEP));
  const handleResetZoom = () => setZoom(MIN_ZOOM);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNext();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeLightbox, showNext, showPrev]);

  return (
    <section
      id="project-gallery"
      className="py-16 md:py-28 px-4 bg-black border-t border-white/5 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-4 md:mb-6 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
            Real Site Portfolio
          </Badge>
          <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tighter uppercase">
            Project Gallery
          </h2>
          <div className="w-16 md:w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Glimpses from our completed residential, institutional, and active construction sites. Select any showcase to inspect full details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECT_GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <button
                type="button"
                onClick={() => openLightbox(idx)}
                aria-label={`Inspect ${item.title} in lightbox`}
                className="w-full text-left rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-900/80 border border-white/10 hover:border-amber-500/40 transition-colors duration-300 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <div className="relative aspect-[19/10] w-full overflow-hidden bg-zinc-950 p-2">
                  <div className="w-full h-full overflow-hidden rounded-xl bg-zinc-950">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] will-change-transform"
                    />
                  </div>
                </div>

                <div className="p-5 md:p-7 flex items-end justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/25 text-[10px] font-black uppercase tracking-widest">
                        {item.category}
                      </Badge>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {item.location}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-white tracking-tight uppercase mt-1 group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed line-clamp-2 mt-1.5">
                      {item.description}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors shrink-0">
                    <Expand className="w-4 h-4" />
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Viewer */}
      <AnimatePresence>
        {isOpen && activeItem && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeItem.title} lightbox viewer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[260] bg-black/92 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6"
          >
            {/* Top Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full mx-auto flex flex-wrap items-center justify-between gap-3 bg-zinc-900/90 border border-white/10 rounded-2xl px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 text-[10px] font-black uppercase tracking-widest shrink-0">
                  {activeIndex + 1} / {PROJECT_GALLERY_ITEMS.length}
                </Badge>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight truncate">
                    {activeItem.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate">
                    {activeItem.category} • {activeItem.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleZoomOut}
                  disabled={zoom <= MIN_ZOOM}
                  aria-label="Zoom out image"
                  className="h-9 w-9 rounded-xl border-white/15 bg-black/40 text-white hover:bg-white/10 disabled:opacity-40"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-xs font-bold text-amber-400 tabular-nums min-w-[3rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleZoomIn}
                  disabled={zoom >= MAX_ZOOM}
                  aria-label="Zoom in image"
                  className="h-9 w-9 rounded-xl border-white/15 bg-black/40 text-white hover:bg-white/10 disabled:opacity-40"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                {zoom > MIN_ZOOM && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleResetZoom}
                    aria-label="Reset zoom"
                    className="h-9 w-9 rounded-xl border-white/15 bg-black/40 text-white hover:bg-white/10"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={closeLightbox}
                  aria-label="Close lightbox"
                  className="h-9 w-9 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 ml-1"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Main Image Stage */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full mx-auto flex-1 min-h-0 my-3 flex items-center justify-center"
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={showPrev}
                aria-label="Previous project image"
                className="absolute left-1 sm:left-3 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-zinc-900/90 border-white/15 text-white hover:bg-amber-600 hover:border-amber-500 transition-colors shadow-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-full h-full max-h-[65vh] rounded-2xl border border-white/10 bg-zinc-950/95 overflow-auto flex p-2 sm:p-4"
              >
                <img
                  src={activeItem.image}
                  alt={activeItem.alt}
                  style={
                    zoom > MIN_ZOOM
                      ? { width: `${zoom * 100}%`, maxWidth: 'none', maxHeight: 'none' }
                      : undefined
                  }
                  className={
                    zoom > MIN_ZOOM
                      ? 'h-auto object-contain m-auto transition-all duration-200 ease-out select-none'
                      : 'max-h-[58vh] w-auto max-w-full object-contain m-auto transition-all duration-200 ease-out select-none'
                  }
                />
              </motion.div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={showNext}
                aria-label="Next project image"
                className="absolute right-1 sm:right-3 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-zinc-900/90 border-white/15 text-white hover:bg-amber-600 hover:border-amber-500 transition-colors shadow-xl"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Bottom Caption & Thumbnails */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full mx-auto bg-zinc-900/90 border border-white/10 rounded-2xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              <p className="text-xs sm:text-sm text-slate-300 text-center sm:text-left">
                {activeItem.description}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                {PROJECT_GALLERY_ITEMS.map((thumb, idx) => (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => openLightbox(idx)}
                    aria-label={`View ${thumb.title}`}
                    className={`w-14 h-9 rounded-lg overflow-hidden border transition-all ${
                      idx === activeIndex
                        ? 'border-amber-500 ring-2 ring-amber-500/40 scale-105'
                        : 'border-white/15 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumb.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectGallery;
