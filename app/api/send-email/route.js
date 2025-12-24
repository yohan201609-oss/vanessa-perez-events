import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const { templateParams } = body;

    // Obtener credenciales de variables de entorno del servidor
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    // Validar que todos los parámetros requeridos estén presentes
    if (!serviceId || !templateId || !publicKey || !templateParams) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos o configuración de EmailJS' },
        { status: 400 }
      );
    }

    // Enviar email usando la API de EmailJS directamente
    const response = await fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: templateParams
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.text || 'Error al enviar el email');
    }

    return NextResponse.json(
      { success: true, message: 'Email enviado correctamente', result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error al enviar el email', details: error.message },
      { status: 500 }
    );
  }
}

