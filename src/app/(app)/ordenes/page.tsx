'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { ClipboardList, Plus, Search, ChevronRight, Wrench, Clock, AlertCircle } from 'lucide-react'

const otMock = [
  { id: '1', numero: 'OT-2026-0012', patente: 'ABCD12', vehiculo: 'Toyota Hilux', cliente: 'LogiChile SpA', mecanico: 'Carlos R.', estado: 'en_proceso', prioridad: 'alta', problema: 'Cambio de correa de distribución + revisión general', fecha: '2026-05-18', estimada: '2026-05-20', costo_est: 450000 },
  { id: '2', numero: 'OT-2026-0011', patente: 'EFGH34', vehiculo: 'Chevrolet Spark', cliente: 'María López', mecanico: 'Pedro M.', estado: 'listo', prioridad: 'normal', problema: 'Servicio de aceite y filtros', fecha: '2026-05-17', estimada: '2026-05-17', costo_est: 85000 },
  { id: '3', numero: 'OT-2026-0010', patente: 'IJKL56', vehiculo: 'Ford Ranger', cliente: 'Transportes Norte', mecanico: 'Carlos R.', estado: 'diagnostico', prioridad: 'urgente', problema: 'Falla en sistema de frenos - ruido al frenar', fecha: '2026-05-18', estimada: '2026-05-19', costo_est: 320000 },
  { id: '4', numero: 'OT-2026-0009', patente: 'MNOP78', vehiculo: 'Nissan Frontier', cliente: 'Roberto Silva', mecanico: '', estado: 'recibido', prioridad: 'normal', problema: 'Revisión de suspensión delantera', fecha: '2026-05-18', estimada: '2026-05-21', costo_est: 180000 },
  { id: '5', numero: 'OT-2026-0008', patente: 'QRST90', vehiculo: 'Hyundai Tucson', cliente: 'Ana González', mecanico: 'Pedro M.', estado: 'entregado', prioridad: 'baja', problema: 'Mantención preventiva 20.000 km', fecha: '2026-05-15', estimada: '2026-05-16', costo_est: 120000 },
  { id: '6', numero: 'OT-2026-0007', patente: 'UVWX12', vehiculo: 'VW Amarok', cliente: 'LogiChile SpA', mecanico: 'Carlos R.', estado: 'entregado', prioridad: 'normal', problema: 'Cambio de pastillas y discos traseros', fecha: '2026-05-14', estimada: '2026-05-14', costo_est: 280000 },
]

const estadoCfg: Record<string, { label: string; cls: string; icon: string }> = {
  recibido: { label: 'Recibido', cls: 'bg-blue-100 text-blue-700', icon: '📥' },
  diagnostico: { label: 'Diagnóstico', cls: 'bg-yellow-100 text-yellow-700', icon: '🔍' },
  en_proceso: { label: 'En reparación', cls: 'bg-orange-100 text-orange-700', icon: '🔧' },
  listo: { label: 'Listo ✓', cls: 'bg-green-100 text-green-700', icon: '✅' },
  entregado: { label: 'Entregado', cls: 'bg-gray-100 text-gray-600', icon: '🏁' },
  cancelado: { label: 'Cancelado', cls: 'bg-red-100 text-red-600', icon: '❌' },
}
const prioCfg: Record<string, { cls: string }> = {
  baja: { cls: 'text-gray-400' }, normal: { cls: 'text-blue-500' },
  alta: { cls: 'text-orange-500 font-bold' }, urgente: { cls: 'text-red-600 font-bold' },
}

export default function OrdenesPage() {
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('activas')

  const filtrados = otMock.filter(ot => {
    const matchB = ot.numero.includes(busqueda) || ot.patente.toLowerCase().includes(busqueda.toLowerCase()) ||
      ot.cliente.toLowerCase().includes(busqueda.toLowerCase()) || ot.vehiculo.toLowerCase().includes(busqueda.toLowerCase())
    const activas = ['recibido', 'diagnostico', 'en_proceso', 'listo']
    const matchE = filtroEstado === 'todas' || (filtroEstado === 'activas' && activas.includes(ot.estado)) ||
      (filtroEstado !== 'activas' && ot.estado === filtroEstado)
    return matchB && matchE
  })

  const abiertas = otMock.filter(o => ['recibido', 'diagnostico', 'en_proceso'].includes(o.estado)).length
  const listas = otMock.filter(o => o.estado === 'listo').length
  const urgentes = otMock.filter(o => o.prioridad === 'urgente').length

  return (
    <div className="fade-in">
      <Topbar title="Órdenes de Trabajo" subtitle="Gestión de trabajos en el taller" />
      <div className="p-6 space-y-5">

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'En proceso', value: abiertas, color: 'text-orange-600', bg: 'bg-orange-50', icon: Wrench },
            { label: 'Listas p/ retirar', value: listas, color: 'text-green-600', bg: 'bg-green-50', icon: ClipboardList },
            { label: 'Urgentes', value: urgentes, color: 'text-red-600', bg: 'bg-red-50', icon: AlertCircle },
            { label: 'Total mes', value: otMock.length, color: 'text-slate-600', bg: 'bg-slate-100', icon: Clock },
          ].map(s => (
            <div key={s.label} className="card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon size={18} className={s.color} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 items-center justify-between">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="input pl-8" placeholder="Buscar OT, patente, cliente..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
            </div>
            <select className="input w-44" value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
              <option value="activas">Activas</option>
              <option value="todas">Todas</option>
              <option value="recibido">Recibidas</option>
              <option value="diagnostico">En diagnóstico</option>
              <option value="en_proceso">En reparación</option>
              <option value="listo">Listas</option>
              <option value="entregado">Entregadas</option>
            </select>
          </div>
          <Link href="/ordenes/nueva"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold"
            style={{ backgroundColor: 'var(--accent)' }}>
            <Plus size={16} /> Nueva OT
          </Link>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500 font-semibold uppercase tracking-wide border-b border-slate-200">
                <th className="text-left px-5 py-3">N° OT</th>
                <th className="text-left px-5 py-3">Vehículo / Cliente</th>
                <th className="text-left px-5 py-3">Trabajo</th>
                <th className="text-left px-5 py-3">Estado</th>
                <th className="text-left px-5 py-3">Prioridad</th>
                <th className="text-left px-5 py-3">Mecánico</th>
                <th className="text-right px-5 py-3">Costo est.</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(ot => (
                <tr key={ot.id} className="border-b border-slate-100 hover:bg-blue-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/ordenes/${ot.id}`}
                      className="font-mono text-xs font-bold"
                      style={{ color: 'var(--accent)' }}>
                      {ot.numero}
                    </Link>
                    <p className="text-xs text-slate-400 mt-0.5">{new Date(ot.fecha).toLocaleDateString('es-CL')}</p>
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-semibold text-slate-800">{ot.patente} · {ot.vehiculo}</p>
                    <p className="text-xs text-slate-400">{ot.cliente}</p>
                  </td>
                  <td className="px-5 py-3 max-w-[200px]">
                    <p className="text-slate-600 text-xs line-clamp-2">{ot.problema}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`badge ${estadoCfg[ot.estado].cls}`}>
                      {estadoCfg[ot.estado].icon} {estadoCfg[ot.estado].label}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs ${prioCfg[ot.prioridad].cls}`}>{ot.prioridad.toUpperCase()}</span>
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-600">{ot.mecanico || <span className="text-slate-300">Sin asignar</span>}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="text-sm font-semibold text-slate-700">
                      ${ot.costo_est.toLocaleString('es-CL')}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/ordenes/${ot.id}`} className="p-1 rounded hover:bg-slate-200 inline-flex">
                      <ChevronRight size={16} className="text-slate-400" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
