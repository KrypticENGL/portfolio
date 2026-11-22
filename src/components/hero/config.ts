// All tunable hero timings and visual parameters live here.
export const EASE = [0.22, 1, 0.36, 1] as const

export const TIMING = {
  heading: 0.2, // s, heading reveal start
  portrait: 0.6,
  firstWord: 1.1,
  identity: 1.4,
  wordHold: 2.0, // s a word stays readable
  wordIn: 0.7,
  wordOut: 0.55,
  charStagger: 0.03,
}

export const WORDS = ['Develop', 'Build', 'Test', 'Deploy'] as const

export const DOTS = {
  spacing: 18, // px, desktop
  spacingMobile: 15,
  radius: 0.85, // px
  alpha: 0.16, // idle opacity
  color: '11,11,11',
  maxRipples: 10,
  speed: 150, // px/s wavefront speed
  wavelength: 96, // px
  packet: 80, // px, width of the ring packet
  decay: 2.6, // s, amplitude time constant
  life: 7.5, // s, ripple removed after this
  displacement: 2.4, // px, max radial shift
  ambientEvery: [4, 7] as [number, number], // s, random range
  amp: { ambient: 0.65, pointer: 0.22, click: 0.85, pulse: 0.5 },
}
