import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
  onClick?: () => void;
}

const glowColorRgbaMap: Record<NonNullable<GlowCardProps['glowColor']>, string> = {
  blue: '59, 130, 246',
  purple: '168, 85, 247',
  green: '34, 197, 94',
  red: '239, 68, 68',
  orange: '245, 158, 11',
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let frameId = 0;

    const handlePointerMove = (e: PointerEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x.toFixed(1)}px`);
        card.style.setProperty('--y', `${y.toFixed(1)}px`);
        card.style.setProperty('--glow-opacity', '1');
      });
    };

    const handlePointerLeave = () => {
      cancelAnimationFrame(frameId);
      card.style.setProperty('--glow-opacity', '0');
    };

    card.addEventListener('pointermove', handlePointerMove, { passive: true });
    card.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const rgb = glowColorRgbaMap[glowColor] || glowColorRgbaMap.orange;

  const inlineStyles: React.CSSProperties = {
    '--x': '50%',
    '--y': '50%',
    '--glow-opacity': '0',
    '--glow-rgb': rgb,
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
  } as React.CSSProperties;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={inlineStyles}
      className={`
        ${customSize ? '' : `${sizeMap[size]} aspect-[3/4]`}
        rounded-2xl
        relative
        grid
        grid-rows-[1fr_auto]
        shadow-[0_1rem_2rem_-1rem_black]
        p-4
        gap-4
        overflow-hidden
        ${className}
      `}
    >
      {/* Hardware-accelerated local spotlight overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-0"
        style={{
          opacity: 'var(--glow-opacity, 0)',
          background:
            'radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgba(var(--glow-rgb), 0.16), transparent 80%)',
        }}
      />
      <div className="relative z-10 contents">{children}</div>
    </div>
  );
};

export { GlowCard };

