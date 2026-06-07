"use client";

import { Star } from "lucide-react";
import { motion, useInView, type UseInViewOptions } from "framer-motion";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface GithubButtonProps extends React.ComponentProps<"button"> {
  initialStars?: number;
  animationDuration?: number;
  animationDelay?: number;
  autoAnimate?: boolean;
  repoUrl?: string;
  label?: string;
  useInViewTrigger?: boolean;
  inViewOptions?: UseInViewOptions;
}

export function GithubButton({
  initialStars = 15,
  animationDuration = 2,
  animationDelay = 0,
  autoAnimate = true,
  className,
  repoUrl = "https://github.com/rofazhasan/rofaz-portfolio",
  onClick,
  label = "Star",
  useInViewTrigger = false,
  inViewOptions = { once: true },
  ...props
}: GithubButtonProps) {
  const [targetStars, setTargetStars] = useState<number | null>(null);
  const [currentStars, setCurrentStars] = useState(initialStars);
  const [isAnimating, setIsAnimating] = useState(false);
  const [starProgress, setStarProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Fetch stars from GitHub API directly
  useEffect(() => {
    // Extract owner/repo from URL
    let ownerRepo = "rofazhasan/rofaz-portfolio";
    if (repoUrl) {
      const match = repoUrl.match(/github\.com\/([^\/]+\/[^\/\.]+)/);
      if (match && match[1]) {
        ownerRepo = match[1];
      }
    }

    fetch(`https://api.github.com/repos/${ownerRepo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setTargetStars(data.stargazers_count || 12);
        } else {
          setTargetStars(15);
        }
      })
      .catch(() => {
        setTargetStars(15); // Fallback
      });
  }, [repoUrl]);

  const startAnimation = useCallback(() => {
    if (isAnimating || hasAnimated || targetStars === null) return;

    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = 0;
    const endValue = targetStars;
    const duration = animationDuration * 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const newStars = Math.round(
        startValue + (endValue - startValue) * easeOutQuart
      );
      setCurrentStars(newStars);
      setStarProgress(progress * 100);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentStars(endValue);
        setStarProgress(100);
        setIsAnimating(false);
        setHasAnimated(true);
      }
    };

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, animationDelay * 1000);
  }, [
    isAnimating,
    hasAnimated,
    targetStars,
    animationDuration,
    animationDelay,
  ]);

  const ref = useRef(null);
  const isInView = useInView(ref, inViewOptions);

  useEffect(() => {
    if (targetStars === null) return;
    if (useInViewTrigger) {
      if (isInView && !hasAnimated) {
        startAnimation();
      }
    } else if (autoAnimate && !hasAnimated) {
      startAnimation();
    }
  }, [
    autoAnimate,
    useInViewTrigger,
    isInView,
    hasAnimated,
    startAnimation,
    targetStars,
  ]);

  const navigateToRepo = () => {
    if (!repoUrl) return;
    window.open(repoUrl, "_blank", "noopener,noreferrer");
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
      return;
    }
    navigateToRepo();
  };

  return (
    <button
      ref={ref}
      className={cn(
        "cursor-pointer relative overflow-hidden inline-flex items-center justify-center font-mono text-[10px] tracking-widest uppercase rounded-xl border border-[var(--border-strong)] bg-black/40 hover:bg-black/60 px-4 py-2.5 shadow-md backdrop-blur-lg transition-all hover:border-[var(--accent)] hover:scale-105 active:scale-95 group select-none text-white",
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Star Rofaz on GitHub`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 mr-2 text-[var(--accent)] group-hover:animate-pulse">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>

      <span className="text-[var(--text-bright)] mr-2">{label}</span>

      <div className="relative inline-flex shrink-0 mr-2">
        <Star
          size={12}
          className="text-[var(--text-muted)] fill-transparent"
          aria-hidden="true"
        />
        <Star
          size={12}
          className="absolute start-0 top-0 fill-[var(--accent)] text-[var(--accent)]"
          aria-hidden="true"
          style={{
            clipPath: `inset(${100 - starProgress}% 0 0 0)`,
          }}
        />
      </div>

      <span className="text-[var(--accent)] font-black">
        {formatNumber(currentStars)}
      </span>
    </button>
  );
}

export default GithubButton;
