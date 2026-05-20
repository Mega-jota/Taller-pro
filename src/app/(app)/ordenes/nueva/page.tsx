'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'

type Item = { descripcion: string; tipo: string; cantidad: number; precio: number }

export default function NuevaOTPage() {
  const [saving, setSaving] = useState(false)
  const [items, setItems] = useState<Item[]>([{ descripcion: '', tipo: 'mano_obra', cantidad: 1, precio: 0 }])

  const addItem = () => setItems([...items, { descripcion: '', tipo: 'mano_obra', cantidad: 1, precio: 0 }])
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i))
  const updateItem = (i: number, field: keyof Item, value: string | number) =>
    setItems(items.map((it, idx) => idx === i ? { ...it, [field]: value } : it))
  const total = items.reduce((s, it) => s + it.cantidad * it.precio, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setTimeout(() => setSaving(false), 1500)
  }

  return (
    <div className="fade-in">
      <Topbar title="Nueva Orden de Trabajo" subtitle="Crear OT para vehículo en taller" />
      <div className="p-6 max-w-3xl">
        <Link href="/ordenes" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft size={15} /> Volver a órdenes
        </Link>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Vehículo y cliente */}
          <div className="card p-6 space-y-4">
            <p className="text-sm font-bold text-slate-700 pb-2 border-b border-slate-100">Vehículo y cliente</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Patente *</label>
                <input className="input font-mono uppercase" required placeholder="ABCD12" />
                <p className="text-xs text-slate-400 mt-1">El sistema buscará el vehículo automáticamente</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">O seleccionar vehículo</label>
                <select className="input">
                  <option value="">Buscar vehículo registrado...</option>
                  <option>ABCD12 — Toyota Hilux (LogiChile)</option>
                  <option>EFGH34 — Chevrolet Spark (María López)</option>
                  <option>IJKL56 — Ford Ranger (Transportes Norte)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mecánico asignado</label>
                <select className="input">
                  <option value="">Sin asignar</option>
                  <option>Carlos Rodríguez</option>
                  <option>Pedro Morales</option>
                  <option>Luis Soto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Prioridad</label>
                <select className="input">
                  <option value="normal">Normal</option>
                  <option value="baja">Baja</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">🔴 Urgente</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Km al ingreso</label>
                <input className="input" type="number" placeholder="85000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Fecha estimada de entrega</label>
                <input className="input" type="date" />
              </div>
            </div>
          </div>

          {/* Descripción del trabajo */}
          <div className="card p-6 space-y-4">
            <p className="text-sm font-bold text-slate-700 pb-2 border-b border-slate-100">Descripción del trabajo</p>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Problema reportado por el cliente *</label>
              <textarea required className="input resize-none" rows={3}
                placeholder="Describir el problema o servicio solicitado por el cliente..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Diagnóstico inicial</label>
              <textarea className="input resize-none" rows={2}
                placeholder="Diagnóstico del mecánico (puede completarse después)..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Notas internas</label>
              <textarea className="input resize-none" rows={2}
                placeholder="Notas para el equipo (no visibles por el cliente)..." />
            </div>
          </div>

          {/* Items del presupuesto */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-700">Presupuesto estimado</p>
              <button type="button" onClick={addItem}
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg"
                style={{ color: 'var(--accent)', background: 'var(--accent-light)' }}>
                <Plus size={14} /> Agregar ítem
              </button>
            </div>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <input className="input text-sm" placeholder="Descripción del trabajo o repuesto"
                      value={item.descripcion} onChange={e => updateItem(i, 'descripcion', e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <select className="input text-sm" value={item.tipo} onChange={e => updateItem(i, 'tipo', e.target.value)}>
                      <option value="mano_obra">Mano obra</option>
                      <option value="repuesto">Repuesto</option>
                      <option value="insumo">Insumo</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <input className="input text-sm" type="number" min={1} placeholder="Cant." value={item.cantidad}
                      onChange={e => updateItem(i, 'cantidad', Number(e.target.value))} />
                  </div>
                  <div className="col-span-2">
                    <input className="input text-sm" type="number" placeholder="Precio $" value={item.precio || ''}
                      onChange={e => updateItem(i, 'precio', Number(e.target.value))} />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    {items.length > 1 && (
                      <button type="button" onClick={() => removeItem(i)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <div className="text-right">
                <p className="text-xs text-slate-400">Total estimado</p>
                <p className="text-2xl font-bold text-slate-800">${total.toLocaleString('es-CL')}</p>
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="card p-5">
            <p className="text-sm font-bold text-slate-700 mb-3">Notificaciones al cliente</p>
            <div className="flex gap-4">
              {[
                { id: 'email', label: '📧 Email', checked: true },
                { id: 'whatsapp', label: '💬 WhatsApp', checked: true },
                { id: 'sms', label: '📱 SMS', checked: false },
              ].map(n => (
                <label key={n.id} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked={n.checked} className="w-4 h-4 rounded" />
                  <span className="text-sm text-slate-700">{n.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">El cliente recibirá una notificación al crear la OT y en cada cambio de estado.</p>
          </div>

          <div className="flex gap-3">
            <Link href="/ordenes" className="flex-1 text-center py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50">
              Cancelar
            </Link>
            <button type="submit" disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-semibold text-sm"
              style={{ backgroundColor: saving ? '#93c5fd' : 'var(--accent)' }}>
              <Save size={16} /> {saving ? 'Creando OT...' : 'Crear Orden de Trabajo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
