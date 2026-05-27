# 🎬 CogVideoX - Instalación Local

## ✅ Qué obtuviste
- **Generación de videos 100% GRATIS** (sin API keys ni costos)
- **Código open-source completo** (puedes modificar y personalizar)
- **Corre en tu servidor** (total control y privacidad)
- **Integración automática con el sistema**

---

## 🚀 Requisitos

### Opción A: GPU (RECOMENDADO - Genera en 2-5 minutos)
- **NVIDIA GPU**: RTX 3060 (12GB+) o mejor
- CUDA 12.0+ instalado
- cuDNN compatible

### Opción B: CPU (Lento - 20-40 minutos pero GRATIS)
- Python 3.10-3.12
- RAM: 16GB+ recomendado
- Mucha paciencia ☕

---

## 📥 Instalación Rápida

### 1. Instalar dependencias Python

```bash
# Navegar al directorio del proyecto
cd tiktok-viral-cloner

# Crear venv
python3 -m venv venv

# Activar (Mac/Linux)
source venv/bin/activate

# O en Windows
venv\Scripts\activate

# Instalar dependencias
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install diffusers transformers accelerate imageio imageio-ffmpeg opencv-python sentencepiece
```

### 2. Descargar modelo CogVideoX

El modelo se descargará automáticamente la primera vez que lo uses (~15GB).

```bash
# Pre-descargar (opcional, para ahorrar tiempo)
python -c "
from diffusers import CogVideoXPipeline
pipe = CogVideoXPipeline.from_pretrained('THUDM/CogVideoX-5B', torch_dtype='float16')
print('✅ Modelo descargado')
"
```

### 3. Instalar dependencias Node.js

```bash
npm install
```

---

## 🎯 Ejecutar el Sistema

### Iniciar servidor

```bash
npm start
```

Verás:
```
╔════════════════════════════════════════╗
║  🎬 TikTok Viral Cloner                 ║
║  API Server Running                     ║
╠════════════════════════════════════════╣
║  🌐 http://localhost:3000               ║
║  📊 /api/health                         ║
║  🎯 /api/analyze                        ║
║  🎬 /api/generate                       ║
║  🚀 /api/analyze-and-generate           ║
╚════════════════════════════════════════╝
```

### Abrir en el navegador

```
http://localhost:3000
```

---

## 💻 Flujo de Uso

1. **Arrastra video local** (o pega URL de TikTok/YouTube)
2. **Arrastra imagen local** (tu producto)
3. **Describe tu producto** + selecciona categoría
4. **Click en "Analizar"** → Groq analiza el video viral
5. **Click en "Generar Video"** → CogVideoX genera automáticamente
6. **¡Descarga el video!** → Listo para publicar en TikTok Shop

---

## ⚙️ Optimizaciones para GPU

Si tienes GPU con poco VRAM (RTX 3060 = 12GB):

```python
# En server.js, modifica:
pipe.enable_attention_slicing()
pipe.enable_memory_efficient_attention()  # Para 8GB VRAM
```

---

## 🔧 Solución de Problemas

### Error: "CUDA out of memory"
```bash
# Reducir resolución en frontend (720p en lugar de 1080p)
# O agregar en video-generator.js:
pipe.enable_attention_slicing()
```

### Error: "diffusers not found"
```bash
pip install --upgrade diffusers transformers
```

### Tarda mucho (CPU)
- Es normal: 20-40 minutos sin GPU
- O alquila GPU por horas en RunPod/Vast.ai ($0.10-$0.50)

---

## 📊 Requisitos de Hardware

| Componente | CPU Lento | GPU RTX 3060 | GPU A100 |
|-----------|-----------|-------------|----------|
| Tiempo/video | 30 min | 3-5 min | 30 seg |
| VRAM | N/A | 12GB | 40GB |
| Costo | $0 | $0 | ~$1 por video |

---

## 🎬 Primera generación (test)

```bash
# Llamar al API directamente
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A beautiful sunset over the ocean, cinematic quality",
    "duration": 5,
    "resolution": "1080p"
  }'
```

Debería recibir:
```json
{
  "success": true,
  "message": "✅ Video generado con CogVideoX",
  "video": {
    "url": "/outputs/generated_video_xxxx.mp4",
    "downloadUrl": "http://localhost:3000/outputs/generated_video_xxxx.mp4"
  }
}
```

---

## 🆘 Soporte

### Documentación oficial CogVideoX
https://github.com/THUDM/CogVideo

### Problemas comunes
https://github.com/THUDM/CogVideo/issues

### MI Slack/Discord (si tienes)
Pregunta cualquier cosa

---

## ✨ Lo que conseguiste

✅ **Sistema END-TO-END sin costos**
- Upload local: Video + Imagen
- Análisis: Groq LLM
- Generación: CogVideoX (abierto)
- Descarga: Video MP4 automático

✅ **100% GRATIS**
- Sin API keys pagos
- Sin suscripciones
- Sin limitaciones

✅ **ESCALABLE**
- Genera en masa
- Múltiples clientes
- Total control

---

## 🚀 Próximos pasos

1. Testea localmente
2. Cuando funcione, deploya en Vercel + Railway (GPU gratis no, pero puedes usar Vast.ai)
3. ¡Vende videos generados a tus clientes!

