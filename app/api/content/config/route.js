import { NextResponse } from 'next/server';
import { contentStorage } from '@/lib/storage';

export async function GET() {
  try {
    const data = await contentStorage.getConfig();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error getting config:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const result = await contentStorage.saveConfig(data);
    
    if (result.success) {
      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error saving config:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

