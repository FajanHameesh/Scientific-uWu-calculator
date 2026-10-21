import { DesignSystem } from './themes.js';
import { EffectRegistry } from './effects.js';
  let activeEffectCleanups = [];
  let activeEffectClasses = [];
  export function createDesignController({ effectLayer, result }) {
  const DesignController = {
    apply(design = {}) {
      this.resetEffects();
      DesignSystem.applyTheme(design.theme || 'default');
      const names = Array.isArray(design.effects) ? design.effects : (design.effect ? [design.effect] : []);
      names.forEach(name => {
        const effect = EffectRegistry[name];
        if (!effect) { console.warn(`Efek tidak terdaftar: ${name}`); return; }
        if (effect.className) {
          document.body.classList.add(effect.className);
          activeEffectClasses.push(effect.className);
        }
        if (typeof effect.apply === 'function') {
          const cleanup = effect.apply({ body: document.body, screen: document.querySelector('.screen'), result, layer: effectLayer });
          if (typeof cleanup === 'function') activeEffectCleanups.push(cleanup);
        }
      });
    },
    resetEffects() {
      activeEffectCleanups.forEach(cleanup => { try { cleanup(); } catch (error) { console.error(error); } });
      activeEffectCleanups = [];
      activeEffectClasses.forEach(className => document.body.classList.remove(className));
      activeEffectClasses = [];
      effectLayer.replaceChildren();
    },
    reset() {
      this.resetEffects();
      DesignSystem.reset();
    }
  };
  return DesignController;
}
