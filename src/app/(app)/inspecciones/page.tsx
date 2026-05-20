'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { Search, Plus, ChevronRight, FileText, CheckCircle, XCircle, Clock } from 'lucide-react'

const inspeccionesMock = [
  { id: '1', codigo: '12398', patente: 'ABCD12', vehiculo: 'Toyota Hilux 2021', cliente: 'Juan Pérez', inspector: 'Carlos R.', fecha: '2026-05-18', estado: 'completada', cumple: 145, no_cumple: 8, na: 12 },
  { id: '2', codigo: '12399', patente: 'IJKL56', vehiculo: 'Ford Ranger 2022', cliente: 'María López', inspector: 'Pedro M.', fecha: '2026-05-17', estado: 'en_progreso', cumple: 62, no_cumple: 3, na: 5 },
  { id: '3', codigo: '12400', patente: 'EFGH34', vehiculo: 'Chevrolet Spark 2019', cliente: 'Roberto Silva', inspector: 'Carlos R.', fecha: '2026-05-15', estado: 'completada', cumple: 138, no_cumple: 15, na: 12 },
]

export default function InspeccionesPage() {
  const [busqueda, setBusqueda] = useState('')
  const filtradas = inspeccionesMock.filter(i =>
    i.patente.toLowerCase().includes(busqueda.toLowerCase()) ||
    i.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
    i.codigo.includes(busqueda)
  )

  return (
    <div className="fade-in">
      <Topbar title="Inspecciones Pre-compra" subtitle="Formulario digital de inspección vehicular" />
      <div className="p-6 space-y-5">

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Completadas', value: inspeccionesMock.filter(i => i.estado === 'completada').length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'En progreso', value: inspeccionesMock.filter(i => i.estado === 'en_progreso').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Total', value: inspeccionesMock.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map(s => (
            <div key={s.label} className="card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon size={20} className={s.color} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input pl-8" placeholder="Buscar por patente, cliente o código..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
          </div>
          <Link href="/inspecciones/nueva"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold"
            style={{ backgroundColor: 'var(--accent)' }}>
            <Plus size={16} /> Nueva inspección
          </Link>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500 font-semibold uppercase tracking-wide border-b border-slate-200">
                <th className="text-left px-6 py-3">Código</th>
                <th className="text-left px-6 py-3">Vehículo / Cliente</th>
                <th className="text-left px-6 py-3">Inspector</th>
                <th className="text-left px-6 py-3">Fecha</th>
                <th className="text-left px-6 py-3">Resultado</th>
                <th className="text-left px-6 py-3">Estado</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map(insp => {
                const total = insp.cumple + insp.no_cumple + insp.na
                const pct = total > 0 ? Math.round((insp.cumple / (insp.cumple + insp.no_cumple)) * 100) : 0
                return (
                  <tr key={insp.id} className="border-b border-slate-100 hover:bg-blue-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-sm" style={{ color: 'var(--accent)' }}>#{insp.codigo}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">{insp.patente} · {insp.vehiculo}</p>
                      <p className="text-xs text-slate-400">{insp.cliente}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{insp.inspector}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{new Date(insp.fecha).toLocaleDateString('es-CL')}</td>
                    <td className="px-6 py-4">
                      {insp.estado === 'completada' ? (
                        <div>
                          <div className="flex gap-3 text-xs mb-1">
                            <span className="text-green-600 font-semibold">✅ {insp.cumple}</span>
                            <span className="text-red-500 font-semibold">❌ {insp.no_cumple}</span>
                            <span className="text-slate-400">N/A {insp.na}</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full w-28">
                            <div className="h-1.5 bg-green-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      ) : <span className="text-slate-400 text-xs">En progreso...</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${insp.estado === 'completada' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {insp.estado === 'completada' ? '✅ Completada' : '⏳ En progreso'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/inspecciones/${insp.id}`} className="p-1 rounded hover:bg-slate-200 inline-flex">
                        <ChevronRight size={16} className="text-slate-400" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
