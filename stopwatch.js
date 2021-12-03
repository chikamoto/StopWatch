const timeElement = document.getElementById('time');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

let elapsed = 0;
let intervalId = null;

function updateTime() {
  const ms = elapsed % 1000;
  const s = Math.floor(elapsed / 1000) % 60;
  const m = Math.floor(elapsed / (1000*60)) % 60;
  const h = Math.floor(elapsed / (1000*60*60));

  
  const msStr = ms.toString().padStart(3, '0');
  const sStr = s.toString().padStart(2, '0');
  const mStr = m.toString().padStart(2, '0');
  const hStr = h.toString().padStart(2, '0');
  
  timeElement .innerHTML=`${hStr}:${mStr}:${sStr}.${msStr}`;
}

start.addEventListener('click',function(e){
  start.disabled = true;
  if (intervalId !== null) { return; }
  let pre = new Date();
  intervalId = setInterval(function(){
    const now = new Date();
    elapsed += now - pre;
    pre = now;
    updateTime();
  },10);
  stop.disabled = false;
  reset.disabled = false;
}); 

stop.addEventListener('click',function(e){
  stop.disabled = true;
  clearInterval(intervalId);
  intervalId=null;
  start.disabled = false;
});

reset.addEventListener('click',function(e){ 
  reset.disabled = true;
  elapsed = 0;
  updateTime();
});

