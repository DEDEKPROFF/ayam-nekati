(()=>{
if(document.getElementById("wgai"))return;

const host=document.createElement("div");
host.id="wgai";
host.style="position:fixed;z-index:2147483647;inset:0;pointer-events:none";
document.documentElement.appendChild(host);

const root=host.attachShadow({mode:"open"});

root.innerHTML=`
<style>
*{box-sizing:border-box}
button,textarea{font:inherit}

.fab{
 pointer-events:auto;position:fixed;right:13px;bottom:18px;
 width:44px;height:44px;border-radius:50%;
 border:1px solid #d8b4fe;
 background:linear-gradient(135deg,#a855f7,#19072b);
 color:white;font-size:22px;cursor:pointer;
 box-shadow:0 0 12px #a855f7,0 0 25px #7e22ce;
 animation:glow 2s infinite alternate;
}

.panel{
 pointer-events:auto;display:none;position:fixed;
 right:10px;bottom:72px;
 width:min(300px,calc(100vw - 20px));
 height:min(440px,calc(100dvh - 90px));
 background:rgba(10,5,20,var(--op,1));
 border:1px solid #a855f7;border-radius:15px;
 color:white;overflow:hidden;font:12px Arial;
 box-shadow:0 0 12px #9333ea,0 0 30px #581c8766;
 animation:appear .25s ease;
}

header{
 padding:11px;background:rgba(35,12,55,var(--op,1));
 display:flex;justify-content:space-between;
 align-items:center;cursor:move;
 touch-action:none;border-bottom:1px solid #9333ea;
}

.title{
 color:#e9c5ff;font-weight:bold;font-size:11px;
 text-shadow:0 0 8px #c084fc;
}

.tools{display:flex;gap:3px}

.tools button{
 background:#35164f;color:#e9c5ff;
 border:1px solid #a855f7;
 padding:4px 7px;border-radius:6px;
 cursor:pointer;font-size:12px;
}

.tools button:disabled{opacity:.5;cursor:not-allowed}

.body{
 padding:10px;height:calc(100% - 43px);
 display:flex;flex-direction:column;gap:8px;
}

.subtitle{
 color:#c084fc;font-size:9px;
 letter-spacing:1px;text-align:center;
}

.setting{
 padding:8px;background:#241035;
 border:1px solid #6b21a8;border-radius:8px;
}

.line{
 display:flex;justify-content:space-between;
 font-size:10px;
}

input{width:100%;accent-color:#c084fc}

.chat{
 flex:1;min-height:50px;overflow-y:auto;
 display:flex;flex-direction:column;gap:7px;
}

.msg{
 padding:8px;border-radius:9px;
 white-space:pre-wrap;overflow-wrap:anywhere;
 line-height:1.45;max-width:95%;
}

.ai{
 background:#241035;border:1px solid #6b21a8;
 align-self:flex-start;
}

.user{
 background:#512080;border:1px solid #a855f7;
 align-self:flex-end;
}

textarea{
 height:65px;min-height:50px;resize:vertical;
 background:#13091f;color:white;
 border:1px solid #9333ea;border-radius:8px;
 padding:9px;outline:none;
}

textarea:focus{
 border-color:#d8b4fe;
 box-shadow:0 0 10px #9333ea66;
}

.send{
 background:linear-gradient(90deg,#9333ea,#4c1d95);
 border:1px solid #c084fc;padding:9px;
 color:white;border-radius:8px;
 font-weight:bold;cursor:pointer;
 box-shadow:0 0 10px #9333ea66;
}

.pick{
 display:inline-block;margin-top:6px;
 background:linear-gradient(90deg,#9333ea,#4c1d95);
 border:1px solid #c084fc;
 color:white;padding:5px 10px;border-radius:6px;
 cursor:pointer;font-size:11px;
}

button:disabled{opacity:.5}

.restore{
 pointer-events:auto;position:fixed;
 right:0;bottom:0;
 width:64px;height:64px;
 background:transparent;
 display:none;
 cursor:pointer;
 -webkit-tap-highlight-color:transparent;
}

@keyframes glow{
 from{box-shadow:0 0 7px #9333ea}
 to{box-shadow:0 0 20px #c084fc,0 0 35px #7e22ce}
}

@keyframes appear{
 from{opacity:0;transform:translateY(8px) scale(.97)}
 to{opacity:1;transform:translateY(0) scale(1)}
}
</style>

<button class="fab" title="Buka Wayground AI">✦</button>

<section class="panel">
 <header>
  <b class="title">✦ WAYGROUND AI</b>
  <div class="tools">
   <button class="essay" title="Analisa soal esai">📝</button>
   <button class="analyze" title="Analisa soal pilihan ganda">🔍</button>
   <button class="hide" title="Sembunyikan semua">−</button>
   <button class="close" title="Tutup panel">×</button>
  </div>
 </header>

 <div class="body">
  <div class="subtitle">PURPLE CYBERPUNK • OPENROUTER</div>

  <div class="setting">
   <div class="line">
    <span>TRANSPARANSI</span>
    <b class="val">0%</b>
   </div>
   <input class="range" type="range" min="0" max="70" value="0">
  </div>

  <div class="chat">
   <div class="msg ai">
    Halo! ✦ Aku tutor belajar AI.
    🔍 = PG, 📝 = Esai. Kalau soal ketutup panel, geser dulu panelnya.
   </div>
  </div>

  <textarea placeholder="Tulis pertanyaan atau soal latihan..."></textarea>

  <button class="send">✦ KIRIM PESAN</button>
 </div>
</section>

<div class="restore" title=""></div>
`;

const $=s=>root.querySelector(s);

const panel=$(".panel");
const fab=$(".fab");
const restore=$(".restore");
const chat=$(".chat");
const input=$("textarea");
const send=$(".send");
const slider=$(".range");
const analyzeBtn=$(".analyze");
const essayBtn=$(".essay");

let history=[];
let lastHighlighted=[];

function showPanel(){ panel.style.display="block"; }
function hidePanel(){ panel.style.display="none"; }
function hideAll(){
 panel.style.display="none";
 fab.style.display="none";
 restore.style.display="block";
}
function showAll(){
 fab.style.display="";
 panel.style.display="block";
 restore.style.display="none";
}

fab.onclick=()=>{
 if(panel.style.display==="block")hidePanel();
 else showPanel();
};
$(".hide").onclick=hideAll;
$(".close").onclick=hidePanel;
restore.onclick=showAll;

slider.oninput=()=>{
 const n=Number(slider.value);
 $(".val").textContent=n+"%";
 panel.style.setProperty("--op",1-n/100);
};

function addMessage(text,type){
 const el=document.createElement("div");
 el.className="msg "+type;
 el.textContent=text;
 chat.appendChild(el);
 chat.scrollTop=chat.scrollHeight;
 return el;
}

async function callAI(messages){
 const response=await fetch(
  "http://127.0.0.1:3000/api/chat",
  {
   method:"POST",
   headers:{ "Content-Type":"application/json" },
   body:JSON.stringify({ messages })
  }
 );
 const data=await response.json();
 if(!response.ok)throw new Error(data.error||"Request gagal");
 if(!data.answer)throw new Error("Jawaban AI kosong");
 return String(data.answer);
}

/* ═══════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════ */

const norm=t=>String(t||"").replace(/\s+/g," ").trim();

function commonAncestor(nodes){
 if(!nodes.length)return null;
 const chain=[];
 let n=nodes[0];
 while(n){ chain.push(n); n=n.parentElement; }
 for(const a of chain){
  if(nodes.every(x=>a.contains(x)))return a;
 }
 return null;
}

function getRadioLabel(r){
 let t="";
 const lbl=r.closest("label");
 if(lbl)t=lbl.innerText;
 if(!t&&r.id){
  try{
   const l=document.querySelector(`label[for="${CSS.escape(r.id)}"]`);
   if(l)t=l.innerText;
  }catch(_){}
 }
 if(!t){
  const p=r.parentElement;
  if(p)t=p.innerText;
 }
 return norm(t);
}

/* Dump teks halaman (fallback untuk SPA / DOM aneh) */
function scrapeRawText(){
 try{
  const raw=norm(document.body.innerText);
  if(raw.length<20)return null;
  return raw.length>4000?raw.slice(0,4000):raw;
 }catch(_){ return null; }
}

/* ═══════════════════════════════════════════════
   SCRAPER PILIHAN GANDA
   ═══════════════════════════════════════════════ */

function scrapeQuestion(){
 const radios=[...document.querySelectorAll('input[type="radio"]:not([disabled])')];
 if(radios.length>=2){
  let group=[];
  let node=radios[0].parentElement;
  while(node){
   const contained=radios.filter(r=>node.contains(r));
   if(contained.length>=2&&contained.length<=10){ group=contained; break; }
   node=node.parentElement;
  }
  if(!group.length)group=radios.slice(0,8);

  const options=group.map(r=>({text:getRadioLabel(r),el:r})).filter(o=>o.text);
  if(options.length>=2){
   const common=commonAncestor(group);
   let q="";
   let cursor=common;
   while(cursor&&!q){
    const prev=cursor.previousElementSibling;
    if(prev){
     const t=norm(prev.innerText);
     if(t.length>5&&t.length<800)q=t;
    }
    cursor=cursor.parentElement;
   }
   if(!q){
    for(const c of document.querySelectorAll(
     'h1,h2,h3,h4,h5,[class*="question" i],[class*="prompt" i],[class*="stem" i],[data-testid*="question"]'
    )){
     const t=norm(c.innerText);
     if(t.length>5&&t.length<800){ q=t; break; }
    }
   }
   return {question:q||"(soal tidak terdeteksi)",options,kind:"radio"};
  }
 }

 const qSelectors=[
  '[class*="question" i]','[class*="prompt" i]','[class*="stem" i]','.qtext','[data-testid*="question"]'
 ];
 const oSelectors=[
  '[class*="answer" i]','[class*="option" i]','[class*="choice" i]','[role="radio"]','[role="option"]'
 ];

 let qEl=null;
 for(const s of qSelectors){
  for(const el of document.querySelectorAll(s)){
   const t=norm(el.innerText);
   if(t.length>5&&t.length<800){ qEl=el; break; }
  }
  if(qEl)break;
 }

 let oEls=[];
 for(const s of oSelectors){
  const els=[...document.querySelectorAll(s)].filter(e=>norm(e.innerText).length>0);
  if(els.length>=2&&els.length<=10){ oEls=els; break; }
 }

 if(qEl&&oEls.length>=2){
  return {
   question:norm(qEl.innerText),
   options:oEls.map(e=>({text:norm(e.innerText),el:e})),
   kind:"class"
  };
 }
 return null;
}

/* ═══════════════════════════════════════════════
   SCRAPER SOAL ESAI (tidak hard-fail kalau tak ada field)
   ═══════════════════════════════════════════════ */

function scrapeEssay(){
 const fields=[...document.querySelectorAll('textarea,[contenteditable="true"]')]
  .filter(el=>{
   try{
    const r=el.getBoundingClientRect();
    return r.width>0&&r.height>0&&!el.disabled&&!el.readOnly;
   }catch(_){ return false; }
  });

 const field=fields.find(f=>f===document.activeElement)||fields[0]||null;

 let question="";

 if(field){
  const fieldRect=field.getBoundingClientRect();
  let bestAbove=null;
  let bestDist=Infinity;
  const qSels=[
   '[class*="question" i]','[class*="prompt" i]','[class*="stem" i]','[class*="qtext" i]',
   '[data-testid*="question"]'
  ];
  for(const sel of qSels){
   for(const el of document.querySelectorAll(sel)){
    if(el.contains(field)||field.contains(el))continue;
    const t=norm(el.innerText);
    if(t.length<10||t.length>2000)continue;
    const r=el.getBoundingClientRect();
    if(r.height<=0)continue;
    const dist=fieldRect.top-r.bottom;
    if(dist>-30&&dist<bestDist){
     bestAbove=el;
     bestDist=dist;
    }
   }
  }
  if(bestAbove)question=norm(bestAbove.innerText);

  if(!question){
   let node=field;
   let depth=0;
   while(node&&depth<10&&!question){
    let sib=node.previousElementSibling;
    while(sib){
     if(!sib.contains(field)){
      const t=norm(sib.innerText);
      if(t.length>10&&t.length<2000){ question=t; break; }
     }
     sib=sib.previousElementSibling;
    }
    node=node.parentElement;
    depth++;
   }
  }
 }

 if(!question){
  for(const h of document.querySelectorAll('h1,h2,h3,h4,[class*="question" i],[class*="prompt" i]')){
   const t=norm(h.innerText);
   if(t.length>10&&t.length<2000){ question=t; break; }
  }
 }

 if(!question){
  const raw=scrapeRawText();
  if(raw)question=raw;
 }

 if(!question)return null;
 return {question,field};
}

/* ═══════════════════════════════════════════════
   HIGHLIGHT + CLICK
   ═══════════════════════════════════════════════ */

function clearHighlight(){
 for(const el of lastHighlighted){
  try{
   el.style.outline="";
   el.style.outlineOffset="";
   el.style.boxShadow="";
   el.style.transition="";
   el.style.borderRadius="";
  }catch(_){}
 }
 lastHighlighted=[];
}
function highlight(el){
 if(!el)return;
 try{
  el.style.outline="3px solid #a855f7";
  el.style.outlineOffset="2px";
  el.style.boxShadow="0 0 14px #a855f7";
  el.style.transition="all .25s";
  el.style.borderRadius="6px";
  lastHighlighted.push(el);
  el.scrollIntoView({behavior:"smooth",block:"center"});
 }catch(_){}
}
function clickOption(el){
 if(!el)return;
 try{
  if(el.tagName==="INPUT"&&el.type==="radio"){ el.click(); return; }
  const r=el.querySelector&&el.querySelector('input[type="radio"]');
  if(r){ r.click(); return; }
  const lbl=el.closest&&el.closest("label");
  if(lbl){ lbl.click(); return; }
  if(el.click)el.click();
 }catch(_){}
}

/* ═══════════════════════════════════════════════
   ANALISA PILIHAN GANDA
   ═══════════════════════════════════════════════ */

async function analyze(){
 if(analyzeBtn.disabled)return;
 clearHighlight();

 const scraped=scrapeQuestion();

 /* ── jalur A: struktur terdeteksi ── */
 if(scraped&&scraped.options&&scraped.options.length>=2){
  const LETTERS="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const optBlock=scraped.options.map((o,i)=>`${LETTERS[i]}. ${o.text}`).join("\n");

  addMessage(
   `🔍 Soal terdeteksi (${scraped.options.length} pilihan):\n\n${scraped.question}\n\n${optBlock}`,
   "user"
  );

  const prompt=
   `Kamu asisten yang menganalisa soal pilihan ganda.\n`+
   `Tentukan jawaban yang paling benar.\n\n`+
   `SOAL:\n${scraped.question}\n\n`+
   `PILIHAN:\n${optBlock}\n\n`+
   `Jawab dengan format persis:\nJAWABAN: <satu huruf>\nALASAN: <1-2 kalimat>`;

  analyzeBtn.disabled=true;
  analyzeBtn.textContent="…";
  const waiting=addMessage("Menganalisa soal…","ai");

  try{
   const ans=await callAI([{ role:"user", content:prompt }]);
   waiting.textContent=ans;

   const m=ans.match(/JAWABAN\s*[:\-]\s*([A-Za-z])\b/);
   if(m){
    const letter=m[1].toUpperCase();
    const idx=LETTERS.indexOf(letter);
    if(idx>=0&&idx<scraped.options.length){
     const chosen=scraped.options[idx];
     highlight(chosen.el);
     const line=document.createElement("div");
     line.style.marginTop="6px";
     const btn=document.createElement("button");
     btn.className="pick";
     btn.textContent=`✓ Pilih ${letter}`;
     btn.onclick=()=>clickOption(chosen.el);
     line.appendChild(btn);
     waiting.appendChild(line);
     chat.scrollTop=chat.scrollHeight;
    }
   }
  }catch(err){
   waiting.textContent="Error: "+err.message;
  }finally{
   analyzeBtn.disabled=false;
   analyzeBtn.textContent="🔍";
   chat.scrollTop=chat.scrollHeight;
  }
  return;
 }

 /* ── jalur B: fallback ke teks mentah halaman ── */
 const raw=scrapeRawText();
 if(!raw){
  addMessage(
   "❌ Tidak ada soal yang bisa dibaca di halaman ini.\n"+
   "Pastikan kamu ada di halaman soal quiz.",
   "ai"
  );
  return;
 }

 addMessage(
  `⚠️ Struktur soal tidak dikenali — pakai mode teks mentah.\n`+
  `(kirim teks halaman ke AI untuk diparse)\n\n`+
  `Teks halaman (potongan):\n${raw.slice(0,300)}…`,
  "user"
 );

 const prompt=
  `Kamu asisten yang menganalisa soal quiz pilihan ganda.\n`+
  `Di bawah ini adalah teks mentah dari halaman quiz. `+
  `Identifikasi soal yang sedang tampil dan pilihan jawabannya, `+
  `lalu tentukan jawaban yang paling benar.\n\n`+
  `TEKS HALAMAN:\n${raw}\n\n`+
  `Jawab dengan format persis:\n`+
  `SOAL: <soal yang kamu temukan>\n`+
  `PILIHAN: <daftar pilihan yang kamu temukan>\n`+
  `JAWABAN: <jawaban yang benar>\n`+
  `ALASAN: <1-2 kalimat>`;

 analyzeBtn.disabled=true;
 analyzeBtn.textContent="…";
 const waiting=addMessage("Menganalisa teks halaman…","ai");

 try{
  const ans=await callAI([{ role:"user", content:prompt }]);
  waiting.textContent=ans;
 }catch(err){
  waiting.textContent="Error: "+err.message;
 }finally{
  analyzeBtn.disabled=false;
  analyzeBtn.textContent="🔍";
  chat.scrollTop=chat.scrollHeight;
 }
}

analyzeBtn.onclick=analyze;

/* ═══════════════════════════════════════════════
   TULIS KE FIELD (React-friendly)
   ═══════════════════════════════════════════════ */

function writeToField(field,text){
 if(!field||!text)return false;
 try{
  field.focus();
  if(field.tagName==="TEXTAREA"||field.tagName==="INPUT"){
   const proto=field.tagName==="TEXTAREA"
    ? window.HTMLTextAreaElement.prototype
    : window.HTMLInputElement.prototype;
   const setter=Object.getOwnPropertyDescriptor(proto,"value").set;
   setter.call(field,text);
   field.dispatchEvent(new Event("input",{bubbles:true}));
   field.dispatchEvent(new Event("change",{bubbles:true}));
   return true;
  }
  if(field.isContentEditable){
   const sel=window.getSelection();
   const range=document.createRange();
   range.selectNodeContents(field);
   sel.removeAllRanges();
   sel.addRange(range);
   let ok=false;
   try{ ok=document.execCommand("insertText",false,text); }catch(_){}
   if(!ok){
    field.textContent=text;
    field.dispatchEvent(new Event("input",{bubbles:true}));
    field.dispatchEvent(new Event("change",{bubbles:true}));
   }
   return true;
  }
 }catch(_){}
 return false;
}

/* ═══════════════════════════════════════════════
   ANALISA ESAI
   ═══════════════════════════════════════════════ */

async function analyzeEssay(){
 if(essayBtn.disabled)return;

 const scraped=scrapeEssay();
 if(!scraped){
  addMessage(
   "❌ Tidak ada soal / teks yang bisa dibaca di halaman ini.",
   "ai"
  );
  return;
 }

 addMessage(
  `📝 ${scraped.field?"Soal esai terdeteksi":"Soal terdeteksi (tanpa kotak jawaban)"}:\n\n`+
  `${scraped.question.slice(0,500)}${scraped.question.length>500?"…":""}`,
  "user"
 );

 const prompt=
  `Kamu tutor yang menjawab soal esai dengan lengkap dan tepat.\n\n`+
  `SOAL:\n${scraped.question}\n\n`+
  `Tulis jawaban esai yang baik, jelas, padat, dalam bahasa Indonesia.\n`+
  `Panjang 2-4 paragraf sesuai kompleksitas soal.\n\n`+
  `Format persis:\nJAWABAN ESAI:\n<isi jawaban lengkap>\n\nPOIN KUNCI:\n- <poin 1>\n- <poin 2>\n- <poin 3>`;

 essayBtn.disabled=true;
 essayBtn.textContent="…";
 const waiting=addMessage("Menyusun jawaban esai…","ai");

 try{
  const ans=await callAI([{ role:"user", content:prompt }]);
  waiting.textContent=ans;

  let essay=ans;
  const m=ans.match(/JAWABAN ESAI\s*[:\-]?\s*([\s\S]*?)(?:\n\s*POIN KUNCI|$)/i);
  if(m&&m[1].trim())essay=m[1].trim();

  if(essay&&scraped.field){
   const line=document.createElement("div");
   line.style.marginTop="6px";
   const btn=document.createElement("button");
   btn.className="pick";
   btn.textContent="✎ Tulis ke jawaban";
   btn.onclick=()=>{
    const ok=writeToField(scraped.field,essay);
    btn.textContent=ok?"✓ Terisi":"✗ Gagal isi";
    btn.disabled=true;
   };
   line.appendChild(btn);
   waiting.appendChild(line);
   chat.scrollTop=chat.scrollHeight;
  }
 }catch(err){
  waiting.textContent="Error: "+err.message;
 }finally{
  essayBtn.disabled=false;
  essayBtn.textContent="📝";
  chat.scrollTop=chat.scrollHeight;
 }
}

essayBtn.onclick=analyzeEssay;

/* ═══════════════════════════════════════════════
   CHAT
   ═══════════════════════════════════════════════ */

async function ask(){
 const text=input.value.trim();
 if(!text||send.disabled)return;

 input.value="";
 addMessage(text,"user");
 history.push({ role:"user", content:text });
 history=history.slice(-10);

 send.disabled=true;
 send.textContent="MENGHUBUNGKAN...";
 const waiting=addMessage("Sedang berpikir...","ai");

 try{
  const ans=await callAI(history);
  waiting.textContent=ans;
  history.push({ role:"assistant", content:ans });
  history=history.slice(-10);
 }catch(err){
  waiting.textContent="Error: "+err.message;
  history.pop();
 }finally{
  send.disabled=false;
  send.textContent="✦ KIRIM PESAN";
  chat.scrollTop=chat.scrollHeight;
 }
}

send.onclick=ask;
input.onkeydown=e=>{
 if(e.key==="Enter"&&(e.ctrlKey||e.metaKey)){
  e.preventDefault();
  ask();
 }
};

// DRAG
const header=$("header");
let dragging=false,offsetX=0,offsetY=0;

header.onpointerdown=e=>{
 if(e.target.closest("button"))return;
 const rect=panel.getBoundingClientRect();
 dragging=true;
 offsetX=e.clientX-rect.left;
 offsetY=e.clientY-rect.top;
 header.setPointerCapture(e.pointerId);
};
header.onpointermove=e=>{
 if(!dragging)return;
 const maxX=window.innerWidth-panel.offsetWidth;
 const maxY=window.innerHeight-panel.offsetHeight;
 const x=Math.max(0,Math.min(maxX,e.clientX-offsetX));
 const y=Math.max(0,Math.min(maxY,e.clientY-offsetY));
 panel.style.left=x+"px";
 panel.style.top=y+"px";
 panel.style.right="auto";
 panel.style.bottom="auto";
};
header.onpointerup=()=>{ dragging=false; };
header.onpointercancel=()=>{ dragging=false; };

})();