import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/**
 * Analiza un video viral y extrae su estructura, hooks, y prompts
 * Usa Groq como LLM barato para reverse-engineering
 */
export async function analyzeVideoWithGroq(videoUrl, productInfo) {
  try {
    console.log('📊 Analizando con Groq...');

    const analysisPrompt = `Eres un experto en análisis de videos virales de TikTok Shop. 
Necesito que analices un video viral basándote en esta descripción:

VIDEO URL: ${videoUrl}
CONTEXTO DEL PRODUCTO: ${productInfo}

Analiza el video y proporciona:

1. **ESTRUCTURA VIRAL**:
   - Hook (primeros 3 segundos)
   - Transiciones principales
   - Duración estimada
   - Ritmo (rápido/lento)

2. **ELEMENTOS CLAVE**:
   - Ángulos de cámara
   - Movimientos (pan, zoom, etc)
   - Iluminación
   - Música/audio (describe el estilo)
   - Efectos visuales

3. **PSICOLOGÍA VIRAL**:
   - Por qué funciona
   - Elementos que hacen que la gente compre
   - Puntos de fricción/de venta

4. **PROMPT PARA SEEDANCE 2.0**:
   Crea un prompt detallado y cinematográfico para Seedance 2.0 que capture la esencia del video.
   Formato: Subject + Action + Camera + Scene/Lighting + Style
   Máximo 150 palabras, muy específico.

5. **ADAPTACIÓN AL PRODUCTO**:
   Sugiere cómo adaptar este formato a: ${productInfo}
   - Qué cambiar
   - Qué mantener
   - Nuevo hook para el producto

Por favor responde en JSON válido con esta estructura:
{
  "viralStructure": {
    "hook": "descripción del hook",
    "transitions": ["transición 1", "transición 2"],
    "duration": "segundos",
    "rhythm": "rápido/lento"
  },
  "keyElements": {
    "camera": "descripción",
    "movements": ["movimiento 1"],
    "lighting": "descripción",
    "audio": "descripción",
    "effects": ["efecto 1"]
  },
  "viralPsychology": {
    "whyItWorks": "razón 1, razón 2",
    "buyingTriggers": ["trigger 1", "trigger 2"],
    "frictionPoints": ["punto 1"]
  },
  "seedancePrompt": "prompt detallado para Seedance",
  "productAdaptation": {
    "whatToChange": ["cambio 1"],
    "whatToKeep": ["elemento 1"],
    "newHook": "hook adaptado al producto"
  },
  "recommendedAspectRatio": "9:16"
}`;

    const message = await groq.messages.create({
      model: 'mixtral-8x7b-32768',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: analysisPrompt
        }
      ]
    });

    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';

    // Extraer JSON de la respuesta
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No se pudo extraer JSON de la respuesta de Groq');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // Generar prompt adaptado para TikTok Shop
    analysis.adaptedPrompt = generateAdaptedPrompt(analysis, productInfo);

    console.log('✅ Análisis completado');
    return analysis;
  } catch (error) {
    console.error('❌ Error en Groq:', error);
    throw error;
  }
}

/**
 * Genera un prompt optimizado para Seedance basado en el análisis
 */
function generateAdaptedPrompt(analysis, productInfo) {
  const { seedancePrompt, productAdaptation } = analysis;
  
  return `${seedancePrompt}

PRODUCTO: ${productInfo}
${productAdaptation.newHook ? `HOOK: ${productAdaptation.newHook}` : ''}

Mantener:
${productAdaptation.whatToKeep?.map(item => `- ${item}`).join('\n')}

Cambiar:
${productAdaptation.whatToChange?.map(item => `- ${item}`).join('\n')}`;
}

/**
 * Analiza múltiples videos para encontrar patrones comunes
 */
export async function analyzeViralPatterns(videos) {
  try {
    console.log('📊 Analizando patrones de múltiples videos...');

    const analysisPrompt = `Analiza estos videos virales de TikTok Shop y encuentra los patrones comunes:

${videos.map((v, i) => `Video ${i + 1}: ${v.url}`).join('\n')}

Responde con:
1. Patrones visuales comunes
2. Estructura narrativa recurrente
3. Triggers emocionales más frecuentes
4. Duración óptima
5. Hooks más efectivos
6. Recomendaciones de prompt genérico`;

    const message = await groq.messages.create({
      model: 'mixtral-8x7b-32768',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: analysisPrompt
        }
      ]
    });

    return message.content[0].type === 'text' ? message.content[0].text : '';
  } catch (error) {
    console.error('❌ Error analizando patrones:', error);
    throw error;
  }
}
