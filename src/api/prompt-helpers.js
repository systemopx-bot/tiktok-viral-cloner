/**
 * Librería de helpers para optimizar prompts de Seedance 2.0
 * Basado en mejores prácticas para TikTok Shop
 */

// ============ PLANTILLAS DE PROMPTS ============

export const PROMPT_TEMPLATES = {
  productShowcase: `
    A showcase video of [PRODUCT] with [PRODUCT_FEATURES].
    Close-up shot of the product, then wider shot showing it in use.
    Professional lighting, sharp focus on details.
    Smooth camera movements. Duration: [DURATION]s.
    Style: cinematic, product-focused, professional.
  `,

  unboxing: `
    Smooth unboxing experience of [PRODUCT].
    Close-up shots of packaging, hands opening, revealing product.
    Natural lighting, ASMR-friendly pacing.
    Multiple angles showing the product from different perspectives.
    Duration: [DURATION]s. Style: satisfying, professional, premium feel.
  `,

  beforeAfter: `
    Split-screen before and after showing [PRODUCT] effect.
    Left side: before state. Right side: after state with product.
    Smooth transition in the middle. Professional color grading.
    Clear demonstration of product benefits.
    Duration: [DURATION]s. Style: convincing, professional.
  `,

  lifestyleVlog: `
    Lifestyle vlog showing [PRODUCT] being used naturally.
    Person using product in daily life, real environment.
    Multiple scenes: morning routine, work, evening, etc.
    Natural lighting, authentic moments, relatable scenarios.
    Duration: [DURATION]s. Style: authentic, relatable, aspirational.
  `,

  viralTrend: `
    Trending format adaptation with [PRODUCT].
    Fast-paced edits, trending audio hook, trendy transitions.
    Product placement organic within trend format.
    Multiple quick cuts, energy level: HIGH.
    Duration: [DURATION]s. Style: viral, trendy, fast-paced.
  `,

  tutorialDemo: `
    Step-by-step tutorial using [PRODUCT].
    Clear instructions, multiple angles, close-ups of details.
    Text overlays for key steps, professional pacing.
    Show before, during, and after results.
    Duration: [DURATION]s. Style: educational, clear, helpful.
  `,

  priceVsValue: `
    Showing why [PRODUCT] at [PRICE] is amazing value.
    Price reveal moment, comparison with competitors.
    Highlight premium features and quality.
    Customer testimonial or satisfaction moment.
    Duration: [DURATION]s. Style: persuasive, trustworthy.
  `,

  limitedOffer: `
    Limited time offer urgency for [PRODUCT].
    Countdown visual, scarcity messaging, action CTA.
    Product benefits recap, link/shop button prominent.
    Fast pacing, energetic, calls to action.
    Duration: [DURATION]s. Style: urgent, exciting, call-to-action focused.
  `
};

// ============ ELEMENTOS CLAVE POR CATEGORÍA ============

export const CATEGORY_ELEMENTS = {
  skincare: {
    cameras: [
      'close-up macro shot of product texture',
      'slow pan across face showing skin',
      'overhead shot of product application',
      'mirror reflection shots'
    ],
    lighting: [
      'soft diffused light for beauty',
      'warm tones emphasizing glow',
      'studio lighting with subtle shadows',
      'natural window light for authenticity'
    ],
    transitions: [
      'fade between before/after',
      'wipe transitions for process steps',
      'zoom into product details',
      'smooth dissolve between scenes'
    ],
    hooks: [
      'skin problem revealed, solution shown',
      '"This skincare secret changed everything"',
      'visible results in seconds',
      'dermatologist/expert recommendation'
    ]
  },

  home: {
    cameras: [
      'wide shot of space transformation',
      'detail shots of product installation',
      'before/after room comparison',
      'lifestyle shot showing use'
    ],
    lighting: [
      'bright natural light showing transformation',
      'warm ambient lighting',
      'spotlight on product details',
      'realistic room lighting'
    ],
    transitions: [
      'dramatic reveals of finished space',
      'time-lapse installation',
      'comparison wipes',
      'zooms on key features'
    ],
    hooks: [
      'room transformation dramatically shown',
      '"This changed my home"',
      'cost vs result comparison',
      'durability/quality demonstration'
    ]
  },

  fashion: {
    cameras: [
      'full-body outfit shots',
      'close-ups of fabric/details',
      'model walking/movement',
      'try-on transitions'
    ],
    lighting: [
      'bright fashion lighting',
      'natural daylight for authenticity',
      'studio flash for details',
      'mixed indoor/outdoor'
    ],
    transitions: [
      'quick outfit changes',
      'zoom to detail then back',
      'twirl/spin transitions',
      'fade between looks'
    ],
    hooks: [
      'style tip or trick shown',
      '"This piece is a MUST HAVE"',
      'price reveal moment',
      'versatile styling demonstration'
    ]
  }
};

// ============ OPTIMIZADORES DE PROMPT ============

export function optimizePromptForSeedance(basePrompt, options = {}) {
  const {
    duration = 5,
    resolution = '1080p',
    productName = 'product',
    category = 'general'
  } = options;

  // Estructura recomendada para Seedance 2.0
  const structure = `
    ${basePrompt}
    
    TECHNICAL SPECS:
    - Duration: exactly ${duration} seconds
    - Resolution: ${resolution}
    - Aspect ratio: 9:16 (vertical for TikTok)
    - Frame rate: 30fps
    
    REQUIREMENTS:
    - Crystal clear focus on ${productName}
    - Professional color grading
    - Smooth camera movements (no jitter)
    - Natural pacing for social media
    - Hook in first 3 seconds
    - Clear visual hierarchy
    
    STYLE:
    - Cinematic quality
    - Professional but relatable
    - Optimized for TikTok algorithm
    - Includes product branding/showcase
  `.trim();

  return structure;
}

export function generateViralPrompt(analysis, productInfo) {
  const { seedancePrompt, productAdaptation } = analysis;
  
  return `
    ${seedancePrompt}
    
    PRODUCT ADAPTATION:
    - Product: ${productInfo.name || 'product'}
    - Category: ${productInfo.category || 'general'}
    - Key Feature: ${productInfo.keyFeature || 'quality'}
    
    MODIFICATIONS:
    ${productAdaptation.whatToChange?.map(item => `✓ Change: ${item}`).join('\n')}
    ${productAdaptation.whatToKeep?.map(item => `✓ Keep: ${item}`).join('\n')}
    
    NEW HOOK FOR TIKTOK:
    "${productAdaptation.newHook}"
    
    TIKTOK SHOP SPECIFIC:
    - Add visible product in final 2 seconds
    - Include call-to-action "Link in bio"
    - Product branding clear and professional
    - Hashtags integration points identified
  `.trim();
}

// ============ ANÁLISIS DE TENDENCIAS ============

export const TRENDING_HOOKS_TIKTOK = [
  '"nobody talks about..."',
  '"this changed my life"',
  '"$X investment that paid off"',
  '"stop buying..."',
  '"I finally tried..."',
  '"POV: you just discovered..."',
  '"before you buy [product]..."',
  '"why [competitors] hate this..."',
  '"the honest review of..."',
  '"this is why [product] is overrated/underrated"',
  '"waiting for the moment you see..."',
  '"telling you why [product] is worth it"',
  '"replying to comments about..."',
  '"trending [product] tested"',
  '"this [product] is crazy..."'
];

export const VIRAL_ELEMENTS = {
  color: ['vibrant', 'pastel', 'warm tones', 'cool tones', 'high contrast'],
  pacing: ['fast cuts', 'slow reveals', 'beat-matched', 'varied rhythm'],
  emotion: ['surprise', 'satisfaction', 'FOMO', 'desire', 'curiosity'],
  action: ['quick cuts', 'transitions', 'text reveals', 'product shot']
};

// ============ PRODUCTO HELPER ============

export function enrichProductInfo(productInfo) {
  return {
    name: productInfo.name || productInfo.split(',')[0]?.trim(),
    category: productInfo.category || 'general',
    keywords: extractKeywords(productInfo),
    benefits: extractBenefits(productInfo),
    features: extractFeatures(productInfo),
    description: productInfo
  };
}

function extractKeywords(text) {
  // Simple keyword extraction
  const keywords = text
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 2)
    .slice(0, 5);
  return keywords;
}

function extractBenefits(text) {
  // Look for benefit patterns
  const patterns = [
    /makes? ([\w\s]+)/gi,
    /improves? ([\w\s]+)/gi,
    /helps? ([\w\s]+)/gi,
    /perfect for ([\w\s]+)/gi
  ];
  
  const benefits = [];
  patterns.forEach(pattern => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      benefits.push(match[1]);
    }
  });
  
  return benefits;
}

function extractFeatures(text) {
  // Look for technical specifications
  const features = text
    .match(/\d+[a-z]+|\w+ml|\w+oz|water[a-z]*|natural|organic/gi) || [];
  
  return [...new Set(features)].slice(0, 5);
}
