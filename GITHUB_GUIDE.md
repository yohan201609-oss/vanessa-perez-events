# 🚀 Guía Completa para GitHub - Vanessa Perez Events

Esta guía te llevará paso a paso para subir tu proyecto a GitHub y mantenerlo actualizado.

## 📋 Tabla de Contenidos

1. [Preparación Inicial](#-preparación-inicial)
2. [Configuración de Git](#-configuración-de-git)
3. [Crear Repositorio en GitHub](#-crear-repositorio-en-github)
4. [Primera Subida (Initial Push)](#-primera-subida-initial-push)
5. [Configuración de Despliegue Automático](#-configuración-de-despliegue-automático)
6. [Mantenimiento y Actualizaciones](#-mantenimiento-y-actualizaciones)
7. [Solución de Problemas](#-solución-de-problemas)
8. [Comandos Útiles](#-comandos-útiles)

---

## 🔧 Preparación Inicial

### 1. Verificar que el proyecto esté listo

```bash
# Asegúrate de estar en el directorio del proyecto
cd C:\vanessa-perez-events

# Verificar que no hay errores de compilación
npm run build
```

### 2. Limpiar archivos innecesarios

```bash
# Eliminar archivos de prueba o temporales
rm -f test.html

# Verificar que .gitignore esté configurado correctamente
cat .gitignore
```

---

## ⚙️ Configuración de Git

### 1. Configurar Git (si no está configurado)

```bash
# Configurar tu nombre y email
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"

# Verificar configuración
git config --list
```

### 2. Inicializar repositorio Git

```bash
# Inicializar Git en el proyecto
git init

# Verificar estado
git status
```

---

## 🐙 Crear Repositorio en GitHub

### 1. Crear repositorio en GitHub.com

1. Ve a [GitHub.com](https://github.com) y inicia sesión
2. Haz clic en **"New repository"** (botón verde)
3. Configura el repositorio:
   - **Repository name**: `vanessa-perez-events`
   - **Description**: `Event Planner Professional Website - Vanessa Perez`
   - **Visibility**: `Public` (para GitHub Pages gratuito)
   - **NO marques** "Add a README file" (ya tenemos uno)
   - **NO marques** "Add .gitignore" (ya tenemos uno)
   - **NO marques** "Choose a license" (opcional)

4. Haz clic en **"Create repository"**

### 2. Copiar la URL del repositorio

GitHub te mostrará una página con comandos. Copia la URL que aparece, será algo como:
```
https://github.com/tu-usuario/vanessa-perez-events.git
```

---

## 📤 Primera Subida (Initial Push)

### 1. Agregar archivos al staging

```bash
# Agregar todos los archivos
git add .

# Verificar qué archivos se agregaron
git status
```

### 2. Hacer el primer commit

```bash
# Commit inicial
git commit -m "🎉 Initial commit: Vanessa Perez Events website

- ✨ Complete React website with modern design
- 📧 EmailJS integration for contact forms
- 📊 Google Analytics tracking
- 🖼️ Optimized images with lazy loading
- 📱 Fully responsive design
- 🎬 Smooth animations with Framer Motion
- 💬 WhatsApp integration
- ⭐ Testimonials carousel
- 🔧 Centralized configuration
- 📝 Comprehensive documentation"
```

### 3. Conectar con GitHub

```bash
# Agregar remote origin (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/vanessa-perez-events.git

# Verificar conexión
git remote -v
```

### 4. Subir al repositorio

```bash
# Subir al repositorio (primera vez)
git push -u origin main

# Si main no existe, usar master
git push -u origin master
```

---

## 🌐 Configuración de Despliegue Automático

### Opción 1: GitHub Pages (Gratuito)

#### 1. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **"Settings"** (pestaña superior)
3. Scroll hacia abajo hasta **"Pages"**
4. En **"Source"**, selecciona **"GitHub Actions"**

#### 2. Crear workflow para GitHub Pages

Crea el archivo `.github/workflows/deploy.yml`:

```bash
# Crear directorio de workflows
mkdir -p .github/workflows

# Crear archivo de deploy
touch .github/workflows/deploy.yml
```

Contenido del archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

#### 3. Commit y push del workflow

```bash
# Agregar el workflow
git add .github/workflows/deploy.yml

# Commit
git commit -m "🚀 Add GitHub Pages deployment workflow"

# Push
git push origin main
```

### Opción 2: Netlify (Recomendado)

#### 1. Conectar con Netlify

1. Ve a [Netlify.com](https://netlify.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en **"New site from Git"**
4. Selecciona **"GitHub"**
5. Autoriza Netlify a acceder a tus repositorios
6. Selecciona `vanessa-perez-events`

#### 2. Configurar build settings

```
Build command: npm run build
Publish directory: build
```

#### 3. Configurar variables de entorno

En Netlify, ve a **Site settings > Environment variables** y agrega:

```
REACT_APP_EMAILJS_SERVICE_ID=tu_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=tu_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=tu_public_key
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🔄 Mantenimiento y Actualizaciones

### 1. Flujo de trabajo diario

```bash
# 1. Verificar estado
git status

# 2. Agregar cambios
git add .

# 3. Commit con mensaje descriptivo
git commit -m "✨ Add new feature: [descripción]"

# 4. Push a GitHub
git push origin main
```

### 2. Estructura de commits recomendada

```bash
# Nuevas características
git commit -m "✨ Add testimonials carousel"

# Correcciones
git commit -m "🐛 Fix mobile navigation issue"

# Mejoras de rendimiento
git commit -m "⚡ Optimize image loading"

# Documentación
git commit -m "📝 Update README with new features"

# Estilos
git commit -m "🎨 Update color scheme"

# Refactoring
git commit -m "♻️ Refactor contact form component"
```

### 3. Actualización del README

Cada vez que agregues nuevas características:

1. Actualiza la sección correspondiente en `README.md`
2. Agrega nuevas tecnologías a la lista
3. Actualiza la estructura del proyecto
4. Agrega nuevas instrucciones de configuración

```bash
# Commit de documentación
git add README.md
git commit -m "📝 Update README with new features and setup instructions"
git push origin main
```

---

## 🔧 Solución de Problemas

### Error: "Repository not found"

```bash
# Verificar URL del remote
git remote -v

# Si está mal, corregir
git remote set-url origin https://github.com/tu-usuario/vanessa-perez-events.git
```

### Error: "Permission denied"

```bash
# Verificar autenticación
git config --global credential.helper manager-core

# O usar token de acceso personal
git remote set-url origin https://tu-token@github.com/tu-usuario/vanessa-perez-events.git
```

### Error: "Branch diverged"

```bash
# Obtener cambios remotos
git fetch origin

# Merge o rebase
git pull origin main --rebase
```

### Error de build en Netlify

1. Verificar variables de entorno
2. Revisar logs en Netlify dashboard
3. Probar build local: `npm run build`

---

## 📚 Comandos Útiles

### Git básico

```bash
# Ver estado
git status

# Ver historial
git log --oneline

# Ver diferencias
git diff

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer cambios en archivo específico
git checkout -- archivo.js

# Ver ramas
git branch -a
```

### NPM útil

```bash
# Verificar dependencias obsoletas
npm outdated

# Actualizar dependencias
npm update

# Limpiar cache
npm cache clean --force

# Verificar vulnerabilidades
npm audit
```

### Build y deploy

```bash
# Build de producción
npm run build

# Servir build localmente
npx serve -s build

# Analizar bundle
npm run build && npx bundle-analyzer build/static/js/*.js
```

---

## 🎯 Checklist de Mantenimiento

### Semanal
- [ ] Verificar que el sitio funciona correctamente
- [ ] Revisar analytics y métricas
- [ ] Actualizar dependencias si es necesario
- [ ] Revisar issues en GitHub (si los hay)

### Mensual
- [ ] Actualizar imágenes con trabajos recientes
- [ ] Revisar y actualizar testimonios
- [ ] Verificar que todos los enlaces funcionan
- [ ] Actualizar información de contacto si es necesario

### Cuando agregues nuevas características
- [ ] Actualizar README.md
- [ ] Documentar nuevas configuraciones
- [ ] Probar en diferentes dispositivos
- [ ] Verificar que no hay errores de consola

---

## 🆘 Contacto y Soporte

Si tienes problemas:

1. **Revisa los logs**: GitHub Actions o Netlify logs
2. **Verifica la documentación**: README.md y esta guía
3. **Busca en GitHub Issues**: Puede que alguien ya haya tenido el mismo problema
4. **Crea un issue**: Si no encuentras solución

---

## 📈 Próximos Pasos

Una vez que tengas todo funcionando:

1. **Dominio personalizado**: Configura un dominio como `vanessaperez-events.com`
2. **SEO**: Optimiza meta tags y estructura
3. **Analytics**: Configura Google Analytics correctamente
4. **Backup**: Configura backups automáticos
5. **Monitoring**: Configura alertas de uptime

---

**¡Felicidades! 🎉 Tu sitio web está ahora en GitHub y desplegado automáticamente.**

---

*Última actualización: $(date)*
*Versión de la guía: 1.0*
