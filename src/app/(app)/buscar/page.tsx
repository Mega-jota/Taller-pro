'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { Search, Car, ClipboardList, Users, Building2 } from 'lucide-react'

const OTS = [
  { id: 12, numero: 'OT-2026-0012', vehiculo: 'Toyota Hilux ABCD12', cliente: 'Juan Pérez', estado: 'En reparación', mecanico: 'Carlos R.' },
  { id: 11, numero: 'OT-2026-0011', vehiculo: 'Chevrolet Spark EFGH34', cliente: 'María López', estado: 'Listo para retirar', mecanico: 'Pedro M.' },
  { id: 10, numero: 'OT-2026-0010', vehiculo: 'Ford Ranger IJKL56', cliente: 'Empresa LogiChile', estado: 'Diagnóstico', mecanico: 'Carlos R.' },
  { id: 9, numero: 'OT-2026-0009', vehiculo: 'Nissan Frontier MNOP78', cliente: 'Roberto Silva', estado: 'Recibido', mecanico: 'Sin asignar' },
  { id: 8, numero: 'OT-2026-0008', vehiculo: 'Hyundai Tucson QRST90', cliente: 'Ana González', estado: 'Entregado', mecanico: 'Pedro M.' },
  { id: 7, numero: 'OT-2026-0007', vehiculo: 'Kia Sportage UVWX12', cliente: 'Carlos Mendoza', estado: 'Entregado', mecanico: 'Luis S.' },
]

const VEHICULOS = [
  { id: 1, patente: 'ABCD12', marca: 'Toyota', modelo: 'Hilux', year: 2022, cliente: 'Juan Pérez', color: 'Blanco' },
  { id: 2, patente: 'EFGH34', marca: 'Chevrolet', modelo: 'Spark', year: 2020, cliente: 'María López', color: 'Rojo' },
  { id: 3, patente: 'IJKL56', marca: 'Ford', modelo: 'Ranger', year: 2021, cliente: 'LogiChile', color: 'Gris' },
  { id: 4, patente: 'MNOP78', marca: 'Nissan', modelo: 'Frontier', year: 2019, cliente: 'Roberto Silva', color: 'Negro' },
  { id: 5, patente: 'QRST90', marca: 'Hyundai', modelo: 'Tucson', year: 2023, cliente: 'Ana González', color: 'Azul' },
  { id: 6, patente: 'UVWX12', marca: 'Kia', modelo: 'Sportage', year: 2022, cliente: 'Carlos Mendoza', color: 'Blanco' },
]

const CLIENTES = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@email.com', telefono: '+56 9 1234 5678', tipo: 'persona' },
  { id: 2, nombre: 'María López', email: 'maria.lopez@email.com', telefono: '+56 9 2345 6789', tipo: 'persona' },
  { id: 3, nombre: 'Roberto Silva', email: 'roberto.silva@email.com', telefono: '+56 9 3456 7890', tipo: 'persona' },
  { id: 4, nombre: 'Ana González', email: 'ana.gonzalez@email.com', telefono: '+56 9 4567 8901', tipo: 'persona' },
  { id: 5, nombre: 'Carlos Mendoza', email: 'carlos.m@email.com', telefono: '+56 9 5678 9012', tipo: 'persona' },
  { id: 6, nombre: 'Ana González 2', email: 'ana2@email.com', telefono: '+56 9 9012 3456', tipo: 'persona' },
]

const EMPRESAS = [
  { id: 1, nombre: 'LogiChile SpA', rut: '76.543.210-1', contacto: 'Felipe Rojas', vehiculos: 12 },
  { id: 2, nombre: 'TransSur Ltda.', rut: '77.654.321-2', contacto: 'Sandra Mena', vehiculos: 8 },
  { id: 3, nombre: 'Minera Atacama', rut: '78.765.432-3', contacto: 'Ricardo Torres', vehiculos: 24 },
]

function highlight(text: string, q: string) {
  if (!q) return text
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 text-yellow-900 rounded px-0.5">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  )
}

function BuscarResults() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const ql = q.toLowerCase()

  const otsFound = q ? OTS.filter(o =>
    o.numero.toLowerCase().includes(ql) ||
    o.vehiculo.toLowerCase().includes(ql) ||
    o.cliente.toLowerCase().includes(ql) ||
    o.mecanico.toLowerCase().includes(ql)
  ) : []

  const vehs = q ? VEHICULOS.filter(v =>
    v.patente.toLowerCase().includes(ql) ||
    v.marca.toLowerCase().includes(ql) ||
    v.modelo.toLowerCase().includes(ql) ||
    v.cliente.toLowerCase().includes(ql)
  ) : []

  const clientes = q ? CLIENTES.filter(c =>
    c.nombre.toLowerCase().includes(ql) ||
    c.email.toLowerCase().includes(ql) ||
    c.telefono.toLowerCase().includes(ql)
  ) : []

  const empresas = q ? EMPRESAS.filter(e =>
    e.nombre.toLowerCase().includes(ql) ||
    e.rut.toLowerCase().includes(ql) ||
    e.contacto.toLowerCase().includes(ql)
  ) : []

  const total = otsFound.length + vehs.length + clientes.length + empresas.length

  return (
    <div className="fade-in">
      <Topbar
        title="Buscador"
        subtitle={q ? `${total} resultado${total !== 1 ? 's' : ''} para "${q}"` : 'Busca OTs, vehículos, clientes y empresas'}
      />
      <div className="p-6 max-w-3xl space-y-6">

        {!q && (
          <div className="card p-12 text-center text-slate-400">
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium text-lg">Escribe algo en el buscador</p>
            <p className="text-sm mt-1">Puedes buscar por número de OT, patente, nombre de cliente y más</p>
          </div>
        )}

        {q && total === 0 && (
          <div className="card p-12 text-center text-slate-400">
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium text-lg">Sin resultados para "{q}"</p>
            <p className="text-sm mt-1">Prueba con otro término — patente, nombre, número de OT…</p>
          </div>
        )}

        {/* Órdenes de Trabajo */}
        {otsFound.length > 0 && (
          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50">
              <ClipboardList size={15} className="text-slate-500" />
              <span className="text-sm font-semibold text-slate-700">Órdenes de Trabajo</span>
              <span className="ml-auto text-xs text-slate-400">{otsFound.length} resultado{otsFound.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="divide-y divide-slate-50">
              {otsFound.map(ot => (
                <Link key={ot.id} href={`/ordenes/${ot.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <ClipboardList size={15} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{highlight(ot.numero, q)}</p>
                    <p className="text-xs text-slate-400">{highlight(ot.vehiculo, q)} · {highlight(ot.cliente, q)}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{ot.estado}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Vehículos */}
        {vehs.length > 0 && (
          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50">
              <Car size={15} className="text-slate-500" />
              <span className="text-sm font-semibold text-slate-700">Vehículos</span>
              <span className="ml-auto text-xs text-slate-400">{vehs.length} resultado{vehs.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="divide-y divide-slate-50">
              {vehs.map(v => (
                <Link key={v.id} href={`/vehiculos/${v.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Car size={15} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">
                      {highlight(v.marca, q)} {highlight(v.modelo, q)}
                      <span className="ml-2 font-mono text-xs text-slate-500">{highlight(v.patente, q)}</span>
                    </p>
                    <p className="text-xs text-slate-400">{v.year} · {v.color} · {highlight(v.cliente, q)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Clientes */}
        {clientes.length > 0 && (
          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50">
              <Users size={15} className="text-slate-500" />
              <span className="text-sm font-semibold text-slate-700">Clientes</span>
              <span className="ml-auto text-xs text-slate-400">{clientes.length} resultado{clientes.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="divide-y divide-slate-50">
              {clientes.map(c => (
                <Link key={c.id} href={`/clientes/${c.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Users size={15} className="text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{highlight(c.nombre, q)}</p>
                    <p className="text-xs text-slate-400">{highlight(c.email, q)} · {highlight(c.telefono, q)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empresas */}
        {empresas.length > 0 && (
          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50">
              <Building2 size={15} className="text-slate-500" />
              <span className="text-sm font-semibold text-slate-700">Empresas</span>
              <span className="ml-auto text-xs text-slate-400">{empresas.length} resultado{empresas.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="divide-y divide-slate-50">
              {empresas.map(e => (
                <Link key={e.id} href={`/empresas/${e.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Building2 size={15} className="text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{highlight(e.nombre, q)}</p>
                    <p className="text-xs text-slate-400">{highlight(e.rut, q)} · {highlight(e.contacto, q)} · {e.vehiculos} vehículos</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default function BuscarPage() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-400">Cargando...</div>}>
      <BuscarResults />
    </Suspense>
  )
}
