import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      );
    }

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'El archivo debe ser una imagen' },
        { status: 400 }
      );
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'La imagen debe ser menor a 5MB' },
        { status: 400 }
      );
    }

    // Convertir a base64 para almacenar
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    // En producción, aquí podrías subir a Cloudinary, Uploadthing, etc.
    // Por ahora retornamos el data URL para almacenamiento local

    return NextResponse.json({
      success: true,
      url: dataUrl,
      message: 'Imagen subida exitosamente'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error al subir la imagen' },
      { status: 500 }
    );
  }
}

