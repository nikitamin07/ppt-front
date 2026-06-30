'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import MouseFollower from 'mouse-follower';
import { useMediaQuery } from 'usehooks-ts';

MouseFollower.registerGSAP(gsap);

export default function CustomCursor() {
  const pathname = usePathname();
  const cursorRef = useRef<MouseFollower | null>(null);
  const isLargeScreen = useMediaQuery('(min-width: 64rem)'); // 1024px

  useEffect(() => {
    if (!isLargeScreen) {
      if (cursorRef.current) {
        cursorRef.current.destroy();
        cursorRef.current = null;
      }
      return;
    }

    if (!cursorRef.current) {
      cursorRef.current = new MouseFollower({
        speed: 0.55,
        skewing: 2,
        skewingText: 2,
        skewingDelta: 0.001,
        skewingDeltaMax: 0.15,
        stateDetection: {
          '-hidden': 'iframe'
        }
      });
    }

    return () => {
      if (cursorRef.current) {
        cursorRef.current.destroy();
        cursorRef.current = null;
      }
    };
  }, [isLargeScreen]);

  useEffect(() => {
    cursorRef.current?.removeState('-text');
  }, [pathname]);

  return null;
}