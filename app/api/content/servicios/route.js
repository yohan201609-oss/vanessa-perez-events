import { NextResponse } from 'next/server';
import { contentStorage } from '@/lib/storage';

export async function GET() {
  try {
    const data = await contentStorage.getServicios();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error getting servicios:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const servicios = await contentStorage.getServicios();
    const newService = await request.json();
    
    // Generar nuevo ID
    const maxId = servicios.length > 0 
      ? Math.max(...servicios.map(s => s.id)) 
      : 0;
    newService.id = maxId + 1;
    
    servicios.push(newService);
    const result = await contentStorage.saveServicios(servicios);
    
    if (result.success) {
      return NextResponse.json({ success: true, data: newService });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating servicio:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const servicios = await contentStorage.getServicios();
    const updatedService = await request.json();
    
    const index = servicios.findIndex(s => s.id === updatedService.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Servicio no encontrado' },
        { status: 404 }
      );
    }
    
    servicios[index] = updatedService;
    const result = await contentStorage.saveServicios(servicios);
    
    if (result.success) {
      return NextResponse.json({ success: true, data: updatedService });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating servicio:', error);
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
    
    const servicios = await contentStorage.getServicios();
    const filtered = servicios.filter(s => s.id !== id);
    
    const result = await contentStorage.saveServicios(filtered);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting servicio:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

