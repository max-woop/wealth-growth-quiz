import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { withBase } from './utils/imagePreloader';
import { SurveyProvider } from './context/SurveyContext';
import SurveyContainer from './components/SurveyContainer';
import { preloadImages, getCriticalImages } from './utils/imagePreloader';
import type { Language } from './utils/translations';

function App() {
  // Preload critical images on app start
  useEffect(() => {
    const loadCriticalImages = async () => {
      try {
        const criticalImages = getCriticalImages();
        await preloadImages(criticalImages, false);
      } catch (error) {
        console.warn('Failed to preload critical images:', error);
      }
    };

    loadCriticalImages();
  }, []);

  // Component for language-specific quiz routes
  const QuizWithLanguage: React.FC<{ language: Language }> = ({ language }) => (
    <SurveyProvider initialLanguage={language}>
      <SurveyContainer />
    </SurveyProvider>
  );

  // Compute basename dynamically to support GitHub Pages repo renames and local/dev
  const computeBasename = () => {
    const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.endsWith('github.io');
    const isNetlify = typeof window !== 'undefined' && window.location.hostname.endsWith('netlify.app');
    if (isGitHubPages) {
      const segments = window.location.pathname.split('/').filter(Boolean);
      // First segment is the repo name when using user.github.io/repo/
      return segments.length > 0 ? `/${segments[0]}` : '';
    }
    if (isNetlify) {
      return '';
    }
    const base = import.meta.env.BASE_URL || '';
    // Normalize './' or '/' to empty for dev/preview
    if (base === './' || base === '/' || base === '.') return '';
    return base.replace(/\/$/, '');
  };
  const basename = computeBasename();

  return (
    <Router basename={basename}>
      <div className="min-h-screen bg-[#F6F9FC] flex flex-col">
        {/* Header with Logo - reduced size by 25% */}
        <header className="bg-transparent z-50">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-center">
              <img 
                src="https://cdn.prod.website-files.com/66291ac218cd888b41059ad9/667ed5135f3ef2d7dc53532e_Vectors-Wrapper.svg" 
                alt="Libertex"
                className="h-6"
                loading="eager"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col py-4">
          <div className="max-w-3xl mx-auto w-full px-4">
            <Routes>
              {/* English quiz route */}
              <Route path="/en" element={<QuizWithLanguage language="en" />} />
              
              {/* Russian quiz route */}
              <Route path="/ru" element={<QuizWithLanguage language="ru" />} />
              
              {/* Spanish quiz route */}
              <Route path="/es" element={<QuizWithLanguage language="es" />} />
              
              {/* Default route - redirect to English */}
              <Route path="/" element={<Navigate to="/en" replace />} />
              
              {/* Catch all other routes and redirect to English */}
              <Route path="*" element={<Navigate to="/en" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;