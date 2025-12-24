import { NextResponse } from 'next/server';
import { contentStorage } from '@/lib/storage';

export async function GET() {
  try {
    const data = await contentStorage.getGaleria();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error getting galeria:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const galeria = await contentStorage.getGaleria();
    const newImage = await request.json();
    
    // Generar nuevo ID
    const maxId = galeria.length > 0 
      ? Math.max(...galeria.map(i => i.id)) 
      : 0;
    newImage.id = maxId + 1;
    
    if (!newImage.type) {
      newImage.type = 'image';
    }
    
    galeria.push(newImage);
    const result = await contentStorage.saveGaleria(galeria);
    
    if (result.success) {
      return NextResponse.json({ success: true, data: newImage });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating galeria item:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID es requerido' },
        { status: 400 }
      );
    }
    
    const galeria = await contentStorage.getGaleria();
    const filtered = galeria.filter(i => i.id !== id);
    
    const result = await contentStorage.saveGaleria(filtered);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting galeria item:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

