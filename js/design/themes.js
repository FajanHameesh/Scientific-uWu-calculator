// Daftar tema dan penerapan variabel CSS.
export const DesignSystem = {
    themes: {
      default:   {'--bg':'#0b1020','--bg-glow':'#18233d','--panel':'#151c2e','--panel-border':'#2a3550','--key':'#222b40','--key-hover':'#303b54','--accent':'#7c9cff','--text':'#f3f5fb','--muted':'#9aa7c2','--message':'#ffd6e7','--glow':'transparent','--glow-2':'transparent','--screen-overlay':'transparent'},
      infinite:  {'--bg':'#080b1b','--bg-glow':'#22205b','--panel':'#11152b','--panel-border':'#5148a8','--key':'#1b2140','--key-hover':'#30366b','--accent':'#a99bff','--text':'#f3f0ff','--muted':'#aaa5d7','--message':'#e0d9ff','--glow':'#7466ff66','--glow-2':'#7466ff55','--screen-overlay':'linear-gradient(135deg,#7567ff22,transparent 65%)'},
      romantic:  {'--bg':'#200d1c','--bg-glow':'#63264a','--panel':'#321629','--panel-border':'#79415f','--key':'#4b233b','--key-hover':'#713653','--accent':'#ff9fc8','--text':'#fff1f7','--muted':'#d5a7bc','--message':'#ffd2e5','--glow':'#ff70ad55','--glow-2':'#ff70ad44','--screen-overlay':'linear-gradient(130deg,#ff8fbe22,transparent 70%)'},
      imaginary: {'--bg':'#100b22','--bg-glow':'#38215b','--panel':'#201634','--panel-border':'#604a82','--key':'#302246','--key-hover':'#4a3267','--accent':'#c5a0ff','--text':'#f7f0ff','--muted':'#b9a7d2','--message':'#e8d4ff','--glow':'#b46dff44','--glow-2':'#a45cff44','--screen-overlay':'linear-gradient(115deg,#bc8cff22,#58d9ff12,transparent 75%)'},
      serendipity:{'--bg':'#0d1c22','--bg-glow':'#17434a','--panel':'#132a30','--panel-border':'#32666b','--key':'#1c383e','--key-hover':'#2b5358','--accent':'#83e0cf','--text':'#edfffc','--muted':'#9fc9c6','--message':'#b9f6e8','--glow':'#5de3d344','--glow-2':'#5de3d333','--screen-overlay':'linear-gradient(130deg,#5de3d322,transparent 70%)'},
      heart:     {'--bg':'#200b17','--bg-glow':'#61203c','--panel':'#301323','--panel-border':'#77334f','--key':'#481b31','--key-hover':'#6e2949','--accent':'#ff729f','--text':'#fff0f5','--muted':'#d6a1b4','--message':'#ff9fbe','--glow':'#ff4d8d55','--glow-2':'#ff4d8d44','--screen-overlay':'radial-gradient(circle at 80% 20%,#ff6b9b22,transparent 60%)'}
    },
    applyTheme(themeName = 'default') {
      const theme = this.themes[themeName] || this.themes.default;
      Object.entries(theme).forEach(([property, value]) => document.documentElement.style.setProperty(property, value));
      document.body.dataset.theme = this.themes[themeName] ? themeName : 'default';
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) metaTheme.content = theme['--bg'];
    },
    reset() { this.applyTheme('default'); }
  };
