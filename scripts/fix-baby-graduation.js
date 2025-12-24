const https = require('https');
const fs = require('fs');
const path = require('path');

// Crear directorio de imágenes si no existe
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'events');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// URLs alternativas que funcionan mejor
const imagesToFix = [
  {
    filename: 'baby-shower-elegante.jpg',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    filename: 'ceremonia-graduacion.jpg',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  }
];

// Función para descargar una imagen
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(imagesDir, filename));
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(path.join(imagesDir, filename));
          if (stats.size > 1000) {
            console.log(`✅ Descargada: ${filename} (${stats.size} bytes)`);
            resolve();
          } else {
            console.log(`❌ Archivo muy pequeño: ${filename} (${stats.size} bytes)`);
            reject(new Error(`Archivo muy pequeño: ${filename}`));
          }
        });
      } else {
        console.log(`❌ Error HTTP ${response.statusCode} para ${filename}`);
        reject(new Error(`Error HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      console.error(`❌ Error de conexión para ${filename}:`, err.message);
      reject(err);
    });
  });
}

// Función principal
async function fixImages() {
  console.log('🚀 Arreglando imágenes de Baby Shower y Graduación...\n');
  
  for (const image of imagesToFix) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`❌ Error con ${image.filename}:`, error.message);
    }
  }
  
  console.log('\n🎉 ¡Proceso completado!');
}

// Ejecutar
fixImages().catch(console.error);
