import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMagnetPosition,
  calculateMarqueeOffset,
  calculateCardScale,
  calculateCardTop,
  calculateCharacterOpacity,
} from './math.ts';

test('calculateMagnetPosition within padding zone calculates offset correctly', () => {
  const rect = { left: 100, top: 100, width: 200, height: 200 }; // center is (200, 200)
  const result = calculateMagnetPosition(230, 260, rect, 150, 3);

  assert.equal(result.isWithinBounds, true);
  // (230 - 200) / 3 = 10
  assert.equal(result.x, 10);
  // (260 - 200) / 3 = 20
  assert.equal(result.y, 20);
});

test('calculateMagnetPosition returns 0 when cursor is outside padding boundary', () => {
  const rect = { left: 100, top: 100, width: 200, height: 200 };
  // padding is 150, so maxX is 100 + 200 + 150 = 450
  const result = calculateMagnetPosition(500, 200, rect, 150, 3);

  assert.equal(result.isWithinBounds, false);
  assert.equal(result.x, 0);
  assert.equal(result.y, 0);
});

test('calculateMarqueeOffset calculates scroll translation', () => {
  // (scrollY - sectionTop + innerHeight) * 0.3
  const offset = calculateMarqueeOffset(1000, 800, 900, 0.3);
  // (1000 - 800 + 900) * 0.3 = 1100 * 0.3 = 330
  assert.equal(offset, 330);
});

test('calculateCardScale scales stacked cards predictably', () => {
  const total = 3;
  // targetScale = 1 - (totalCards - 1 - index) * 0.03
  // index 0: 1 - 2 * 0.03 = 0.94
  assert.equal(Math.round(calculateCardScale(0, total) * 100) / 100, 0.94);
  // index 1: 1 - 1 * 0.03 = 0.97
  assert.equal(Math.round(calculateCardScale(1, total) * 100) / 100, 0.97);
  // index 2 (last card): 1 - 0 = 1.00
  assert.equal(calculateCardScale(2, total), 1);
});

test('calculateCardTop offsets each card by index * 28px', () => {
  assert.equal(calculateCardTop(0), 0);
  assert.equal(calculateCardTop(1), 28);
  assert.equal(calculateCardTop(2), 56);
});

test('calculateCharacterOpacity clamps and interpolates correctly', () => {
  assert.equal(calculateCharacterOpacity(0, 10, 0), 0.2);
  assert.equal(calculateCharacterOpacity(0, 10, 0.1), 1.0);
  assert.equal(calculateCharacterOpacity(5, 10, 0.55), 0.6);
});
