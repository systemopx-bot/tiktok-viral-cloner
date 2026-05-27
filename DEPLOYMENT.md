# 🚀 Guía de Deployment

## Opción 1: Vercel (RECOMENDADO - Más Fácil)

### Paso 1: Preparar para Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login a tu cuenta Vercel
vercel login
```

### Paso 2: Crear vercel.json

```json
{
  "buildCommand": "npm install",
  "functions": {
    "server.js": {
      "memory": 1024,
      "maxDuration": 60
    }
  },
  "env": [
    "GROQ_API_KEY",
    "FAL_API_KEY",
    "PORT"
  ]
}
```

### Paso 3: Deploy

```bash
vercel --prod
```

### Paso 4: Configurar variables en Vercel Dashboard

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Settings → Environment Variables
4. Agrega:
   - `GROQ_API_KEY` = tu key
   - `FAL_API_KEY` = tu key

---

## Opción 2: Railway

### Paso 1: Crear proyecto en Railway

```bash
# Instalar CLI
npm install -g @railway/cli

# Login
railway login

# Crear proyecto
railway init
```

### Paso 2: Conectar GitHub

1. Ve a https://railway.app
2. New Project → Deploy from GitHub
3. Selecciona tu repositorio

### Paso 3: Agregar variables

En Railway Dashboard:
- Variables → Add Variable
- `GROQ_API_KEY`
- `FAL_API_KEY`

### Paso 4: Deploy

```bash
railway up
```

---

## Opción 3: Docker + Cualquier Host

### Con Docker Localmente

```bash
# Build
docker build -t tiktok-viral-cloner .

# Run
docker run -p 3000:3000 \
  -e GROQ_API_KEY=xxx \
  -e FAL_API_KEY=xxx \
  tiktok-viral-cloner
```

### Con Docker Compose

```bash
# Setup en .env primero
cp .env.example .env
# Editar .env con tus keys

# Ejecutar
docker-compose up
```

---

## Opción 4: Render.com

### Paso 1: Conectar GitHub

1. Ve a https://render.com
2. New → Web Service
3. Conecta tu repositorio

### Paso 2: Configurar

- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: Node
- **Plan**: Free o Paid

### Paso 3: Agregar variables

En Render Dashboard:
- Environment → Add Environment Variable

---

## Opción 5: Heroku (Legacy pero funciona)

```bash
# Instalar Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Crear app
heroku create tiktok-viral-cloner

# Agregar variables
heroku config:set GROQ_API_KEY=xxx
heroku config:set FAL_API_KEY=xxx

# Deploy
git push heroku main
```

---

## Opción 6: Tu Propio Server (VPS)

### En Ubuntu/Debian

```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clonar repo
git clone https://github.com/systemopx-bot/tiktok-viral-cloner.git
cd tiktok-viral-cloner

# Instalar dependencias
npm install

# Crear .env
cp .env.example .env
# Editar .env con tus keys

# Instalar PM2 para mantener activo
sudo npm install -g pm2
pm2 start server.js --name "tiktok-viral-cloner"
pm2 startup
pm2 save
```

### Con Nginx (Proxy Reverso)

```bash
# Instalar Nginx
sudo apt-get install nginx

# Crear configuración
sudo nano /etc/nginx/sites-available/tiktok-viral-cloner
```

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable
sudo ln -s /etc/nginx/sites-available/tiktok-viral-cloner /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Con SSL (Let's Encrypt)

```bash
# Instalar Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtener certificado
sudo certbot --nginx -d tu-dominio.com
```

---

## Comparativa de Opciones

| Plataforma | Costo | Facilidad | Mantenimiento | Recomendación |
|-----------|-------|----------|---------------|----------------|
| **Vercel** | Free | ⭐⭐⭐⭐⭐ | Mínimo | ✅ MEJOR PARA EMPEZAR |
| **Railway** | $5+/mes | ⭐⭐⭐⭐ | Bajo | ✅ Buena opción |
| **Render** | Free/Paid | ⭐⭐⭐⭐ | Bajo | ✅ Estable |
| **VPS** | $5-20/mes | ⭐⭐ | Medio | Para control total |
| **Docker** | Varía | ⭐⭐⭐ | Bajo | Flexible |

---

## Monitoreo y Logs

### En Vercel

```bash
vercel logs
```

### En Railway

```bash
railway logs
```

### En VPS con PM2

```bash
pm2 logs tiktok-viral-cloner
pm2 status
pm2 monit
```

---

## Variables de Entorno Checklist

Antes de deployar, asegúrate de tener:

- [ ] GROQ_API_KEY válida y activa
- [ ] FAL_API_KEY válida y activa  
- [ ] PORT configurado (usualmente 3000)
- [ ] NODE_ENV = 'production' (opcional pero recomendado)

---

## Troubleshooting

### Error: "Cannot find module 'express'"

```bash
# Reinstalar dependencias
npm install
npm ci --only=production
```

### Error: "GROQ_API_KEY undefined"

```bash
# Verificar en la plataforma de deployment que esté configurada
# O para testing local
echo $GROQ_API_KEY
```

### Error: "Port already in use"

```bash
# Usar puerto diferente
PORT=3001 npm start
```

### Seedance toma muy tiempo

Es normal, puede tardar 2-3 minutos. Los timeouts están configurados a 120 intentos x 5 segundos = 10 minutos máximo.

---

## Optimización para Producción

### Performance

```bash
# Reducir tamaño de node_modules
npm install --production
npm prune --production
```

### Caching

En Vercel:
- Vercel cachea automáticamente responses

En tu código:
```javascript
res.set('Cache-Control', 'public, max-age=3600');
```

### Rate Limiting

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100 // límite por IP
});

app.use('/api/', limiter);
```

---

## Próximos Pasos

Una vez deployed:

1. ✅ Prueba los endpoints en `/api/health`
2. ✅ Genera un video de prueba
3. ✅ Comparte el URL con tu equipo
4. ✅ Configura dominio custom (opcional)
5. ✅ Agrega analytics (opcional)

---

**¿Preguntas?** Abre un issue en GitHub o contacta al equipo.
