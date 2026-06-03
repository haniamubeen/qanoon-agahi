import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook that uses IntersectionObserver to reveal elements on scroll.
 * Returns a ref to attach and a boolean `isVisible`.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // only trigger once
        }
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? '0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/**
 * Wrapper component that animates children into view on scroll.
 * Supports multiple animation variants for creative diversity.
 *
 * @param {string} animation - 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom' | 'blur'
 * @param {number} delay - delay in ms
 * @param {string} className - additional classes
 */
export function ScrollReveal({ children, animation = 'fade-up', delay = 0, className = '', threshold = 0.15 }) {
  const [ref, isVisible] = useScrollReveal({ threshold });

  const baseStyle = {
    transitionProperty: 'opacity, transform, filter',
    transitionDuration: '0.7s',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
  };

  const variants = {
    'fade-up': {
      hidden: { opacity: 0, transform: 'translateY(40px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    'fade-down': {
      hidden: { opacity: 0, transform: 'translateY(-40px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    'fade-left': {
      hidden: { opacity: 0, transform: 'translateX(-60px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    'fade-right': {
      hidden: { opacity: 0, transform: 'translateX(60px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    'zoom': {
      hidden: { opacity: 0, transform: 'scale(0.85)' },
      visible: { opacity: 1, transform: 'scale(1)' },
    },
    'blur': {
      hidden: { opacity: 0, filter: 'blur(10px)', transform: 'translateY(20px)' },
      visible: { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
    },
  };

  const variant = variants[animation] || variants['fade-up'];
  const currentStyle = isVisible ? variant.visible : variant.hidden;

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...baseStyle, ...currentStyle }}
    >
      {children}
    </div>
  );
}
