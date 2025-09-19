# 🚀 Comandos GitHub - Vanessa Perez Events

## 📋 Comandos Básicos de Git

### Inicialización
```bash
# Inicializar repositorio
git init

# Configurar usuario (primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"

# Verificar configuración
git config --list
```

### Trabajo Diario
```bash
# Ver estado actual
git status

# Agregar archivos
git add .
git add archivo-especifico.js

# Hacer commit
git commit -m "✨ Add new feature"

# Subir cambios
git push origin main

# Obtener cambios remotos
git pull origin main
```

### Comandos de Emergencia
```bash
# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer cambios en archivo específico
git checkout -- archivo.js

# Ver historial
git log --oneline

# Ver diferencias
git diff
```

## 🔧 Comandos de Build y Deploy

### Build Local
```bash
# Instalar dependencias
npm install

# Build de desarrollo
npm start

# Build de producción
npm run build

# Servir build localmente
npx serve -s build -l 3000
```

### Verificación
```bash
# Verificar que no hay errores
npm run build

# Limpiar cache
npm cache clean --force

# Verificar vulnerabilidades
npm audit

# Actualizar dependencias
npm update
```

## 📤 Comandos de Subida a GitHub

### Primera Vez
```bash
# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "🎉 Initial commit: Vanessa Perez Events website"

# Conectar con GitHub
git remote add origin https://github.com/tu-usuario/vanessa-perez-events.git

# Subir por primera vez
git push -u origin main
```

### Actualizaciones Regulares
```bash
# Flujo completo de actualización
git add .
git commit -m "✨ Update: [descripción del cambio]"
git push origin main
```

## 🎯 Comandos de Mantenimiento

### Limpieza
```bash
# Limpiar archivos no rastreados
git clean -fd

# Resetear a commit específico
git reset --hard commit-hash

# Ver ramas
git branch -a

# Cambiar de rama
git checkout nombre-rama
```

### Backup
```bash
# Crear backup local
git bundle create backup-$(date +%Y%m%d).bundle main

# Crear tag de versión
git tag -a v1.0.0 -m "Versión 1.0.0"
git push origin v1.0.0
```

## 🐛 Solución de Problemas

### Problemas de Autenticación
```bash
# Verificar remote
git remote -v

# Cambiar URL con token
git remote set-url origin https://tu-token@github.com/tu-usuario/vanessa-perez-events.git

# Configurar credential helper
git config --global credential.helper manager-core
```

### Problemas de Merge
```bash
# Abortar merge
git merge --abort

# Resolver conflictos
git status
# Editar archivos con conflictos
git add .
git commit -m "🔧 Resolve merge conflicts"
```

### Problemas de Push
```bash
# Forzar push (¡cuidado!)
git push --force origin main

# Push con lease (más seguro)
git push --force-with-lease origin main
```

## 📊 Comandos de Análisis

### Estadísticas
```bash
# Ver estadísticas del proyecto
git log --oneline | wc -l  # Número de commits
git log --author="Tu Nombre" --oneline  # Tus commits
git shortlog -sn  # Contribuidores
```

### Archivos
```bash
# Ver archivos más modificados
git log --name-only --pretty=format: | sort | uniq -c | sort -rn

# Ver cambios en archivo específico
git log -p -- archivo.js
```

## 🚀 Comandos de Deploy

### GitHub Pages
```bash
# El deploy es automático con GitHub Actions
# Solo necesitas hacer push
git push origin main
```

### Netlify CLI
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=build
```

### Vercel CLI
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 📝 Comandos de Documentación

### Actualizar README
```bash
# Editar README.md
# Luego commit
git add README.md
git commit -m "📝 Update README with new features"
git push origin main
```

### Generar Changelog
```bash
# Ver commits desde última tag
git log $(git describe --tags --abbrev=0)..HEAD --oneline

# Crear changelog manual
echo "## v1.1.0 - $(date)" >> CHANGELOG.md
```

## 🔍 Comandos de Debugging

### Ver Configuración
```bash
# Ver configuración completa
git config --list --show-origin

# Ver configuración local
git config --local --list

# Ver configuración global
git config --global --list
```

### Ver Estado Detallado
```bash
# Estado detallado
git status --porcelain

# Ver archivos ignorados
git status --ignored

# Ver diferencias con staging
git diff --cached
```

## 📱 Comandos Móviles

### Usar GitHub Mobile
1. Instalar GitHub Mobile app
2. Hacer login con tu cuenta
3. Navegar a tu repositorio
4. Hacer commits desde el móvil

### Usar Git desde móvil
```bash
# Usar termux en Android
pkg install git
git clone https://github.com/tu-usuario/vanessa-perez-events.git
cd vanessa-perez-events
git status
```

## 🎯 Checklist de Comandos

### Antes de cada commit
- [ ] `git status` - Verificar estado
- [ ] `npm run build` - Verificar que compila
- [ ] `git add .` - Agregar cambios
- [ ] `git commit -m "mensaje descriptivo"` - Commit
- [ ] `git push origin main` - Push

### Semanalmente
- [ ] `git pull origin main` - Obtener cambios
- [ ] `npm audit` - Verificar vulnerabilidades
- [ ] `npm outdated` - Ver dependencias obsoletas
- [ ] `git log --oneline -10` - Ver últimos commits

### Mensualmente
- [ ] `npm update` - Actualizar dependencias
- [ ] `git tag -a vX.X.X -m "Release vX.X.X"` - Crear tag
- [ ] `git push origin vX.X.X` - Push tag
- [ ] Backup del repositorio

---

**💡 Tip**: Guarda estos comandos en un archivo de texto para acceso rápido.

**⚠️ Importante**: Siempre haz backup antes de comandos destructivos como `git reset --hard`.

---

*Última actualización: $(date)*
