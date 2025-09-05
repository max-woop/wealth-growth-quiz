// Utility to preload critical images
export const withBase = (path: string) => `${import.meta.env.BASE_URL?.replace(/\/$/, '') || ''}${path}`;

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.loading = 'eager';
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = withBase(src);
  });
};

// Preload multiple images with priority
export const preloadImages = async (sources: string[], priority: boolean = true): Promise<void> => {
  const promises = sources.map(src => preloadImage(src));
  
  if (priority) {
    // Wait for all images to load
    await Promise.all(promises);
  } else {
    // Don't wait, just start loading
    Promise.allSettled(promises);
  }
};

// Get critical images that should be preloaded immediately
export const getCriticalImages = () => {
  return [
    '/assets/male_600x600_1x.webp',
    '/assets/female_600x600_1x.webp',
    '/assets/trust_element_1_1x.webp',
    '/assets/financial_freedom_770x770_1x.webp',
    '/assets/professional_growth_770x770_1x.webp',
    '/assets/work_life_balance_770x770_1x.webp',
    '/assets/be_my_own_boss_770x770_1x.webp'
  ].map(withBase);
};

// Get age-specific images for preloading
export const getAgeImages = (gender: string) => {
  const prefix = gender === 'Male' ? 'male' : 'female';
  return [
    `/assets/${prefix}_18_24_600x600_1x.webp`,
    `/assets/${prefix}_25_34_600x600_1x.webp`,
    `/assets/${prefix}_35_44_600x600_1x.webp`,
    `/assets/${prefix}_45_600x600_1x.webp`
  ].map(withBase);
};

// Get trust element images
export const getTrustElementImages = () => {
  return [
    '/assets/trust_element_1_1x.webp',
    '/assets/trust_element_2_1_1x.webp',
    '/assets/trust_element_2_2_1x.webp',
    '/assets/trust_element_3_1x.webp',
    '/assets/trust_element_4_1_1x.webp',
    '/assets/trust_element_4_2_1x.webp',
    '/assets/trust_element_5_1_1x.webp',
    '/assets/trust_element_5_2_1x.webp',
    '/assets/grow_wealth_770x770_1x.webp'
  ].map(withBase);
};