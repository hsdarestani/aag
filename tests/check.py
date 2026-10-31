from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
p=Path(__file__).resolve().parents[1]
class Links(HTMLParser):
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  for key in ('href','src'):
   v=a.get(key,'')
   if v.startswith('./'): assert (p/'dist'/(urlparse(v).path[2:] or 'index.html')).is_file(),v
for f in ('index.html','datenschutz.html'): Links().feed((p/'dist'/f).read_text())
v=(p/'dist/Aplus-Solution.vcf').read_bytes()
assert v.startswith(b'BEGIN:VCARD\r\n') and v.endswith(b'END:VCARD\r\n')
assert all(len(line)<=75 for line in v.split(b'\r\n'))
assert b'\n' not in v.replace(b'\r\n',b'')
assert b'+496921000418' in v and b'info@aplus-solution.de' in v
assert not (p/'dist/qa.html').exists()
print('Local links, VCF encoding/folding/contact data, clean deployment output: PASS')

s=(p/'dist/index.html').read_text()
assert '<style id="profile-styles">' in s
assert (p/'styles.css').read_text() in s
assert not any(c in s for c in ('↗', '↓', '←', '→'))
assert 'rel="stylesheet"' not in s
print('Inline styles and arrow-free controls: PASS')

# The original uploaded corporate logo must be included as a real image.
assert (p/'dist/Artboard 1.png').is_file(), 'Artboard image missing from deployment'
assert (p/'dist/Artboard 1.png').stat().st_size > 400_000
assert (p/'dist/artboard-logo.svg').is_file(), 'Cropped artboard SVG absent'
assert (p/'dist/artboard-logo.svg').stat().st_size > 500_000
assert 'src="./artboard-logo.svg?v=3"' in s
assert '.logo-artboard .logo-cropped{' in s
assert 'position:absolute' not in (p/'styles.css').read_text().split('.logo-artboard .logo-cropped{')[1].split('}')[0]
assert 'background-image:url("./Artboard%201.png' not in s
print('Uploaded brand art rendered as image and bundled: PASS')

assert 'filter="url(#remove-dark)"' in (p/'dist/artboard-logo.svg').read_text()
assert 'viewBox="154 666 735 500"' in (p/'dist/artboard-logo.svg').read_text()
assert 'mix-blend-mode:screen' not in (p/'styles.css').read_text().split('.logo-artboard .logo-cropped{')[1].split('}')[0]
print('Transparent badge artwork and correct crop: PASS')
