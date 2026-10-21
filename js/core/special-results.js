// Urutan daftar menentukan prioritas apabila beberapa ekspresi cocok.
export const specialResults = [
    { id:'infinite', expression:/^tan\(\+?90(?:\.0*)?\)$/, mode:'DEG',
      message:'Perasaanku padamu tiada berhingga.', design:{ theme:'serendipity', effects:['shimmer','glow','particles','reveal'] },
      hint:'Tak semua dapat dinyatakan dalam angka.' },
    { id:'only-one', expression:/^cos\(\+?0(?:\.0*)?\)$/, mode:'DEG',
      message:'You are the only one.', design:{ theme:'romantic', effects:['reveal','shimmer','particles'] },
      hint:'^^' },
    { id:'imaginary', expression:/^sqrt\(-1\)$/, mode:null,
      message:'Kau melengkapi bagian Real dari Kompleksitas hidupku yang Imajiner.', design:{ theme:'imaginary', effects:['shimmer','reveal','float','particles'] },
      hint:'Maap kepanjangan' },
    { id:'two', expression:/^1\+1$/, mode:null,
      message:'Lupa apa, tapi kamu gaada duanya.', design:{ theme:'serendipity', effects:['shimmer','reveal','particles'] },
      hint:'Hehe' },
    { id:'heart-forward', expression:/^hamiz\+rifa$/, mode:null,
      message:'♥', design:{ theme:'heart', effects:['shimmer','reveal','heartbeat','glow','particles'] }, hint:'^^✿' },
    { id:'heart-reverse', expression:/^rifa\+hamiz$/, mode:null,
      message:'♥', design:{ theme:'heart', effects:['shimmer','reveal','heartbeat','glow','particles'] }, hint:'^^✿' },
    { id:'half-division', expression:/^50\/100$/, mode:null,
      message:'Engkaulah separuh jiwaku.', design:{ theme:'infinite', effects:['shimmer','reveal','glow','particles'] }, hint:'½' },
    { id:'half-subtraction', expression:/^100\-50$/, mode:null,
      message:'Engkaulah separuh jiwaku.', design:{ theme:'infinite', effects:['shimmer','reveal','glow','particles'] }, hint:'½' }
  ];
  function normalizeExpression(source) {
    return source.toLowerCase().replace(/\s+/g,'').replaceAll('°','')
      .replaceAll('×','*').replaceAll('÷','/').replaceAll('−','-');
  }
  export function getSpecialResult(source, angleMode) {
    const compact = normalizeExpression(source);
    return specialResults.find(item => item.expression.test(compact) &&
      (item.mode === null || item.mode === angleMode)) || null;
  }
