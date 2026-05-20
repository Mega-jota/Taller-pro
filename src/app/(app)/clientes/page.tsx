'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { Users, Plus, Search, Phone, Mail, Car, ChevronRight, Building2, User } from 'lucide-react'

const clientesMock = [
  { id: '1', nombre: 'Juan Pérez', rut: '12.345.678-9', email: 'juan@gmail.com', telefono: '+56 9 8765 4321', tipo: 'particular', vehiculos: 2, ultima_visita: '2026-05-10' },
  { id: '2', nombre: 'María López', rut: '9.876.543-2', email: 'maria@empresa.cl', telefono: '+56 9 1234 5678', tipo: 'particular', vehiculos: 1, ultima_visita: '2026-05-15' },
  { id: '3', nombre: 'LogiChile SpA', rut: '76.543.210-K', email: 'flota@logichile.cl', telefono: '+56 2 2345 6789', tipo: 'empresa', vehiculos: 8, ultima_visita: '2026-05-18' },
  { id: '4', nombre: 'Roberto Silva', rut: '14.567.890-1', email: 'rsilva@gmail.com', telefono: '+56 9 5678 1234', tipo: 'particular', vehiculos: 1, ultima_visita: '2026-05-08' },
  { id: '5', nombre: 'Transportes Norte Ltda.', rut: '78.901.234-5', email: 'admin@transnorte.cl', telefono: '+56 2 3456 7890', tipo: 'empresa', vehiculos: 12, ultima_visita: '2026-05-17' },
  { id: '6', nombre: 'Ana González', rut: '16.789.012-3', email: 'ana.glez@hotmail.com', telefono: '+56 9 9012 3456', tipo: 'particular', vehiculos: 1, ultima_visita: '2026-05-05' },
]

export default function ClientesPage() {
  const [busqueda, setBusqueda] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('todos')

  const filtrados = clientesMock.filter(c => {
    const matchBusqueda = c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.rut.includes(busqueda) || c.email.toLowerCase().includes(busqueda.toLowerCase())
    const matchTipo = filtroTipo === 'todos' || c.tipo === filtroTipo
    return matchBusqueda && matchTipo
  })

  return (
    <div className="fade-in">
      <Topbar title="Clientes" subtitle={`${clientesMock.length} clientes registrados`} />
      <div className="p-6 space-y-5">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total clientes', value: clientesMock.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Particulares', value: clientesMock.filter(c => c.tipo === 'particular').length, icon: User, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Empresas', value: clientesMock.filter(c => c.tipo === 'empresa').length, icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(s => (
            <div key={s.label} className="card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon size={20} className={s.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Barra de acciones */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="input pl-8"
                placeholder="Buscar por nombre, RUT o email..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
            </div>
            <select
              className="input w-40"
              value={filtroTipo}
              onChange={e => setFiltroTipo(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="particular">Particulares</option>
              <option value="empresa">Empresas</option>
            </select>
          </div>
          <Link href="/clientes/nuevo"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-colors"
            style={{ backgroundColor: 'var(--accent)' }}>
            <Plus size={16} /> Nuevo cliente
          </Link>
        </div>

        {/* Tabla */}
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500 font-semibold uppercase tracking-wide border-b border-slate-200">
                <th className="text-left px-6 py-3">Cliente</th>
                <th className="text-left px-6 py-3">Contacto</th>
                <th className="text-left px-6 py-3">Tipo</th>
                <th className="text-center px-6 py-3">Vehículos</th>
                <th className="text-left px-6 py-3">Última visita</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(c => (
                <tr key={c.id} className="border-b border-slate-100 hover:bg-blue-50/40 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                        style={{ backgroundColor: c.tipo === 'empresa' ? '#ede9fe' : '#dbeafe', color: c.tipo === 'empresa' ? '#7c3aed' : '#2563eb' }}>
                        {c.nombre.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{c.nombre}</p>
                        <p className="text-xs text-slate-400">{c.rut}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                        <Phone size={11} /> {c.telefono}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <Mail size={11} /> {c.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${c.tipo === 'empresa' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {c.tipo === 'empresa' ? '🏢 Empresa' : '👤 Particular'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Car size={13} className="text-slate-400" />
                      <span className="font-semibold text-slate-700">{c.vehiculos}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {new Date(c.ultima_visita).toLocaleDateString('es-CL')}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/clientes/${c.id}`} className="p-1 rounded hover:bg-slate-200 inline-flex">
                      <ChevronRight size={16} className="text-slate-400" />
                    </Link>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No se encontraron clientes con ese criterio de búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
