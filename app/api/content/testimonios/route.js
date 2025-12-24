import { NextResponse } from 'next/server';
import { contentStorage } from '@/lib/storage';

export async function GET() {
  try {
    const data = await contentStorage.getTestimonios();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error getting testimonios:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const testimonios = await contentStorage.getTestimonios();
    const newTestimonio = await request.json();
    
    // Generar nuevo ID
    const maxId = testimonios.length > 0 
      ? Math.max(...testimonios.map(t => t.id)) 
      : 0;
    newTestimonio.id = maxId + 1;
    
    testimonios.push(newTestimonio);
    const result = await contentStorage.saveTestimonios(testimonios);
    
    if (result.success) {
      return NextResponse.json({ success: true, data: newTestimonio });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating testimonio:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const testimonios = await contentStorage.getTestimonios();
    const updatedTestimonio = await request.json();
    
    const index = testimonios.findIndex(t => t.id === updatedTestimonio.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Testimonio no encontrado' },
        { status: 404 }
      );
    }
    
    testimonios[index] = updatedTestimonio;
    const result = await contentStorage.saveTestimonios(testimonios);
    
    if (result.success) {
      return NextResponse.json({ success: true, data: updatedTestimonio });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating testimonio:', error);
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
    
    const testimonios = await contentStorage.getTestimonios();
    const filtered = testimonios.filter(t => t.id !== id);
    
    const result = await contentStorage.saveTestimonios(filtered);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting testimonio:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

