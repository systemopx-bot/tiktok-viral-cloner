#!/bin/bash

echo "╔════════════════════════════════════════╗"
echo "║  🎬 TikTok Viral Cloner Setup          ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check Node.js
echo "📦 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "📥 Instálalo desde: https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js detectado: $(node --version)"

# Install dependencies
echo ""
echo "📥 Instalando dependencias..."
npm install

# Check .env
echo ""
echo "🔑 Verificando configuración..."
if [ ! -f .env ]; then
    echo "⚠️  No existe .env. Creando desde .env.example..."
    cp .env.example .env
    echo ""
    echo "📝 Edita .env con tus API keys:"
    echo "   - GROQ_API_KEY → https://console.groq.com/keys"
    echo "   - FAL_API_KEY → https://fal.ai/dashboard/keys"
    echo ""
else
    echo "✅ Archivo .env encontrado"
    
    # Check if keys are set
    if grep -q "your-groq-api-key-here" .env; then
        echo "⚠️  GROQ_API_KEY no configurada"
    else
        echo "✅ GROQ_API_KEY configurada"
    fi
    
    if grep -q "your-fal-api-key-here" .env; then
        echo "⚠️  FAL_API_KEY no configurada"
    else
        echo "✅ FAL_API_KEY configurada"
    fi
fi

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  ✅ Setup Completado                    ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "🚀 Para iniciar el servidor:"
echo "   npm start"
echo ""
echo "📍 Accede a: http://localhost:3000"
echo ""
