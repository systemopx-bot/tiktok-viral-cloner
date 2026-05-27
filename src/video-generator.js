/**
 * CogVideoX Video Generator
 * Integrates THUDM/CogVideo open-source model for text-to-video generation
 * No API keys required - runs locally
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function generateVideoWithCogVideoX(prompt, options = {}) {
  const {
    resolution = '1080p',
    duration = 5,
    aspectRatio = '9:16',
    outputPath = path.join(__dirname, '../outputs')
  } = options;

  // Asegurar que existe el directorio de output
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    try {
      console.log('🎬 Generando video con CogVideoX...');
      console.log(`📝 Prompt: ${prompt}`);
      console.log(`⏱️  Duración: ${duration}s`);
      console.log(`📐 Resolución: ${resolution}`);

      // Llamar al script Python que corre CogVideoX
      const pythonScript = path.join(__dirname, '../video-generator/inference.py');
      
      const pythonProcess = spawn('python', [
        pythonScript,
        '--prompt', prompt,
        '--duration', duration.toString(),
        '--output-dir', outputPath
      ]);

      let output = '';
      let errorOutput = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
        console.log(`[CogVideoX] ${data.toString()}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
        console.error(`[CogVideoX Error] ${data.toString()}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          // Buscar el archivo de video generado
          const files = fs.readdirSync(outputPath);
          const videoFile = files.find(f => f.endsWith('.mp4') || f.endsWith('.webm'));
          
          if (videoFile) {
            const videoPath = path.join(outputPath, videoFile);
            resolve({
              success: true,
              videoPath: videoPath,
              videoUrl: `/outputs/${videoFile}`,
              message: '✅ Video generado exitosamente con CogVideoX'
            });
          } else {
            reject(new Error('❌ No video file generated'));
          }
        } else {
          reject(new Error(`CogVideoX process exited with code ${code}: ${errorOutput}`));
        }
      });

      // Timeout de 10 minutos
      setTimeout(() => {
        pythonProcess.kill();
        reject(new Error('⏱️ Timeout: Generación de video tardó demasiado'));
      }, 600000);

    } catch (error) {
      reject(new Error(`Error generando video: ${error.message}`));
    }
  });
}

/**
 * Versión alternativa usando diffusers de Hugging Face directamente
 */
export async function generateVideoWithDiffusers(prompt, options = {}) {
  const {
    numFrames = 45,
    resolution = '1024x576',
    outputPath = path.join(__dirname, '../outputs')
  } = options;

  const pythonCode = `
import torch
from diffusers import CogVideoXPipeline
from diffusers.utils import export_to_video

# Cargar modelo (se descarga automáticamente)
pipe = CogVideoXPipeline.from_pretrained(
    "THUDM/CogVideoX-5B",
    torch_dtype=torch.float16
).to("cuda")

# Optimizaciones para mejor rendimiento
pipe.enable_attention_slicing()

# Generar video
prompt = "${prompt}"
video_frames = pipe(
    prompt=prompt,
    num_frames=${numFrames},
    num_inference_steps=50,
    height=576,
    width=1024,
    guidance_scale=6.0
).frames[0]

# Exportar
output_path = "${path.join(outputPath, 'generated_video.mp4')}"
export_to_video(video_frames, output_path, fps=8)
print(f"✅ Video guardado en: {output_path}")
`;

  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['-c', pythonCode]);
    
    pythonProcess.stdout.on('data', (data) => {
      console.log(`[Diffusers] ${data.toString()}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`[Diffusers] ${data.toString()}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve({
          success: true,
          message: '✅ Video generado con Diffusers'
        });
      } else {
        reject(new Error(`Diffusers error: ${code}`));
      }
    });

    setTimeout(() => {
      pythonProcess.kill();
      reject(new Error('Timeout en generación'));
    }, 900000); // 15 minutos max
  });
}

export default { generateVideoWithCogVideoX, generateVideoWithDiffusers };
