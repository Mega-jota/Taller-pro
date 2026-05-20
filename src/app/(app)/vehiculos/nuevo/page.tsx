'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

export default function NuevoVehiculoPage() {
  const [saving, setSaving] = useState(false)
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSaving(true); setTimeout(() => setSaving(false), 1500) }

  return (
    <div className="fade-in">
      <Topbar title="Nuevo Vehículo" subtitle="Registrar vehículo en el taller" />
      <div className="p-6 max-w-2xl">
        <Link href="/vehiculos" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft size={15} /> Volver a vehículos
        </Link>
        <form onSubmit={handleSubmit} className="card p-6 space-y-5">

          <div>
            <p className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b border-slate-100">Identificación del vehículo</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Patente *</label>
                <input className="input font-mono uppercase" required placeholder="ABCD12" maxLength={6} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">VIN / N° Chasis</label>
                <input className="input font-mono text-xs" placeholder="1HGCM82633A004352" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b border-slate-100">Datos del vehículo</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Marca *</label>
                <input className="input" required placeholder="Toyota, Ford, Chevrolet..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Modelo *</label>
                <input className="input" required placeholder="Hilux, Ranger, Spark..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Año</label>
                <input className="input" type="number" min={1990} max={2030} placeholder="2022" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Color</label>
                <input className="input" placeholder="Blanco, Negro, Gris..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Kilometraje actual</label>
                <input className="input" type="number" placeholder="85000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">N° Motor</label>
                <input className="input font-mono text-xs" placeholder="2GR-FE-123456" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tipo</label>
              <select className="input">
                <option value="automovil">Automóvil</option>
                <option value="camioneta">Camioneta</option>
                <option value="suv">SUV</option>
                <option value="van">Van</option>
                <option value="moto">Moto</option>
                <option value="camion">Camión</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Combustible</label>
              <select className="input">
                <option value="gasolina">Gasolina</option>
                <option value="diesel">Diésel</option>
                <option value="electrico">Eléctrico</option>
                <option value="hibrido">Híbrido</option>
                <option value="gnc">GNC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Transmisión</label>
              <select className="input">
                <option value="mecanica">Mecánica</option>
                <option value="automatica">Automática</option>
                <option value="cvt">CVT</option>
              </select>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b border-slate-100">Propietario</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Cliente *</label>
                <select className="input" required>
                  <option value="">Seleccionar cliente...</option>
                  <option value="1">Juan Pérez</option>
                  <option value="2">María López</option>
                  <option value="3">LogiChile SpA</option>
                  <option value="4">Roberto Silva</option>
                  <option value="5">Transportes Norte Ltda.</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Notas</label>
            <textarea className="input resize-none" rows={3} placeholder="Observaciones sobre el vehículo..." />
          </div>

          <div className="flex gap-3 pt-2">
            <Link href="/vehiculos" className="btn-secondary flex-1 text-center py-2">Cancelar</Link>
            <button type="submit" disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: saving ? '#93c5fd' : 'var(--accent)' }}>
              <Save size={16} />
              {saving ? 'Guardando...' : 'Guardar vehículo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
