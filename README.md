# 🎬 TikTok Viral Cloner

**Analiza videos virales de TikTok Shop y genera versiones personalizadas con tus productos usando Seedance 2.0 (GRATIS) + Groq + HappyHorse 1.0**

Crea videos realistas para TikTok Shop **100% GRATIS**. Sin costos ocultos, sin API fees. Todo procesado en tiempo real.

---

## ⚡ GRATIS TOTAL - SIN PAGAR NADA

✅ **Groq** - GRATIS (análisis con IA)  
✅ **Seedance 2.0 (veoaifree)** - GRATIS (generación)  
✅ **HappyHorse 1.0** - GRATIS hasta junio 2026 (incluso mejor que Seedance)  
✅ **Frontend** - GRATIS (HTML/JS puro)  
✅ **Hosting** - GRATIS (Vercel, Railway, GitHub Pages)  

**Total costo: $0** ✨

---

## ⚡ Características

✅ **Análisis de Videos Virales** - Extrae estructura, hooks, y elementos clave  
✅ **Reverse Engineering de Prompts** - Descubre qué hace viral un video  
✅ **Generación 100% GRATIS** - Seedance 2.0 sin pagar  
✅ **Mejor Calidad Disponible** - HappyHorse 1.0 (ranked #1)  
✅ **Mapeo de Productos** - Adapta cualquier video a tus productos  
✅ **Portal Visual** - Interfaz hermosa y fácil de usar  
✅ **Batch Generation** - Genera múltiples videos automáticamente  

---

## 🚀 Instalación RÁPIDA

### Paso 1: Clonar

```bash
git clone https://github.com/systemopx-bot/tiktok-viral-cloner.git
cd tiktok-viral-cloner
```

### Paso 2: Instalar

```bash
npm install
```

### Paso 3: Configurar (2 minutos)

```bash
cp .env.example .env
```

Tu `.env` ya tiene tu Groq API key. Listo.

### Paso 4: Ejecutar

```bash
npm start
```

Abre: `http://localhost:3000`

---

## 📊 Opciones GRATIS de Video Generation

### 🥇 HappyHorse 1.0 (MEJOR - RECOMENDADO)

**Desktop App - GRATIS hasta junio 2026**

```
https://github.com/HappyHorse-app/Happy-Horse-1.0
```

**Ventajas:**
- Ranked #1 (mejor que Sora 2, Kling 3.0, Seedance 2.0)
- 1080p con audio nativo sincronizado
- Sin watermark
- Derechos comerciales incluidos
- COMPLETAMENTE GRATIS

**Descarga:**
```bash
# Windows o Mac
# https://github.com/HappyHorse-app/Happy-Horse-1.0/releases
```

---

### 🥈 veoaifree.com (Seedance 2.0 - 100% GRATIS)

**Web - Sin login, sin credits, sin watermark**

```
https://veoaifree.com/seedance-2-0-video-generator-free/
```

**Ventajas:**
- 100% GRATIS
- Sin registro
- Sin watermark
- Text-to-video
- Acceso inmediato

**Limitaciones:**
- Solo texto (no imagen/video/audio refs)
- Máximo 10 segundos

---

### 🥉 Alternativas Chinas (Con Créditos Gratis)

**Little Skylark (小云雀)**
- 1,200 créditos gratis de bienvenida
- Seedance 2.0 + audio
- https://xiaoyuque.com/

**Doubao (Bytes Dance)**
- Créditos gratis + dailies
- VPN China necesaria
- https://doubao.com

---

## 🔄 Pipeline Completo

```
1. Usuario Sube:
   ├── Video viral de TikTok
   └── Producto (imagen + descripción)

2. Groq Analiza:
   ├── Estructura viral
   ├── Hooks que funcionan
   ├── Elementos clave
   └── Genera prompt adaptado

3. Genera Video (ELIGE UNA OPCIÓN):
   ├── HappyHorse 1.0 (MEJOR CALIDAD)
   ├── veoaifree.com (MÁS RÁPIDO)
   └── Otra plataforma gratis

4. Descarga y Publica:
   └── A TikTok Shop (0% comisión primeros 90 días)
```

---

## 🎯 Para Tus Productos

### B-Unik (Skincare)
```
Hook: "This transformed my skin"
Estructura: Close-up → Before/After → CTA
Duración: 5-8 seg
```

### PastoPlus/PisoPlus (Home)
```
Hook: Transformación dramática
Estructura: Before → Installation → After → Familia
Duración: 5-10 seg
```

### Otros Productos
- Fashion, electrónica, general
- Templates incluidos en `examples.js`

---

## 📝 API Endpoints

| Endpoint | Método | Función |
|----------|--------|---------|
| `/api/health` | GET | Verificar servidor |
| `/api/analyze` | POST | Analiza video viral |
| `/api/generate` | POST | Genera video |
| `/api/analyze-and-generate` | POST | Pipeline completo |

---

## 🆓 Costos REALES

| Servicio | Costo |
|----------|-------|
| Groq (análisis) | **$0** ✅ |
| Seedance 2.0 (veoaifree) | **$0** ✅ |
| HappyHorse 1.0 | **$0** ✅ hasta junio |
| Frontend | **$0** ✅ |
| Hosting | **$0** ✅ (Vercel free) |
| **TOTAL** | **$0** ✅ |

---

## 📦 Archivos Clave

| Archivo | Propósito |
|---------|----------|
| `server.js` | Backend Express |
| `public/index.html` | Frontend visual |
| `src/api/groq-analyzer.js` | Análisis con Groq |
| `src/api/seedance.js` | Generación de videos |
| `.env` | Tu configuración |
| `examples.js` | Casos de uso |
| `DEPLOYMENT.md` | Cómo deployar |

---

## 🚀 Deploy a Producción

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel --prod
```

### Railway

```bash
npm install -g railway
railway login
railway up
```

### Docker

```bash
docker-compose up
```

Más detalles en `DEPLOYMENT.md`

---

## 🛠️ Customización

### Cambiar Modelo de Generación

En `src/api/seedance.js`, elige tu opción:
- `veoaifree.com` (rápido)
- `HappyHorse 1.0` (mejor calidad)
- Cualquier otra gratis

### Agregar Nuevos Analizadores

En `src/api/groq-analyzer.js`:
```javascript
export async function analyzeCustom(videoUrl) {
  // Tu lógica aquí
}
```

---

## 📚 Recursos

- [Groq API](https://console.groq.com)
- [HappyHorse 1.0](https://github.com/HappyHorse-app/Happy-Horse-1.0)
- [veoaifree Seedance](https://veoaifree.com)
- [TikTok Shop México](https://seller-mx.tiktok.com)
- [Documentación Seedance](https://github.com/bytedance-seedance/seedance-2.0)

---

## 📝 Licencia

MIT License - Úsalo libremente

---

## 👨‍💻 Autor

**Mike (Diego Cordova)** - Digital Performance & e-Commerce Specialist
- TikTok Shop expert (LATAM)
- AI video generation specialist
- Opinion X / Gens Agency

---

## 🚀 Roadmap

- [ ] Auto-publishing a TikTok Shop
- [ ] Batch processing de 100+ videos
- [ ] Analytics de rendimiento
- [ ] Integración con Supabase (opcional)
- [ ] Plugin para Shopify/WordPress
- [ ] Mobile app

---

**¿Preguntas?** Abre un issue en GitHub

**¿Mejoras?** ¡PR bienvenidos!

---

```
Made with ❤️ for TikTok Shop creators in LATAM
100% FREE - Sin costos ocultos
```
