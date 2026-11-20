// Transcribed from the final January 2026 salon price lists. Prices are in INR.
const serviceMenus = (() => {
  const single = (title, rows, note = '') => ({ title, columns: ['Price'], rows, note });
  const lengths = (title, rows, note = '') => ({ title, columns: ['Shoulder', 'Mid back', 'Waist'], rows, note });
  const stylists = (title, rows, note = '') => ({ title, columns: ['Stylist', 'Senior stylist', 'Top stylist', 'Creative director'], rows, note });
  const skin = [
    {title:'Ethereal facials',columns:['Manual','With Hydra'],rows:[
      ['Express facial',3000,5000],['Purifying facial',3200,5200],['Hydrating facial',3500,5500],['Brighten up your skin',4500,6500],['Anti-ageing facial',5500,7500]]},
    {title:'Elegant facials',columns:['Manual','With Hydra'],rows:[
      ['Aquatherm advance facial (Hydra facial)',6000,8000],['Collagen advance facial',6800,8800],['Clarifying advance facial',7800,9800],['Power C+ programme facial',8500,10500],['Power retinol facial',8500,10500],['Power hyaluronic facial',8500,10500],['Skin corrective facial',9000,11000],['Dynamic recovery facial',10000,12000],['Organic facial',12000,14000]]},
    {title:'Clean up',columns:['Manual','With Hydra'],rows:[
      ['Eye therapy',1500,2000],['Lip treatment',1500,2000],['Radiant clean up',2000,3000],['Whitening clean up',2500,3500],['Purifying clean up',2500,3500],['Pre cleanser clean up',3000,4000]]},
    single('Express facial masks', [['Quick glow mask',1300],['Sensitive mask',2000],['Cooling mask',2200],['Skin tightening mask',2400]]),
    single('De-tan', [['Foot or palm',700],['Face & neck',1200],['Full hands',1800],['Half leg',1800],['Full leg',2500],['Full back',1500],['Full front',1500],['Full body',8000]])
  ];
  const handsFeet = [
    single('Pedicure', [['Signature pedicure',1800],['Tropical paradise pedicure',2000],['Exotic pedicure',2300],['American pedicure',2500],['Cocktail pedicure',4000],['Orchid pedicure',3500],['Sunkist pedicure',3000],['Hydra pedicure',3000],['Foot reflexology',1800]]),
    single('Manicure', [['Nail cut & file',250],['Signature manicure',1600],['Tropical paradise manicure',1800],['Exotic manicure',1700],['American manicure',2300],['Cocktail manicure',3800],['Orchid manicure',3300],['Sunkist manicure',2800],['Hydra manicure',2800],['Hand reflexology',1600]])
  ];
  const women = [
    lengths('Hair styling', [['Hair wash and blast dry',950,1150,1350],['Hair wash and blow dry',1350,1550,1750],['Ultimate blow dry',1000,1200,1400],['Elegant hair wash (PH, Biotop)',1150,1350,1550],['Elegant hair wash and blow dry',1550,1750,1950],['Iron / crimp finish',1550,1750,1950],['Tong / roller finish',1650,1850,2050]],'Extra length: ₹350 extra.'),
    stylists('Hair cut', [['Hair cut and blow dry',1300,1900,2500,12500],['Royal hair cut',2500,3000,4000,15000],['Kids cut (under 10 years)',1100,1600,2200,12500]],'Royal cut includes wash, deep conditioning, haircut and styling. Extra length: ₹500 extra.'),
    lengths('Hair treatments', [['Express hair spa',2000,2500,3000],['700 keratin oil treatment',3500,4000,4500],['911 repair treatment',4000,4500,5000],['Anti-dandruff treatment',2500,2500,3500],['Anti hair fall treatment',2500,2500,3500],['Hair retention treatment',3500,3500,4500],['Olaplex treatment',3500,3500,4500],['PH hair rituals',5500,5500,6500]]),
    single('Head massage', [['Virgin oil head massage · 15 minutes without wash',1500],['Organic oil head massage · 20 minutes without wash',2000]]),
    lengths('Hair colour', [['Colour refresh / toning',7000,8500,10000],['Global colour with ammonia',8000,11000,14000],['Global colour without ammonia',9000,12000,15000],['Crown highlights with pre-light',10500,12500,14500],['Full head highlights with pre-light',14000,18000,22000],['Full head highlights without pre-light',13500,16500,19500]],'Final price depends on consultation, hair type and requirements.'),
    lengths('Luxury colour', [['Global colour with ammonia',10000,12000,14000],['Global colour without ammonia',11000,14000,17000],['Full head highlights with pre-light',17500,19500,22500],['Full head highlights without pre-light',19500,22500,25500],['Crown highlights with pre-light',11500,13500,15500],['Colour refresh / toning',8500,9500,11000]],'Root touch-up: ₹2,000 with ammonia or ₹2,500 without ammonia; styling ₹800 extra.'),
    lengths('Hair texture', [['Smoothening / straightening / rebonding',10500,13500,17500],['Premium keratin treatment',11500,14500,17500],['Botox treatment',12500,15500,18500],['Smoothening / keratin fringe',4000,4000,4000],['Extra long / volume / thickness add-on',2500,2500,2500]],'Final price depends on consultation, hair length and density.'),
    ...skin,
    single('Body therapy', [['Back massage',2500],['Body massage',5000],['Back polishing',4000],['Body polishing',8000],['Hans spa therapy',4500]]),
    single('Threading', [['Eyebrow',100],['Upper lips',80],['Forehead',80],['Chin',80],['Side block',100],['Full face',450]]),
    single('Waxing', [['Eyebrow',250],['Upper lips',200],['Forehead',250],['Side block',250],['Jawline',200],['Full face',800],['Underarms',300],['Full hand',750],['Full front',900],['Full back',900],['Half legs',750],['Full legs',1300],['Bikini',2500],['Full body',6500]]),
    single('Brazilian wax', [['Eyebrow',250],['Upper lips',200],['Nose',300],['Jawline',200],['Forehead',250],['Side block',250],['Full face',800],['Underarms',400],['Bikini',3500]]),
    single('Nail extensions & nail art', [
      ['Gel paint on natural nails',1000],['Temporary nail extensions',2000],['Acrylic nail extension',3500],['Gel nail extension',3700],['Removal on natural nails',350],['Temporary extension removal',500],['Acrylic extension removal',700],['AD diamond · small',40],['AD diamond · medium',60],['AD diamond · large',80],['Regular nail paint',500],
      ['Zebra print per finger · half',150],['Zebra print per finger · full',180],['Leopard print per finger · half',150],['Leopard print per finger · full',180],['3D / 4D nail art per finger · classic',450],['3D / 4D nail art per finger · creative',600],['Figure classic',600],['Figure creative',700],['French per finger',80],['Foil per finger',80],['Glitter per finger',150],['Glitter per finger with milers',200],['Falling glitter per finger',80],['Marble per finger · basic',150],['Marble per finger · classic',180],['Marble per finger · creative',210],['Marble per finger · advance',240],['Neon pigments per finger · half',250],['Neon pigments per finger · full',300],['Ombre per finger · dual colours',350],['Ombre per finger · trio colours',450],['Ombre per finger · multi colours',550],
      ['Metallic chrome per finger · half',350],['Metallic chrome per finger · full',400],['Metallic chrome per finger · ombre full',450],['Water decal per finger',80],['Sticker per finger',80],['Sugar per finger · minimal',350],['Sugar per finger · explore',400],['Cat eye per finger',400],['Ink per finger · minimal',450],['Ink per finger · explore',500],['Glitter line per finger · H',60],['Glitter line per finger · V',80],['Glitter line per finger · S',90],['Normal line per finger · H',50],['Normal line per finger · V',60],['Normal line per finger · S',70],['Inbuilt glitter per finger',70],['Swirls per finger',400],['Spider per finger',100],['Pearl effect per finger · half',350],['Pearl effect per finger · full',400],['Pearl effect per finger · ombre full',450],['Pearl per finger · S',50],['Pearl per finger · M',70],['Pearl per finger · L',90],['Acrygel nail extension',3800],['Refills',3100]
    ]),
    ...handsFeet,
    single('Lux volumizer', [['16 inches',18500],['20 inches',22300],['24 inches',26300],['26 inches',29400],['28 inches',34500],['30 inches',40500],['32 inches',48500]]),
    single('Hair toppers', [['3×5 · 16 inches',14500],['3×5 · 20 inches',18300],['3×5 · 24 inches',24300],['4×4 · 16 inches',15500],['4×4 · 20 inches',20500],['4×4 · 24 inches',26500],['5×5 · 16 inches',18500],['5×5 · 20 inches',22500],['5×5 · 24 inches',28500]]),
    single('Hair extensions · per strand', [['20 inches',400],['22 inches',450],['24 inches',650],['28 inches',850],['30 inches',1050],['32 inches',1150]],'Final price depends on consultation, hair length and density. Other services are extra.')
  ];
  const men = [
    stylists('Hair cut', [['Hair cut · includes wash and styling',1000,1600,2500,12500],['Royal hair cut · wash, head relaxation and styling',2500,3000,3500,14000],['Kids hair cut · under 10 years',1000,1600,2500,12500]]),
    stylists('Beard', [['Beard trimming',600,800,1000,5000],['Clean shave',600,800,1000,null],['Styling beard',600,800,1000,5000],['Royal shave · includes skin relaxation therapy',3000,3000,3000,null]]),
    single('Extra care', [['Men’s hair styling with YOYO',6000],['Men’s hair styling',800],['Hair wash',400],['Elegant hair wash',650]]),
    {title:'Hair removal',columns:['Trimming','Waxing'],rows:[['Ear waxing',null,350],['Nose waxing',null,350],['Full face',null,800],['Underarms',350,550],['Half legs',650,1150],['Full hand',850,1250],['Full front',1200,1500],['Full back',1200,1500],['Full leg',1200,2000],['Full body',5000,null]]},
    single('Hair colour', [['Moustache',500],['Side locks',700],['Per foil',1000],['Global colour with ammonia',2000],['Global colour without ammonia',2500],['Beard colour with ammonia',1000],['Beard colour without ammonia',1400],['Partial highlights · 6 foils',7000],['Full head highlights',9000]],'Final price depends on consultation, hair type and requirements.'),
    single('Hair texture', [['Premium keratin treatment',7500],['Botox treatment',7500],['Smoothening / keratin fringe',7500],['Extra long / volume / thickness add-on',2500],['Perming · starting from',9000]]),
    ...skin,
    single('Hair care', [['Fiber boost',1500],['Express hair spa',2000],['700 keratin oil treatment',3500],['911 repair treatment',3500],['Anti-dandruff treatment',2500],['Anti hair fall treatment',2500],['Hair retention treatment',2500],['PH rituals',4500]]),
    single('Head massage', [['Virgin oil head massage · 15 minutes without wash',1500],['Organic oil head massage · 20 minutes without wash',2000]]),
    ...handsFeet
  ];
  const makeup = [
    {title:'Bridal packages',columns:['HD','Airbrush'],rows:[['Haldi / Myra / Grahshanti / Pooja / Mehendi / baby shower',18500,23500],['Sangeet / engagement / cocktail party',22500,27500],['Wedding / reception',28500,35000]],note:'Includes makeup, hairstyling, draping, selected accessories and photography. Hair accessories are on deposit; consult the salon about requirements.'},
    {title:'Side bride & kids',columns:['HD','Airbrush'],rows:[['Side bride · all functions',15000,20000],['Kids · under 12 years',8000,null]]},
    {title:'Pre-bride packages',columns:['Basic','Premium'],rows:[['Threading',350,null],['Threading & face wax',null,800],['Face de-tan',1200,1200],['Manicure',2300,3300],['Pedicure',2500,3500],['Body de-tan',null,5000],['Facial',4500,8000],['Waxing',4550,8000],['Body polishing',8000,10000],['Package total',23400,39800]]},
    single('Groom packages', [['YOYO Sir',40000],['Top artist',25000],['Senior artist',15000]],'Includes hair wash, hairstyling, makeup, beard set, cleanup, draping and photography.'),
    {title:'Pre-groom packages',columns:['Basic','Premium'],rows:[['Threading',350,null],['Beard',800,1000],['Face de-tan',1000,null],['Haircut with senior stylist',1600,null],['Threading & face wax',null,800],['Haircut with top stylist',null,2500],['Face & neck de-tan',null,2000],['Manicure',2300,3300],['Pedicure',2500,3500],['Facial',4500,8000],['Waxing',4550,8000],['Package total',17600,29100]]}
  ];
  return {women, men, makeup};
})();

const categoryGroups = {
  colour: ['Hair colour', 'Luxury colour'],
  hair: ['Hair cut', 'Hair styling', 'Beard', 'Extra care', 'Hair treatments', 'Hair care',
    'Hair texture', 'Lux volumizer', 'Hair toppers', 'Hair extensions · per strand'],
  makeup: ['Bridal packages', 'Side bride & kids', 'Pre-bride packages', 'Groom packages', 'Pre-groom packages'],
  skin: ['Ethereal facials', 'Elegant facials', 'Clean up', 'Express facial masks', 'De-tan',
    'Body therapy', 'Threading', 'Waxing', 'Brazilian wax', 'Hair removal'],
  nails: ['Nail extensions & nail art', 'Manicure', 'Pedicure'],
  massage: ['Head massage'],
};
