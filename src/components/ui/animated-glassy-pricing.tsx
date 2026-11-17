import React from 'react';
import { RippleButton } from "@/src/components/ui/multi-type-ripple-buttons";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="3"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  buttonVariant?: 'primary' | 'secondary';
  onSelectPlan?: (planName: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  planName,
  description,
  price,
  features,
  buttonText,
  isPopular = false,
  buttonVariant = 'primary',
  onSelectPlan,
}) => {
  const cardClasses = `
    bg-gradient-to-br rounded-2xl shadow-xl flex-1 max-w-xs px-7 py-8 flex flex-col transition-transform duration-300
    from-zinc-900/90 to-zinc-950/90 border border-white/10
    ${isPopular ? 'scale-105 relative ring-2 ring-amber-500/30 from-zinc-800/95 to-zinc-900/95 border-amber-500/40 shadow-2xl' : ''}
  `;
  const buttonClasses = `
    mt-auto w-full py-2.5 rounded-xl font-bold text-[14px] transition font-sans
    ${buttonVariant === 'primary' 
      ? 'bg-amber-500 hover:bg-amber-400 text-black' 
      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
    }
  `;

  return (
    <div className={cardClasses.trim()}>
      {isPopular && (
        <div className="absolute -top-4 right-4 px-3 py-1 text-[12px] font-bold rounded-full bg-amber-500 text-black">
          Most Popular
        </div>
      )}
      <div className="mb-3">
        <h2 className="text-[42px] font-black tracking-tight text-white font-display">{planName}</h2>
        <p className="text-[15px] text-slate-300 mt-1 font-sans">{description}</p>
      </div>
      <div className="my-6 flex items-baseline gap-2">
        <span className="text-[36px] font-black text-amber-400 font-display tabular-nums">₹{price}</span>
        <span className="text-[14px] text-slate-400 font-sans">/sqft</span>
      </div>
      <div className="card-divider w-full mb-5 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2)_50%,transparent)]"></div>
      <ul className="flex flex-col gap-2.5 text-[14px] text-slate-200 mb-6 font-sans">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckIcon className="text-amber-400 w-4 h-4 shrink-0" /> {feature}
          </li>
        ))}
      </ul>
      <RippleButton
        onClick={() => onSelectPlan?.(planName)}
        className={buttonClasses.trim()}
      >
        {buttonText}
      </RippleButton>
    </div>
  );
};

interface ModernPricingPageProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  plans: PricingCardProps[];
  showAnimatedBackground?: boolean;
  onSelectPlan?: (planName: string) => void;
}

export const ModernPricingPage = ({
  title,
  subtitle,
  plans,
  showAnimatedBackground = false,
  onSelectPlan,
}: ModernPricingPageProps) => {
  return (
    <div className="relative bg-black text-white w-full overflow-hidden py-12">
      {showAnimatedBackground && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(217,119,6,0.12),transparent_60%)]" />
      )}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl mx-auto text-center mb-14">
          <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter text-white uppercase">
            {title}
          </h2>
          <p className="mt-3 text-base md:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            {subtitle}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 justify-center items-stretch w-full max-w-6xl">
          {plans.map((plan) => (
            <PricingCard 
              key={plan.planName} 
              {...plan}
              onSelectPlan={onSelectPlan || plan.onSelectPlan}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
