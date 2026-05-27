/**
 * Ejemplos de uso del TikTok Viral Cloner
 * Casos reales para categorías de productos
 */

// ============ EJEMPLO 1: SKINCARE (B-UNIK) ============

const example1_skincare = {
  videoUrl: "https://www.tiktok.com/@beautyinfluencer/video/1234567890",
  productInfo: "B-Unik Crema Facial Hidratante Premium, 50ml, ingredientes naturales, para piel sensible, antienvejecimiento",
  productImage: "https://example.com/bunique-crema.jpg",
  productCategory: "skincare",
  
  expectedAnalysis: {
    hook: "Aplicación de crema mostrando absorción inmediata y brillo",
    structure: "Close-up → Before/After → Testimonial → CTA",
    viralElements: [
      "Transformación visible en menos de 3 segundos",
      "Skin glow natural bajo iluminación profesional",
      "Manos de mujer joven aplicando en cara",
      "Sonido ASMR de aplicación de producto"
    ],
    adaptedPrompt: "Close-up de crema hidratante siendo aplicada en piel, manos de mujer mostrando absorción inmediata, piel radiante bajo luz natural, transición suave a before/after, 5 segundos, estilo beauty profesional"
  }
};

// ============ EJEMPLO 2: HOME & DECORATION (PASTOPLÚS) ============

const example2_home = {
  videoUrl: "https://www.tiktok.com/@homedecor/video/9876543210",
  productInfo: "PastoPlús - Pasto Sintético Premium, rollo de 100m2, color verde natural, resistente UV, garantía 10 años",
  productImage: "https://example.com/pastoplús-producto.jpg",
  productCategory: "home",
  
  expectedAnalysis: {
    hook: "Transformación de patio gris a verde vibrante",
    structure: "Before (patio feo) → Installation time-lapse → After (jardín hermoso) → CTA",
    viralElements: [
      "Contraste dramático before/after",
      "Time-lapse rápido de instalación (7-15 segundos)",
      "Color verde brillante y natural",
      "Familia o personas disfrutando el espacio"
    ],
    adaptedPrompt: "Transformación de patio gris y deprimente a jardín verde exuberante con pasto sintético, time-lapse de instalación rápida, plano aéreo del patio terminado, familia descalza en el pasto nuevo, colores vibrantes, 5 segundos, estilo aspiracional"
  }
};

// ============ EJEMPLO 3: FASHION (GENERAL) ============

const example3_fashion = {
  videoUrl: "https://www.tiktok.com/@fashioninfluencer/video/5555666777",
  productInfo: "Vestido oversize vintage, algodón 100%, colores varios, talla única, perfecto para primavera",
  productImage: "https://example.com/vestido.jpg",
  productCategory: "fashion",
  
  expectedAnalysis: {
    hook: "Model twirling en vestido mostrando caída perfecta",
    structure: "Prenda en maniquí → Probada en modelo → Estilo 1 → Estilo 2 → CTA",
    viralElements: [
      "Movimientos fluidos del tejido",
      "Quick outfit changes",
      "Múltiples formas de usar la prenda",
      "Chica desenfadada y relatable"
    ],
    adaptedPrompt: "Modelo joven girando en vestido oversize vintage, la tela se mueve fluidamente mostrando la caída perfecta, close-up de detalles del tejido, luego múltiples escenas con estilos diferentes, outdoor iluminación natural, vibra relajada y trendy, 6 segundos"
  }
};

// ============ EJEMPLO 4: ELECTRÓNICA ============

const example4_electronics = {
  videoUrl: "https://www.tiktok.com/@techreviewer/video/3333444555",
  productInfo: "Audífonos inalámbricos con noise cancelling, batería 48h, Bluetooth 5.3, micrófono de 4 micrófonos",
  productImage: "https://example.com/earbuds.jpg",
  productCategory: "electronics",
  
  expectedAnalysis: {
    hook: "Unboxing satisfactorio o feature wow moment",
    structure: "Unboxing → Feature showcase → Real use → CTA",
    viralElements: [
      "Detalles premium del producto",
      "Sonido satisfactorio de unboxing",
      "Persona disfrutando la música/llamadas",
      "Bateria indicator o tech specs"
    ],
    adaptedPrompt: "Unboxing cinematic de audífonos premium, close-up de detalles de design, colocación en oído mostrando comodidad, persona escuchando música con expresión de satisfacción, transición a llamada de video, audio de música de fondo, 5 segundos, estilo tech premium"
  }
};

// ============ PATRÓN GENERAL: ANÁLISIS Y GENERACIÓN ============

export async function exampleFullPipeline() {
  const fetch_api = fetch;
  
  // Paso 1: Analizar video viral
  const analyzeResponse = await fetch_api('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      videoUrl: example1_skincare.videoUrl,
      productInfo: example1_skincare.productInfo
    })
  });
  
  const analysis = await analyzeResponse.json();
  console.log('📊 Análisis completado:', analysis);
  
  // Paso 2: Generar video con producto
  const generateResponse = await fetch_api('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: analysis.analysis.adaptedPrompt,
      productImage: example1_skincare.productImage,
      aspectRatio: '9:16',
      resolution: '1080p',
      duration: 5
    })
  });
  
  const video = await generateResponse.json();
  console.log('🎬 Video generado:', video);
  
  return video;
}

// ============ PROMPT TEMPLATES POR CATEGORÍA ============

export const promptTemplates = {
  skincare: `Close-up cinematic de [PRODUCT_NAME] siendo aplicado en piel.
    Manos mostrando absorción, piel con brillo natural.
    Transición suave a before/after.
    Iluminación profesional tipo beauty, colores cálidos.
    Audio: ASMR de aplicación, fondo musical soft.
    Duración: [DURATION]s. Estilo: premium, trustworthy, profesional.`,
  
  home: `Transformación dramática de espacio exterior.
    Before: área gris/deprimente. After: [PRODUCT] instalado.
    Time-lapse de instalación rápido, colores vibrantes.
    Personas disfrutando el espacio completado.
    Plano aéreo final mostrando todo el proyecto.
    Audio: uplifting, satisfactorio. Duración: [DURATION]s.`,
  
  fashion: `Modelo joven en [PRODUCT], movimientos fluidos.
    Close-up de detalles de tela, caída perfecta.
    Quick transitions entre múltiples estilos/outfits.
    Outdoor lighting natural, vibra desenfadada.
    Audio: trendy background music, fast-paced edits.
    Duración: [DURATION]s. Estilo: relatable, fashionable.`,
  
  electronics: `Unboxing satisfactorio, detalles premium claros.
    Close-up de features principales, usabilidad demostrada.
    Persona usando producto con expresión satisfecha.
    Tech specs o indicadores visuales de performance.
    Audio: tech-y, modern, incluyendo producto sounds.
    Duración: [DURATION]s. Estilo: premium, aspirational.`,
  
  food: `Food styling cinematic del producto.
    Close-up de texturas, colores apetitosos.
    Manos interactuando, consumo o preparación.
    Reacción positiva a sabor/resultado.
    Professional food photography lighting.
    Audio: ambient, satisfying sounds, trendy track.
    Duración: [DURATION]s. Estilo: delicious, appetizing.`
};

// ============ HOOKS VIRALES PROBADOS PARA TIKTOK SHOP ============

export const testedHooks = {
  skincare: [
    "This one product changed my entire skincare routine",
    "I've tried 20+ creams. This is the only one that works",
    "POV: You finally found THE moisturizer",
    "No more dry skin after trying this",
    "Literally everyone in my office asked what I'm using"
  ],
  
  home: [
    "We transformed our backyard for under $X",
    "This patio upgrade was SO worth it",
    "My neighbors are SO jealous of this",
    "Before and after that shocked everyone",
    "This is now our favorite spot at home"
  ],
  
  fashion: [
    "This dress is a *must-have* in your closet",
    "4 ways to style the same piece",
    "This fabric just hits different",
    "The comfort vs style ratio is INSANE",
    "Every girl needs this in their wardrobe"
  ],
  
  electronics: [
    "These changed how I listen to music",
    "Battery life that actually delivers",
    "The ONLY earbuds I'll use",
    "This feature sold me immediately",
    "Worth every single peso"
  ]
};

// ============ CONFIGURACIÓN POR PLATAFORMA ============

export const platformSpecs = {
  tiktokshop: {
    aspectRatio: '9:16',
    duration: '5-15 seconds',
    resolution: '1080p minimum',
    hooks: 'First 3 seconds CRITICAL',
    maxLength: '15 seconds',
    recommendation: 'Fast-paced, trending audio, clear product showcase'
  },
  
  instagram_reels: {
    aspectRatio: '9:16',
    duration: '15-90 seconds',
    resolution: '1080p',
    hooks: 'First 1 second critical',
    maxLength: '90 seconds',
    recommendation: 'Mix entertainment with selling'
  },
  
  youtube_shorts: {
    aspectRatio: '9:16',
    duration: '15-60 seconds',
    resolution: '1080p',
    hooks: 'First 2 seconds',
    maxLength: '60 seconds',
    recommendation: 'Educational or entertaining angle'
  },
  
  facebook: {
    aspectRatio: '1:1 or 4:5',
    duration: '15-120 seconds',
    resolution: '1080p',
    hooks: 'First 3 seconds',
    maxLength: '120 seconds',
    recommendation: 'Relatable, authentic, conversion-focused'
  }
};

console.log('💡 Ejemplos y templates disponibles para TikTok Viral Cloner');
