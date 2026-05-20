'use client'
import { useState, useEffect } from 'react'
import Topbar from '@/components/Topbar'
import { Save, Bell, Palette, Shield, CheckCircle } from 'lucide-react'

export default function ConfiguracionPage() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Datos del taller
  const [nombre, setNombre] = useState('Mi Taller Mecánico')
  const [telefono, setTelefono] = useState('+56 2 1234 5678')
  const [email, setEmail] = useState('taller@ejemplo.cl')
  const [direccion, setDireccion] = useState('Av. Mecánica 1234, Santiago')
  const [ciudad, setCiudad] = useState('Santiago')

  // Canales de notificación
  const [emailActivo, setEmailActivo] = useState(true)
  const [whatsappActivo, setWhatsappActivo] = useState(false)
  const [smsActivo, setSmsActivo] = useState(false)

  // Cargar desde localStorage al montar
  useEffect(() => {
    const n = localStorage.getItem('taller_nombre')
    const t = localStorage.getItem('taller_telefono')
    const e = localStorage.getItem('taller_email')
    const d = localStorage.getItem('taller_direccion')
    const c = localStorage.getItem('taller_ciudad')
    const ea = localStorage.getItem('taller_email_activo')
    const wa = localStorage.getItem('taller_whatsapp_activo')
    const sa = localStorage.getItem('taller_sms_activo')

    if (n) setNombre(n)
    if (t) setTelefono(t)
    if (e) setEmail(e)
    if (d) setDireccion(d)
    if (c) setCiudad(c)
    if (ea !== null) setEmailActivo(ea === 'true')
    if (wa !== null) setWhatsappActivo(wa === 'true')
    if (sa !== null) setSmsActivo(sa === 'true')
  }, [])

  const handleSave = () => {
    setSaving(true)

    // Guardar en localStorage
    localStorage.setItem('taller_nombre', nombre)
    localStorage.setItem('taller_telefono', telefono)
    localStorage.setItem('taller_email', email)
    localStorage.setItem('taller_direccion', direccion)
    localStorage.setItem('taller_ciudad', ciudad)
    localStorage.setItem('taller_email_activo', String(emailActivo))
    localStorage.setItem('taller_whatsapp_activo', String(whatsappActivo))
    localStorage.setItem('taller_sms_activo', String(smsActivo))

    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 800)
  }

  return (
    <div className="fade-in">
      <Topbar title="Configuración" subtitle="Ajustes del taller" />
      <div className="p-6 max-w-2xl space-y-6">

        {saved && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">
            <CheckCircle size={16} />
            Configuración guardada. El nombre del taller se actualizará al recargar la página.
          </div>
        )}

        {/* Datos del taller */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Palette size={16} className="text-slate-400" />
            <p className="font-bold text-slate-700">Datos del taller</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre del taller *</label>
              <input
                className="input w-full"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Nombre de tu taller"
              />
              <p className="text-xs text-slate-400 mt-1">Este nombre aparece en la barra superior y en las notificaciones a clientes.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Teléfono</label>
              <input
                className="input w-full"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                className="input w-full"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Dirección</label>
              <input
                className="input w-full"
                value={direccion}
                onChange={e => setDireccion(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Ciudad</label>
              <input
                className="input w-full"
                value={ciudad}
                onChange={e => setCiudad(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Bell size={16} className="text-slate-400" />
            <p className="font-bold text-slate-700">Canales de notificación a clientes</p>
          </div>
          <p className="text-sm text-slate-500">Selecciona qué canales se usan al actualizar el estado de una OT.</p>
          {[
            {
              id: 'email', label: '📧 Email', desc: 'Envío de emails automáticos via Resend.',
              key: 'RESEND_API_KEY', activo: emailActivo, setActivo: setEmailActivo,
            },
            {
              id: 'whatsapp', label: '💬 WhatsApp Business', desc: 'Mensajes de WhatsApp via Twilio. Requiere cuenta verificada.',
              key: 'TWILIO_ACCOUNT_SID', activo: whatsappActivo, setActivo: setWhatsappActivo,
            },
            {
              id: 'sms', label: '📱 SMS', desc: 'Mensajes de texto via Twilio. Tiene costo por mensaje.',
              key: 'TWILIO_ACCOUNT_SID', activo: smsActivo, setActivo: setSmsActivo,
            },
          ].map(n => (
            <div key={n.id}
              onClick={() => n.setActivo(!n.activo)}
              className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-colors ${n.activo ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50 border border-transparent'}`}>
              <input
                type="checkbox"
                checked={n.activo}
                onChange={() => n.setActivo(!n.activo)}
                onClick={e => e.stopPropagation()}
                className="w-4 h-4 mt-0.5 accent-blue-500"
              />
              <div>
                <p className="font-semibold text-slate-700">{n.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Variable requerida: <code className="bg-slate-200 px-1 rounded">{n.key}</code>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Suscripción */}
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
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            {[
              { label: 'Usuarios', valor: '5 / 10' },
              { label: 'Vehículos', valor: 'Ilimitados' },
              { label: 'Notificaciones', valor: '500 / mes' },
            ].map(item => (
              <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                <p className="font-bold text-slate-700">{item.valor}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold transition-all"
          style={{ backgroundColor: saving ? '#93c5fd' : 'var(--accent)' }}
        >
          <Save size={16} /> {saving ? 'Guardando...' : 'Guardar configuración'}
        </button>
      </div>
    </div>
  )
}
