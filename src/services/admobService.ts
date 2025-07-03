
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

export class AdMobService {
  private static instance: AdMobService;
  private isInitialized: boolean = false;

  static getInstance(): AdMobService {
    if (!AdMobService.instance) {
      AdMobService.instance = new AdMobService();
    }
    return AdMobService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      if (Capacitor.isNativePlatform()) {
        await AdMob.initialize({
          initializeForTesting: true
        });
        console.log('AdMob initialized successfully');
      }
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize AdMob:', error);
    }
  }

  async showBanner(adUnitId: string): Promise<void> {
    try {
      await this.initialize();
      
      if (!Capacitor.isNativePlatform()) {
        console.log('AdMob banner would show on native platform');
        return;
      }

      const options: BannerAdOptions = {
        adId: adUnitId,
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: true
      };

      await AdMob.showBanner(options);
      console.log('Banner ad displayed successfully');
    } catch (error) {
      console.error('Failed to show banner ad:', error);
    }
  }

  async hideBanner(): Promise<void> {
    try {
      if (Capacitor.isNativePlatform()) {
        await AdMob.hideBanner();
      }
    } catch (error) {
      console.error('Failed to hide banner ad:', error);
    }
  }
}

export const admobService = AdMobService.getInstance();
