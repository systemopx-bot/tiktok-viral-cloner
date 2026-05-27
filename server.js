import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';
import { analyzeVideoWithGroq } from './src/api/groq-analyzer.js';
import { generateWithSeedance } from './src/api/seedance.js';
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
 * Genera video con Seedance 2.0
 * Body: { prompt: string, productImage?: string, aspectRatio?: string }
 */
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, productImage, aspectRatio = '9:16' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'prompt requerida' });
    }

    console.log('🎥 Generando video con Seedance...');

    // Generar con fal.ai Seedance
    const videoResult = await generateWithSeedance({
      prompt,
      productImage,
      aspectRatio
    });

    res.json({
      success: true,
      video: videoResult,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error en generación:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/analyze-and-generate
 * Pipeline completo: analiza video viral + genera versión con producto
 */
app.post('/api/analyze-and-generate', async (req, res) => {
  try {
    const { videoUrl, productInfo, productImage } = req.body;

    if (!videoUrl || !productInfo) {
      return res.status(400).json({ 
        error: 'videoUrl y productInfo requeridas' 
      });
    }

    console.log('🚀 Pipeline completo iniciado...');

    // Paso 1: Analizar
    console.log('📊 Paso 1: Analizando video viral...');
    const analysis = await analyzeVideoWithGroq(videoUrl, productInfo);

    // Paso 2: Generar
    console.log('🎬 Paso 2: Generando video con tu producto...');
    const videoResult = await generateWithSeedance({
      prompt: analysis.adaptedPrompt,
      productImage,
      aspectRatio: analysis.recommendedAspectRatio || '9:16'
    });

    res.json({
      success: true,
      analysis,
      video: videoResult,
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
    timestamp: new Date().toISOString(),
    groqApiKey: process.env.GROQ_API_KEY ? '✓' : '✗',
    falApiKey: process.env.FAL_API_KEY ? '✓' : '✗'
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
