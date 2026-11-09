(()=>{
if(document.getElementById("wgai"))return;
let host=document.createElement("div");
host.id="wgai";
host.style="position:fixed;z-index:2147483647;inset:0;pointer-events:none";
document.documentElement.append(host);
let root=host.attachShadow({mode:"open"});
root.innerHTML=`
<style>
*{box-sizing:border-box}
button,textarea{font:inherit}
.fab{pointer-events:auto;position:fixed;right:18px;bottom:20px;width:58px;height:58px;border-radius:50%;border:1px solid #d9aaff;background:linear-gradient(135deg,#bd65ff,#5811a5);color:white;font-size:25px;box-shadow:0 0 20px #a855f7;cursor:pointer}
.panel{pointer-events:auto;display:none;position:fixed;right:12px;bottom:90px;width:min(360px,calc(100vw - 24px));height:min(560px,calc(100dvh - 110px));background:rgba(17,10,29,var(--op,1));border:1px solid #a855f7;border-radius:17px;color:white;overflow:hidden;font:13px Arial;box-shadow:0 0 25px #9333ea66}
header{padding:15px;background:rgba(85,35,130,var(--op,1));display:flex;justify-content:space-between;cursor:move;touch-action:none}
.body{padding:12px;height:calc(100% - 52px);display:flex;flex-direction:column;gap:10px}
.title{color:#e8c9ff;font-weight:bold}
.tools button{background:#ffffff20;color:white;border:0;padding:5px 9px;border-radius:6px}
.setting{padding:9px;background:#38204b88;border-radius:9px}
.line{display:flex;justify-content:space-between;font-size:11px}
input{width:100%;accent-color:#bd65ff}
.chat{flex:1;overflow:auto;display:flex;flex-direction:column;gap:8px}
.msg{padding:10px;border-radius:10px;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.5}
.ai{background:#38204b;align-self:flex-start}
.user{background:#7133a8;align-self:flex-end}
textarea{height:85px;resize:vertical;background:#251535;color:white;border:1px solid #8050a9;border-radius:9px;padding:10px}
.send{background:linear-gradient(90deg,#bd65ff,#7025be);border:0;padding:11px;color:white;border-radius:9px;font-weight:bold}
</style>
<button class="fab">✦</button>
<section class="panel">
<header><b class="title">✦ WAYGROUND AI</b><span class="tools"><button class="min">−</button><button class="close">×</button></span></header>
<div class="body">
<div style="color:#c99af5;font-size:10px">PURPLE CYBERPUNK • OPENROUTER</div>
<div class="setting"><div class="line"><span>TRANSPARANSI</span><b class="val">0%</b></div><input class="range" type="range" min="0" max="100" value="0"></div>
<div class="chat"><div class="msg ai">Halo! Masukkan soal latihan untuk dianalisis.</div></div>
<textarea placeholder="Tulis soal latihan..."></textarea>
<button class="send">✦ ANALYZE</button>
</div></section>`;
const $=s=>root.querySelector(s);
const panel=$(".panel"),chat=$(".chat"),input=$("textarea"),send=$(".send");
const history=[];
const slider=$(".range");
slider.oninput=()=>{
let n=+slider.value;
$(".val").textContent=n+"%";
panel.style.setProperty("--op",1-n/100);
};
$(".fab").onclick=()=>panel.style.display=panel.style.display==="block"?"none":"block";
$(".close").onclick=$(".min").onclick=()=>panel.style.display="none";
function add(t,c){let e=document.createElement("div");e.className="msg "+c;e.textContent=t;chat.append(e);chat.scrollTop=chat.scrollHeight;return e}
async function ask(){
let t=input.value.trim();if(!t||send.disabled)return;
input.value="";add(t,"user");history.push({role:"user",content:t});
send.disabled=true;send.textContent="THINKING...";
let wait=add("Menghubungkan ke AI...","ai");
try{
let r=await fetch("http://127.0.0.1:3000/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:history.slice(-10)})});
let d=await r.json();if(!r.ok)throw Error(d.error);
wait.textContent=d.answer;history.push({role:"assistant",content:d.answer});
}catch(e){wait.textContent="Error: "+e.message;history.pop()}
finally{send.disabled=false;send.textContent="✦ ANALYZE"}
}
send.onclick=ask;
input.onkeydown=e=>{if(e.key==="Enter"&&(e.ctrlKey||e.metaKey)){e.preventDefault();ask()}};
let h=$("header"),drag=false,dx=0,dy=0;
h.onpointerdown=e=>{if(e.target.closest("button"))return;let r=panel.getBoundingClientRect();drag=true;dx=e.clientX-r.left;dy=e.clientY-r.top;h.setPointerCapture(e.pointerId)};
h.onpointermove=e=>{if(!drag)return;panel.style.left=Math.max(0,e.clientX-dx)+"px";panel.style.top=Math.max(0,e.clientY-dy)+"px";panel.style.right="auto";panel.style.bottom="auto"};
h.onpointerup=()=>drag=false;
})();
