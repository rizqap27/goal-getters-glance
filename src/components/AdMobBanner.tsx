
import React from 'react';
import { useAdMob } from '@/hooks/useAdMob';

interface AdMobBannerProps {
  adUnitId: string;
}

const AdMobBanner: React.FC<AdMobBannerProps> = ({ adUnitId }) => {
  const { isLoading, error, isNative } = useAdMob(adUnitId);

  // On native platforms, the banner is handled by the native AdMob SDK
  if (isNative) {
    return (
      <div className="w-full h-16 bg-transparent">
        {/* Native banner will be displayed by Capacitor AdMob plugin */}
      </div>
    );
  }

  // Web fallback - show mockup for development
  return (
    <div className="w-full bg-gray-100 border-t border-gray-200 py-2">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
          <div className="text-xs text-gray-500 mb-2">Advertisement</div>
          {isLoading ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded p-4 min-h-[50px] flex items-center justify-center">
              <div className="text-sm text-gray-600">Loading ad...</div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-dashed border-red-300 rounded p-4 min-h-[50px] flex items-center justify-center">
              <div className="text-sm text-red-600">Ad failed to load</div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded p-4 min-h-[50px] flex items-center justify-center">
              <div className="text-sm text-gray-600">
                AdMob Banner (Web Preview)
                <br />
                <span className="text-xs font-mono">{adUnitId}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdMobBanner;
