
(function(){
 const $=id=>document.getElementById(id);
 const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};
 const write=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
 const profileKey='wda_profile_v1', settingsKey='wda_settings_v1', progressPrefix='wda_progress_';
 let profile=read(profileKey,null);
 let settings=read(settingsKey,{theme:'light',largeText:false,reduceMotion:false,highContrast:false});
 function applySettings(){
  document.documentElement.dataset.theme=settings.theme==='dark'?'dark':'light';
  document.body.classList.toggle('large-text',!!settings.largeText);
  document.body.classList.toggle('reduce-motion',!!settings.reduceMotion);
  document.body.classList.toggle('high-contrast',!!settings.highContrast);
  const pairs=[['darkToggle',settings.theme==='dark'],['textToggle',settings.largeText],['motionToggle',settings.reduceMotion],['contrastToggle',settings.highContrast]];
  pairs.forEach(([id,val])=>{if($(id))$(id).checked=!!val});
 }
 function open(id){if($(id))$(id).classList.add('open')}
 function close(id){if($(id))$(id).classList.remove('open')}
 document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>close(b.dataset.close)));
 document.querySelectorAll('.dialog-backdrop').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.classList.remove('open')}));
 if($('settingsOpen'))$('settingsOpen').addEventListener('click',()=>open('settingsDialog'));
 if($('loginOpen'))$('loginOpen').addEventListener('click',()=>open('loginDialog'));
 if($('progressLogin'))$('progressLogin').addEventListener('click',()=>open('loginDialog'));
 if($('menuToggle'))$('menuToggle').addEventListener('click',()=>{
  const n=$('mainNav'); if(!n)return; const state=n.classList.toggle('open'); $('menuToggle').setAttribute('aria-expanded',String(state));
 });
 const form=$('loginForm');
 if(form)form.addEventListener('submit',async e=>{
  e.preventDefault();
  const name=$('studentName').value.trim(), qid=$('studentQid').value.trim();
  if(!name||!qid)return;
  // Hash the QID locally; it is not sent to a server or stored as plain text.
  let id=qid.toLowerCase();
  try{if(crypto&&crypto.subtle){const bytes=new TextEncoder().encode(id);const hash=await crypto.subtle.digest('SHA-256',bytes);id=Array.from(new Uint8Array(hash)).map(x=>x.toString(16).padStart(2,'0')).join('')}}catch(err){}
  profile={name:name,studentKey:id};write(profileKey,profile);close('loginDialog');renderProgress();
 });
 function progressKey(){return profile?progressPrefix+profile.studentKey:null}
 function renderProgress(){
  const completed=profile?read(progressKey(),[]):[];
  const count=Array.isArray(completed)?completed.length:0;
  const label=$('progressLabel');if(label)label.textContent=count+' of 5 units completed';
  const bar=$('overallProgress');if(bar)bar.style.width=(count/5*100)+'%';
  const login=$('loginOpen');if(login)login.textContent=profile?profile.name.split(' ')[0]:'Login';
  const plogin=$('progressLogin');if(plogin)plogin.textContent=profile?'Switch student':'Sign in to track';
  const welcome=$('welcomeName');if(welcome)welcome.textContent=profile?'Welcome, '+profile.name:'My learning progress';
  const check=$('unitComplete');
  if(check){const n=Number(check.dataset.unit);check.checked=!!(profile&&completed.includes(n));check.disabled=!profile;const status=$('unitStatus');if(status)status.textContent=profile?'Your progress is saved in this browser.':'Sign in to save your progress.'}
 }
 const check=$('unitComplete');
 if(check)check.addEventListener('change',()=>{
  if(!profile){check.checked=false;open('loginDialog');return}
  let completed=read(progressKey(),[]);const n=Number(check.dataset.unit);
  completed=completed.filter(x=>x!==n);if(check.checked)completed.push(n);
  write(progressKey(),completed);renderProgress();
 });
 [['darkToggle',v=>settings.theme=v?'dark':'light'],['textToggle',v=>settings.largeText=v],['motionToggle',v=>settings.reduceMotion=v],['contrastToggle',v=>settings.highContrast=v]].forEach(([id,fn])=>{
  if($(id))$(id).addEventListener('change',e=>{fn(e.target.checked);write(settingsKey,settings);applySettings()});
 });
 // High contrast uses a clear outline and stronger text colour without changing layout.
 const style=document.createElement('style');style.textContent='body.high-contrast{--muted:var(--text);--line:currentColor}body.high-contrast .card{border-width:2px}';document.head.appendChild(style);
 applySettings();renderProgress();
})();
