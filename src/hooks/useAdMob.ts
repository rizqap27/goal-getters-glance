
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { admobService } from '@/services/admobService';

export const useAdMob = (adUnitId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    const initializeAd = async () => {
      try {
        setIsNative(Capacitor.isNativePlatform());
        await admobService.initialize();
        
        if (Capacitor.isNativePlatform()) {
          await admobService.showBanner(adUnitId);
        }
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load ad');
        setIsLoading(false);
      }
    };

    initializeAd();

    return () => {
      if (Capacitor.isNativePlatform()) {
        admobService.hideBanner().catch(console.error);
      }
    };
  }, [adUnitId]);

  return { isLoading, error, isNative };
};
