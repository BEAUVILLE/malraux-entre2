'use strict';

const cur=document.getElementById('cur'),cuf=document.getElementById('cuf');
document.addEventListener('mousemove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';setTimeout(()=>{cuf.style.left=e.clientX+'px';cuf.style.top=e.clientY+'px';},80);});
document.addEventListener('mouseleave',()=>{cur.style.opacity='0';cuf.style.opacity='0';});
document.addEventListener('mouseenter',()=>{cur.style.opacity='1';cuf.style.opacity='1';});
document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>{cur.classList.add('hov');cuf.classList.add('hov');});el.addEventListener('mouseleave',()=>{cur.classList.remove('hov');cuf.classList.remove('hov');});});

const officialUrl='https://malraux-entre2.digiylyfe.com/';

// Affiche la carte DIGIYLYFE et aligne tous les clics vers la fiche officielle.
document.querySelectorAll('img[src="qr-site.png"]').forEach(img=>{
  img.src='carte-entre2.png';
  img.alt="Carte de visite DIGIYLYFE de L'Entre 2 et du Malraux — touchez pour ouvrir la fiche";
  img.width=941;
  img.height=1672;
});
document.querySelectorAll('.qr-card').forEach(card=>{
  card.href=officialUrl;
  card.setAttribute('aria-label',"Touchez la carte ou le QR pour ouvrir la fiche L'Entre 2 et Le Malraux");
  const note=card.querySelector('.qr-note');
  if(note) note.textContent='SUR TÉLÉPHONE : TOUCHEZ LA CARTE · SUR PAPIER : SCANNEZ LE QR';
});
document.querySelectorAll('.qr-url').forEach(link=>{
  link.href=officialUrl;
  link.textContent='malraux-entre2.digiylyfe.com';
});
document.querySelectorAll('.qr-actions .btn-gold').forEach(link=>{
  link.href=officialUrl;
  link.textContent='Ouvrir la fiche DIGIYLYFE';
});

// Bande-annonce commune : appel à l'action fort, lisible et tactile sur téléphone.
const clipStyle=document.createElement('style');
clipStyle.textContent=`
  .clip-sarlat{padding:clamp(72px,9vw,125px) 0;background:linear-gradient(145deg,#fffaf0 0%,#f1dfbd 100%);border-top:1px solid rgba(117,80,31,.22);border-bottom:1px solid rgba(117,80,31,.22)}
  .clip-inner{width:min(1120px,calc(100% - 34px));margin:0 auto;display:grid;grid-template-columns:.9fr 1.1fr;align-items:center;gap:clamp(34px,7vw,90px)}
  .clip-copy .titre{margin-bottom:1rem}.clip-copy .texte{margin-bottom:1.35rem;font-size:clamp(1.05rem,2vw,1.25rem);font-weight:700}
  .clip-command{display:block;width:100%;padding:1rem 1.1rem;border:3px solid #76501f;border-radius:18px;background:#ad782e;color:#fff;font-size:clamp(1.05rem,2.6vw,1.45rem);font-weight:1000;line-height:1.2;letter-spacing:.035em;text-align:center;text-transform:uppercase;box-shadow:0 12px 28px rgba(70,51,26,.22)}
  .clip-command strong{display:block;font-size:1.08em}
  .clip-note{margin:.9rem 0 0;text-align:center;color:#3d2b1a;font-size:clamp(1rem,2.2vw,1.2rem);font-weight:900;line-height:1.35}
  .clip-frame{position:relative;width:min(430px,100%);margin:0 auto;padding:11px;background:#211d17;border:2px solid rgba(173,120,46,.72);border-radius:28px;box-shadow:0 22px 55px rgba(70,51,26,.25);overflow:hidden}
  .clip-video{display:block;width:100%;aspect-ratio:9/16;object-fit:cover;border-radius:19px;background:#211d17}
  .clip-start{position:absolute;inset:11px;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem;padding:1.25rem;border:0;border-radius:19px;background:linear-gradient(180deg,rgba(33,29,23,.18),rgba(33,29,23,.78));color:#fff;text-align:center;cursor:pointer}
  .clip-start-icon{display:grid;place-items:center;width:82px;height:82px;border-radius:50%;background:#ad782e;border:4px solid #fff;font-size:2.2rem;box-shadow:0 12px 30px rgba(0,0,0,.35)}
  .clip-start-text{max-width:16ch;font-size:clamp(1.25rem,4vw,1.7rem);font-weight:1000;line-height:1.12;text-transform:uppercase;text-shadow:0 3px 12px rgba(0,0,0,.5)}
  .clip-start-sub{font-size:1rem;font-weight:900;color:#ffe0a1}
  .clip-frame.is-playing .clip-start{display:none}
  .qr-card .qr-note{display:block;padding:.75rem .8rem;background:#ad782e;color:#fff;font-size:clamp(.92rem,2.4vw,1.12rem);font-weight:1000;line-height:1.25;text-align:center;text-transform:uppercase;border-radius:12px}
  @media(max-width:820px){
    .clip-inner{grid-template-columns:1fr;text-align:center}
    .clip-copy .texte{margin-left:auto;margin-right:auto}
    .clip-frame{width:min(390px,94vw)}
    .clip-command{font-size:1.18rem;padding:1rem .85rem}
    .clip-note{font-size:1.08rem}
    .clip-start-text{font-size:1.42rem}
  }
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
        <h2 class="titre" id="clip-title-${which}">Vivez nos <em>deux adresses</em></h2>
        <p class="texte">Terrasse, assiettes, lumière et ambiance : découvrez L’Entre 2 et Le Malraux avant de choisir votre table.</p>
        <div class="clip-command"><strong>▶ Touchez la carte ou le QR</strong>pour lancer le film · 25 secondes</div>
        <p class="clip-note">🔊 La musique et l’émotion démarrent avec votre clic.</p>
      </div>
      <div class="clip-frame">
        <video class="clip-video" controls playsinline preload="metadata" poster="carte-entre2.png" aria-label="Film de présentation de L’Entre 2 et du Malraux à Sarlat">
          <source src="DIAPORAMA_SARLAT_MUSIQUE_THEME.mp4" type="video/mp4">
          Votre navigateur ne permet pas la lecture de cette vidéo.
        </video>
        <button class="clip-start" type="button" aria-label="Lancer le film de présentation">
          <span class="clip-start-icon">▶</span>
          <span class="clip-start-text">Touchez ici pour vivre Sarlat</span>
          <span class="clip-start-sub">Film de 25 secondes</span>
        </button>
      </div>
    </div>`;
  target.before(section);
}
['malraux','entre2'].forEach(installClip);

document.querySelectorAll('.clip-frame').forEach(frame=>{
  const video=frame.querySelector('.clip-video');
  const start=frame.querySelector('.clip-start');
  const launch=()=>{
    document.querySelectorAll('.clip-video').forEach(other=>{if(other!==video)other.pause();});
    video.play().catch(()=>{});
  };
  start.addEventListener('click',launch);
  video.addEventListener('play',()=>{
    frame.classList.add('is-playing');
    document.querySelectorAll('.clip-video').forEach(other=>{if(other!==video)other.pause();});
  });
  video.addEventListener('ended',()=>frame.classList.remove('is-playing'));
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