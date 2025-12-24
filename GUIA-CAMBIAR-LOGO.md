# 🎨 Guía para Cambiar el Logo

## 📍 Ubicación Actual del Logo

El logo se encuentra en:
- **Archivo**: `public/images/logo-vanessa-perez.svg`
- **Componente**: `components/Header/Header.js` (línea 39)

## 🔄 Opción 1: Reemplazar el Archivo (Más Fácil)

### Pasos:
1. **Prepara tu nuevo logo** en formato:
   - SVG (recomendado - mejor calidad y escalable)
   - PNG (con fondo transparente)
   - JPG (si tiene fondo)

2. **Reemplaza el archivo**:
   - Coloca tu nuevo logo en: `public/images/logo-vanessa-perez.svg`
   - Si usas PNG o JPG, renómbralo a `logo-vanessa-perez.png` o `logo-vanessa-perez.jpg`

3. **Actualiza el código** (solo si cambias el formato):
   - Edita `components/Header/Header.js`
   - Cambia la extensión en la línea 39:
     ```javascript
     src="/images/logo-vanessa-perez.png"  // Si es PNG
     src="/images/logo-vanessa-perez.jpg"  // Si es JPG
     ```

## 🔄 Opción 2: Usar un Archivo con Nombre Diferente

Si quieres usar un nombre diferente:

1. **Coloca tu logo** en `public/images/` con el nombre que prefieras
   - Ejemplo: `public/images/mi-nuevo-logo.svg`

2. **Actualiza el código** en `components/Header/Header.js`:
   ```javascript
   <Image 
     src="/images/mi-nuevo-logo.svg"  // Cambia aquí
     alt="Vanessa Pérez - Event Planner" 
     className={styles.logoImage}
     width={280}
     height={80}
     priority
   />
   ```

## 📐 Ajustar el Tamaño del Logo

Si tu logo tiene un tamaño diferente, ajusta `width` y `height` en `Header.js`:

```javascript
<Image 
  src="/images/logo-vanessa-perez.svg" 
  alt="Vanessa Pérez - Event Planner" 
  className={styles.logoImage}
  width={300}  // Ajusta según tu logo
  height={100} // Ajusta según tu logo
  priority
/>
```

**Nota**: Mantén la proporción de tu logo. Si tu logo es más ancho, aumenta el `width`. Si es más alto, aumenta el `height`.

## 🎨 Formatos Recomendados

### SVG (Recomendado)
- ✅ Escalable sin pérdida de calidad
- ✅ Tamaño de archivo pequeño
- ✅ Mejor para logos

### PNG
- ✅ Soporta transparencia
- ✅ Buena calidad
- ⚠️ Tamaño de archivo más grande

### JPG
- ✅ Tamaño pequeño
- ❌ No soporta transparencia
- ⚠️ Puede perder calidad al escalar

## 📱 Responsive

El logo se ajusta automáticamente en móvil gracias a los estilos CSS:

```css
@media (max-width: 768px) {
  .logoImage {
    height: 60px;
    max-width: 200px;
  }
}
```

Si necesitas ajustar el tamaño en móvil, edita `components/Header/Header.module.css`.

## ✅ Verificar el Cambio

Después de cambiar el logo:

1. **Reinicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

2. **Limpia la caché del navegador** (Ctrl + Shift + R o Cmd + Shift + R)

3. **Verifica** que el logo se vea correctamente en:
   - Desktop
   - Tablet
   - Mobile

## 🔧 Ejemplo Completo

Si tu logo se llama `nuevo-logo.png` y tiene dimensiones 400x120:

```javascript
<Image 
  src="/images/nuevo-logo.png" 
  alt="Vanessa Pérez - Event Planner" 
  className={styles.logoImage}
  width={400}
  height={120}
  priority
/>
```

---

**¿Necesitas ayuda?** Asegúrate de que el archivo esté en `public/images/` y que la ruta en el código sea correcta.

