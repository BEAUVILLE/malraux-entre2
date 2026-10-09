'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const page=fs.readFileSync(path.join(root,'index.html'),'utf8');
const js=fs.readFileSync(path.join(root,'script.js'),'utf8');
const css=fs.readFileSync(path.join(root,'style.css'),'utf8');
const a=page.indexOf('id="page-malraux"');
const b=page.indexOf('id="page-entre2"');
const c=page.indexOf('<script src="script.js" defer>',b);
assert.ok(a>=0&&b>a&&c>b);
const sections={malraux:page.slice(a,b),entre2:page.slice(b,c)};
const restaurants=[
 {key:'malraux',fiche:'https://resto.digiylyfe.com/fiche-le-malraux.html',phone:'tel:+33642160657'},
 {key:'entre2',fiche:'https://resto.digiylyfe.com/fiche-lentre2.html',phone:'tel:+33673274427'},
];
for(const x of restaurants){
 test(x.key+' hero and QR area expose the correct fiche and direct telephone',()=>{
  const s=sections[x.key];
  assert.equal(s.split('href="'+x.fiche+'"').length-1,2);
  assert.match(s, new RegExp('href="'+x.phone.replace('+','\\+')+'"'));
  assert.ok(s.includes('VOIR NOTRE FICHE DIGIY RESTO'));
  assert.ok(s.includes('FICHE DIGIY RESTO'));
  assert.ok(s.includes('rel="noopener noreferrer"'));
 });
}
test('existing QR and common website links remain on original destination',()=>{
 assert.ok(js.includes("const officialUrl='https://malraux-entre2.digiylyfe.com/'"));
 assert.ok(js.includes("link.textContent='Ouvrir le site commun'"));
 assert.ok(!js.includes("link.textContent='Ouvrir la fiche DIGIYLYFE'"));
});
test('fiche CTA styling exists and is phone friendly',()=>{
 assert.ok(css.includes('.btn-fiche {'));
 assert.ok(css.includes('.h-btns { flex-direction: column'));
});
test('each restaurant has a different valid fiche URL',()=>{
 assert.notEqual(restaurants[0].fiche,restaurants[1].fiche);
 assert.ok(restaurants.every(x=>x.fiche.startsWith('https://resto.digiylyfe.com/fiche-')));
});
