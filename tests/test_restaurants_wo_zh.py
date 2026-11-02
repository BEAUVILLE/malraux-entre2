"""Le Malraux & L'Entre 2: full 344-item WO/Chinese menu translations, prices intact."""
import json,re,shutil,subprocess,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/"index.html").read_text(encoding="utf-8")
PACK=(ROOT/"assets/digiy-resto-wo-zh-pack.js").read_text(encoding="utf-8")
class RestaurantWolofChinese(unittest.TestCase):
 def _dictionary(self,language):
  result={}
  marker=f"Object.assign(window.DIGIY_RESTO_WO_ZH.{language},"
  offset=0
  while True:
   i=PACK.find(marker,offset)
   if i<0:break
   rows,length=json.JSONDecoder().raw_decode(PACK[i+len(marker):])
   result.update(rows)
   offset=i+len(marker)+length
  return result
 def _french_keys(self):
  pos=HTML.index("en: {",HTML.index("const translations = {"))+len("en: ")
  rows,length=json.JSONDecoder().raw_decode(HTML[pos:])
  return rows
 def test_344_real_dish_translations_in_both_languages(self):
  keys=self._french_keys()
  self.assertEqual(len(keys),344)
  for lang in ("wo","zh"):
   d=self._dictionary(lang)
   self.assertEqual(set(d),set(keys),f"Incomplete {lang} menu")
   self.assertTrue(all(isinstance(v,str) and v.strip() for v in d.values()))
   self.assertIn("Réserver — 06 42 16 06 57",d)
   self.assertIn("Réserver — 06 73 27 44 27",d)
   self.assertIn("Prix nets TTC",d)
   self.assertIn("Menu Enfant · 11,50€",d)
  self.assertIn("萨尔拉",self._dictionary("zh")["Sarlat · Périgord Noir"])
  self.assertIn("Lekk",self._dictionary("wo")["Gastronomie périgourdine traditionnelle"])
 def test_actual_language_selector_and_switch(self):
  for code in ("fr","en","es","pt","it","de","nl","ar","wo","zh"):
   self.assertIn('data-lang="'+code+'"',HTML)
  self.assertIn('src="assets/digiy-resto-wo-zh-pack.js?v=20261102-1"',HTML)
  self.assertIn("const translations = {wo:(window.DIGIY_RESTO_WO_ZH?.wo||{}),zh:",HTML)
  self.assertIn("lang === 'zh' ? 'zh-CN' : lang",HTML)
  self.assertIn("wo:'wo_SN',zh:'zh_CN'",HTML)
  self.assertIn("['fr','en','es','pt','it','de','nl','ar','wo','zh']",HTML)
 def test_menu_business_prices_and_direct_booking(self):
  self.assertIn('href="tel:+33642160657"',HTML)
  self.assertIn('href="tel:+33673274427"',HTML)
  self.assertIn("11,50€",HTML)
  self.assertIn("Réservations uniquement par téléphone",HTML)
  self.assertIn('rel="canonical" href="https://restaurant-entre2malraux.fr/"',HTML)
  self.assertNotIn('supabase',PACK.lower())
  self.assertNotIn('fetch(',PACK)
 @unittest.skipUnless(shutil.which("node"),"Node unavailable")
 def test_script_syntax(self):
  p=subprocess.run(["node","--check",str(ROOT/"assets/digiy-resto-wo-zh-pack.js")],capture_output=True,text=True)
  self.assertEqual(p.returncode,0,p.stderr)
  m=re.search(r'<script id="digiy-i18n-script">(.*?)</script>',HTML,re.S)
  self.assertIsNotNone(m)
  p=subprocess.run(["node","--check"],input=m.group(1),capture_output=True,text=True)
  self.assertEqual(p.returncode,0,p.stderr)
if __name__=="__main__":unittest.main()
