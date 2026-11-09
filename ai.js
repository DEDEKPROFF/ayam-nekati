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
 height:min(420px,calc(100dvh - 90px));
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

button:disabled{opacity:.5}

/* invisible restore hit-zone — bottom-right corner */
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
   <button class="hide" title="Sembunyikan semua (tap pojok kanan bawah untuk munculkan)">−</button>
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

let history=[];

function showPanel(){ panel.style.display="block"; }
function hidePanel(){ panel.style.display="none"; }

/* --- hide-all / restore-all --- */
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

$(".hide").onclick=hideAll;   // − : semuanya ilang
$(".close").onclick=hidePanel; // × : tutup panel aja
restore.onclick=showAll;       // pojok kanan bawah : munculin semua

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

  if(!response.ok){
   throw new Error(data.error||"Request gagal");
  }

  if(!data.answer){
   throw new Error("Jawaban AI kosong");
  }

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

// DRAG PANEL
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