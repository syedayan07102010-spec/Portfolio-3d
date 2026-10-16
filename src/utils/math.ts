/**
 * Math and calculation utilities for Jack 3D portfolio
 */

export interface BoundingBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Calculates magnet translation offsets based on cursor distance to center
 * Activates when cursor is within padding distance of element edge.
 */
export function calculateMagnetPosition(
  clientX: number,
  clientY: number,
  rect: BoundingBox,
  padding: number = 150,
  strength: number = 3
): { x: number; y: number; isWithinBounds: boolean } {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const minX = rect.left - padding;
  const maxX = rect.left + rect.width + padding;
  const minY = rect.top - padding;
  const maxY = rect.top + rect.height + padding;

  const isWithinBounds =
    clientX >= minX && clientX <= maxX && clientY >= minY && clientY <= maxY;

  if (!isWithinBounds || strength <= 0) {
    return { x: 0, y: 0, isWithinBounds: false };
  }

  const deltaX = (clientX - centerX) / strength;
  const deltaY = (clientY - centerY) / strength;

  return {
    x: Math.round(deltaX * 100) / 100,
    y: Math.round(deltaY * 100) / 100,
    isWithinBounds: true,
  };
}

/**
 * Calculates marquee translation offset based on page scroll position:
 * offset = (scrollY - sectionTop + innerHeight) * 0.3
 */
export function calculateMarqueeOffset(
  scrollY: number,
  sectionTop: number,
  innerHeight: number,
  factor: number = 0.3
): number {
  return (scrollY - sectionTop + innerHeight) * factor;
}

/**
 * Calculates stacking card scale:
 * targetScale = 1 - (totalCards - 1 - index) * 0.03
 */
export function calculateCardScale(
  index: number,
  totalCards: number,
  stepFactor: number = 0.03
): number {
  return 1 - (totalCards - 1 - index) * stepFactor;
}

/**
 * Calculates card top offset:
 * top: index * 28 px
 */
export function calculateCardTop(index: number, offsetPx: number = 28): number {
  return index * offsetPx;
}

/**
 * Calculates character reveal opacity based on scroll progress
 */
export function calculateCharacterOpacity(
  charIndex: number,
  totalChars: number,
  progress: number
): number {
  if (totalChars <= 0) return 1;
  const startThreshold = charIndex / totalChars;
  const endThreshold = (charIndex + 1) / totalChars;

  if (progress <= startThreshold) {
    return 0.2;
  }
  if (progress >= endThreshold) {
    return 1;
  }

  // Linear interpolation between 0.2 and 1
  const ratio = (progress - startThreshold) / (endThreshold - startThreshold);
  const value = 0.2 + 0.8 * ratio;
  return Math.round(value * 10000) / 10000;
}
