// Setiap efek dapat menambahkan class CSS atau mengembalikan cleanup().
export const EffectRegistry = {
    reveal: {
      className: 'fx-reveal',
      apply() { return () => {}; }
    },
    glow: {
      className: 'fx-glow',
      apply() { return () => {}; }
    },
    float: {
      className: 'fx-float',
      apply() { return () => {}; }
    },
    heartbeat: {
      className: 'fx-heartbeat',
      apply() { return () => {}; }
    },
    shimmer: {
      className: 'fx-shimmer',
      apply() { return () => {}; }
    },
    shake: {
      className: 'fx-shake',
      apply() { return () => {}; }
    },
    particles: {
      apply({ layer }) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) return () => {};
        const nodes = [];
        for (let i = 0; i < 35; i++) {
          const particle = document.createElement('span');
          particle.className = 'effect-particle';
          particle.style.setProperty('--left', `${(i * 37 + 11) % 100}%`);
          particle.style.setProperty('--size', `${3 + (i % 4)}px`);
          particle.style.setProperty('--duration', `${7 + (i % 6)}s`);
          particle.style.setProperty('--delay', `${-(i % 12)}s`);
          particle.style.setProperty('--drift', `${((i * 19) % 90) - 45}px`);
          layer.appendChild(particle);
          nodes.push(particle);
        }
        return () => nodes.forEach(node => node.remove());
      }
    }
  };
