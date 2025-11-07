"use client";

interface DecorativeStripesProps {
  className?: string;
}

export default function DecorativeStripes({ className = "text-foreground" }: DecorativeStripesProps) {
  return (
    <div 
      className={`w-full h-20 opacity-20 ${className}`}
      style={{
        background: `repeating-linear-gradient(
          45deg,
          currentColor 0px,
          currentColor 2px,
          transparent 2px,
          transparent 12px
        )`
      }}
    />
  );
}