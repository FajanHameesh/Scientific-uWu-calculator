import test from 'node:test';
import assert from 'node:assert/strict';
import { calculate, format } from '../js/core/calculator.js';
import { specialResults, getSpecialResult } from '../js/core/special-results.js';

test('operasi dasar, prioritas, pangkat, faktorial, konstanta', () => {
  assert.equal(calculate('1+2*3'), 7);
  assert.equal(calculate('(1+2)*3'), 9);
  assert.equal(calculate('2^3^2'), 512);
  assert.equal(calculate('5!'), 120);
  assert.ok(Math.abs(calculate('π') - Math.PI) < 1e-10);
  assert.equal(format(1/3), '0.333333333333');
});
test('mode derajat dan radian', () => {
  assert.ok(Math.abs(calculate('sin(90)', 'DEG')-1) < 1e-12);
  assert.ok(Math.abs(calculate('sin(pi/2)', 'RAD')-1) < 1e-12);
  assert.equal(calculate('acos(1)', 'DEG'), 0);
});
test('kondisi invalid', () => {
  assert.throws(() => calculate('1/0'), /membagi dengan nol/);
  assert.throws(() => calculate('sqrt(-1)'), /Akar real/);
  assert.throws(() => calculate('tan(90)', 'DEG'), /tidak terdefinisi/);
});
test('specialResults cocok, mode terfilter, dan ID unik', () => {
  assert.equal(getSpecialResult('tan(90)', 'DEG')?.id, 'infinite');
  assert.equal(getSpecialResult('tan(90)', 'RAD'), null);
  assert.equal(getSpecialResult('sqrt(-1)', 'RAD')?.id, 'imaginary');
  assert.equal(getSpecialResult('50÷100', 'DEG')?.id, 'half-division');
  assert.equal(getSpecialResult('100−50', 'DEG')?.id, 'half-subtraction');
  assert.equal(new Set(specialResults.map(x=>x.id)).size, specialResults.length);
});
