'use strict';

const cur=document.getElementById('cur'),cuf=document.getElementById('cuf');
document.addEventListener('mousemove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';setTimeout(()=>{cuf.style.left=e.clientX+'px';cuf.style.top=e.clientY+'px';},80);});
document.addEventListener('mouseleave',()=>{cur.style.opacity='0';cuf.style.opacity='0';});
document.addEventListener('mouseenter',()=>{cur.style.opacity='1';cuf.style.opacity='1';});
document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>{cur.classList.add('hov');cuf.classList.add('hov');});el.addEventListener('mouseleave',()=>{cur.classList.remove('hov');cuf.classList.remove('hov');});});

// Affiche la carte de visite DIGIYLYFE à la place de l'ancien QR isolé.
document.querySelectorAll('img[src="qr-site.png"]').forEach(img=>{
  img.src='carte-entre2.png';
  img.alt="Carte de visite DIGIYLYFE de L'Entre 2 et du Malraux";
  img.width=941;
  img.height=1672;
});

const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>80),{passive:true});
document.querySelectorAll('.land-half').forEach(el=>{el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')el.click();});});
function enterSite(which){document.getElementById('landing').classList.add('gone');setTimeout(()=>switchSite(which),300);}
let currentSite='malraux';
function switchSite(which){
  if(which===currentSite)return;
  currentSite=which;
  document.getElementById('body').className=which;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+which).classList.add('active');
  document.querySelectorAll('.sw-half').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});
  document.getElementById('sw-'+which).classList.add('active');
  document.getElementById('sw-'+which).setAttribute('aria-pressed','true');
  const names={malraux:['Le Malraux','Restaurant Traditionnel · Sarlat','tel:+33642160657','06 42 16 06 57'],entre2:["L'Entre 2",'Brasserie · Pizzeria · Sarlat','tel:+33673274427','06 73 27 44 27']};
  const n=names[which];
  document.getElementById('nav-name').textContent=n[0];
  document.getElementById('nav-sub').textContent=n[1];
  const tel=document.getElementById('nav-tel');tel.href=n[2];tel.textContent=n[3];
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(()=>{
    const io2=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io2.unobserve(e.target);}});},{threshold:0.08});
    document.querySelectorAll('#page-'+which+' .reveal:not(.in)').forEach(el=>io2.observe(el));
  },100);
}
document.getElementById('sw-malraux').addEventListener('click',()=>{if(document.getElementById('landing').classList.contains('gone'))switchSite('malraux');else enterSite('malraux');});
document.getElementById('sw-entre2').addEventListener('click',()=>{if(document.getElementById('landing').classList.contains('gone'))switchSite('entre2');else enterSite('entre2');});
document.getElementById('sw-malraux').classList.add('active');
function ctab(id,btn){
  const panel=document.getElementById(id);if(!panel)return;
  const parent=panel.closest('.carte-s');
  parent.querySelectorAll('.cpanel').forEach(p=>p.classList.remove('on'));
  parent.querySelectorAll('.ctab').forEach(b=>{b.classList.remove('on');b.setAttribute('aria-selected','false');});
  panel.classList.add('on');btn.classList.add('on');btn.setAttribute('aria-selected','true');
}
function scrollTo(e,id){
  e.preventDefault();
  const el=document.querySelector('#page-'+currentSite+' #'+id)||document.getElementById(id);
  if(el)el.scrollIntoView({behavior:'smooth'});
}
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));