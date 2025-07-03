
import React from 'react';

interface AdMobBannerProps {
  adUnitId: string;
}

const AdMobBanner: React.FC<AdMobBannerProps> = ({ adUnitId }) => {
  return (
    <div className="w-full bg-gray-100 border-t border-gray-200 py-2">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
          <div className="text-xs text-gray-500 mb-2">Advertisement</div>
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded p-4 min-h-[50px] flex items-center justify-center">
            <div className="text-sm text-gray-600">
              AdMob Banner
              <br />
              <span className="text-xs font-mono">{adUnitId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdMobBanner;
