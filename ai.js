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
 color:#e9c5ff;font-weight:bold;
 text-shadow:0 0 8px #c084fc;
}

.tools{display:flex;gap:5px}

.tools button{
 background:#35164f;color:#e9c5ff;
 border:1px solid #a855f7;
 padding:4px 9px;border-radius:6px;
 cursor:pointer;
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

.thumb{
 display:block;margin-top:6px;max-width:100%;
 max-height:120px;border-radius:6px;
 border:1px solid #a855f7;
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
   <button class="analyze" title="Analisa soal di tab ini">🔍</button>
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
    Masukkan soal latihan atau materi yang ingin kamu pahami.
    Klik 🔍 untuk analisa soal di tab ini (pilihan ganda / isian / uraian + gambar).
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

/* ═══════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════ */

const norm=t=>String(t||"").replace(/\s+/g," ").trim();

function isVisible(el){
 if(!el)return false;
 const r=el.getBoundingClientRect();
 return r.width>0&&r.height>0;
}

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

const NAV_WORDS=/^(home|login|sign\s*in|sign\s*up|register|menu|search|about|contact|privacy|terms|next|back|prev|previous|submit|cancel|ok|close|skip|logout|profile|settings|help)\b/i;
function looksLikeNav(t){
 if(!t||t.length<8)return true;
 if(NAV_WORDS.test(t))return true;
 return false;
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

function findPlainQuestion(){
 const selectors=[
  '[class*="question" i]','[class*="prompt" i]','[class*="stem" i]',
  '.qtext','[data-testid*="question"]',
  'h1','h2','h3','h4','h5','[role="heading"]',
  'p'
 ];
 for(const s of selectors){
  for(const el of document.querySelectorAll(s)){
   const t=norm(el.innerText);
   if(t.length<12||t.length>800)continue;
   if(!isVisible(el))continue;
   if(looksLikeNav(t))continue;
   if(s==="p"&&!/[?.]/.test(t))continue;
   return {el,text:t};
  }
 }
 return null;
}

function findAnswerField(){
 const nodes=[
  ...document.querySelectorAll('textarea'),
  ...document.querySelectorAll('input[type="text"]'),
  ...document.querySelectorAll('input:not([type])')
 ];
 for(const el of nodes){
  if(!isVisible(el))continue;
  if(el.disabled||el.readOnly)continue;
  return el;
 }
 return null;
}

/* ═══════════════════════════════════════════════
   IMAGE COLLECTION
   ═══════════════════════════════════════════════ */

const MAX_DATA_URL = 1_500_000; // ~1.5MB, batas payload

function svgToDataUrl(svgEl){
 try{
  const clone=svgEl.cloneNode(true);
  const xml=new XMLSerializer().serializeToString(clone);
  const b64=btoa(unescape(encodeURIComponent(xml)));
  return "data:image/svg+xml;base64,"+b64;
 }catch(_){ return ""; }
}

function absUrl(u){
 if(!u)return "";
 if(u.startsWith("data:")||u.startsWith("http://")||u.startsWith("https://"))return u;
 try{ return new URL(u,location.href).href; }catch(_){ return ""; }
}

function collectImagesNear(el, limit=4){
 const out=[];
 const seen=new Set();

 const push=(src,alt)=>{
  if(!src||seen.has(src))return;
  if(src.length>MAX_DATA_URL)return;
  seen.add(src);
  out.push({src,alt:norm(alt)});
 };

 const scanNode=(node)=>{
  if(!node||!node.querySelectorAll)return;

  // <img>
  for(const img of node.querySelectorAll("img")){
   if(!isVisible(img))continue;
   const r=img.getBoundingClientRect();
   if(r.width<32&&r.height<32)continue;
   const src=img.currentSrc||img.src||img.getAttribute("data-src")||"";
   push(absUrl(src),img.alt||img.title||"");
  }
  // <svg>
  for(const svg of node.querySelectorAll("svg")){
   if(!isVisible(svg))continue;
   const r=svg.getBoundingClientRect();
   if(r.width<32&&r.height<32)continue;
   push(svgToDataUrl(svg),svg.getAttribute("aria-label")||"");
  }
  // <canvas>
  for(const c of node.querySelectorAll("canvas")){
   if(!isVisible(c))continue;
   const r=c.getBoundingClientRect();
   if(r.width<32&&r.height<32)continue;
   try{ push(c.toDataURL("image/png"),""); }catch(_){}
  }
  // background-image pada div
  for(const d of node.querySelectorAll("div,span,section")){
   if(!isVisible(d))continue;
   const bg=getComputedStyle(d).backgroundImage;
   if(!bg||bg==="none")continue;
   const m=bg.match(/url\(["']?([^"')]+)["']?\)/);
   if(!m)continue;
   const r=d.getBoundingClientRect();
   if(r.width<64||r.height<64)continue;
   push(absUrl(m[1]),"");
  }
 };

 scanNode(el);
 // jaga-jaga, scan sibling terdekat dari parent (beberapa quiz taruh gambar di sibling)
 if(el&&el.parentElement)scanNode(el.parentElement);

 return out.slice(0,limit);
}

/* ═══════════════════════════════════════════════
   SCRAPER
   ═══════════════════════════════════════════════ */

function scrapeQuestion(){

 // ── 1. Radio MC ──
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
    const fq=findPlainQuestion();
    if(fq)q=fq.text;
   }
   return {
    question:q||"(soal tidak terdeteksi otomatis)",
    options,kind:"radio",
    images:collectImagesNear(common)
   };
  }
 }

 // ── 2. Select dropdown ──
 const selects=[...document.querySelectorAll("select")].filter(s=>isVisible(s));
 for(const sel of selects){
  const opts=[...sel.options]
   .filter(o=>norm(o.text).length>0&&!(o.value===""&&/^--/.test(o.text)))
   .map(o=>({text:norm(o.text),el:o}));
  if(opts.length<2)continue;

  let q="";
  if(sel.id){
   try{
    const l=document.querySelector(`label[for="${CSS.escape(sel.id)}"]`);
    if(l)q=norm(l.innerText);
   }catch(_){}
  }
  if(!q){
   let p=sel.parentElement;
   while(p&&!q){
    const t=norm(p.innerText);
    if(t.length>8&&t.length<800){
     let cleaned=t;
     for(const o of opts)cleaned=cleaned.replace(o.text,"");
     cleaned=cleaned.replace(/\s+/g," ").trim();
     if(cleaned.length>=8)q=cleaned;
    }
    p=p.parentElement;
   }
  }
  if(!q){
   const fq=findPlainQuestion();
   if(fq)q=fq.text;
  }
  return {
   question:q||"(soal tidak terdeteksi otomatis)",
   options:opts,kind:"select",
   images:collectImagesNear(sel.parentElement)
  };
 }

 // ── 3. Class-based MC ──
 const qSelectors=[
  '[class*="question" i]','[class*="prompt" i]','[class*="stem" i]',
  '.qtext','[data-testid*="question"]'
 ];
 const oSelectors=[
  '[class*="answer" i]','[class*="option" i]','[class*="choice" i]',
  '[class*="benar" i]','[class*="salah" i]',
  '[role="radio"]','[role="option"]'
 ];

 let qEl=null;
 for(const s of qSelectors){
  for(const el of document.querySelectorAll(s)){
   const t=norm(el.innerText);
   if(t.length>5&&t.length<800&&isVisible(el)){ qEl=el; break; }
  }
  if(qEl)break;
 }

 let oEls=[];
 for(const s of oSelectors){
  const els=[...document.querySelectorAll(s)].filter(e=>norm(e.innerText).length>0&&isVisible(e));
  if(els.length>=2&&els.length<=10){ oEls=els; break; }
 }

 if(qEl&&oEls.length>=2){
  return {
   question:norm(qEl.innerText),
   options:oEls.map(e=>({text:norm(e.innerText),el:e})),
   kind:"class",
   images:collectImagesNear(qEl.parentElement)
  };
 }

 // ── 4. Plain (isian/uraian) ──
 const plain=findPlainQuestion();
 if(plain){
  const field=findAnswerField();
  return {
   question:plain.text,
   options:[],kind:"plain",field,
   images:collectImagesNear(plain.el.parentElement)
  };
 }

 return null;
}

/* ═══════════════════════════════════════════════
   HIGHLIGHT / CLICK / FILL
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

function fillField(field,text){
 if(!field||text==null)return false;
 try{
  const proto=field.tagName==="TEXTAREA"
   ?HTMLTextAreaElement.prototype
   :HTMLInputElement.prototype;
  const desc=Object.getOwnPropertyDescriptor(proto,"value");
  if(desc&&desc.set)desc.set.call(field,text);
  else field.value=text;
  field.dispatchEvent(new Event("input",{bubbles:true}));
  field.dispatchEvent(new Event("change",{bubbles:true}));
  field.focus();
  return true;
 }catch(_){
  try{ field.value=text; return true; }catch(__){ return false; }
 }
}

/* ═══════════════════════════════════════════════
   MULTIMODAL CONTENT BUILDER
   ═══════════════════════════════════════════════ */

function buildContent(text,images){
 if(!images||!images.length)return text;
 const parts=[{type:"text",text}];
 for(const img of images){
  if(!img.src)continue;
  parts.push({
   type:"image_url",
   image_url:{ url:img.src }
  });
 }
 return parts;
}

/* ═══════════════════════════════════════════════
   ANALISA
   ═══════════════════════════════════════════════ */

async function analyze(){
 if(analyzeBtn.disabled)return;
 clearHighlight();

 const scraped=scrapeQuestion();
 if(!scraped||!scraped.question){
  addMessage(
   "❌ Tidak bisa mendeteksi soal di tab ini.\n"+
   "Pastikan teks soal (atau soal + pilihan) sedang tampil di halaman.",
   "ai"
  );
  return;
 }

 const hasChoices=Array.isArray(scraped.options)&&scraped.options.length>=2;
 const hasImages=Array.isArray(scraped.images)&&scraped.images.length>0;
 const LETTERS="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

 // bubble soal (user)
 const userBubble=addMessage(
  (hasChoices
   ?`🔍 Soal terdeteksi (${scraped.options.length} pilihan):\n\n${scraped.question}\n\n`+
    scraped.options.map((o,i)=>`${LETTERS[i]}. ${o.text}`).join("\n")
   :`🔍 Soal terdeteksi (tanpa pilihan):\n\n${scraped.question}`)
  +(hasImages?`\n\n🖼 ${scraped.images.length} gambar terdeteksi di soal` : ""),
  "user"
 );

 // thumbnail gambar di bubble
 if(hasImages){
  for(const img of scraped.images){
   try{
    const t=document.createElement("img");
    t.className="thumb";
    t.src=img.src;
    t.alt=img.alt||"";
    userBubble.appendChild(t);
   }catch(_){}
  }
 }

 analyzeBtn.disabled=true;
 analyzeBtn.textContent="…";

 const waiting=addMessage(
  hasImages?"Menganalisa soal + gambar…":"Menganalisa soal…",
  "ai"
 );

 try{
  let prompt;

  const imgNote=hasImages
   ?`\n\nCATATAN: Soal ini menyertakan ${scraped.images.length} gambar. Amati setiap gambar terlampir dengan teliti, sebutkan secara singkat apa isi/gambarnya, lalu gunakan informasinya untuk menjawab.`
   :"";

  if(hasChoices){
   const optBlock=scraped.options.map((o,i)=>`${LETTERS[i]}. ${o.text}`).join("\n");
   prompt=
    `Kamu adalah asisten yang menganalisa soal pilihan ganda.\n`+
    `Tentukan jawaban yang paling benar.\n\n`+
    `SOAL:\n${scraped.question}\n\n`+
    `PILIHAN:\n${optBlock}`+
    imgNote+
    `\n\nJawab dengan format persis:\n`+
    `GAMBAR: <deskripsi singkat gambar, atau "-" jika tidak ada>\n`+
    `JAWABAN: <satu huruf>\n`+
    `ALASAN: <penjelasan singkat 1-2 kalimat>`;
  }else{
   prompt=
    `Kamu adalah asisten yang menjawab soal.\n`+
    `Soal berikut adalah soal isian/uraian (BUKAN pilihan ganda).\n`+
    `Tentukan jawaban yang paling benar.\n\n`+
    `SOAL:\n${scraped.question}`+
    imgNote+
    `\n\nJawab dengan format persis:\n`+
    `GAMBAR: <deskripsi singkat gambar, atau "-" jika tidak ada>\n`+
    `JAWABAN: <jawaban singkat yang benar>\n`+
    `PENJELASAN: <penjelasan 1-2 kalimat>`;
  }

  const body={
   messages:[{
    role:"user",
    content:buildContent(prompt,scraped.images||[])
   }]
  };

  const response=await fetch(
   "http://127.0.0.1:3000/api/chat",
   {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(body)
   }
  );

  const data=await response.json();
  if(!response.ok)throw new Error(data.error||"Request gagal");
  if(!data.answer)throw new Error("Jawaban AI kosong");

  const ans=String(data.answer).trim();
  waiting.textContent=ans;

  // parse jawaban (MC = huruf, plain = teks)
  if(hasChoices){
   const m=ans.match(/JAWABAN\s*[:\-]\s*([A-Za-z])\b/);
   if(m){
    const letter=m[1].toUpperCase();
    const idx=LETTERS.indexOf(letter);
    if(idx>=0&&idx<scraped.options.length){
     const chosen=scraped.options[idx];
     highlight(chosen.el);

     const wrap=document.createElement("div");
     wrap.style.marginTop="6px";
     const btn=document.createElement("button");
     btn.className="pick";
     btn.textContent=`✓ Pilih ${letter}`;
     btn.onclick=()=>clickOption(chosen.el);
     wrap.appendChild(btn);
     waiting.appendChild(wrap);
     chat.scrollTop=chat.scrollHeight;
    }
   }
  }else{
   const mj=ans.match(/JAWABAN\s*[:\-]\s*([^\n]+)/i);
   let shortText=null;
   if(mj)shortText=mj[1].trim().replace(/^["'`]|["'`]$/g,"");
   if(shortText&&scraped.field){
    const wrap=document.createElement("div");
    wrap.style.marginTop="6px";
    const btn=document.createElement("button");
    btn.className="pick";
    btn.textContent=`✓ Isi jawaban ke kolom`;
    btn.onclick=()=>{
     const ok=fillField(scraped.field,shortText);
     if(ok)highlight(scraped.field);
    };
    wrap.appendChild(btn);
    waiting.appendChild(wrap);
    chat.scrollTop=chat.scrollHeight;
   }
  }

 }catch(error){
  waiting.textContent="Error: "+error.message;
 }finally{
  analyzeBtn.disabled=false;
  analyzeBtn.textContent="🔍";
  chat.scrollTop=chat.scrollHeight;
 }
}

analyzeBtn.onclick=analyze;

/* ═══════════════════════════════════════════════
   CHAT BIASA
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
  const response=await fetch(
   "http://127.0.0.1:3000/api/chat",
   {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ messages:history })
   }
  );

  const data=await response.json();
  if(!response.ok)throw new Error(data.error||"Request gagal");
  if(!data.answer)throw new Error("Jawaban AI kosong");

  waiting.textContent=data.answer;

  history.push({ role:"assistant", content:data.answer });
  history=history.slice(-10);

 }catch(error){
  waiting.textContent="Error: "+error.message;
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
let dragging=false;
let offsetX=0;
let offsetY=0;

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