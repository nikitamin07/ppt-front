'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import type MouseFollower from 'mouse-follower';
import { useMediaQuery } from 'usehooks-ts';

export function CustomCursor() {
  const pathname = usePathname();
  const cursorRef = useRef<MouseFollower | null>(null);
  const isLargeScreen = useMediaQuery('(min-width: 64rem)'); // 1024px

  useEffect(() => {
    if (!isLargeScreen) return;

    // Курсор — украшение, и только для десктопа. Статический импорт клал его
    // в общий чанк всех страниц, поэтому тянем отдельным чанком после гидратации.
    let cancelled = false;

    void (async () => {
      const [gsap, MouseFollowerCtor] = await Promise.all([
        import('gsap').then((m) => m.default),
        import('mouse-follower').then((m) => m.default),
      ]);
      // Экран успел сузиться, пока грузился чанк — курсор уже не нужен.
      if (cancelled) return;

      MouseFollowerCtor.registerGSAP(gsap);
      cursorRef.current = new MouseFollowerCtor({
        speed: 0.55,
        skewing: 2,
        skewingText: 2,
        skewingDelta: 0.001,
        skewingDeltaMax: 0.15,
        stateDetection: {
          '-hidden': 'iframe'
        }
      });
    })();

    return () => {
      cancelled = true;
      cursorRef.current?.destroy();
      cursorRef.current = null;
    };
  }, [isLargeScreen]);

  useEffect(() => {
    cursorRef.current?.removeState('-text');
  }, [pathname]);

  return null;
}
