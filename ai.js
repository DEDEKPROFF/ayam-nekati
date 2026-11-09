
javascript:(()=>{if(document.getElementById('wgai-root'))return;const root=document.createElement('div');root.id='wgai-root';root.style.cssText='position:fixed;z-index:2147483647;inset:0;pointer-events:none;font-family:Arial,sans-serif;color:white';document.documentElement.appendChild(root);const style=document.createElement('style');style.textContent=`
#wgai-root *{box-sizing:border-box}
.wg-btn{pointer-events:auto;position:fixed;right:22px;bottom:24px;width:58px;height:58px;border:1px solid #bd83ff;border-radius:50%;background:linear-gradient(135deg,#8b35ff,#4211a5);color:white;font-size:25px;box-shadow:0 0 20px #9d4dff;cursor:pointer}
.wg-panel{pointer-events:auto;position:fixed;right:16px;bottom:94px;width:min(365px,calc(100vw - 24px));height:min(530px,calc(100dvh - 120px));background:#100c1b;border:1px solid #8e4bdb;border-radius:17px;box-shadow:0 0 30px #7625c966;display:none;overflow:hidden}
.wg-head{padding:15px;background:linear-gradient(110deg,#5722a0,#25113e);display:flex;justify-content:space-between;align-items:center;cursor:move}
.wg-title{font-weight:bold;color:#e9caff;font-size:15px}.wg-sub{font-size:10px;color:#c5a0ec;margin-top:4px}
.wg-actions button{background:#ffffff12;border:1px solid #ffffff25;color:white;border-radius:7px;padding:5px 9px;cursor:pointer}
.wg-body{height:calc(100% - 60px);display:flex;flex-direction:column;padding:12px;gap:10px}
.wg-status{font-size:11px;color:#b994e6}
.wg-chat{flex:1;overflow:auto;display:flex;flex-direction:column;gap:9px;padding:3px}
.wg-msg{padding:10px 12px;border-radius:12px;font-size:12px;line-height:1.6;white-space:pre-wrap;overflow-wrap:anywhere;max-width:95%}
.wg-ai{background:#26183a;border:1px solid #65418a;align-self:flex-start}
.wg-user{background:#58249a;align-self:flex-end}
.wg-input{background:#1b1427;color:white;border:1px solid #67418c;border-radius:10px;padding:11px;width:100%;min-height:80px;resize:vertical;outline:none;font-size:12px}
.wg-send{background:linear-gradient(100deg,#a34bff,#6524b8);border:0;color:white;border-radius:9px;padding:11px;font-weight:bold;cursor:pointer}
.wg-foot{font-size:10px;text-align:center;color:#8e76a7}
`;root.appendChild(style);
const btn=document.createElement('button');btn.className='wg-btn';btn.textContent='✦';btn.title='Wayground AI';root.appendChild(btn);
const panel=document.createElement('div');panel.className='wg-panel';panel.innerHTML=`
<div class="wg-head"><div><div class="wg-title">✦ WAYGROUND AI</div><div class="wg-sub">PURPLE CYBERPUNK • SIMULATION</div></div><div class="wg-actions"><button id="wg-min">−</button> <button id="wg-close">×</button></div></div>
<div class="wg-body"><div class="wg-status">● SIMULATION ENGINE ONLINE</div><div class="wg-chat" id="wg-chat"><div class="wg-msg wg-ai">Halo! Aku Wayground AI Simulation. ✨\n\nMasukkan soal latihan beserta pilihan jawabannya. Aku akan melakukan simulasi analisis dan memberikan penjelasan.</div></div><textarea id="wg-question" class="wg-input" placeholder="Masukkan soal dan pilihan A, B, C, D..."></textarea><button id="wg-send" class="wg-send">✦ ANALYZE QUESTION</button><div class="wg-foot">SIMULATION ONLY • Bukan AI/API sungguhan</div></div>`;
root.appendChild(panel);
const chat=panel.querySelector('#wg-chat'),input=panel.querySelector('#wg-question');
const add=(text,cls)=>{const el=document.createElement('div');el.className='wg-msg '+cls;el.textContent=text;chat.appendChild(el);chat.scrollTop=chat.scrollHeight};
const analyze=()=>{
const q=input.value.trim();if(!q)return;
add(q,'wg-user');input.value='';
const loading=document.createElement('div');loading.className='wg-msg wg-ai';loading.textContent='⟳ Menjalankan simulasi analisis...';chat.appendChild(loading);
setTimeout(()=>{
loading.remove();
const choices=q.match(/(?:^|\n)\s*([A-E])[\.\):\-]\s*(.+)/g)||[];
const hash=[...q].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
const answer=String.fromCharCode(65+(hash%Math.max(2,Math.min(choices.length||4,5))));
const explanation=choices.length?'Pilihan terdeteksi:\n'+choices.map(x=>x.trim()).join('\n'):'Tidak ditemukan format pilihan ganda yang jelas.';
add('✦ HASIL SIMULASI\n\n'+explanation+'\n\nJawaban simulasi: '+answer+'\n\nAnalisis: Sistem simulasi membuat pilihan berdasarkan pola teks, bukan pemahaman AI sebenarnya. Hasil ini BUKAN jawaban yang sudah diverifikasi.\n\nConfidence simulasi: '+(60+hash%36)+'%\n\nTips: Periksa kembali konsep dan informasi pada soal sebelum menentukan jawaban.','wg-ai');
},1000);
};
btn.onclick=()=>{panel.style.display=panel.style.display==='block'?'none':'block'};
panel.querySelector('#wg-close').onclick=()=>panel.style.display='none';
panel.querySelector('#wg-min').onclick=()=>panel.style.display='none';
panel.querySelector('#wg-send').onclick=analyze;
input.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();analyze()}});
let drag=false,dx=0,dy=0;const head=panel.querySelector('.wg-head');
head.addEventListener('pointerdown',e=>{if(e.target.tagName==='BUTTON')return;drag=true;const r=panel.getBoundingClientRect();dx=e.clientX-r.left;dy=e.clientY-r.top;head.setPointerCapture(e.pointerId)});
head.addEventListener('pointermove',e=>{if(!drag)return;panel.style.left=Math.max(0,Math.min(innerWidth-panel.offsetWidth,e.clientX-dx))+'px';panel.style.top=Math.max(0,Math.min(innerHeight-panel.offsetHeight,e.clientY-dy))+'px';panel.style.right='auto';panel.style.bottom='auto'});
head.addEventListener('pointerup',()=>drag=false);
})();
