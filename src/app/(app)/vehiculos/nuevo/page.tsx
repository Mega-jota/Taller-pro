'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { ArrowLeft, Save, UserPlus, X, CheckCircle } from 'lucide-react'

type ClienteItem = { id: string; nombre: string; tipo: string }

const CLIENTES_BASE: ClienteItem[] = [
  { id: '1', nombre: 'Juan Pérez', tipo: 'particular' },
  { id: '2', nombre: 'María López', tipo: 'particular' },
  { id: '3', nombre: 'LogiChile SpA', tipo: 'empresa' },
  { id: '4', nombre: 'Roberto Silva', tipo: 'particular' },
  { id: '5', nombre: 'Transportes Norte Ltda.', tipo: 'empresa' },
  { id: '6', nombre: 'Ana González', tipo: 'particular' },
]

export default function NuevoVehiculoPage() {
  const [saving, setSaving] = useState(false)
  const [clientes, setClientes] = useState<ClienteItem[]>(CLIENTES_BASE)
  const [clienteId, setClienteId] = useState('')

  // Modal nuevo cliente
  const [modalCliente, setModalCliente] = useState(false)
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoRut, setNuevoRut] = useState('')
  const [nuevoTelefono, setNuevoTelefono] = useState('')
  const [nuevoEmail, setNuevoEmail] = useState('')
  const [nuevoTipo, setNuevoTipo] = useState<'particular' | 'empresa'>('particular')
  const [clienteCreado, setClienteCreado] = useState(false)

  const abrirModalCliente = () => {
    setNuevoNombre('')
    setNuevoRut('')
    setNuevoTelefono('')
    setNuevoEmail('')
    setNuevoTipo('particular')
    setModalCliente(true)
  }

  const crearCliente = () => {
    if (!nuevoNombre.trim()) return
    const nuevoId = String(Date.now())
    const nuevo: ClienteItem = { id: nuevoId, nombre: nuevoNombre.trim(), tipo: nuevoTipo }
    setClientes(prev => [...prev, nuevo])
    setClienteId(nuevoId)
    setModalCliente(false)
    setClienteCreado(true)
    setTimeout(() => setClienteCreado(false), 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => setSaving(false), 1500)
  }

  return (
    <div className="fade-in">
      <Topbar title="Nuevo Vehículo" subtitle="Registrar vehículo en el taller" />

      {/* Modal Nuevo Cliente */}
      {modalCliente && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <UserPlus size={16} className="text-blue-500" /> Crear nuevo cliente
              </h2>
              <button onClick={() => setModalCliente(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Nombre completo <span className="text-red-400">*</span>
                </label>
                <input
                  className="input w-full"
                  placeholder="Ej: Pedro Rodríguez"
                  value={nuevoNombre}
                  onChange={e => setNuevoNombre(e.target.value)}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Tipo</label>
                <div className="flex gap-2">
                  {(['particular', 'empresa'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNuevoTipo(t)}
                      className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${nuevoTipo === t
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                      {t === 'particular' ? '👤 Particular' : '🏢 Empresa'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">RUT</label>
                  <input
                    className="input w-full"
                    placeholder="12.345.678-9"
                    value={nuevoRut}
                    onChange={e => setNuevoRut(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Teléfono</label>
                  <input
                    className="input w-full"
                    type="tel"
                    placeholder="+56 9 ..."
                    value={nuevoTelefono}
                    onChange={e => setNuevoTelefono(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Email</label>
                <input
                  className="input w-full"
                  type="email"
                  placeholder="correo@ejemplo.cl"
                  value={nuevoEmail}
                  onChange={e => setNuevoEmail(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setModalCliente(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={crearCliente}
                  disabled={!nuevoNombre.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'var(--accent)' }}>
                  <UserPlus size={15} /> Crear cliente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 max-w-2xl">
        <Link href="/vehiculos" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft size={15} /> Volver a vehículos
        </Link>

        {clienteCreado && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2">
            <CheckCircle size={16} /> Cliente creado y seleccionado correctamente
          </div>
        )}

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
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Cliente *</label>
              <div className="flex gap-2">
                <select
                  className="input flex-1"
                  required
                  value={clienteId}
                  onChange={e => setClienteId(e.target.value)}>
                  <option value="">Seleccionar cliente...</option>
                  {clientes.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.tipo === 'empresa' ? '🏢 ' : '👤 '}{c.nombre}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={abrirModalCliente}
                  title="Crear nuevo cliente"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors whitespace-nowrap">
                  <UserPlus size={15} /> Nuevo
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                ¿El cliente no está en la lista?{' '}
                <button type="button" onClick={abrirModalCliente} className="text-blue-500 hover:underline">
                  Créalo aquí sin salir del formulario
                </button>
              </p>
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
