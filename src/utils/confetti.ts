import confetti from 'canvas-confetti';

export const triggerMerdekaConfetti = () => {
  // Jalur Gemilang patriotic colors: Crimson Red, Royal Navy Blue, Warm Golden Yellow, Bright White
  const colors = ['#dc2626', '#1d4ed8', '#facc15', '#ffffff', '#b91c1c'];

  // Left cannon
  confetti({
    particleCount: 60,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.7 },
    colors,
  });

  // Right cannon
  confetti({
    particleCount: 60,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.7 },
    colors,
  });

  // Center starburst
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });
  }, 250);
};

export const triggerSubtleConfetti = () => {
  confetti({
    particleCount: 35,
    spread: 70,
    origin: { y: 0.8 },
    colors: ['#facc15', '#dc2626', '#2563eb', '#ffffff'],
  });
};
