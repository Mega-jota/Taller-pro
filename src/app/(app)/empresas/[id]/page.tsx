'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import {
  ArrowLeft, Building2, Phone, Mail, MapPin, Car,
  ClipboardList, Plus, ChevronRight, Edit, Globe,
  Users, TrendingUp, Calendar, Percent
} from 'lucide-react'

const EMPRESA = {
  id: 1,
  nombre: 'LogiChile S.A.',
  rut: '76.123.456-7',
  rubro: 'Transporte y logística',
  direccion: 'Av. Industrial 4521, Pudahuel',
  ciudad: 'Santiago',
  region: 'Región Metropolitana',
  telefono: '+56 2 2345 6789',
  email: 'contacto@logichile.cl',
  web: 'www.logichile.cl',
  descuento: 10,
  dias_credito: 30,
  notas: 'Cliente desde 2024. Flota de camiones y camionetas pickup. Preferencia por citas los días martes y jueves.',
  activa: true,
  contacto_principal: {
    nombre: 'Carlos Mendoza',
    cargo: 'Jefe de Flota',
    telefono: '+56 9 8765 4321',
    email: 'cmendoza@logichile.cl',
  },
  contactos_adicionales: [
    { nombre: 'Patricia Soto', cargo: 'Gerente de Operaciones', telefono: '+56 9 7654 3210', email: 'psoto@logichile.cl' },
  ],
}

const VEHICULOS_FLOTA = [
  { id: 10, patente: 'ABCD12', modelo: 'Toyota Hilux 2022', tipo: 'Camioneta pickup', km: '45.000', estado: 'en_taller', ot_activa: 'OT-2026-0012' },
  { id: 11, patente: 'EFGH34', modelo: 'Toyota Hilux 2021', tipo: 'Camioneta pickup', km: '72.000', estado: 'activo', ot_activa: null },
  { id: 12, patente: 'IJKL56', modelo: 'Ford Ranger 2023', tipo: 'Camioneta pickup', km: '28.000', estado: 'activo', ot_activa: null },
  { id: 13, patente: 'MNOP78', modelo: 'Chevrolet D-Max 2020', tipo: 'Camioneta pickup', km: '98.000', estado: 'en_taller', ot_activa: 'OT-2026-0009' },
  { id: 14, patente: 'QRST90', modelo: 'Mitsubishi L200 2022', tipo: 'Camioneta pickup', km: '51.000', estado: 'activo', ot_activa: null },
  { id: 15, patente: 'UVWX12', modelo: 'Nissan Navara 2021', tipo: 'Camioneta pickup', km: '63.000', estado: 'activo', ot_activa: null },
  { id: 16, patente: 'YZAB34', modelo: 'Volkswagen Amarok 2023', tipo: 'Camioneta pickup', km: '19.000', estado: 'activo', ot_activa: null },
  { id: 17, patente: 'CDEF56', modelo: 'Mercedes Sprinter 2020', tipo: 'Van de carga', km: '115.000', estado: 'activo', ot_activa: null },
]

const OT_RECIENTES = [
  { numero: 'OT-2026-0012', vehiculo: 'ABCD12 Toyota Hilux', fecha: '18 mayo 2026', estado: 'en_proceso', monto: '$185.000' },
  { numero: 'OT-2026-0009', vehiculo: 'MNOP78 Chev. D-Max', fecha: '15 mayo 2026', estado: 'diagnostico', monto: 'Por cotizar' },
  { numero: 'OT-2026-0005', vehiculo: 'IJKL56 Ford Ranger', fecha: '5 mayo 2026', estado: 'entregado', monto: '$320.000' },
  { numero: 'OT-2026-0001', vehiculo: 'EFGH34 Toyota Hilux', fecha: '1 mayo 2026', estado: 'entregado', monto: '$95.000' },
]

const estadoVehiculo = {
  activo: { label: 'En servicio', cls: 'bg-green-100 text-green-700' },
  en_taller: { label: 'En taller', cls: 'bg-orange-100 text-orange-700' },
  baja: { label: 'De baja', cls: 'bg-red-100 text-red-600' },
}

const estadoOT: Record<string, { label: string; cls: string }> = {
  recibido: { label: 'Recibido', cls: 'bg-blue-100 text-blue-700' },
  diagnostico: { label: 'Diagnóstico', cls: 'bg-yellow-100 text-yellow-700' },
  en_proceso: { label: 'En reparación', cls: 'bg-orange-100 text-orange-700' },
  listo: { label: 'Listo ✓', cls: 'bg-green-100 text-green-700' },
  entregado: { label: 'Entregado', cls: 'bg-slate-100 text-slate-500' },
}

export default function DetalleEmpresaPage() {
  const [tab, setTab] = useState<'vehiculos' | 'ordenes' | 'contactos'>('vehiculos')

  const enTaller = VEHICULOS_FLOTA.filter(v => v.estado === 'en_taller').length
  const totalOTs = OT_RECIENTES.length
  const montosEntregados = OT_RECIENTES.filter(o => o.estado === 'entregado')
    .filter(o => o.monto.startsWith('$'))

  return (
    <div className="fade-in">
      <Topbar title={EMPRESA.nombre} subtitle={`RUT: ${EMPRESA.rut} · ${EMPRESA.rubro}`} />

      <div className="p-6 space-y-5">

        <div className="flex items-center justify-between">
          <Link href="/empresas" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
            <ArrowLeft size={15} /> Volver a empresas
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">
            <Edit size={14} /> Editar empresa
          </button>
        </div>

        {/* Header con info y resumen */}
        <div className="grid grid-cols-3 gap-5">

          {/* Info empresa */}
          <div className="col-span-2 card p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Building2 size={24} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{EMPRESA.nombre}</h2>
                  <p className="text-sm text-slate-500">{EMPRESA.rubro}</p>
                </div>
              </div>
              <span className={`badge ${EMPRESA.activa ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                {EMPRESA.activa ? '✅ Activa' : 'Inactiva'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2 text-slate-600">
                <MapPin size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <span>{EMPRESA.direccion}<br />{EMPRESA.ciudad}, {EMPRESA.region}</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone size={13} className="text-slate-400" />
                  <span>{EMPRESA.telefono}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail size={13} className="text-slate-400" />
                  <span>{EMPRESA.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Globe size={13} className="text-slate-400" />
                  <span>{EMPRESA.web}</span>
                </div>
              </div>
            </div>

            {EMPRESA.notas && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-sm text-amber-800">
                <span className="font-semibold">📝 Nota:</span> {EMPRESA.notas}
              </div>
            )}
          </div>

          {/* Estadísticas */}
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold text-slate-700">Resumen flota</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Car size={14} className="text-blue-500" />
                  <span>Vehículos totales</span>
                </div>
                <span className="font-bold text-slate-800">{VEHICULOS_FLOTA.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <ClipboardList size={14} className="text-orange-500" />
                  <span>En taller ahora</span>
                </div>
                <span className="font-bold text-orange-600">{enTaller}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <TrendingUp size={14} className="text-green-500" />
                  <span>OT históricas</span>
                </div>
                <span className="font-bold text-slate-800">{totalOTs}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Percent size={14} className="text-purple-500" />
                  <span>Descuento</span>
                </div>
                <span className="font-bold text-purple-600">{EMPRESA.descuento}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar size={14} className="text-slate-400" />
                  <span>Crédito</span>
                </div>
                <span className="font-bold text-slate-800">{EMPRESA.dias_credito} días</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link href="/ordenes/nueva"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: 'var(--accent)' }}>
                <Plus size={14} /> Nueva OT para esta flota
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card overflow-hidden">
          <div className="flex border-b border-slate-100">
            {[
              { key: 'vehiculos', label: `🚗 Vehículos (${VEHICULOS_FLOTA.length})` },
              { key: 'ordenes', label: `📋 Órdenes de trabajo (${OT_RECIENTES.length})` },
              { key: 'contactos', label: `👥 Contactos` },
            ].map(t => (
              <button key={t.key}
                onClick={() => setTab(t.key as typeof tab)}
                className={`px-6 py-3.5 text-sm font-medium border-b-2 transition-colors ${tab === t.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab: Vehículos */}
          {tab === 'vehiculos' && (
            <div>
              <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-100">
                <p className="text-sm text-slate-500">{VEHICULOS_FLOTA.length} vehículos registrados en esta flota</p>
                <Link href="/vehiculos/nuevo"
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-600">
                  <Plus size={12} /> Agregar vehículo
                </Link>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100">
                    <th className="text-left px-6 py-3">Vehículo</th>
                    <th className="text-left px-6 py-3">Tipo</th>
                    <th className="text-left px-6 py-3">Km</th>
                    <th className="text-left px-6 py-3">Estado</th>
                    <th className="text-left px-6 py-3">OT activa</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {VEHICULOS_FLOTA.map((v) => {
                    const est = estadoVehiculo[v.estado as keyof typeof estadoVehiculo]
                    return (
                      <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3">
                          <p className="font-semibold text-slate-800 font-mono">{v.patente}</p>
                          <p className="text-xs text-slate-400">{v.modelo}</p>
                        </td>
                        <td className="px-6 py-3 text-slate-600 text-xs">{v.tipo}</td>
                        <td className="px-6 py-3 text-slate-600">{v.km} km</td>
                        <td className="px-6 py-3">
                          <span className={`badge ${est.cls}`}>{est.label}</span>
                        </td>
                        <td className="px-6 py-3">
                          {v.ot_activa
                            ? <Link href={`/ordenes/${v.id}`} className="text-xs font-mono font-semibold hover:underline" style={{ color: 'var(--accent)' }}>{v.ot_activa}</Link>
                            : <span className="text-slate-300 text-xs">—</span>
                          }
                        </td>
                        <td className="px-6 py-3">
                          <Link href={`/vehiculos/${v.id}`}
                            className="flex items-center gap-1 text-xs font-medium hover:underline"
                            style={{ color: 'var(--accent)' }}>
                            Ver <ChevronRight size={12} />
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab: Órdenes */}
          {tab === 'ordenes' && (
            <div>
              <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-100">
                <p className="text-sm text-slate-500">{OT_RECIENTES.length} órdenes de trabajo</p>
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
                  {OT_RECIENTES.map((ot, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3">
                        <span className="font-mono font-semibold text-xs" style={{ color: 'var(--accent)' }}>{ot.numero}</span>
                      </td>
                      <td className="px-6 py-3 text-slate-700">{ot.vehiculo}</td>
                      <td className="px-6 py-3 text-slate-500 text-xs">{ot.fecha}</td>
                      <td className="px-6 py-3">
                        <span className={`badge ${estadoOT[ot.estado]?.cls}`}>{estadoOT[ot.estado]?.label}</span>
                      </td>
                      <td className="px-6 py-3 font-semibold text-slate-700">{ot.monto}</td>
                      <td className="px-6 py-3">
                        <Link href={`/ordenes/${i + 1}`}
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

          {/* Tab: Contactos */}
          {tab === 'contactos' && (
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Contacto principal</p>
                <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                    {EMPRESA.contacto_principal.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">{EMPRESA.contacto_principal.nombre}</p>
                    <p className="text-xs text-slate-500 mb-2">{EMPRESA.contacto_principal.cargo}</p>
                    <div className="flex gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1.5"><Phone size={12} className="text-slate-400" />{EMPRESA.contacto_principal.telefono}</span>
                      <span className="flex items-center gap-1.5"><Mail size={12} className="text-slate-400" />{EMPRESA.contacto_principal.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {EMPRESA.contactos_adicionales.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Contactos adicionales</p>
                  <div className="space-y-3">
                    {EMPRESA.contactos_adicionales.map((c, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl p-4 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm flex-shrink-0">
                          {c.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{c.nombre}</p>
                          <p className="text-xs text-slate-500 mb-2">{c.cargo}</p>
                          <div className="flex gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1.5"><Phone size={12} className="text-slate-400" />{c.telefono}</span>
                            <span className="flex items-center gap-1.5"><Mail size={12} className="text-slate-400" />{c.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600">
                <Plus size={14} /> Agregar contacto
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
