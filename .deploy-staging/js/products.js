// Image paths are added only after the product and variant have been matched.
const productImages = {
  6: 'https://skeyndor.in/cdn/shop/files/Antiox-Glowing-Serum.jpg?v=1755509948&width=600',
  7: 'https://skeyndor.in/cdn/shop/files/Matt-Protective-Cream.jpg?v=1747125931&width=1080',
  10: 'https://us.milkshakehair.com/cdn/shop/files/milk-shake-lifestyling-blow-dry-primer-200-ml_45f2f294-4a0c-481d-9d98-ebaf73e816f9.jpg?v=1764771676&width=960',
  24: 'https://biotopindia.com/cdn/shop/files/BYB_Artboard_1_copy.jpg?v=1753165003&width=533',
  25: 'https://biotopindia.com/cdn/shop/files/BYB_2BP_WB_IM.jpg?v=1743840893&width=533',
  26: 'https://biotopindia.com/cdn/shop/files/BYB_Artboard_1.jpg?v=1753164861&width=533',
  40: 'https://skeyndor.in/cdn/shop/files/Eye-Contour-Gel-in-Cream.jpg?v=1747135157&width=1080',
  41: 'https://skeyndor.in/cdn/shop/files/Cleansing-Milk.jpg?v=1747135076&width=1080',
  42: 'https://skeyndor.in/cdn/shop/files/Relieving-SOS-Cream.jpg?v=1747135239&width=1080',
  129: 'https://skeyndor.in/cdn/shop/files/Body-Protective-B-Phase.jpg?v=1747125502&width=600',
  265: 'https://skeyndor.in/cdn/shop/products/Mattifying-foam-in-gel_1.jpg?v=1677476080&width=1080',
  267: 'https://skeyndor.in/cdn/shop/products/Deep-Lines-Refining-Serum.jpg?v=1675336186&width=1080',
  268: 'https://skeyndor.in/cdn/shop/products/Deep-Lines-Filler-Cream.jpg?v=1675336147&width=600',
  270: 'https://skeyndor.in/cdn/shop/products/Skin-Foaming-Cleanser.jpg?v=1675336360&width=600',
  363: 'https://skeyndor.in/cdn/shop/files/Cream-Normal-to-Oily-skin.jpg?v=1747135131&width=1080',
  615: 'https://skeyndor.in/cdn/shop/products/Pore-Refining-Repair-Serum.jpg?v=1675336166&width=1080',
  705: 'https://us.milkshakehair.com/cdn/shop/files/milk-shake-lifestyling-blow-dry-primer-200-ml_45f2f294-4a0c-481d-9d98-ebaf73e816f9.jpg?v=1764771676&width=960',
  869: 'https://skeyndor.in/cdn/shop/products/Energizing-Emulsion.jpg?v=1675336085&width=1080',
  876: 'https://skeyndor.in/cdn/shop/files/Daywear-Protective-Emulsion.jpg?v=1747125903&width=1080',
  888: 'https://biotopindia.com/cdn/shop/files/BYB_Artboard_1_copy.jpg?v=1753165003&width=533',
  890: 'https://biotopindia.com/cdn/shop/files/BYB_2BP_WB_IM.jpg?v=1743840893&width=533',
  892: 'https://biotopindia.com/cdn/shop/files/BYB_Artboard_1.jpg?v=1753164861&width=533',
  895: 'https://biotopindia.com/cdn/shop/files/41z1tGP50CL._SX522.jpg?v=1784110214',
  1006: 'https://skeyndor.in/cdn/shop/files/Thermal-Concentrate-Water_d37754cf-1571-499d-bfb7-3c0430352a86.jpg?v=1782990467&width=1080',
  1010: 'https://skeyndor.in/cdn/shop/files/Antiox-Glowing-Serum.jpg?v=1755509948&width=600'
};
// Exact product/size matches from the manufacturer's product catalogue.
[
  [[734], 'milk-shake-argan-oil-50-ml.jpg?v=1713342369'],
  [[731], 'milk-shake-cold-brunette-toning-spray_75e80b12-4291-48f8-b09c-5f0a25f9028a.jpg?v=1718042396'],
  [[56,132], 'milk-shake-color-maintainer-conditioner-300-ml.jpg?v=1713288589'],
  [[254,730], 'milk-shake-color-maintainer-conditioner-1000-ml_797eae1f-217c-4c22-8fa5-74a381f09c4d.jpg?v=1757687866'],
  [[729], 'milk-shake-color-maintainer-shampoo-1000-ml_24778f8d-4ba2-4a8a-82d5-302a825d1fd4.jpg?v=1757687858'],
  [[44,353], 'milk-shake-deep-conditioning-mask-200-ml.jpg?v=1713288907'],
  [[36,726], 'milk-shake-curl-passion-conditioner-300-ml.jpg?v=1713290853'],
  [[727], 'milk-shake-curl-passion-conditioner-1000-ml_884d26f9-b38d-422a-bbdb-25e76696e9a3.jpg?v=1757687737'],
  [[724], 'milk-shake-curl-passion-mask-250-ml.jpg?v=1713293711'],
  [[356,722], 'milk-shake-curl-passion-shampoo-300-ml.jpg?v=1713290759'],
  [[723], 'milk-shake-curl-passion-shampoo-1000-ml_c2e008f3-c6a1-4b30-ad97-0745c392d9e5.jpg?v=1757687745'],
  [[135], 'milk-shake-deep-detox-shampoo-1000-ml_89f0ef50-4560-49ed-93fc-35c50f5e9585.jpg?v=1757687641'],
  [[253,719], 'milk-shake-energizing-blend-conditioner-300-ml.jpg?v=1713205054'],
  [[720], 'milk-shake-energizing-blend-conditioner-1000-ml_0894ce41-5db7-46d9-b92e-51fc24c17ff4.jpg?v=1757687835'],
  [[211,717], 'milk-shake-energizing-blend-shampoo-300-ml.jpg?v=1713204946'],
  [[349], 'milk-shake-energizing-blend-shampoo-1000-ml_c96c9e53-4cdf-4a37-b59c-e29623d8e925.jpg?v=1757687824'],
  [[715], 'milk-shake-icy-blond-conditioner-250-ml-allure.jpg?v=1758027617'],
  [[385], 'milk-shake-icy-blond-conditioner-1000-ml_b0b991b7-b51a-42ca-bd84-83af6aeb9d60.jpg?v=1757687728'],
  [[134], 'milk-shake-icy-blond-shampoo-300-ml-allure.jpg?v=1758027608'],
  [[386], 'milk-shake-icy-blond-shampoo-1000-ml_84919fa7-7638-422e-957c-8d211bc464ff.jpg?v=1757687701'],
  [[714], 'milk-shake-icy-blond-toning-spray_2f10683f-5e88-43b4-8493-54f1c10c9df5.jpg?v=1718042422'],
  [[213], 'milk-shake-integrity-strength-nourishing-conditioner-300-ml.jpg?v=1756215666'],
  [[351], 'milk-shake-integrity-strength-conditioner-1000-ml_904b73b8-77dc-420b-af77-94496ecde25f.jpg?v=1757687876'],
  [[79,214], 'milk-shake-integrity-strength-nourishing-shampoo-300-ml.jpg?v=1756723674'],
  [[350], 'milk-shake-integrity-strength-shampoo-1000-ml_644e93f9-abee-40e5-87ce-c0fc27d4e0fe.jpg?v=1757687845'],
  [[92,706], 'milk-shake-leave-in-conditioner-350-ml-new.jpg?v=1724218105'],
  [[696], 'milk-shake-moisture-more-shampoo-1000-ml_024b0907-b100-4424-9921-a77a5d5db0d3.jpg?v=1757687633'],
  [[354,694], 'milk-shake-purifying-blend-shampoo-300-ml.jpg?v=1713205314'],
  [[384], 'milk-shake-purifying-blend-shampoo-1000-ml_2449e9f2-179c-443d-9167-f878aa44a1b7.jpg?v=1757687815'],
  [[31,189], 'milk-shake-lifestyling-shaping-foam-200-ml.jpg?v=1764777664'],
  [[133,728], 'milk-shake-whipped-cream-200-ml.jpg?v=1713290564']
].forEach(([ids, path]) => ids.forEach(id => {
  productImages[id] = `https://us.milkshakehair.com/cdn/shop/files/${path}&width=960`;
}));
const grid = document.querySelector('#catalogue-grid');
const search = document.querySelector('#product-search');
const pageLabel = document.querySelector('#product-page');
const previous = document.querySelector('#product-prev');
const next = document.querySelector('#product-next');
const pageSize = 12;
let page = 1;
let matches = [];
// Show one entry per matched product image. The complete source list remains in
// product-data.js so additional products can be introduced after matching.
const seenImages = new Set();
const displayedProducts = products.filter(product => {
  const image = productImages[product.id];
  if (!image || seenImages.has(image)) return false;
  seenImages.add(image);
  return true;
});

function cardFor(product) {
  const displayName = product.name.replace(/\s+\(?\d{3,5}(?:\/-)?\)?(?:\s+[RP])?$/i, '').replace(/\s+[RP]$/i, '');
  const card = document.createElement('article');
  card.className = 'catalogue-card';
  const visual = document.createElement('div');
  visual.className = 'catalogue-visual';
  const imagePath = productImages[product.id];
  if (imagePath) {
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = displayName;
    img.loading = 'lazy';
    img.addEventListener('error', () => {
      visual.replaceChildren();
      visual.classList.add('catalogue-visual--empty');
      visual.textContent = 'Image unavailable';
    }, { once: true });
    visual.append(img);
  } else {
    visual.classList.add('catalogue-visual--empty');
    visual.textContent = 'Image unavailable';
  }
  const content = document.createElement('div');
  content.className = 'catalogue-content';
  const brandLabel = document.createElement('p');
  brandLabel.className = 'catalogue-brand';
  brandLabel.textContent = product.brand || 'Hair Rap by Yoyo';
  const name = document.createElement('h3');
  name.textContent = displayName;
  const meta = document.createElement('p');
  meta.className = 'catalogue-meta';
  const productType = product.type === 'Both' ? 'Retail & professional' : product.type;
  meta.textContent = [product.category, productType && productType !== '-' ? productType : ''].filter(Boolean).join(' · ');
  const link = document.createElement('a');
  link.className = 'catalogue-enquire';
  link.href = `https://wa.me/919099938886?text=${encodeURIComponent(`Hi, I’d like to ask about the price and availability of ${displayName}${product.brand ? ` by ${product.brand}` : ''}.`)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Enquire on WhatsApp ↗';
  content.append(brandLabel, name, meta, link);
  card.append(visual, content);
  return card;
}

function renderProducts() {
  const query = search.value.trim().toLocaleLowerCase();
  matches = displayedProducts.filter(product => {
    const text = [product.name, product.brand, product.category, product.subcategory].join(' ').toLocaleLowerCase();
    return !query || text.includes(query);
  });
  const pages = Math.max(1, Math.ceil(matches.length / pageSize));
  page = Math.min(page, pages);
  grid.replaceChildren(...matches.slice((page - 1) * pageSize, page * pageSize).map(cardFor));
  if (!matches.length) {
    const empty = document.createElement('p');
    empty.className = 'catalogue-empty';
    empty.textContent = 'No products match your search. Try a different name or filter.';
    grid.append(empty);
  }
  pageLabel.textContent = `Page ${page} of ${pages}`;
  previous.disabled = page === 1;
  next.disabled = page >= pages;
}
search.addEventListener('input', () => { page = 1; renderProducts(); });
previous.addEventListener('click', () => { if (page > 1) { page--; renderProducts(); grid.scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
next.addEventListener('click', () => { if (page * pageSize < matches.length) { page++; renderProducts(); grid.scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
renderProducts();
