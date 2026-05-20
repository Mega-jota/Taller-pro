import { NextRequest, NextResponse } from 'next/server'

// ──────────────────────────────────────────────────────────────
// API Route: POST /api/notificar
// Envía notificaciones al cliente por Email, WhatsApp y/o SMS
// ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tipo, destinatario, mensaje, asunto, canales, numero_ot, estado } = body

    const resultados: Record<string, string> = {}

    // ── EMAIL (Resend) ──────────────────────────────────────
    if (canales?.includes('email') && destinatario?.email) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      const htmlEmail = `
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="UTF-8"><title>${asunto}</title></head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: #1e3a5f; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">🔧 TallerPro</h1>
            <p style="color: #94a3b8; margin: 4px 0 0;">Actualización de su vehículo</p>
          </div>
          <div style="background: white; padding: 28px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="color: #374151; font-size: 16px;">Estimado/a <strong>${destinatario.nombre || 'cliente'}</strong>,</p>
            <div style="background: #f0f9ff; border-left: 4px solid #2e86c1; padding: 16px; border-radius: 0 8px 8px 0; margin: 20px 0;">
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1e3a5f;">Orden: ${numero_ot}</p>
              <p style="margin: 8px 0 0; color: #374151;">${mensaje}</p>
            </div>
            <p style="color: #6b7280; font-size: 14px;">Si tiene alguna pregunta, no dude en contactarnos.</p>
            <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px;">Este mensaje fue enviado automáticamente por TallerPro</p>
            </div>
          </div>
        </body>
        </html>
      `

      const emailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'notificaciones@tallerpro.cl',
        to: destinatario.email,
        subject: asunto || `Actualización OT ${numero_ot}`,
        html: htmlEmail,
      })
      resultados.email = emailResult.error ? 'error' : 'enviado'
    }

    // ── WHATSAPP (Twilio) ───────────────────────────────────
    if (canales?.includes('whatsapp') && destinatario?.whatsapp) {
      const twilio = require('twilio')
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

      const whatsappMsg = `🔧 *TallerPro* — Actualización de su vehículo\n\n` +
        `*Orden:* ${numero_ot}\n` +
        `*Estado:* ${estado || 'Actualizado'}\n\n` +
        `${mensaje}\n\n` +
        `_Si tiene preguntas, responda este mensaje._`

      await client.messages.create({
        body: whatsappMsg,
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:${destinatario.whatsapp}`,
      })
      resultados.whatsapp = 'enviado'
    }

    // ── SMS (Twilio) ────────────────────────────────────────
    if (canales?.includes('sms') && destinatario?.telefono) {
      const twilio = require('twilio')
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

      const smsMsg = `TallerPro - ${numero_ot}: ${mensaje}`

      await client.messages.create({
        body: smsMsg.substring(0, 160),
        from: process.env.TWILIO_SMS_NUMBER,
        to: destinatario.telefono,
      })
      resultados.sms = 'enviado'
    }

    return NextResponse.json({ ok: true, resultados })

  } catch (error) {
    console.error('Error enviando notificación:', error)
    return NextResponse.json(
      { ok: false, error: 'Error al enviar notificación' },
      { status: 500 }
    )
  }
}
