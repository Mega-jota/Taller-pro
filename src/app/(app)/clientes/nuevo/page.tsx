'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { ArrowLeft, Save, User, Building2 } from 'lucide-react'

export default function NuevoClientePage() {
  const [tipo, setTipo] = useState<'particular' | 'empresa'>('particular')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // TODO: conectar con Supabase
    setTimeout(() => setSaving(false), 1500)
  }

  return (
    <div className="fade-in">
      <Topbar title="Nuevo Cliente" subtitle="Registrar cliente en el sistema" />
      <div className="p-6 max-w-2xl">

        <Link href="/clientes" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft size={15} /> Volver a clientes
        </Link>

        <form onSubmit={handleSubmit} className="card p-6 space-y-5">

          {/* Tipo de cliente */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de cliente</label>
            <div className="flex gap-3">
              {[
                { value: 'particular', label: 'Particular', icon: User, desc: 'Persona natural' },
                { value: 'empresa', label: 'Empresa', icon: Building2, desc: 'Persona jurídica / Flota' },
              ].map(opt => (
                <button key={opt.value} type="button"
                  onClick={() => setTipo(opt.value as 'particular' | 'empresa')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${tipo === opt.value ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <opt.icon size={20} className={tipo === opt.value ? 'text-blue-600' : 'text-slate-400'} />
                  <p className={`font-semibold mt-2 ${tipo === opt.value ? 'text-blue-800' : 'text-slate-700'}`}>{opt.label}</p>
                  <p className="text-xs text-slate-500">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Datos personales */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {tipo === 'empresa' ? 'Razón Social *' : 'Nombre *'}
              </label>
              <input className="input" required placeholder={tipo === 'empresa' ? 'Empresa Ejemplo SpA' : 'Nombre del cliente'} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {tipo === 'empresa' ? 'Apellido contacto' : 'Apellido'}
              </label>
              <input className="input" placeholder={tipo === 'empresa' ? 'Nombre del contacto' : 'Apellido'} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">RUT *</label>
              <input className="input" required placeholder="12.345.678-9" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Teléfono</label>
              <input className="input" type="tel" placeholder="+56 9 1234 5678" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input className="input" type="email" placeholder="correo@ejemplo.cl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">WhatsApp</label>
              <input className="input" type="tel" placeholder="+56 9 1234 5678" />
            </div>
          </div>

          {tipo === 'empresa' && (
            <div className="p-4 bg-slate-50 rounded-xl space-y-4">
              <p className="text-sm font-semibold text-slate-700">Datos de la empresa</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Giro</label>
                  <input className="input" placeholder="Transporte de carga" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Teléfono empresa</label>
                  <input className="input" placeholder="+56 2 2345 6789" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Dirección</label>
                <input className="input" placeholder="Av. Ejemplo 1234, Santiago" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Notas internas</label>
            <textarea className="input resize-none" rows={3} placeholder="Observaciones sobre el cliente (solo visibles internamente)..." />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <Link href="/clientes" className="btn-secondary flex-1 text-center">Cancelar</Link>
            <button type="submit" disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-white font-semibold transition-colors"
              style={{ backgroundColor: saving ? '#93c5fd' : 'var(--accent)' }}>
              <Save size={16} />
              {saving ? 'Guardando...' : 'Guardar cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
