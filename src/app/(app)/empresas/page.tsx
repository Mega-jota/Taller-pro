'use client'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import {
  Building2, Plus, Search, Car, Phone, Mail,
  ChevronRight, Users, TrendingUp
} from 'lucide-react'
import { useState } from 'react'

const EMPRESAS = [
  {
    id: 1,
    nombre: 'LogiChile S.A.',
    rut: '76.123.456-7',
    rubro: 'Transporte y logística',
    contacto: 'Carlos Mendoza',
    telefono: '+56 9 8765 4321',
    email: 'cmendoza@logichile.cl',
    vehiculos: 8,
    ot_activas: 3,
    ultimo_servicio: '15 mayo 2026',
    plan: 'flota',
    activa: true,
  },
  {
    id: 2,
    nombre: 'Constructora Pacífico Ltda.',
    rut: '77.234.567-8',
    rubro: 'Construcción',
    contacto: 'Ana Torres',
    telefono: '+56 9 7654 3210',
    email: 'atorres@cpacific.cl',
    vehiculos: 5,
    ot_activas: 1,
    ultimo_servicio: '10 mayo 2026',
    plan: 'flota',
    activa: true,
  },
  {
    id: 3,
    nombre: 'Agrícola Los Pinos SpA',
    rut: '78.345.678-9',
    rubro: 'Agricultura',
    contacto: 'Pedro Rojas',
    telefono: '+56 9 6543 2109',
    email: 'projas@lospinos.cl',
    vehiculos: 3,
    ot_activas: 0,
    ultimo_servicio: '2 mayo 2026',
    plan: 'basico',
    activa: true,
  },
  {
    id: 4,
    nombre: 'Minera Cordillera S.A.',
    rut: '79.456.789-0',
    rubro: 'Minería',
    contacto: 'Luis Vega',
    telefono: '+56 9 5432 1098',
    email: 'lvega@mcordillera.cl',
    vehiculos: 12,
    ot_activas: 5,
    ultimo_servicio: '18 mayo 2026',
    plan: 'flota',
    activa: true,
  },
  {
    id: 5,
    nombre: 'Distribuidora Norte Verde',
    rut: '80.567.890-1',
    rubro: 'Distribución',
    contacto: 'María Campos',
    telefono: '+56 9 4321 0987',
    email: 'mcampos@norteverde.cl',
    vehiculos: 4,
    ot_activas: 2,
    ultimo_servicio: '12 mayo 2026',
    plan: 'basico',
    activa: false,
  },
]

const rubroColors: Record<string, string> = {
  'Transporte y logística': 'bg-blue-100 text-blue-700',
  'Construcción': 'bg-orange-100 text-orange-700',
  'Agricultura': 'bg-green-100 text-green-700',
  'Minería': 'bg-yellow-100 text-yellow-700',
  'Distribución': 'bg-purple-100 text-purple-700',
}

export default function EmpresasPage() {
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState<'todas' | 'activas' | 'inactivas'>('todas')

  const empresasFiltradas = EMPRESAS.filter(e => {
    const matchBusqueda = e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.rut.includes(busqueda) ||
      e.contacto.toLowerCase().includes(busqueda.toLowerCase())
    const matchFiltro = filtro === 'todas' ? true : filtro === 'activas' ? e.activa : !e.activa
    return matchBusqueda && matchFiltro
  })

  const totalVehiculos = EMPRESAS.reduce((sum, e) => sum + e.vehiculos, 0)
  const totalOTActivas = EMPRESAS.reduce((sum, e) => sum + e.ot_activas, 0)

  return (
    <div className="fade-in">
      <Topbar
        title="Empresas y Flotas"
        subtitle="Clientes corporativos con múltiples vehículos"
        actions={
          <Link href="/empresas/nueva"
            className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold"
            style={{ background: 'var(--accent)' }}>
            <Plus size={16} /> Nueva Empresa
          </Link>
        }
      />

      <div className="p-6 space-y-5">

        {/* Resumen */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <Building2 size={22} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{EMPRESAS.filter(e => e.activa).length}</p>
              <p className="text-sm text-slate-500">Empresas activas</p>
            </div>
          </div>
          <div className="card p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
              <Car size={22} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{totalVehiculos}</p>
              <p className="text-sm text-slate-500">Vehículos en flota</p>
            </div>
          </div>
          <div className="card p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
              <TrendingUp size={22} className="text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{totalOTActivas}</p>
              <p className="text-sm text-slate-500">OT activas flota</p>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar empresa, RUT o contacto..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="input pl-9 w-full text-sm"
            />
          </div>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            {(['todas', 'activas', 'inactivas'] as const).map(f => (
              <button key={f} onClick={() => setFiltro(f)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${filtro === f ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla */}
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100 bg-slate-50">
                <th className="text-left px-6 py-3">Empresa</th>
                <th className="text-left px-6 py-3">Contacto</th>
                <th className="text-left px-6 py-3">Rubro</th>
                <th className="text-center px-6 py-3">Vehículos</th>
                <th className="text-center px-6 py-3">OT activas</th>
                <th className="text-left px-6 py-3">Último servicio</th>
                <th className="text-center px-6 py-3">Estado</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {empresasFiltradas.map((empresa) => (
                <tr key={empresa.id}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Building2 size={16} className="text-slate-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{empresa.nombre}</p>
                        <p className="text-xs text-slate-400 font-mono">{empresa.rut}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-700 font-medium">{empresa.contacto}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Phone size={10} /> {empresa.telefono}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge text-xs ${rubroColors[empresa.rubro] || 'bg-slate-100 text-slate-600'}`}>
                      {empresa.rubro}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-slate-700">{empresa.vehiculos}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {empresa.ot_activas > 0
                      ? <span className="badge bg-orange-100 text-orange-700">{empresa.ot_activas}</span>
                      : <span className="text-slate-300">—</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{empresa.ultimo_servicio}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`badge ${empresa.activa ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {empresa.activa ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/empresas/${empresa.id}`}
                      className="flex items-center gap-1 text-xs font-medium hover:underline"
                      style={{ color: 'var(--accent)' }}>
                      Ver <ChevronRight size={13} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {empresasFiltradas.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Building2 size={32} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No se encontraron empresas</p>
              <p className="text-sm mt-1">Prueba con otro término de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
