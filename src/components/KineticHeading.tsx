"use client";

import { type CSSProperties, type ElementType, type MouseEvent, useEffect, useRef } from "react";

interface KineticHeadingProps {
  children: string;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
}

export function KineticHeading({ children, className = "", as: Component = "h2", style }: KineticHeadingProps) {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  
  // Physics state
  const mouseVelocity = useRef(0);
  const targetVelocity = useRef(0);
  const lastMousePos = useRef<{ x: number, time: number } | null>(null);
  const isHovered = useRef(false);
  const swayAmplitude = useRef(0);

  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.05;
      
      // Decay target velocity (friction)
      targetVelocity.current *= 0.92;
      
      // Smoothly interpolate current velocity towards target velocity
      mouseVelocity.current += (targetVelocity.current - mouseVelocity.current) * 0.1;

      // Smoothly ramp the sway amplitude up/down based on hover state
      const targetAmplitude = isHovered.current ? 2.5 : 0;
      swayAmplitude.current += (targetAmplitude - swayAmplitude.current) * 0.05;

      lettersRef.current.forEach((letter, index) => {
        if (!letter) return;
        
        // Sway only active when hovered (amplitude ramps up/down)
        const idleSway = Math.sin(time + index * 0.2) * swayAmplitude.current; 
        
        // Combine idle sway with the global mouse wind
        const totalSkew = idleSway + mouseVelocity.current;
        
        // Clamp the skew to prevent the font from tearing or becoming unreadable
        const clampedSkew = Math.max(-35, Math.min(35, totalSkew));

        letter.style.transform = `skewX(${clampedSkew}deg)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    isHovered.current = true;
    const now = Date.now();
    if (lastMousePos.current) {
      const dt = now - lastMousePos.current.time;
      if (dt > 0 && dt < 100) { 
        const dx = e.clientX - lastMousePos.current.x;
        const velocity = dx / dt;
        targetVelocity.current = velocity * -15;
      }
    }
    lastMousePos.current = { x: e.clientX, time: now };
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    lastMousePos.current = null;
  };

  return (
    <Component 
      className={`flex flex-wrap cursor-crosshair ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            lettersRef.current[i] = el;
          }}
          className="inline-block whitespace-pre"
          style={{ transformOrigin: "bottom center" }}
        >
          {char}
        </span>
      ))}
    </Component>
  );
}
