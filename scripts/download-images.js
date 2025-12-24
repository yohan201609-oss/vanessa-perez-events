const https = require('https');
const fs = require('fs');
const path = require('path');

// Crear directorio de imágenes si no existe
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'events');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// URLs de imágenes específicas de Unsplash para cada categoría
const imageUrls = {
  bodas: [
    {
      filename: 'boda-elegante-jardin.jpg',
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      filename: 'boda-rustica.jpg',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      filename: 'boda-moderna.jpg',
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ],
  babyShowers: [
    {
      filename: 'baby-shower-elegante.jpg',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      filename: 'baby-shower-tematico.jpg',
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ],
  corporativos: [
    {
      filename: 'conferencia-empresarial.jpg',
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      filename: 'lanzamiento-producto.jpg',
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      filename: 'cena-gala-corporativa.jpg',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ],
  especiales: [
    {
      filename: 'aniversario-bodas.jpg',
      url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      filename: 'quinceanera.jpg',
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      filename: 'evento-gala.jpg',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ],
  graduaciones: [
    {
      filename: 'ceremonia-graduacion.jpg',
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      filename: 'fiesta-graduacion.jpg',
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ]
};

// Función para descargar una imagen
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(imagesDir, filename));
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Descargada: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(path.join(imagesDir, filename), () => {});
      console.error(`❌ Error descargando ${filename}:`, err.message);
      reject(err);
    });
  });
}

// Función principal para descargar todas las imágenes
async function downloadAllImages() {
  console.log('🚀 Iniciando descarga de imágenes de eventos...\n');
  
  const allImages = [];
  Object.keys(imageUrls).forEach(category => {
    imageUrls[category].forEach(img => {
      allImages.push({ ...img, category });
    });
  });
  
  console.log(`📸 Total de imágenes a descargar: ${allImages.length}\n`);
  
  for (const image of allImages) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Error con ${image.filename}:`, error.message);
    }
  }
  
  console.log('\n🎉 ¡Descarga completada!');
  console.log(`📁 Imágenes guardadas en: ${imagesDir}`);
}

// Ejecutar descarga
downloadAllImages().catch(console.error);
