'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { ArrowLeft, Save, Plus, Trash2, UserPlus, Car, X, CheckCircle, User, Building2 } from 'lucide-react'

type Item = { descripcion: string; tipo: string; cantidad: number; precio: number }
type ClienteItem = { id: string; nombre: string; tipo: 'particular' | 'empresa' }
type VehiculoItem = { id: string; patente: string; descripcion: string; clienteId?: string }
type MecanicoItem = { id: string; nombre: string; especialidad: string }

const CLIENTES_BASE: ClienteItem[] = [
  { id: '1', nombre: 'Juan Pérez', tipo: 'particular' },
  { id: '2', nombre: 'María López', tipo: 'particular' },
  { id: '3', nombre: 'LogiChile SpA', tipo: 'empresa' },
  { id: '4', nombre: 'Roberto Silva', tipo: 'particular' },
  { id: '5', nombre: 'Transportes Norte Ltda.', tipo: 'empresa' },
  { id: '6', nombre: 'Ana González', tipo: 'particular' },
]

const VEHICULOS_BASE: VehiculoItem[] = [
  { id: '1', patente: 'ABCD12', descripcion: 'Toyota Hilux', clienteId: '3' },
  { id: '2', patente: 'EFGH34', descripcion: 'Chevrolet Spark', clienteId: '2' },
  { id: '3', patente: 'IJKL56', descripcion: 'Ford Ranger', clienteId: '5' },
  { id: '4', patente: 'MNOP78', descripcion: 'Honda CR-V', clienteId: '1' },
]

const MECANICOS_BASE: MecanicoItem[] = [
  { id: '1', nombre: 'Carlos Rodríguez', especialidad: 'Motor' },
  { id: '2', nombre: 'Pedro Morales', especialidad: 'Suspensión' },
  { id: '3', nombre: 'Luis Soto', especialidad: 'Electricidad' },
]

export default function NuevaOTPage() {
  const [saving, setSaving] = useState(false)
  const [items, setItems] = useState<Item[]>([{ descripcion: '', tipo: 'mano_obra', cantidad: 1, precio: 0 }])

  // Clientes
  const [clientes, setClientes] = useState<ClienteItem[]>(CLIENTES_BASE)
  const [clienteId, setClienteId] = useState('')
  const [modalCliente, setModalCliente] = useState(false)
  const [ncNombre, setNcNombre] = useState('')
  const [ncRut, setNcRut] = useState('')
  const [ncTelefono, setNcTelefono] = useState('')
  const [ncTipo, setNcTipo] = useState<'particular' | 'empresa'>('particular')

  // Vehículos
  const [vehiculos, setVehiculos] = useState<VehiculoItem[]>(VEHICULOS_BASE)
  const [vehiculoId, setVehiculoId] = useState('')
  const [patenteMaual, setPatenteMaual] = useState('')
  const [modalVehiculo, setModalVehiculo] = useState(false)
  const [nvPatente, setNvPatente] = useState('')
  const [nvMarca, setNvMarca] = useState('')
  const [nvModelo, setNvModelo] = useState('')
  const [nvAnio, setNvAnio] = useState('')

  // Mecánicos
  const [mecanicos, setMecanicos] = useState<MecanicoItem[]>(MECANICOS_BASE)
  const [mecanicoId, setMecanicoId] = useState('')
  const [modalMecanico, setModalMecanico] = useState(false)
  const [nmNombre, setNmNombre] = useState('')
  const [nmEspecialidad, setNmEspecialidad] = useState('')
  const [nmTelefono, setNmTelefono] = useState('')

  // Toasts
  const [toast, setToast] = useState('')
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  // Vehículos filtrados por cliente seleccionado
  const vehiculosFiltrados = clienteId
    ? vehiculos.filter(v => v.clienteId === clienteId)
    : vehiculos

  const vehiculoSeleccionado = vehiculos.find(v => v.id === vehiculoId)
  const clienteSeleccionado = clientes.find(c => c.id === clienteId)

  const addItem = () => setItems([...items, { descripcion: '', tipo: 'mano_obra', cantidad: 1, precio: 0 }])
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i))
  const updateItem = (i: number, field: keyof Item, value: string | number) =>
    setItems(items.map((it, idx) => idx === i ? { ...it, [field]: value } : it))
  const total = items.reduce((s, it) => s + it.cantidad * it.precio, 0)

  const crearCliente = () => {
    if (!ncNombre.trim()) return
    const id = String(Date.now())
    const nuevo: ClienteItem = { id, nombre: ncNombre.trim(), tipo: ncTipo }
    setClientes(prev => [...prev, nuevo])
    setClienteId(id)
    setVehiculoId('')
    setModalCliente(false)
    showToast('Cliente creado y seleccionado')
  }

  const abrirModalVehiculo = () => {
    setNvPatente(''); setNvMarca(''); setNvModelo(''); setNvAnio('')
    setModalVehiculo(true)
  }

  const crearVehiculo = () => {
    if (!nvPatente.trim() || !nvMarca.trim() || !nvModelo.trim()) return
    const id = String(Date.now())
    const nuevo: VehiculoItem = {
      id,
      patente: nvPatente.toUpperCase().trim(),
      descripcion: `${nvMarca} ${nvModelo}${nvAnio ? ' ' + nvAnio : ''}`,
      clienteId: clienteId || undefined,
    }
    setVehiculos(prev => [...prev, nuevo])
    setVehiculoId(id)
    setModalVehiculo(false)
    showToast('Vehículo registrado y seleccionado')
  }

  const crearMecanico = () => {
    if (!nmNombre.trim()) return
    const id = String(Date.now())
    setMecanicos(prev => [...prev, { id, nombre: nmNombre.trim(), especialidad: nmEspecialidad.trim() }])
    setMecanicoId(id)
    setModalMecanico(false)
    showToast('Mecánico registrado y asignado')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clienteId) { alert('Debes seleccionar un cliente'); return }
    if (!vehiculoId && !patenteMaual.trim()) { alert('Debes seleccionar o ingresar un vehículo'); return }
    setSaving(true)
    setTimeout(() => setSaving(false), 1500)
  }

  return (
    <div className="fade-in">
      <Topbar title="Nueva Orden de Trabajo" subtitle="Crear OT para vehículo en taller" />

      {/* Modal Nuevo Cliente */}
      {modalCliente && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <UserPlus size={16} className="text-blue-500" /> Crear nuevo cliente
              </h2>
              <button onClick={() => setModalCliente(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Nombre <span className="text-red-400">*</span>
                </label>
                <input className="input w-full" placeholder="Nombre completo o razón social"
                  value={ncNombre} onChange={e => setNcNombre(e.target.value)} autoFocus />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Tipo</label>
                <div className="flex gap-2">
                  {(['particular', 'empresa'] as const).map(t => (
                    <button key={t} type="button" onClick={() => setNcTipo(t)}
                      className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${ncTipo === t ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                      {t === 'particular' ? '👤 Particular' : '🏢 Empresa'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">RUT</label>
                  <input className="input w-full" placeholder="12.345.678-9" value={ncRut} onChange={e => setNcRut(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Teléfono</label>
                  <input className="input w-full" type="tel" placeholder="+56 9 ..." value={ncTelefono} onChange={e => setNcTelefono(e.target.value)} />
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setModalCliente(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">
                  Cancelar
                </button>
                <button type="button" onClick={crearCliente} disabled={!ncNombre.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'var(--accent)' }}>
                  <UserPlus size={15} /> Crear cliente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nuevo Vehículo */}
      {modalVehiculo && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <Car size={16} className="text-blue-500" /> Registrar vehículo
              </h2>
              <button onClick={() => setModalVehiculo(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {clienteSeleccionado && (
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg text-sm text-blue-700">
                  {clienteSeleccionado.tipo === 'empresa' ? <Building2 size={14} /> : <User size={14} />}
                  Se vinculará a: <span className="font-semibold">{clienteSeleccionado.nombre}</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Patente <span className="text-red-400">*</span>
                  </label>
                  <input className="input w-full font-mono uppercase tracking-widest" placeholder="ABCD12"
                    maxLength={6} value={nvPatente} onChange={e => setNvPatente(e.target.value)} autoFocus />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Marca <span className="text-red-400">*</span></label>
                  <input className="input w-full" placeholder="Toyota, Ford..." value={nvMarca} onChange={e => setNvMarca(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Modelo <span className="text-red-400">*</span></label>
                  <input className="input w-full" placeholder="Hilux, Ranger..." value={nvModelo} onChange={e => setNvModelo(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Año</label>
                  <input className="input w-full" type="number" min={1990} max={2030} placeholder="2022"
                    value={nvAnio} onChange={e => setNvAnio(e.target.value)} />
                </div>
              </div>
              <p className="text-xs text-slate-400">Puedes completar el perfil completo del vehículo después desde el módulo Vehículos.</p>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setModalVehiculo(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">
                  Cancelar
                </button>
                <button type="button" onClick={crearVehiculo}
                  disabled={!nvPatente.trim() || !nvMarca.trim() || !nvModelo.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'var(--accent)' }}>
                  <Car size={15} /> Agregar vehículo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nuevo Mecánico */}
      {modalMecanico && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <UserPlus size={16} className="text-blue-500" /> Registrar mecánico
              </h2>
              <button onClick={() => setModalMecanico(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Nombre <span className="text-red-400">*</span></label>
                <input className="input w-full" placeholder="Ej: Roberto Díaz"
                  value={nmNombre} onChange={e => setNmNombre(e.target.value)} autoFocus />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Especialidad</label>
                <input className="input w-full" placeholder="Motor, Suspensión, Electricidad..."
                  value={nmEspecialidad} onChange={e => setNmEspecialidad(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Teléfono</label>
                <input className="input w-full" type="tel" placeholder="+56 9 ..."
                  value={nmTelefono} onChange={e => setNmTelefono(e.target.value)} />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setModalMecanico(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">
                  Cancelar
                </button>
                <button type="button" onClick={crearMecanico} disabled={!nmNombre.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'var(--accent)' }}>
                  <UserPlus size={15} /> Agregar mecánico
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 max-w-3xl">
        <Link href="/ordenes" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft size={15} /> Volver a órdenes
        </Link>

        {toast && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2">
            <CheckCircle size={16} /> {toast}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* CLIENTE + VEHÍCULO */}
          <div className="card p-6 space-y-5">
            <p className="text-sm font-bold text-slate-700 pb-2 border-b border-slate-100">¿A quién se le trabaja el vehículo?</p>

            {/* Cliente */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Cliente <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  className="input flex-1"
                  value={clienteId}
                  onChange={e => { setClienteId(e.target.value); setVehiculoId('') }}>
                  <option value="">Seleccionar cliente...</option>
                  {clientes.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.tipo === 'empresa' ? '🏢 ' : '👤 '}{c.nombre}
                    </option>
                  ))}
                </select>
                <button type="button"
                  onClick={() => { setNcNombre(''); setNcRut(''); setNcTelefono(''); setNcTipo('particular'); setModalCliente(true) }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors whitespace-nowrap">
                  <UserPlus size={14} /> Nuevo cliente
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                ¿Cliente nuevo?{' '}
                <button type="button"
                  onClick={() => { setNcNombre(''); setNcRut(''); setNcTelefono(''); setNcTipo('particular'); setModalCliente(true) }}
                  className="text-blue-500 hover:underline">
                  Regístralo sin salir
                </button>
              </p>
            </div>

            {/* Vehículo */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Vehículo <span className="text-red-400">*</span>
                {clienteId && vehiculosFiltrados.length === 0 && (
                  <span className="ml-2 text-amber-500 font-normal text-xs">Este cliente no tiene vehículos registrados</span>
                )}
              </label>
              <div className="flex gap-2">
                <select
                  className="input flex-1"
                  value={vehiculoId}
                  onChange={e => setVehiculoId(e.target.value)}>
                  <option value="">
                    {clienteId
                      ? vehiculosFiltrados.length === 0
                        ? 'Sin vehículos — usa el botón Nuevo →'
                        : 'Seleccionar vehículo del cliente...'
                      : 'Seleccionar cualquier vehículo...'}
                  </option>
                  {vehiculosFiltrados.map(v => (
                    <option key={v.id} value={v.id}>{v.patente} — {v.descripcion}</option>
                  ))}
                  {clienteId && vehiculosFiltrados.length < vehiculos.length && (
                    <optgroup label="— Otros vehículos —">
                      {vehiculos.filter(v => v.clienteId !== clienteId).map(v => (
                        <option key={v.id} value={v.id}>{v.patente} — {v.descripcion}</option>
                      ))}
                    </optgroup>
                  )}
                </select>
                <button type="button" onClick={abrirModalVehiculo}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors whitespace-nowrap">
                  <Car size={14} /> Nuevo vehículo
                </button>
              </div>

              {/* Si no selecciona del listado, puede ingresar patente manualmente */}
              {!vehiculoId && (
                <div className="mt-2">
                  <input
                    className="input font-mono uppercase tracking-widest text-sm"
                    placeholder="O escribe la patente directamente: ABCD12"
                    maxLength={6}
                    value={patenteMaual}
                    onChange={e => setPatenteMaual(e.target.value.toUpperCase())}
                  />
                </div>
              )}

              {vehiculoSeleccionado && (
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">
                  <Car size={13} className="text-slate-400" />
                  <span className="font-mono font-bold">{vehiculoSeleccionado.patente}</span>
                  <span>·</span>
                  <span>{vehiculoSeleccionado.descripcion}</span>
                </div>
              )}

              <p className="text-xs text-slate-400 mt-1.5">
                ¿Vehículo no registrado?{' '}
                <button type="button" onClick={abrirModalVehiculo} className="text-blue-500 hover:underline">
                  Regístralo sin salir
                </button>
              </p>
            </div>
          </div>

          {/* Asignación y detalles */}
          <div className="card p-6 space-y-4">
            <p className="text-sm font-bold text-slate-700 pb-2 border-b border-slate-100">Asignación y detalles</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mecánico asignado</label>
                <div className="flex gap-2">
                  <select className="input flex-1" value={mecanicoId} onChange={e => setMecanicoId(e.target.value)}>
                    <option value="">Sin asignar</option>
                    {mecanicos.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.nombre}{m.especialidad ? ` · ${m.especialidad}` : ''}
                      </option>
                    ))}
                  </select>
                  <button type="button"
                    onClick={() => { setNmNombre(''); setNmEspecialidad(''); setNmTelefono(''); setModalMecanico(true) }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors whitespace-nowrap">
                    <UserPlus size={14} /> Nuevo
                  </button>
                </div>
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
            <Link href="/ordenes"
              className="flex-1 text-center py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50">
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
