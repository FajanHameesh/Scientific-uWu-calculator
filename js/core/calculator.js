// Parser matematika asli; angleMode diberikan eksplisit agar tidak bergantung pada UI.
function factorial(n) {
    if (!Number.isInteger(n) || n < 0 || n > 170) throw Error('Faktorial hanya untuk bilangan bulat 0–170.');
    let out = 1;
    for (let i=2;i<=n;i++) out *= i;
    return out;
  }
  function tokenize(source) {
    let s = source.replaceAll('×','*').replaceAll('÷','/').replaceAll('−','-').replaceAll('π','pi');
    s = s.replace(/(\d)\s*(pi|e|[a-zA-Z(])/g,'$1*$2').replace(/(pi|e|\))\s*(\d|\()/g,'$1*$2');
    const tokens = []; let i=0;
    while (i < s.length) {
      if (/\s/.test(s[i])) { i++; continue; }
      const rest = s.slice(i);
      const num = rest.match(/^(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i);
      if (num) { tokens.push({type:'num',value:Number(num[0])}); i += num[0].length; continue; }
      const id = rest.match(/^[a-zA-Z]+/);
      if (id) { tokens.push({type:'id',value:id[0].toLowerCase()}); i += id[0].length; continue; }
      if ('+-*/^()!'.includes(s[i])) { tokens.push({type:s[i],value:s[i]}); i++; continue; }
      throw Error('Karakter tidak dikenal: ' + s[i]);
    }
    return tokens;
  }
  export function calculate(source, angleMode = 'DEG') {
    const t = tokenize(source); let p=0;
    const peek = () => t[p];
    const take = type => { if (peek()?.type !== type) throw Error('Ekspresi belum lengkap.'); return t[p++]; };
    const angle = x => angleMode === 'DEG' ? x*Math.PI/180 : x;
    const fromAngle = x => angleMode === 'DEG' ? x*180/Math.PI : x;
    function primary() {
      const token = peek();
      if (!token) throw Error('Masukkan ekspresi matematika.');
      if (token.type === '+') { p++; return primary(); }
      if (token.type === '-') { p++; return -primary(); }
      if (token.type === 'num') { p++; return token.value; }
      if (token.type === '(') { p++; const v=expression(0); take(')'); return v; }
      if (token.type === 'id') {
        p++; const name=token.value;
        if (name==='pi') return Math.PI;
        if (name==='e') return Math.E;
        if (name==='hamiz' || name==='rifa') return 1;
        if (peek()?.type !== '(') throw Error('Fungsi harus diikuti tanda kurung: ' + name);
        take('('); const x=expression(0); take(')');
        const funcs = {
          sin:x=>Math.sin(angle(x)), cos:x=>Math.cos(angle(x)),
          tan:x=>{ const r=angle(x); if(Math.abs(Math.cos(r))<1e-12) throw Error('tan tidak terdefinisi pada sudut ini.'); return Math.tan(r); },
          asin:x=>fromAngle(Math.asin(x)), acos:x=>fromAngle(Math.acos(x)), atan:x=>fromAngle(Math.atan(x)),
          sqrt:x=>{if(x<0) throw Error('Akar real dari bilangan negatif tidak terdefinisi.'); return Math.sqrt(x);},
          ln:x=>{if(x<=0) throw Error('ln hanya terdefinisi untuk x > 0.'); return Math.log(x);},
          log:x=>{if(x<=0) throw Error('log hanya terdefinisi untuk x > 0.'); return Math.log10(x);},
          abs:Math.abs
        };
        if (!funcs[name]) throw Error('Fungsi tidak dikenal: ' + name);
        return funcs[name](x);
      }
      throw Error('Ekspresi tidak valid.');
    }
    function postfix() { let v=primary(); while(peek()?.type==='!'){p++;v=factorial(v);} return v; }
    function power() { let left=postfix(); if(peek()?.type==='^'){p++;const right=unary();left=Math.pow(left,right);} return left; }
    function unary() { if(peek()?.type==='+'){p++;return unary();} if(peek()?.type==='-'){p++;return -unary();} return power(); }
    function expression(minPrec) {
      let left=unary(); const prec={'+':1,'-':1,'*':2,'/':2};
      while(peek() && prec[peek().type] >= minPrec) {
        const op=t[p++].type; const right=expression(prec[op]+1);
        if(op==='+') left+=right; if(op==='-') left-=right; if(op==='*') left*=right;
        if(op==='/'){if(right===0) throw Error('Tidak dapat membagi dengan nol.');left/=right;}
      }
      return left;
    }
    const value=expression(1);
    if(p!==t.length) throw Error('Periksa kembali penulisan ekspresi.');
    if(Number.isNaN(value)) throw Error('Hasil tidak terdefinisi dalam bilangan real.');
    if(!Number.isFinite(value)) throw Error('Hasil di luar rentang numerik.');
    return value;
  }
  export function format(n) { if(Object.is(n,-0)) n=0; return Number(n.toPrecision(12)).toString(); }
