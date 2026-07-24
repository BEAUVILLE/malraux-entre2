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

// Bande-annonce commune : lecture uniquement à la demande, sans son automatique.
const clipStyle=document.createElement('style');
clipStyle.textContent=`
  .clip-sarlat{padding:clamp(72px,9vw,125px) 0;background:linear-gradient(145deg,#fffaf0 0%,#f1dfbd 100%);border-top:1px solid rgba(117,80,31,.22);border-bottom:1px solid rgba(117,80,31,.22)}
  .clip-inner{width:min(1120px,calc(100% - 40px));margin:0 auto;display:grid;grid-template-columns:.9fr 1.1fr;align-items:center;gap:clamp(34px,7vw,90px)}
  .clip-copy .titre{margin-bottom:1rem}.clip-copy .texte{margin-bottom:1.6rem}
  .clip-badge{display:inline-flex;align-items:center;gap:.55rem;padding:.55rem .85rem;border:1px solid rgba(117,80,31,.22);border-radius:999px;background:rgba(255,255,255,.62);color:#76501f;font-size:.78rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
  .clip-frame{position:relative;width:min(430px,100%);margin:0 auto;padding:11px;background:#211d17;border:1px solid rgba(173,120,46,.58);border-radius:28px;box-shadow:0 22px 55px rgba(70,51,26,.22)}
  .clip-video{display:block;width:100%;aspect-ratio:9/16;object-fit:cover;border-radius:19px;background:#211d17}
  .clip-note{margin-top:.8rem;text-align:center;color:#625646;font-size:.82rem}
  @media(max-width:820px){.clip-inner{grid-template-columns:1fr;text-align:center}.clip-copy .texte{margin-left:auto;margin-right:auto}.clip-badge{justify-content:center}.clip-frame{width:min(390px,92vw)}}
`;
document.head.appendChild(clipStyle);

function installClip(which){
  const target=document.querySelector('#page-'+which+' .carte-s');
  if(!target||document.getElementById('clip-'+which))return;
  const section=document.createElement('section');
  section.className='clip-sarlat reveal';
  section.id='clip-'+which;
  section.setAttribute('aria-labelledby','clip-title-'+which);
  section.innerHTML=`
    <div class="clip-inner">
      <div class="clip-copy">
        <span class="lbl">Sarlat en images</span>
        <h2 class="titre" id="clip-title-${which}">Découvrez nos <em>deux adresses</em></h2>
        <p class="texte">L’Entre 2 et Le Malraux : terrasse, cuisine et ambiance au cœur du Périgord Noir.</p>
        <span class="clip-badge">▶ Film de présentation · 25 secondes</span>
        <p class="clip-note">La musique démarre seulement lorsque vous lancez la vidéo.</p>
      </div>
      <div class="clip-frame">
        <video class="clip-video" controls playsinline preload="metadata" poster="carte-entre2.png" aria-label="Film de présentation de L’Entre 2 et du Malraux à Sarlat">
          <source src="DIAPORAMA_SARLAT_MUSIQUE_THEME.mp4" type="video/mp4">
          Votre navigateur ne permet pas la lecture de cette vidéo.
        </video>
      </div>
    </div>`;
  target.before(section);
}
['malraux','entre2'].forEach(installClip);

document.querySelectorAll('.clip-video').forEach(video=>{
  video.addEventListener('play',()=>{
    document.querySelectorAll('.clip-video').forEach(other=>{if(other!==video)other.pause();});
  });
});

const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>80),{passive:true});
document.querySelectorAll('.land-half').forEach(el=>{el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')el.click();});});
function enterSite(which){document.getElementById('landing').classList.add('gone');setTimeout(()=>switchSite(which),300);}
let currentSite='malraux';
function switchSite(which){
  if(which===currentSite)return;
  document.querySelectorAll('.clip-video').forEach(video=>video.pause());
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
