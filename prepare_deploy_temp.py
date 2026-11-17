from pathlib import Path
from urllib.parse import unquote
import re, hashlib, json, shutil
from PIL import Image, ImageOps

root = Path.cwd()
stage = root / '.deploy-staging'
stage.mkdir(exist_ok=True)
files = [Path('index.html')] + list(Path('pages').glob('*.html')) + list(Path('css').glob('*.css')) + list(Path('js').glob('*.js'))
refs = set()
for path in files:
    text = path.read_text(encoding='utf-8')
    refs.update(unquote(x) for x in re.findall(r'assets/images/[^\s\"\x27)<>]+', text))
files += [Path(p) for p in sorted(refs) if Path(p).is_file()]
for file in files:
    dst = stage / file
    dst.parent.mkdir(parents=True, exist_ok=True)
    if file.suffix.lower() in ('.jpg', '.jpeg') and file.stat().st_size > 1000000:
        im = ImageOps.exif_transpose(Image.open(file)).convert('RGB')
        im.thumbnail((1600,1600))
        im.save(dst, 'JPEG', quality=82, optimize=True)
    else:
        shutil.copyfile(file, dst)
manifest = []
for file in files:
    data = (stage / file).read_bytes()
    manifest.append({'file': file.as_posix(), 'sha': hashlib.sha1(data).hexdigest(), 'size': len(data)})
print(json.dumps(manifest))
