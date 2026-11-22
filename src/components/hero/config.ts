// Tunable hero timings and visual parameters.
export const EASE = [0.22, 1, 0.36, 1] as const

export const TIMING = {
  heading: 0.2, // s, heading reveal start
  portrait: 0.6,
  firstWord: 1.1,
  identity: 1.4,
  wordIn: 0.7,
  wordOut: 0.55,
  charStagger: 0.03,
}

export const WATER = {
  spacing: 11, // px, desktop grid pitch
  spacingTouch: 13,
  maxDots: 22000, // pitch grows on huge screens to stay under this
  radius: 0.95, // px at h = 0, nearest row
  alpha: 0.2, // opacity at h = 0
  color: '11,11,11',
  lift: 2.6, // px, crest vertical displacement
  // Ambient surface: directional travelling waves (wavelength px, heading deg, speed px/s, weight).
  waves: [
    { l: 360, dir: 200, c: 30, a: 0.55 },
    { l: 230, dir: 158, c: 24, a: 0.38 },
    { l: 150, dir: 236, c: 19, a: 0.26 },
    { l: 540, dir: 102, c: 36, a: 0.4 },
    { l: 96, dir: 184, c: 14, a: 0.12 },
  ],
  maxImpulses: 12,
  // Disturbances: radial packets (pointer, typing, impacts), a planar scan, a broad swell.
  impulse: {
    radial: { speed: 170, wavelength: 58, packet: 42, decay: 1.3, life: 4 },
    swell: { speed: 260, wavelength: 210, packet: 150, decay: 2.4, life: 6.5 },
    scan: { speed: 420, wavelength: 64, packet: 36, decay: 1.1, life: 3.5, band: 110 },
  },
  amp: { pointer: 0.45, click: 0.9 },
  // live bulge that follows the mouse: radius (px), height (−1..1 units), outward push (px)
  cursor: { radius: 95, amp: 0.7, push: 4.5 },
}
