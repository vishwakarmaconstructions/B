export interface GalleryProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  alt: string;
}

export const PROJECT_GALLERY_ITEMS: GalleryProjectItem[] = [
  {
    id: 'residential-glimpses',
    title: 'Completed Residential Elevations',
    category: 'Residential',
    location: 'Delhi NCR',
    description:
      'Turnkey independent homes featuring custom modern facades, cantilevered balconies, and precision exterior finishing.',
    image: '/assets/aistudio/Screenshot_20261117-155021_2_3992c63a.jpg',
    alt: 'Some Glimpses of our Residential Construction — completed multi-storey modern homes',
  },
  {
    id: 'educational-glimpses',
    title: 'Krishna Vidya Niketan — Nursery Wing',
    category: 'Institutional',
    location: 'Muradnagar, Ghaziabad',
    description:
      'Purpose-built educational wing engineered for daylight ventilation, wide circulation corridors, and structural durability.',
    image: '/assets/aistudio/Screenshot_20261117-155045_2_89436275.jpg',
    alt: 'Some Glimpses of our Educational Construction — Krishna Vidya Niketan Nursery Wing',
  },
  {
    id: 'campus-and-residence',
    title: 'Institutional Campus & Urban Residence',
    category: 'Multi-Sector',
    location: 'Muradnagar, Ghaziabad',
    description:
      'Large-span institutional campus architecture paired with compact, vertical urban residential execution.',
    image: '/assets/aistudio/Screenshot_20261117-154948_2_77c29c24.jpg',
    alt: 'Vishwakarma Constructions — Krishna Vidya Niketan Muradnagar campus and modern residence',
  },
  {
    id: 'running-sites',
    title: 'Active Foundation & Interior Finishing',
    category: 'Running Sites',
    location: 'Ghaziabad & NCR',
    description:
      'On-site RCC column reinforcement and precision brickwork alongside sculpted false-ceiling interior execution.',
    image: '/assets/aistudio/Screenshot_20261117-155056_2_cace0065.jpg',
    alt: 'Some Glimpses of our Running Sites — brick masonry foundation and interior ceiling work',
  },
];

export const MIN_ZOOM = 1;
export const MAX_ZOOM = 2.5;
export const ZOOM_STEP = 0.5;

export function getNextGalleryIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
}

export function getPrevGalleryIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex - 1 + total) % total;
}

export function clampZoomLevel(zoom: number): number {
  const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));
  return Math.round(clamped * 100) / 100;
}
