'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft, Phone, Mail, Car, ClipboardList,
  Plus, ChevronRight, Edit, Calendar, User, X, Save, CheckCircle
} from 'lucide-react'

type ClienteData = {
  id: string; nombre: string; rut: string; email: string; telefono: string;
  tipo: string; direccion: string; ciudad: string; notas: string;
  fecha_registro: string;
}

const CLIENTES_INICIAL: Record<string, ClienteData> = {
  '1': { id: '1', nombre: 'Juan Pérez', rut: '12.345.678-9', email: 'juan@gmail.com', telefono: '+56 9 8765 4321', tipo: 'particular', direccion: 'Los Aromos 456, Las Condes', ciudad: 'Santiago', notas: 'Prefiere que lo llamen en la mañana.', fecha_registro: '2025-03-10' },
  '2': { id: '2', nombre: 'María López', rut: '9.876.543-2', email: 'maria@empresa.cl', telefono: '+56 9 1234 5678', tipo: 'particular', direccion: 'Av. Providencia 789', ciudad: 'Santiago', notas: '', fecha_registro: '2025-06-20' },
  '3': { id: '3', nombre: 'LogiChile SpA', rut: '76.543.210-K', email: 'flota@logichile.cl', telefono: '+56 2 2345 6789', tipo: 'empresa', direccion: 'Av. Industrial 4521', ciudad: 'Pudahuel', notas: 'Empresa de transporte. Varios vehículos. Ver módulo Empresas.', fecha_registro: '2024-11-05' },
  '4': { id: '4', nombre: 'Roberto Silva', rut: '14.567.890-1', email: 'rsilva@gmail.com', telefono: '+56 9 5678 1234', tipo: 'particular', direccion: 'Calle El Roble 123', ciudad: 'Maipú', notas: '', fecha_registro: '2025-01-15' },
  '5': { id: '5', nombre: 'Transportes Norte Ltda.', rut: '78.901.234-5', email: 'admin@transnorte.cl', telefono: '+56 2 3456 7890', tipo: 'empresa', direccion: 'Ruta 5 Norte km 12', ciudad: 'Lampa', notas: 'Flota de camiones medianos.', fecha_registro: '2024-08-20' },
  '6': { id: '6', nombre: 'Ana González', rut: '16.789.012-3', email: 'ana.glez@hotmail.com', telefono: '+56 9 9012 3456', tipo: 'particular', direccion: 'Los Pinos 88', ciudad: 'Ñuñoa', notas: '', fecha_registro: '2026-01-08' },
}

const VEHICULOS_POR_CLIENTE: Record<string, Array<{ id: string; patente: string; modelo: string; year: string; km: string }>> = {
  '1': [
    { id: '1', patente: 'ABCD12', modelo: 'Toyota Hilux', year: '2022', km: '45.000' },
    { id: '2', patente: 'WXYZ98', modelo: 'Chevrolet Cruze', year: '2019', km: '88.000' },
  ],
  '2': [{ id: '3', patente: 'EFGH34', modelo: 'Kia Sportage', year: '2023', km: '12.000' }],
  '3': [
    { id: '4', patente: 'IJKL56', modelo: 'Ford Ranger', year: '2022', km: '51.000' },
    { id: '5', patente: 'MNOP78', modelo: 'Toyota Hilux', year: '2021', km: '72.000' },
  ],
  '4': [{ id: '6', patente: 'QRST90', modelo: 'Hyundai Accent', year: '2020', km: '61.000' }],
  '5': [
    { id: '7', patente: 'UVWX12', modelo: 'Mercedes Actros', year: '2019', km: '180.000' },
    { id: '8', patente: 'YZAB34', modelo: 'Volvo FH', year: '2020', km: '142.000' },
  ],
  '6': [{ id: '9', patente: 'CDEF56', modelo: 'Nissan March', year: '2021', km: '38.000' }],
}

const OT_POR_CLIENTE: Record<string, Array<{ id: number; numero: string; fecha: string; estado: string; monto: string; vehiculo: string }>> = {
  '1': [
    { id: 12, numero: 'OT-2026-0012', fecha: '18 may 2026', estado: 'en_proceso', monto: '$185.000', vehiculo: 'ABCD12 Toyota Hilux' },
    { id: 5, numero: 'OT-2026-0005', fecha: '5 may 2026', estado: 'entregado', monto: '$320.000', vehiculo: 'WXYZ98 Chevrolet Cruze' },
  ],
  '2': [
    { id: 11, numero: 'OT-2026-0011', fecha: '15 may 2026', estado: 'listo', monto: '$95.000', vehiculo: 'EFGH34 Kia Sportage' },
  ],
  '3': [
    { id: 10, numero: 'OT-2026-0010', fecha: '12 may 2026', estado: 'diagnostico', monto: 'Por cotizar', vehiculo: 'IJKL56 Ford Ranger' },
    { id: 7, numero: 'OT-2026-0007', fecha: '2 may 2026', estado: 'entregado', monto: '$450.000', vehiculo: 'MNOP78 Toyota Hilux' },
  ],
  '4': [{ id: 9, numero: 'OT-2026-0009', fecha: '10 may 2026', estado: 'recibido', monto: 'Por cotizar', vehiculo: 'QRST90 Hyundai Accent' }],
  '5': [{ id: 3, numero: 'OT-2026-0003', fecha: '1 abr 2026', estado: 'entregado', monto: '$890.000', vehiculo: 'UVWX12 Mercedes Actros' }],
  '6': [{ id: 8, numero: 'OT-2026-0008', fecha: '8 may 2026', estado: 'entregado', monto: '$65.000', vehiculo: 'CDEF56 Nissan March' }],
}

const estadoOT: Record<string, { label: string; cls: string }> = {
  recibido: { label: 'Recibido', cls: 'bg-blue-100 text-blue-700' },
  diagnostico: { label: 'Diagnóstico', cls: 'bg-yellow-100 text-yellow-700' },
  en_proceso: { label: 'En reparación', cls: 'bg-orange-100 text-orange-700' },
  listo: { label: 'Listo ✓', cls: 'bg-green-100 text-green-700' },
  entregado: { label: 'Entregado', cls: 'bg-slate-100 text-slate-500' },
}

const CIUDADES_CHILE = [
  'Santiago', 'Las Condes', 'Providencia', 'Maipú', 'Puente Alto', 'La Florida',
  'Ñuñoa', 'Vitacura', 'Lo Barnechea', 'San Bernardo', 'Pudahuel', 'Quilicura',
  'Peñalolén', 'La Reina', 'Macul', 'Estación Central', 'Colina', 'Lampa',
  'Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'San Antonio',
  'Concepción', 'Talcahuano', 'Los Ángeles', 'Coronel', 'Hualpén',
  'Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón', 'Angol',
  'Puerto Montt', 'Osorno', 'Puerto Varas', 'Castro', 'Ancud',
  'Antofagasta', 'Calama', 'Tocopilla', 'Mejillones',
  'La Serena', 'Coquimbo', 'Ovalle', 'Illapel',
  'Copiapó', 'Vallenar', 'Caldera',
  'Rancagua', 'San Fernando', 'Pichilemu', 'Machalí',
  'Talca', 'Curicó', 'Linares', 'Constitución',
  'Chillán', 'San Carlos', 'Bulnes',
  'Valdivia', 'La Unión', 'Panguipulli',
  'Iquique', 'Alto Hospicio', 'Pozo Almonte',
  'Arica', 'Putre',
  'Punta Arenas', 'Puerto Natales',
  'Coyhaique',
].sort()

export default function DetalleClientePage() {
  const params = useParams()
  const id = String(params.id)

  const [clienteData, setClienteData] = useState<ClienteData | null>(CLIENTES_INICIAL[id] || null)
  const [tab, setTab] = useState<'vehiculos' | 'ordenes'>('vehiculos')
  const [editando, setEditando] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [form, setForm] = useState<ClienteData>(
    CLIENTES_INICIAL[id] || { id, nombre: '', rut: '', email: '', telefono: '', tipo: 'particular', direccion: '', ciudad: '', notas: '', fecha_registro: '' }
  )

  const vehiculos = VEHICULOS_POR_CLIENTE[id] || []
  const ordenes = OT_POR_CLIENTE[id] || []

  if (!clienteData) {
    return (
      <div className="fade-in">
        <Topbar title="Cliente no encontrado" />
        <div className="p-6 text-center">
          <User size={48} className="mx-auto mb-4 text-slate-300" />
          <p className="text-slate-500 mb-4">No se encontró el cliente con ID #{id}</p>
          <Link href="/clientes" className="text-blue-500 hover:underline">← Volver a clientes</Link>
        </div>
      </div>
    )
  }

  const abrirModal = () => {
    setForm({ ...clienteData })
    setEditando(true)
  }

  const guardarCambios = () => {
    setClienteData({ ...form })
    setEditando(false)
    setGuardado(true)
    setTimeout(() => setGuardado(false), 3000)
  }

  const set = (campo: keyof ClienteData, valor: string) =>
    setForm(f => ({ ...f, [campo]: valor }))

  return (
    <div className="fade-in">
      <Topbar title={clienteData.nombre} subtitle={`RUT: ${clienteData.rut}`} />

      {/* Modal Editar Cliente */}
      {editando && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <Edit size={16} className="text-slate-500" /> Editar cliente
              </h2>
              <button onClick={() => setEditando(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Nombre completo <span className="text-red-400">*</span>
                </label>
                <input className="input w-full" value={form.nombre} onChange={e => set('nombre', e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">RUT</label>
                  <input className="input w-full" value={form.rut} onChange={e => set('rut', e.target.value)} placeholder="12.345.678-9" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Tipo</label>
                  <select className="input w-full" value={form.tipo} onChange={e => set('tipo', e.target.value)}>
                    <option value="particular">👤 Particular</option>
                    <option value="empresa">🏢 Empresa</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Teléfono</label>
                  <input className="input w-full" type="tel" value={form.telefono} onChange={e => set('telefono', e.target.value)} placeholder="+56 9 ..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Email</label>
                  <input className="input w-full" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Dirección</label>
                <input className="input w-full" value={form.direccion} onChange={e => set('direccion', e.target.value)} placeholder="Calle 123, Depto 4B" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Ciudad / Comuna</label>
                <select className="input w-full" value={form.ciudad} onChange={e => set('ciudad', e.target.value)}>
                  <option value="">Seleccionar...</option>
                  {CIUDADES_CHILE.map(c => <option key={c} value={c}>{c}</option>)}
                  <option value="Otra">Otra</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Notas internas</label>
                <textarea className="input w-full resize-none" rows={3}
                  value={form.notas} onChange={e => set('notas', e.target.value)}
                  placeholder="Observaciones, preferencias..." />
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditando(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                  Cancelar
                </button>
                <button onClick={guardarCambios}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: 'var(--accent)' }}>
                  <Save size={15} /> Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 space-y-5">

        <div className="flex items-center justify-between">
          <Link href="/clientes" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
            <ArrowLeft size={15} /> Volver a clientes
          </Link>
          <button onClick={abrirModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
            <Edit size={14} /> Editar cliente
          </button>
        </div>

        {guardado && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2">
            <CheckCircle size={16} /> Datos actualizados correctamente
          </div>
        )}

        {/* Header */}
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 card p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: clienteData.tipo === 'empresa' ? '#ede9fe' : '#dbeafe', color: clienteData.tipo === 'empresa' ? '#7c3aed' : '#2563eb' }}>
                {clienteData.nombre.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{clienteData.nombre}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`badge ${clienteData.tipo === 'empresa' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {clienteData.tipo === 'empresa' ? '🏢 Empresa' : '👤 Particular'}
                  </span>
                  <span className="text-xs text-slate-400">RUT: {clienteData.rut}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Phone size={13} className="text-slate-400" /> {clienteData.telefono}
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail size={13} className="text-slate-400" /> {clienteData.email}
              </div>
              <div className="flex items-center gap-2 text-slate-600 col-span-2">
                <Calendar size={13} className="text-slate-400" />
                Cliente desde {new Date(clienteData.fecha_registro).toLocaleDateString('es-CL', { year: 'numeric', month: 'long' })}
              </div>
              {clienteData.direccion && (
                <div className="col-span-2 text-slate-500 text-xs bg-slate-50 rounded-lg p-2">
                  📍 {clienteData.direccion}{clienteData.ciudad ? `, ${clienteData.ciudad}` : ''}
                </div>
              )}
              {clienteData.notas && (
                <div className="col-span-2 text-amber-800 text-xs bg-amber-50 border border-amber-100 rounded-lg p-2">
                  📝 {clienteData.notas}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold text-slate-700">Resumen</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Car size={14} className="text-blue-500" /> Vehículos
                </div>
                <span className="font-bold text-slate-800">{vehiculos.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <ClipboardList size={14} className="text-orange-500" /> OT totales
                </div>
                <span className="font-bold text-slate-800">{ordenes.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <ClipboardList size={14} className="text-green-500" /> OT activas
                </div>
                <span className="font-bold text-green-600">
                  {ordenes.filter(o => !['entregado', 'cancelado'].includes(o.estado)).length}
                </span>
              </div>
            </div>
            <Link href="/ordenes/nueva"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold"
              style={{ background: 'var(--accent)' }}>
              <Plus size={14} /> Nueva OT
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="card overflow-hidden">
          <div className="flex border-b border-slate-100">
            {[
              { key: 'vehiculos', label: `🚗 Vehículos (${vehiculos.length})` },
              { key: 'ordenes', label: `📋 Órdenes de trabajo (${ordenes.length})` },
            ].map(t => (
              <button key={t.key}
                onClick={() => setTab(t.key as typeof tab)}
                className={`px-6 py-3.5 text-sm font-medium border-b-2 transition-colors ${tab === t.key ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'vehiculos' && (
            <div>
              <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-100">
                <p className="text-sm text-slate-500">{vehiculos.length} vehículo(s) registrado(s)</p>
                <Link href="/vehiculos/nuevo"
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-600">
                  <Plus size={12} /> Agregar vehículo
                </Link>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100">
                    <th className="text-left px-6 py-3">Patente</th>
                    <th className="text-left px-6 py-3">Vehículo</th>
                    <th className="text-left px-6 py-3">Año</th>
                    <th className="text-left px-6 py-3">Km</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {vehiculos.map(v => (
                    <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-6 py-3 font-mono font-bold text-slate-800">{v.patente}</td>
                      <td className="px-6 py-3 text-slate-700">{v.modelo}</td>
                      <td className="px-6 py-3 text-slate-500">{v.year}</td>
                      <td className="px-6 py-3 text-slate-500">{v.km} km</td>
                      <td className="px-6 py-3">
                        <Link href={`/vehiculos/${v.id}`}
                          className="flex items-center gap-1 text-xs font-medium hover:underline"
                          style={{ color: 'var(--accent)' }}>
                          Ver <ChevronRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'ordenes' && (
            <div>
              <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-100">
                <p className="text-sm text-slate-500">{ordenes.length} orden(es) de trabajo</p>
                <Link href="/ordenes/nueva"
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-600">
                  <Plus size={12} /> Nueva OT
                </Link>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100">
                    <th className="text-left px-6 py-3">N° OT</th>
                    <th className="text-left px-6 py-3">Vehículo</th>
                    <th className="text-left px-6 py-3">Fecha</th>
                    <th className="text-left px-6 py-3">Estado</th>
                    <th className="text-left px-6 py-3">Monto</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {ordenes.map((ot) => (
                    <tr key={ot.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-6 py-3 font-mono font-semibold text-xs" style={{ color: 'var(--accent)' }}>
                        {ot.numero}
                      </td>
                      <td className="px-6 py-3 text-slate-600 text-xs">{ot.vehiculo}</td>
                      <td className="px-6 py-3 text-slate-500 text-xs">{ot.fecha}</td>
                      <td className="px-6 py-3">
                        <span className={`badge ${estadoOT[ot.estado]?.cls}`}>{estadoOT[ot.estado]?.label}</span>
                      </td>
                      <td className="px-6 py-3 font-semibold text-slate-700">{ot.monto}</td>
                      <td className="px-6 py-3">
                        <Link href={`/ordenes/${ot.id}`}
                          className="flex items-center gap-1 text-xs font-medium hover:underline"
                          style={{ color: 'var(--accent)' }}>
                          Ver <ChevronRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
