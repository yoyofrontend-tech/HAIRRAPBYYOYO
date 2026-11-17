from pathlib import Path
import pypdfium2 as pdf
from PIL import Image, ImageOps, ImageDraw

out = Path('tmp/pricelist-review')
out.mkdir(parents=True, exist_ok=True)
for file in Path('assets/price-lists').glob('*.pdf'):
    doc = pdf.PdfDocument(str(file))
    for start in range(0, len(doc), 4):
        pages = []
        for i in range(start, min(start+4, len(doc))):
            page = doc[i]
            image = page.render(scale=1.2).to_pil().convert('RGB')
            image.thumbnail((1100, 1550))
            canvas = Image.new('RGB', (1100, 1590), 'white')
            canvas.paste(image, ((1100-image.width)//2, 35))
            ImageDraw.Draw(canvas).text((20,10), f'{file.stem} page {i+1}', fill='black')
            pages.append(canvas)
        sheet = Image.new('RGB', (2200, 3180), '#eee')
        for i, page in enumerate(pages):
            sheet.paste(page, ((i%2)*1100, (i//2)*1590))
        sheet.save(out / f'{file.stem}-{start+1:02}.jpg', quality=85)
    print(file.stem, len(doc), flush=True)
