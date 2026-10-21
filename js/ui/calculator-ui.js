import { calculate, format } from '../core/calculator.js';
import { getSpecialResult } from '../core/special-results.js';
import { createDesignController } from '../design/design-controller.js';
export function initCalculatorUI() {
  const input = document.getElementById('expression');
  const result = document.getElementById('result');
  const hint = document.getElementById('hint');
  const modeButton = document.getElementById('angleMode');
  const effectLayer = document.getElementById('effectLayer');
  const DesignController = createDesignController({ effectLayer, result });
  let angleMode = 'DEG';
  let lastAnswer = 0;
let activeSpecialId = null;
  function showSpecialResult(item) {
    if (activeSpecialId !== item.id) {
      DesignController.apply(item.design);
      activeSpecialId = item.id;
    }
    result.textContent = item.message;
    result.classList.add('message');
    hint.textContent = item.hint || 'Hasil khusus';
  }
  function showNormalResult() {
    activeSpecialId = null;
    DesignController.reset();
    result.classList.remove('message');
  }
  function insertAtCursor(text) {
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.setRangeText(text, start, end, 'end');
    input.focus();
    preview();
  }
function preview() {
    const s=input.value.trim();
    if(!s) { showNormalResult(); result.textContent='0'; hint.textContent='-'; return; }
    const special=getSpecialResult(s, angleMode);
    if(special) { showSpecialResult(special); return; }
    showNormalResult();
    try { result.textContent=format(calculate(s, angleMode)); hint.textContent='Pratinjau hasil'; }
    catch(e) { result.textContent='…'; hint.textContent=e.message; }
  }
  function equals() {
    const s=input.value.trim(); if(!s) return;
    const special=getSpecialResult(s, angleMode);
    if(special) { showSpecialResult(special,true); return; }
    showNormalResult();
    try {
      lastAnswer=calculate(s, angleMode); input.value=format(lastAnswer); result.textContent=format(lastAnswer);
      hint.textContent='Hasil'; input.setSelectionRange(input.value.length,input.value.length);
    } catch(e) { result.textContent='Error'; hint.textContent=e.message; }
  }
  document.querySelector('.keys').addEventListener('click', e => {
    const b=e.target.closest('button'); if(!b) return;
    if(b.dataset.insert!==undefined) insertAtCursor(b.dataset.insert);
    else if(b.dataset.action==='clear') {input.value='';preview();input.focus();}
    else if(b.dataset.action==='backspace') {
      const start=input.selectionStart ?? input.value.length, end=input.selectionEnd ?? start;
      if(start!==end) input.setRangeText('',start,end,'end');
      else if(start>0) input.setRangeText('',start-1,start,'end');
      input.focus();preview();
    } else if(b.dataset.action==='equals') equals();
    else if(b.dataset.action==='ans') insertAtCursor(format(lastAnswer));
  });
  modeButton.addEventListener('click',()=>{angleMode=angleMode==='DEG'?'RAD':'DEG';modeButton.textContent=angleMode;preview();});
  input.addEventListener('input',preview);
  input.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key==='='){e.preventDefault();equals();}if(e.key==='Escape'){input.value='';preview();}});
  DesignController.reset();
  preview();
}
