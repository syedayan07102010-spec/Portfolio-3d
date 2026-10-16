import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: keyof typeof motion | React.ElementType;
  style?: React.CSSProperties;
  id?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  as = 'div',
  style,
  id,
}) => {
  // Use motion.create or the motion element map
  const Component =
    typeof as === 'string' && (motion as unknown as Record<string, typeof motion.div>)[as]
      ? (motion as unknown as Record<string, typeof motion.div>)[as]
      : motion.create(as as React.ComponentType<React.HTMLAttributes<HTMLElement>>);

  return (
    <Component
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </Component>
  );
};
