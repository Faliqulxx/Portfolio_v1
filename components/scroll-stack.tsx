import React, { useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform overflow-hidden ${itemClassName}`.trim()}
    style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);
  const cardTopsRef = useRef<number[]>([]);
  const endTopRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // ─── helpers ──────────────────────────────────────────────────────────────

  const parsePercentage = useCallback(
    (value: string | number, containerHeight: number) => {
      if (typeof value === 'string' && value.includes('%')) {
        return (parseFloat(value) / 100) * containerHeight;
      }
      return parseFloat(value as string);
    },
    []
  );

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0;
      if (scrollTop > end) return 1;
      return (scrollTop - start) / (end - start);
    },
    []
  );

  // ─── cache element positions (read-only, no style writes) ─────────────────

  const cachePositions = useCallback(() => {
    if (useWindowScroll) {
      const scrollY = window.scrollY;
      cardTopsRef.current = cardsRef.current.map(
        (card) => card.getBoundingClientRect().top + scrollY
      );
      const endEl = document.querySelector('.scroll-stack-end') as HTMLElement | null;
      endTopRef.current = endEl ? endEl.getBoundingClientRect().top + scrollY : 0;
    } else {
      cardTopsRef.current = cardsRef.current.map((card) => card.offsetTop);
      const endEl = scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null;
      endTopRef.current = endEl ? endEl.offsetTop : 0;
    }
  }, [useWindowScroll]);

  // ─── update transforms (write-only, no layout reads) ──────────────────────

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const scrollTop = useWindowScroll
      ? window.scrollY
      : (scrollerRef.current?.scrollTop ?? 0);
    const containerHeight = useWindowScroll
      ? window.innerHeight
      : (scrollerRef.current?.clientHeight ?? 0);

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = endTopRef.current;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardTopsRef.current[i] ?? 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardTopsRef.current[j] ?? 0;
          if (scrollTop >= jCardTop - stackPositionPx - itemStackDistance * j) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const next = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const prev = lastTransformsRef.current.get(i);
      const changed =
        !prev ||
        Math.abs(prev.translateY - next.translateY) > 0.1 ||
        Math.abs(prev.scale - next.scale) > 0.001 ||
        Math.abs(prev.rotation - next.rotation) > 0.1 ||
        Math.abs(prev.blur - next.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0,${next.translateY}px,0) scale(${next.scale}) rotate(${next.rotation}deg)`;
        card.style.filter = next.blur > 0 ? `blur(${next.blur}px)` : '';
        lastTransformsRef.current.set(i, next);
      }

      if (i === cardsRef.current.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!inView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    useWindowScroll, itemScale, itemStackDistance, stackPosition, scaleEndPosition,
    baseScale, rotationAmount, blurAmount, onStackComplete, parsePercentage, calculateProgress,
  ]);

  // ─── setup ────────────────────────────────────────────────────────────────

  useEffect(() => {
    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : (scrollerRef.current?.querySelectorAll('.scroll-stack-card') ?? [])
    ) as HTMLElement[];

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
    });

    // Cache positions after a frame so layout is stable
    const initRaf = requestAnimationFrame(() => {
      cachePositions();
      updateCardTransforms();
    });

    const onResize = () => {
      cachePositions();
      updateCardTransforms();
    };
    window.addEventListener('resize', onResize);

    let cleanup: () => void;

    if (useWindowScroll) {
      // ── Window scroll: use native passive listener (no Lenis conflict) ──
      const onScroll = () => {
        if (rafIdRef.current !== null) return; // already queued
        rafIdRef.current = requestAnimationFrame(() => {
          rafIdRef.current = null;
          updateCardTransforms();
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      cleanup = () => {
        window.removeEventListener('scroll', onScroll);
        if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      };
    } else {
      // ── Internal scroll: use Lenis for smoothness ──
      const scroller = scrollerRef.current;
      if (!scroller) {
        cleanup = () => {};
      } else {
        const lenis = new Lenis({
          wrapper: scroller,
          content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 2,
          infinite: false,
          gestureOrientation: 'vertical',
          wheelMultiplier: 1,
          lerp: 0.1,
          syncTouch: true,
          syncTouchLerp: 0.075,
        });

        lenis.on('scroll', updateCardTransforms);

        const raf = (time: number) => {
          lenis.raf(time);
          animationFrameRef.current = requestAnimationFrame(raf);
        };
        animationFrameRef.current = requestAnimationFrame(raf);
        lenisRef.current = lenis;

        cleanup = () => {
          if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
          lenis.destroy();
        };
      }
    }

    return () => {
      cancelAnimationFrame(initRaf);
      window.removeEventListener('resize', onResize);
      cleanup();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    itemDistance, itemScale, itemStackDistance, stackPosition, scaleEndPosition,
    baseScale, scaleDuration, rotationAmount, blurAmount, useWindowScroll, onStackComplete,
  ]);

  // ─── render ───────────────────────────────────────────────────────────────

  if (useWindowScroll) {
    return (
      <div className={`relative w-full ${className}`.trim()}>
        <div className="scroll-stack-inner pt-[15vh] pb-[60vh]">
          {children}
          <div className="scroll-stack-end w-full h-px" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full overflow-y-auto overflow-x-hidden ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      } as React.CSSProperties}
    >
      <div className="scroll-stack-inner pt-[20vh] px-4 sm:px-8 md:px-16 pb-[40rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
