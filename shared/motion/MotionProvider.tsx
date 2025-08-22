"use client";
import React from 'react';
import { useScrollReveal } from './scrollEffects';

export const MotionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const ref = useScrollReveal() as React.MutableRefObject<HTMLDivElement | null>;
  return <div ref={ref}>{children}</div>;
};

export default MotionProvider;