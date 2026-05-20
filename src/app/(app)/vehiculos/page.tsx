'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { Car, Plus, Search, ChevronRight, Fuel, Calendar, Gauge } from 'lucide-react'

const vehiculosMock = [
  { id: '1', patente: 'ABCD12', marca: 'Toyota', modelo: 'Hilux', ano: 2021, color: 'Blanco', km: 85000, combustible: 'diesel', tipo: 'camioneta', cliente: 'LogiChile SpA', en_taller: true },
  { id: '2', patente: 'EFGH34', marca: 'Chevrolet', modelo: 'Spark', ano: 2019, color: 'Rojo', km: 42000, combustible: 'gasolina', tipo: 'automovil', cliente: 'María López', en_taller: false },
  { id: '3', patente: 'IJKL56', marca: 'Ford', modelo: 'Ranger', ano: 2022, color: 'Gris', km: 61000, combustible: 'diesel', tipo: 'camioneta', cliente: 'Transportes Norte', en_taller: true },
  { id: '4', patente: 'MNOP78', marca: 'Nissan', modelo: 'Frontier', ano: 2020, color: 'Negro', km: 95000, combustible: 'diesel', tipo: 'camioneta', cliente: 'Roberto Silva', en_taller: true },
  { id: '5', patente: 'QRST90', marca: 'Hyundai', modelo: 'Tucson', ano: 2023, color: 'Azul', km: 18000, combustible: 'gasolina', tipo: 'suv', cliente: 'Ana González', en_taller: false },
  { id: '6', patente: 'UVWX12', marca: 'Volkswagen', modelo: 'Amarok', ano: 2021, color: 'Blanco', km: 72000, combustible: 'diesel', tipo: 'camioneta', cliente: 'LogiChile SpA', en_taller: false },
]

const combustibleIcon: Record<string, string> = { gasolina: '⛽', diesel: '🔵', electrico: '⚡', hibrido: '🌿' }

export default function VehiculosPage() {
  const [busqueda, setBusqueda] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('todos')

  const filtrados = vehiculosMock.filter(v => {
    const matchB = v.patente.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.modelo.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.cliente.toLowerCase().includes(busqueda.toLowerCase())
    const matchT = filtroTipo === 'todos' || v.tipo === filtroTipo
    return matchB && matchT
  })

  const enTaller = vehiculosMock.filter(v => v.en_taller).length

  return (
    <div className="fade-in">
      <Topbar title="Vehículos" subtitle={`${vehiculosMock.length} vehículos registrados · ${enTaller} en taller ahora`} />
      <div className="p-6 space-y-5">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total', value: vehiculosMock.length, color: 'text-slate-600', bg: 'bg-slate-100' },
            { label: 'En taller', value: enTaller, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Camionetas', value: vehiculosMock.filter(v => v.tipo === 'camioneta').length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Particulares', value: vehiculosMock.filter(v => v.tipo === 'automovil' || v.tipo === 'suv').length, color: 'text-green-600', bg: 'bg-green-50' },
          ].map(s => (
            <div key={s.label} className="card p-4 text-center">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div className="flex gap-3 items-center justify-between">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="input pl-8" placeholder="Buscar patente, marca, modelo, cliente..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
            </div>
            <select className="input w-44" value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
              <option value="todos">Todos los tipos</option>
              <option value="automovil">Automóvil</option>
              <option value="camioneta">Camioneta</option>
              <option value="suv">SUV</option>
              <option value="van">Van</option>
              <option value="moto">Moto</option>
            </select>
          </div>
          <Link href="/vehiculos/nuevo"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold"
            style={{ backgroundColor: 'var(--accent)' }}>
            <Plus size={16} /> Nuevo vehículo
          </Link>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtrados.map(v => (
            <Link key={v.id} href={`/vehiculos/${v.id}`}
              className="card p-5 hover:shadow-md transition-all hover:-translate-y-0.5 block">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-lg text-slate-800 tracking-wide">{v.patente}</span>
                    {v.en_taller && (
                      <span className="badge bg-orange-100 text-orange-700 text-[10px]">En taller</span>
                    )}
                  </div>
                  <p className="text-slate-600 font-medium">{v.marca} {v.modelo}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Car size={20} className="text-slate-500" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar size={11} /> {v.ano}
                </div>
                <div className="flex items-center gap-1">
                  <Gauge size={11} /> {(v.km / 1000).toFixed(0)}k km
                </div>
                <div className="flex items-center gap-1">
                  {combustibleIcon[v.combustible]} {v.combustible}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Cliente</p>
                  <p className="text-sm font-medium text-slate-700">{v.cliente}</p>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
            </Link>
          ))}
          {filtrados.length === 0 && (
            <div className="col-span-3 py-16 text-center text-slate-400">
              <Car size={48} className="mx-auto mb-3 opacity-30" />
              <p>No se encontraron vehículos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
