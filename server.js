import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';
import { analyzeVideoWithGroq } from './src/api/groq-analyzer.js';
import { generateVideoWithCogVideoX, generateVideoWithDiffusers } from './src/video-generator.js';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(join(__dirname, 'public')));

// Multer para uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

// ============ ENDPOINTS ============

/**
 * POST /api/analyze
 * Analiza un video viral y extrae su "DNA"
 * Body: { videoUrl: string, productInfo: string }
 */
app.post('/api/analyze', async (req, res) => {
  try {
    const { videoUrl, productInfo } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ error: 'videoUrl requerida' });
    }

    console.log('🎬 Analizando video:', videoUrl);

    // Analizar con Groq
    const analysis = await analyzeVideoWithGroq(videoUrl, productInfo);

    res.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error en análisis:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/generate
 * ✨ NUEVO: Genera video CON COGVIDEOX (open-source, 100% GRATIS, SIN API KEYS)
 * Descarga el video automáticamente
 */
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, duration = 5, resolution = '1080p', aspectRatio = '9:16' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'prompt requerida' });
    }

    console.log('🎥 Generando video con CogVideoX (open-source)...');
    console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);

    // Generar con CogVideoX (completamente LOCAL, sin APIs)
    const videoResult = await generateVideoWithCogVideoX(prompt, {
      duration,
      resolution,
      aspectRatio,
      outputPath: join(__dirname, 'public/outputs')
    });

    res.json({
      success: true,
      message: '✅ Video generado con CogVideoX',
      video: {
        url: videoResult.videoUrl,
        path: videoResult.videoPath,
        size: fs.statSync(videoResult.videoPath).size,
        downloadUrl: `${req.protocol}://${req.get('host')}${videoResult.videoUrl}`
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error en generación:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/analyze-and-generate
 * 🚀 Pipeline COMPLETO: analiza video viral + genera versión con producto
 * ✨ AHORA CON COGVIDEOX ABIERTO - Descarga automática del video generado
 */
app.post('/api/analyze-and-generate', async (req, res) => {
  try {
    const { videoUrl, productInfo, prompt, duration = 5, resolution = '1080p' } = req.body;

    if (!videoUrl && !prompt) {
      return res.status(400).json({ 
        error: 'Se requiere videoUrl (para analizar) o prompt (para generar)' 
      });
    }

    console.log('🚀 Pipeline completo iniciado...');

    let finalPrompt = prompt;

    // Paso 1: Analizar (si se proporciona videoUrl)
    if (videoUrl && productInfo) {
      console.log('📊 Paso 1: Analizando video viral con Groq...');
      const analysis = await analyzeVideoWithGroq(videoUrl, productInfo);
      finalPrompt = analysis.adaptedPrompt;
      console.log('✅ Análisis completado');
    }

    // Paso 2: Generar video
    console.log('🎬 Paso 2: Generando video con CogVideoX...');
    const videoResult = await generateVideoWithCogVideoX(finalPrompt, {
      duration,
      resolution,
      aspectRatio: '9:16',
      outputPath: join(__dirname, 'public/outputs')
    });

    console.log('✅ Video generado exitosamente');

    res.json({
      success: true,
      message: '✅ Pipeline completado - Video generado con CogVideoX',
      video: {
        url: videoResult.videoUrl,
        downloadUrl: `${req.protocol}://${req.get('host')}${videoResult.videoUrl}`,
        size: fs.statSync(videoResult.videoPath).size,
        prompt: finalPrompt
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error en pipeline:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/health
 * Verificar que el servidor esté activo
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '✅ Sistema activo con CogVideoX (open-source, 100% GRATIS)',
    videoGenerator: 'CogVideoX (THUDM/CogVideo - GitHub)',
    analyzer: 'Groq LLM',
    noApiCosts: true,
    timestamp: new Date().toISOString(),
    groqApiKey: process.env.GROQ_API_KEY ? '✓' : '✗'
  });
});

/**
 * GET /
 * Servir página principal
 */
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// ============ ERROR HANDLING ============

app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// ============ START SERVER ============

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🎬 TikTok Viral Cloner                 ║
║  API Server Running                     ║
╠════════════════════════════════════════╣
║  🌐 http://localhost:${PORT}                  ║
║  📊 /api/health                         ║
║  🎯 /api/analyze                        ║
║  🎬 /api/generate                       ║
║  🚀 /api/analyze-and-generate           ║
╚════════════════════════════════════════╝
  `);
});
