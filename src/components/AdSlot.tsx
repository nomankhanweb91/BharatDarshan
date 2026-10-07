import React, { useEffect, useRef } from 'react';

export type AdPosition = 'TopContentAd' | 'InContentAd' | 'SidebarAd' | 'BottomContentAd';

interface AdSlotProps {
  position: AdPosition;
  adSlotId?: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  position,
  adSlotId = '1234567890',
  className = '',
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isPushed = useRef(false);

  useEffect(() => {
    // Only attempt in browser environment
    try {
      if (typeof window !== 'undefined' && !isPushed.current) {
        // @ts-expect-error Google adsbygoogle window global
        const adsbygoogle = window.adsbygoogle || [];
        // Push ad if scripts loaded and not already initialized
        adsbygoogle.push({});
        isPushed.current = true;
      }
    } catch {
      // Graceful silence if AdSense script is blocked by browser extensions
    }
  }, []);

  const getPositionStyles = () => {
    switch (position) {
      case 'SidebarAd':
        return 'w-full min-h-[250px] max-w-[320px] mx-auto';
      case 'TopContentAd':
        return 'w-full min-h-[90px] max-w-4xl mx-auto my-6';
      case 'InContentAd':
        return 'w-full min-h-[120px] max-w-3xl mx-auto my-8';
      case 'BottomContentAd':
      default:
        return 'w-full min-h-[100px] max-w-4xl mx-auto my-8';
    }
  };

  return (
    <div
      ref={adRef}
      className={`relative overflow-hidden rounded-lg bg-slate-100/70 border border-slate-200/80 p-2 text-center text-xs text-slate-400 select-none ${getPositionStyles()} ${className}`}
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-400 mb-1 px-1">
        <span>Advertisement</span>
        <span>AdSense</span>
      </div>

      <div className="w-full flex items-center justify-center min-h-[80px]">
        {/* Official AdSense ins element */}
        <ins
          className="adsbygoogle block w-full"
          style={{ display: 'block', minHeight: '60px' }}
          data-ad-client="ca-pub-8528510551006901"
          data-ad-slot={adSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
