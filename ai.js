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

/* ── LOGIN GATE ── */
.login-gate{
 pointer-events:auto;position:fixed;inset:0;
 background:rgba(5,2,12,.92);
 backdrop-filter:blur(6px);
 display:flex;align-items:center;justify-content:center;
 z-index:2147483646;
}
.login-box{
 width:min(340px,calc(100vw - 40px));
 background:linear-gradient(160deg,#1a0b2e,#0a0514);
 border:1px solid #a855f7;border-radius:16px;
 padding:24px 20px;color:white;font:13px Arial;
 text-align:center;
 box-shadow:0 0 25px #9333ea88,0 0 60px #581c8755;
 animation:appear .3s ease;
}
.login-box h2{
 margin:0 0 6px;color:#e9c5ff;
 font-size:18px;text-shadow:0 0 10px #c084fc;
}
.login-box p{
 margin:0 0 18px;color:#c084fc;font-size:11px;
 letter-spacing:1px;
}
.login-box input{
 width:100%;padding:11px;border-radius:9px;
 background:#13091f;color:white;
 border:1px solid #9333ea;outline:none;
 text-align:center;letter-spacing:2px;
 font-size:14px;margin-bottom:10px;
}
.login-box input:focus{
 border-color:#d8b4fe;
 box-shadow:0 0 12px #9333ea66;
}
.login-box button{
 width:100%;padding:11px;border-radius:9px;
 background:linear-gradient(90deg,#9333ea,#4c1d95);
 border:1px solid #c084fc;color:white;
 font-weight:bold;cursor:pointer;
 box-shadow:0 0 12px #9333ea66;
}
.login-box .err{
 color:#f87171;font-size:11px;
 min-height:14px;margin-top:6px;
}
.logout{
 background:#35164f;color:#e9c5ff;
 border:1px solid #a855f7;
 padding:4px 8px;border-radius:6px;
 cursor:pointer;font-size:10px;
}

/* ── IMAGE BADGE ── */
.img-badge{
 display:inline-block;margin-top:6px;
 background:#1e3a8a;color:#93c5fd;
 border:1px solid #3b82f6;
 padding:3px 8px;border-radius:6px;
 font-size:10px;
}
.img-preview{
 display:block;max-width:100%;
 max-height:120px;border-radius:6px;
 margin-top:6px;border:1px solid #6b21a8;
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
   <button class="logout" title="Logout">⎋</button>
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
    Klik 🔍 untuk analisa soal di tab ini (pilihan ganda / isian / uraian / gambar).
   </div>
  </div>

  <textarea placeholder="Tulis pertanyaan atau soal latihan..."></textarea>

  <button class="send">✦ KIRIM PESAN</button>
 </div>
</section>

<div class="restore" title=""></div>

<div class="login-gate">
 <div class="login-box">
  <h2>✦ WAYGROUND AI</h2>
  <p>MASUKKAN KEY UNTUK AKSES</p>
  <input class="key-input" type="password" placeholder="KEY LOGIN" autocomplete="off">
  <button class="key-submit">🔓 BUKA AKSES</button>
  <div class="err"></div>
 </div>
</div>
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

/* ═══════════════════════════════════════════════
   KEY LOGIN SYSTEM
   ═══════════════════════════════════════════════ */
const VALID_KEY = "voxel";
const STORAGE_KEY = "wgai_auth";

const loginGate = $(".login-gate");
const keyInput = $(".key-input");
const keySubmit = $(".key-submit");
const errEl = $(".err");
const logoutBtn = $(".logout");

let isAuthed = false;

function unlockUI(){
 isAuthed = true;
 loginGate.style.display = "none";
 fab.style.display = "";
}
function lockUI(){
 isAuthed = false;
 loginGate.style.display = "flex";
 fab.style.display = "none";
 panel.style.display = "none";
 restore.style.display = "none";
}
function tryLogin(){
 const val = keyInput.value.trim().toLowerCase();
 if(!val){ errEl.textContent = "Key tidak boleh kosong"; return; }
 if(val === VALID_KEY){
  errEl.textContent = "";
  localStorage.setItem(STORAGE_KEY, "1");
  unlockUI();
  addMessage("🔓 Akses terbuka. Selamat belajar! ✦", "ai");
 }else{
  errEl.textContent = "❌ Key salah. Coba lagi.";
  keyInput.value = "";
  keyInput.focus();
 }
}
keySubmit.onclick = tryLogin;
keyInput.onkeydown = e => {
 if(e.key === "Enter"){ e.preventDefault(); tryLogin(); }
};
logoutBtn.onclick = () => {
 localStorage.removeItem(STORAGE_KEY);
 lockUI();
 keyInput.value = "";
 errEl.textContent = "";
};

if(localStorage.getItem(STORAGE_KEY) === "1"){ unlockUI(); }
else{ lockUI(); }

/* ═══════════════════════════════════════════════
   PANEL CONTROL
   ═══════════════════════════════════════════════ */

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
 if(!isAuthed){ lockUI(); return; }
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
   IMAGE DETECTOR
   ═══════════════════════════════════════════════ */

function isLikelyQuestionImage(img){
 if(!img)return false;
 const r=img.getBoundingClientRect();
 if(r.width<80||r.height<80)return false;

 const src=(img.src||"").toLowerCase();
 const alt=(img.alt||"").toLowerCase();
 const cls=(img.className&&img.className.toString?img.className.toString():"").toLowerCase();

 const skip=[
  "icon","logo","avatar","sprite","emoji","badge",
  "profile","thumbnail","thumb","flag","banner"
 ];
 for(const s of skip){
  if(cls.includes(s)||alt.includes(s)||src.includes(s))return false;
 }

 if(src.startsWith("data:image")&&src.length<2000)return false;

 return true;
}

async function imgToBase64(img){
 try{
  const canvas=document.createElement("canvas");
  const w=img.naturalWidth||img.width;
  const h=img.naturalHeight||img.height;
  if(!w||!h)return null;

  const scale=Math.min(1,1024/Math.max(w,h));
  canvas.width=Math.round(w*scale);
  canvas.height=Math.round(h*scale);

  const ctx=canvas.getContext("2d");
  ctx.drawImage(img,0,0,canvas.width,canvas.height);

  return canvas.toDataURL("image/jpeg",0.8);
 }catch(_){
  try{
   const res=await fetch(img.src);
   const blob=await res.blob();
   return new Promise((resolve)=>{
    const reader=new FileReader();
    reader.onload=()=>resolve(reader.result);
    reader.onerror=()=>resolve(null);
    reader.readAsDataURL(blob);
   });
  }catch(__){ return null; }
 }
}

async function findQuestionImages(){
 const imgs=[...document.querySelectorAll("img")].filter(isLikelyQuestionImage);
 const results=[];
 for(const img of imgs.slice(0,3)){
  if(!isVisible(img))continue;
  const b64=await imgToBase64(img);
  if(b64)results.push({el:img,data:b64});
 }
 return results;
}

/* ═══════════════════════════════════════════════
   SCRAPER
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
    const fq=findPlainQuestion();
    if(fq)q=fq.text;
   }
   return {question:q||"(soal tidak terdeteksi otomatis)",options,kind:"radio"};
  }
 }

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
  return {question:q||"(soal tidak terdeteksi otomatis)",options:opts,kind:"select"};
 }

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
   kind:"class"
  };
 }

 const plain=findPlainQuestion();
 if(plain){
  const field=findAnswerField();
  return {question:plain.text, options:[], kind:"plain", field};
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
 const LETTERS="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

 // pesan soal terdeteksi
 const detectMsg = hasChoices
   ? `🔍 Soal terdeteksi (${scraped.options.length} pilihan):\n\n${scraped.question}\n\n`+
     scraped.options.map((o,i)=>`${LETTERS[i]}. ${o.text}`).join("\n")
   : `🔍 Soal terdeteksi (tanpa pilihan):\n\n${scraped.question}`;
 addMessage(detectMsg, "user");

 analyzeBtn.disabled=true;
 analyzeBtn.textContent="…";

 // deteksi gambar dulu
 const images = await findQuestionImages();

 if(images.length > 0){
  const badge = document.createElement("div");
  badge.className = "img-badge";
  badge.textContent = `🖼️ ${images.length} gambar ikut dianalisa`;
  chat.lastElementChild.appendChild(badge);

  for(const im of images) highlight(im.el);
 }

 const waiting=addMessage("Menganalisa soal…","ai");

 try{
  let prompt,parsedShort=null;

  if(hasChoices){
   const optBlock=scraped.options.map((o,i)=>`${LETTERS[i]}. ${o.text}`).join("\n");
   prompt=
    `Kamu adalah asisten yang menganalisa soal pilihan ganda.\n`+
    `Tentukan jawaban yang paling benar.\n\n`+
    `SOAL:\n${scraped.question}\n\n`+
    `PILIHAN:\n${optBlock}\n\n`+
    `Jawab dengan format persis:\n`+
    `JAWABAN: <satu huruf>\n`+
    `ALASAN: <penjelasan singkat 1-2 kalimat>`;
  }else{
   prompt=
    `Kamu adalah asisten yang menjawab soal.\n`+
    `Soal berikut adalah soal isian/uraian (BUKAN pilihan ganda).\n`+
    `Tentukan jawaban yang paling benar.\n\n`+
    `SOAL:\n${scraped.question}\n\n`+
    `Jawab dengan format persis:\n`+
    `JAWABAN: <jawaban singkat yang benar>\n`+
    `PENJELASAN: <penjelasan 1-2 kalimat>`;
  }

  // tambahan instruksi kalau ada gambar
  if(images.length > 0){
   prompt += `\n\nCATATAN: Ada ${images.length} gambar terlampir. `+
             `Analisa gambar tersebut (diagram/grafik/peta/tabel) `+
             `dan gunakan informasinya untuk menjawab soal.`;
  }

  // susun content (vision f
