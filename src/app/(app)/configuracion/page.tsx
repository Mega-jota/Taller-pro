'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import { Save, Bell, Palette, Shield } from 'lucide-react'

export default function ConfiguracionPage() {
  const [saving, setSaving] = useState(false)
  const handleSave = () => { setSaving(true); setTimeout(() => setSaving(false), 1200) }

  return (
    <div className="fade-in">
      <Topbar title="Configuración" subtitle="Ajustes del taller" />
      <div className="p-6 max-w-2xl space-y-6">

        {/* Datos del taller */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Palette size={16} className="text-slate-400" />
            <p className="font-bold text-slate-700">Datos del taller</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre del taller *</label>
              <input className="input" defaultValue="Mi Taller Mecánico" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Teléfono</label>
              <input className="input" defaultValue="+56 2 1234 5678" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input className="input" type="email" defaultValue="taller@ejemplo.cl" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Dirección</label>
              <input className="input" defaultValue="Av. Mecánica 1234, Santiago" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Ciudad</label>
              <input className="input" defaultValue="Santiago" />
            </div>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Bell size={16} className="text-slate-400" />
            <p className="font-bold text-slate-700">Canales de notificación</p>
          </div>
          <p className="text-sm text-slate-500">Configure qué canales se usan para notificar a los clientes automáticamente.</p>
          {[
            { id: 'email', label: '📧 Email', desc: 'Envío de emails automáticos al actualizar el estado de una OT', key: 'RESEND_API_KEY' },
            { id: 'whatsapp', label: '💬 WhatsApp Business', desc: 'Mensajes de WhatsApp via Twilio. Requiere cuenta Business verificada.', key: 'TWILIO_ACCOUNT_SID' },
            { id: 'sms', label: '📱 SMS', desc: 'Mensajes de texto via Twilio. Costo por mensaje.', key: 'TWILIO_ACCOUNT_SID' },
          ].map(n => (
            <div key={n.id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50">
              <input type="checkbox" defaultChecked={n.id === 'email'} className="w-4 h-4 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700">{n.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
                <p className="text-xs text-slate-400 mt-1">Variable requerida: <code className="bg-slate-200 px-1 rounded">{n.key}</code></p>
              </div>
            </div>
          ))}
        </div>

        {/* Seguridad */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Shield size={16} className="text-slate-400" />
            <p className="font-bold text-slate-700">Suscripción</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
            <div>
              <p className="font-semibold text-blue-800">Plan Pro</p>
              <p className="text-sm text-blue-600">Vence: 20 de Junio, 2026</p>
            </div>
            <span className="badge bg-green-100 text-green-700">✅ Activo</span>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold"
          style={{ backgroundColor: saving ? '#93c5fd' : 'var(--accent)' }}>
          <Save size={16} /> {saving ? 'Guardando...' : 'Guardar configuración'}
        </button>
      </div>
    </div>
  )
}
