import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface CoolButtonProps {
  children?: React.ReactNode;
  text?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'green' | 'black' | 'orange' | 'outline';
  className?: string;
  showShimmer?: boolean;
  showPulse?: boolean;
  showLiveDot?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const CoolButton: React.FC<CoolButtonProps> = ({
  children,
  text,
  href,
  onClick,
  type = 'button',
  variant = 'green',
  className = '',
  showShimmer = true,
  showPulse = true,
  showLiveDot = false,
  icon,
  disabled = false,
  fullWidth = false,
}) => {
  // Base variant styles
  const variantStyles = {
    green: 'bg-[#00E676] hover:bg-[#00c966] text-black font-extrabold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 border border-emerald-400/40',
    black: 'bg-black hover:bg-zinc-900 text-white font-black shadow-2xl border border-zinc-800 hover:border-zinc-700',
    orange: 'bg-[#FFAA48] hover:bg-[#f29930] text-black font-extrabold shadow-lg shadow-orange-500/20 border border-amber-300/50',
    outline: 'bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700/80 font-bold hover:border-zinc-500',
  };

  const defaultIcon = <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />;

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2 text-center w-full">
      {showLiveDot && (
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-900 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
        </span>
      )}
      <span>{text || children}</span>
      {icon !== undefined ? icon : defaultIcon}
    </span>
  );

  const baseClasses = `
    group relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer
    select-none active:scale-[0.98] ${variantStyles[variant]} ${fullWidth ? 'w-full flex' : 'inline-flex'} ${className}
  `.trim();

  return (
    <div className={`relative inline-block ${fullWidth ? 'w-full' : ''}`}>
      {/* Outer Pulsing Glow Aura */}
      {showPulse && variant === 'green' && !disabled && (
        <span className="absolute -inset-0.5 rounded-xl bg-[#00E676] opacity-40 blur-md animate-pulse pointer-events-none group-hover:opacity-75 transition-opacity" />
      )}

      {/* Button Body with Motion */}
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.025, y: disabled ? 0 : -2 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="w-full"
      >
        {href ? (
          <a href={href} onClick={onClick} className={baseClasses}>
            {/* Light Sweep Shimmer Effect */}
            {showShimmer && !disabled && (
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-button-shimmer pointer-events-none" />
            )}
            {content}
          </a>
        ) : (
          <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {/* Light Sweep Shimmer Effect */}
            {showShimmer && !disabled && (
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-button-shimmer pointer-events-none" />
            )}
            {content}
          </button>
        )}
      </motion.div>
    </div>
  );
};
