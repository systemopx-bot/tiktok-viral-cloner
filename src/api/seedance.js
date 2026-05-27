import axios from 'axios';

const FAL_API_KEY = process.env.FAL_API_KEY;
const FAL_API_BASE = 'https://queue.fal.run';

/**
 * Genera un video usando fal.ai Seedance 2.0 API
 * https://fal.ai/models/seedance-2-0
 */
export async function generateWithSeedance(options) {
  const {
    prompt,
    productImage,
    aspectRatio = '9:16',
    duration = 5,
    resolution = '1080p'
  } = options;

  if (!FAL_API_KEY) {
    throw new Error('FAL_API_KEY no está configurada. Mira .env.example');
  }

  try {
    console.log('🎬 Enviando a Seedance 2.0 vía fal.ai...');

    // Preparar payload para Seedance 2.0
    const payload = {
      prompt: prompt,
      aspect_ratio: aspectRatio,
      duration: duration,
      resolution: resolution,
      enable_safety_checker: true
    };

    // Si hay imagen de producto, agregarla como referencia
    if (productImage) {
      payload.image_url = productImage;
    }

    console.log('📤 Payload:', payload);

    // Hacer request a fal.ai
    const response = await axios.post(
      `${FAL_API_BASE}/fal-ai/seedance-2-0/submit`,
      payload,
      {
        headers: {
          'Authorization': `Key ${FAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const requestId = response.data.request_id;
    console.log('✅ Request enviado. ID:', requestId);

    // Esperar resultado
    const videoUrl = await pollForResult(requestId);

    return {
      videoUrl: videoUrl,
      requestId: requestId,
      model: 'seedance-2.0',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error en Seedance:', error.response?.data || error.message);
    throw new Error(`Seedance error: ${error.message}`);
  }
}

/**
 * Poll para obtener el resultado del video
 */
async function pollForResult(requestId, maxAttempts = 120, delayMs = 5000) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const response = await axios.get(
        `${FAL_API_BASE}/fal-ai/seedance-2-0/status/${requestId}`,
        {
          headers: {
            'Authorization': `Key ${FAL_API_KEY}`
          }
        }
      );

      const status = response.data.status;

      if (status === 'COMPLETED') {
        console.log('✅ Video generado exitosamente');
        return response.data.output.video_url;
      }

      if (status === 'FAILED') {
        throw new Error(`Generación fallida: ${response.data.error}`);
      }

      console.log(`⏳ Status: ${status} (intento ${attempts + 1}/${maxAttempts})`);
      
      // Esperar antes de siguiente poll
      await new Promise(resolve => setTimeout(resolve, delayMs));
      attempts++;
    } catch (error) {
      if (error.response?.status === 404) {
        // Request no encontrada aún, esperar más
        await new Promise(resolve => setTimeout(resolve, delayMs));
        attempts++;
      } else {
        throw error;
      }
    }
  }

  throw new Error('Timeout esperando resultado de Seedance');
}

/**
 * Alternativa: Usar BytePlus ModelArk (oficial ByteDance)
 * Para más control y mejor pricing
 */
export async function generateWithSeedanceOfficial(options) {
  const { prompt, productImage, aspectRatio = '9:16' } = options;

  const arkApiKey = process.env.BYTEPLUS_ARK_API_KEY;
  
  if (!arkApiKey) {
    throw new Error('BYTEPLUS_ARK_API_KEY no configurada');
  }

  try {
    console.log('🎬 Usando BytePlus ModelArk (oficial)...');

    const response = await axios.post(
      'https://api.byteplus.com/ark/v2/model/generate',
      {
        model_id: 'bytedance/seedance-2.0/text-to-video',
        prompt: prompt,
        image_url: productImage,
        aspect_ratio: aspectRatio,
        duration: 5
      },
      {
        headers: {
          'Authorization': `Bearer ${arkApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('❌ Error BytePlus:', error.message);
    throw error;
  }
}

/**
 * Lista de modelos disponibles en fal.ai
 */
export const AVAILABLE_MODELS = {
  'seedance-2.0': {
    name: 'Seedance 2.0',
    description: 'ByteDance - Generación cinematográfica de videos',
    maxDuration: 15,
    maxResolution: '2K'
  },
  'sora-2': {
    name: 'Sora 2',
    description: 'OpenAI - Generación avanzada',
    maxDuration: 60,
    maxResolution: '4K'
  },
  'kling-3.0': {
    name: 'Kling 3.0',
    description: 'Kuaishou - Videos realistas',
    maxDuration: 30,
    maxResolution: '1080p'
  }
};

/**
 * Genera un video en batch con múltiples prompts
 */
export async function generateBatch(prompts) {
  console.log(`🎬 Generando ${prompts.length} videos en batch...`);

  const results = [];

  for (let i = 0; i < prompts.length; i++) {
    try {
      console.log(`📹 Video ${i + 1}/${prompts.length}...`);
      const result = await generateWithSeedance({
        prompt: prompts[i]
      });
      results.push({ success: true, ...result });
    } catch (error) {
      console.error(`❌ Error en video ${i + 1}:`, error.message);
      results.push({ success: false, error: error.message });
    }
  }

  return results;
}
