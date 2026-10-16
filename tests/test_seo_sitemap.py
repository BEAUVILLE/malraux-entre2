import unittest
from pathlib import Path
import xml.etree.ElementTree as ET

class RestaurantSEO(unittest.TestCase):
 def test_sitemap(self):
  root=Path(__file__).resolve().parents[1]
  doc=ET.parse(root/'sitemap.xml').getroot()
  urls=[x.text for x in doc.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
  self.assertEqual(urls,['https://restaurant-entre2malraux.fr/'])
 def test_robots(self):
  root=Path(__file__).resolve().parents[1]
  text=(root/'robots.txt').read_text()
  self.assertIn('Sitemap: https://restaurant-entre2malraux.fr/sitemap.xml',text)
