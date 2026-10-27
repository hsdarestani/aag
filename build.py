"""Dependency-free Cloudflare Pages build: python3 build.py."""
import os
import shutil
from pathlib import Path
from urllib.parse import urlparse
from html import escape
root = Path(__file__).resolve().parent
out = root / 'dist'
if out.exists(): shutil.rmtree(out)
out.mkdir()
for name in ('index.html', 'datenschutz.html', 'styles.css', 'app.js', 'favicon.svg', 'Ashkan-Asadian.vcf', '_headers'):
    shutil.copy2(root / name, out / name)
shutil.copytree(root / 'vendor', out / 'vendor')
url = os.environ.get('SITE_URL') or os.environ.get('CF_PAGES_URL', '')
if url:
    if urlparse(url).scheme != 'https' or not urlparse(url).netloc:
        raise ValueError('SITE_URL must be an absolute HTTPS URL')
    url = url.rstrip('/') + '/'
    file = out / 'index.html'
    meta = '<link rel="canonical" href="' + escape(url, quote=True) + '">\n<meta property="og:url" content="' + escape(url, quote=True) + '">\n'
    file.write_text(file.read_text().replace('</head>', meta + '</head>'))
print('Built dist/ (static files only)')
