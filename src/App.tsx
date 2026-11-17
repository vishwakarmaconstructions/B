import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

const loadHome = () => import('./pages/Home');
const loadAbout = () => import('./pages/About');
const loadServices = () => import('./pages/Services');
const loadComparison = () => import('./pages/ComparisonDemo');
const loadTimeline = () => import('./pages/OrbitalTimelineDemo');

// Lazy load pages for fast initial bundle
const Home = lazy(loadHome);
const About = lazy(loadAbout);
const Services = lazy(loadServices);
const ComparisonDemo = lazy(loadComparison);
const OrbitalTimelineDemo = lazy(loadTimeline);

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      loadServices();
      loadComparison();
      loadTimeline();
      loadAbout();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/comparison" element={<ComparisonDemo />} />
            <Route path="/timeline" element={<OrbitalTimelineDemo />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;

