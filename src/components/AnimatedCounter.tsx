import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = "", 
  prefix = "",
  decimals = 0 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const startTime = Date.now();
            const endTime = startTime + duration;
            
            const updateCounter = () => {
              const now = Date.now();
              const progress = Math.min((now - startTime) / duration, 1);
              
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentCount = Math.floor(easeOutQuart * end);
              
              setCount(currentCount);
              
              if (now < endTime) {
                requestAnimationFrame(updateCounter);
              } else {
                setCount(end);
              }
            };
            
            requestAnimationFrame(updateCounter);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return num.toLocaleString();
  };

  return (
    <span ref={countRef} className="tabular-nums">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}