'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import {
  Car, ClipboardList, ArrowLeft, Calendar, Hash,
  Palette, Fuel, Settings2, FileText, User, Wrench
} from 'lucide-react'

interface OTResumen {
  id: number
  numero: string
  fecha: string
  descripcion: string
  estado: string
  total: string
  mecanico: string
}

interface VehiculoData {
  id: number
  patente: string
  marca: string
  modelo: string
  year: number
  color: string
  tipo: string
  combustible: string
  transmision: string
  motor: string
  km: string
  vin: string
  cliente: string
  clienteId: number
  empresa?: string
  empresaId?: number
  notas: string
  ots: OTResumen[]
}

const VEHICULOS: Record<string, VehiculoData> = {
  '1': {
    id: 1, patente: 'ABCD12', marca: 'Toyota', modelo: 'Hilux', year: 2022,
    color: 'Blanco', tipo: 'Camioneta', combustible: 'Diésel', transmision: 'Manual',
    motor: '2.8L 4 cilindros', km: '45.800', vin: '9BFZZZLB2FP123456',
    cliente: 'Juan Pérez', clienteId: 1, notas: 'Cliente frecuente, prefiere citas en la mañana.',
    ots: [
      { id: 12, numero: 'OT-2026-0012', fecha: '15/05/2026', descripcion: 'Cambio de aceite y filtros, revisión de frenos', estado: 'En reparación', total: '$85.000', mecanico: 'Carlos R.' },
      { id: 7, numero: 'OT-2025-0007', fecha: '10/11/2025', descripcion: 'Mantención de los 40.000 km', estado: 'Entregado', total: '$210.000', mecanico: 'Carlos R.' },
      { id: 3, numero: 'OT-2025-0003', fecha: '03/06/2025', descripcion: 'Cambio de neumáticos delanteros', estado: 'Entregado', total: '$140.000', mecanico: 'Pedro M.' },
    ]
  },
  '2': {
    id: 2, patente: 'EFGH34', marca: 'Chevrolet', modelo: 'Spark', year: 2020,
    color: 'Rojo', tipo: 'Hatchback', combustible: 'Bencina', transmision: 'Automática',
    motor: '1.2L 3 cilindros', km: '32.100', vin: '9BGNEF4FXKG234567',
    cliente: 'María López', clienteId: 2, notas: '',
    ots: [
      { id: 11, numero: 'OT-2026-0011', fecha: '14/05/2026', descripcion: 'Revisión técnica y ajuste de luces', estado: 'Listo para retirar', total: '$45.000', mecanico: 'Pedro M.' },
      { id: 5, numero: 'OT-2025-0005', fecha: '22/08/2025', descripcion: 'Reparación sistema de frenos ABS', estado: 'Entregado', total: '$320.000', mecanico: 'Carlos R.' },
    ]
  },
  '3': {
    id: 3, patente: 'IJKL56', marca: 'Ford', modelo: 'Ranger', year: 2021,
    color: 'Gris', tipo: 'Camioneta', combustible: 'Diésel', transmision: 'Automática',
    motor: '3.2L 5 cilindros', km: '78.400', vin: '9BFZZZFB2GP345678',
    cliente: 'Felipe Rojas', clienteId: 1, empresa: 'LogiChile SpA', empresaId: 1, notas: 'Vehículo de flota corporativa. Requiere factura.',
    ots: [
      { id: 10, numero: 'OT-2026-0010', fecha: '13/05/2026', descripcion: 'Diagnóstico falla de transmisión', estado: 'Diagnóstico', total: '$0', mecanico: 'Carlos R.' },
      { id: 6, numero: 'OT-2025-0006', fecha: '15/09/2025', descripcion: 'Mantención de los 70.000 km', estado: 'Entregado', total: '$380.000', mecanico: 'Luis S.' },
    ]
  },
  '4': {
    id: 4, patente: 'MNOP78', marca: 'Nissan', modelo: 'Frontier', year: 2019,
    color: 'Negro', tipo: 'Camioneta', combustible: 'Diésel', transmision: 'Manual',
    motor: '2.5L 4 cilindros', km: '95.200', vin: '9BFZZZLB2FP456789',
    cliente: 'Roberto Silva', clienteId: 3, notas: 'Vehículo de trabajo, alta rotación.',
    ots: [
      { id: 9, numero: 'OT-2026-0009', fecha: '12/05/2026', descripcion: 'Cambio de aceite, revisión general', estado: 'Recibido', total: '$0', mecanico: 'Sin asignar' },
      { id: 4, numero: 'OT-2025-0004', fecha: '01/07/2025', descripcion: 'Reparación de embrague', estado: 'Entregado', total: '$580.000', mecanico: 'Luis S.' },
    ]
  },
  '5': {
    id: 5, patente: 'QRST90', marca: 'Hyundai', modelo: 'Tucson', year: 2023,
    color: 'Azul', tipo: 'SUV', combustible: 'Híbrido', transmision: 'Automática',
    motor: '1.6L Turbo Híbrido', km: '18.600', vin: '5NMZT3LBXPX567890',
    cliente: 'Ana González', clienteId: 4, notas: 'Vehículo reciente, en garantía del fabricante hasta 2025.',
    ots: [
      { id: 8, numero: 'OT-2026-0008', fecha: '05/05/2026', descripcion: 'Cambio de aceite y revisión pre-viaje', estado: 'Entregado', total: '$65.000', mecanico: 'Pedro M.' },
    ]
  },
  '6': {
    id: 6, patente: 'UVWX12', marca: 'Kia', modelo: 'Sportage', year: 2022,
    color: 'Blanco Perla', tipo: 'SUV', combustible: 'Bencina', transmision: 'Automática',
    motor: '2.0L 4 cilindros', km: '28.300', vin: 'U5YPB8110NL678901',
    cliente: 'Carlos Mendoza', clienteId: 5, notas: '',
    ots: [
      { id: 7, numero: 'OT-2026-0007', fecha: '01/05/2026', descripcion: 'Alineación y balanceo, cambio pastillas de freno', estado: 'Entregado', total: '$95.000', mecanico: 'Luis S.' },
    ]
  },
}

const estadoConfig: Record<string, { label: string; class: string }> = {
  'Recibido': { label: 'Recibido', class: 'bg-blue-100 text-blue-700' },
  'Diagnóstico': { label: 'Diagnóstico', class: 'bg-yellow-100 text-yellow-700' },
  'En reparación': { label: 'En reparación', class: 'bg-orange-100 text-orange-700' },
  'Listo para retirar': { label: 'Listo ✓', class: 'bg-green-100 text-green-700' },
  'Entregado': { label: 'Entregado', class: 'bg-gray-100 text-gray-600' },
}

export default function VehiculoDetailPage() {
  const params = useParams()
  const id = params.id as string
  const v = VEHICULOS[id]
  const [tab, setTab] = useState<'info' | 'ots'>('info')

  if (!v) {
    return (
      <div className="fade-in">
        <Topbar title="Vehículo no encontrado" subtitle="" />
        <div className="p-6">
          <div className="card p-12 text-center text-slate-400">
            <Car size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium text-lg">Vehículo #{id} no encontrado</p>
            <Link href="/vehiculos" className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--accent)' }}>
              <ArrowLeft size={14} /> Volver a Vehículos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <Topbar
        title={`${v.marca} ${v.modelo} ${v.year}`}
        subtitle={`Patente ${v.patente} · ${v.km} km`}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/vehiculos"
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">
              <ArrowLeft size={14} /> Volver
            </Link>
            <Link href={`/ordenes/nueva?vehiculo=${v.id}`}
              className="btn-primary flex items-center gap-1.5 text-sm px-3 py-1.5">
              <ClipboardList size={14} /> Nueva OT
            </Link>
          </div>
        }
      />

      <div className="p-6 max-w-4xl space-y-5">

        {/* Header card */}
        <div className="card p-5 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Car size={30} className="text-blue-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-slate-800">
              {v.marca} {v.modelo}
            </h1>
            <p className="text-slate-500">{v.year} · {v.tipo} · {v.color}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-mono text-lg font-bold px-3 py-0.5 rounded-lg bg-slate-100 text-slate-700">
                {v.patente}
              </span>
              <span className="text-sm text-slate-500">{v.km} km registrados</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-1">Propietario</p>
            <Link href={`/clientes/${v.clienteId}`}
              className="font-semibold text-slate-700 hover:underline flex items-center gap-1 justify-end">
              <User size={14} /> {v.cliente}
            </Link>
            {v.empresa && (
              <Link href={`/empresas/${v.empresaId}`}
                className="text-xs text-slate-400 hover:underline mt-0.5 block">{v.empresa}</Link>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
          {(['info', 'ots'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${tab === t ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>
              {t === 'info' ? 'Ficha técnica' : `Historial OT (${v.ots.length})`}
            </button>
          ))}
        </div>

        {/* Ficha técnica */}
        {tab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="card p-5">
              <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <Settings2 size={16} /> Datos técnicos
              </h2>
              <div className="space-y-3">
                {[
                  { icon: Hash, label: 'VIN / Chasis', value: v.vin },
                  { icon: Fuel, label: 'Combustible', value: v.combustible },
                  { icon: Settings2, label: 'Transmisión', value: v.transmision },
                  { icon: Wrench, label: 'Motor', value: v.motor },
                  { icon: Palette, label: 'Color', value: v.color },
                  { icon: Calendar, label: 'Año', value: String(v.year) },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={13} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="text-sm font-medium text-slate-700">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Propietario */}
              <div className="card p-5">
                <h2 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <User size={16} /> Propietario
                </h2>
                <Link href={`/clientes/${v.clienteId}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                    <User size={16} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">{v.cliente}</p>
                    {v.empresa && <p className="text-xs text-slate-400">{v.empresa}</p>}
                  </div>
                </Link>
              </div>

              {/* Notas */}
              {v.notas && (
                <div className="card p-5">
                  <h2 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <FileText size={16} /> Notas
                  </h2>
                  <p className="text-sm text-slate-600">{v.notas}</p>
                </div>
              )}

              {/* Resumen */}
              <div className="card p-5">
                <h2 className="font-bold text-slate-700 mb-3">Resumen</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-lg bg-blue-50">
                    <p className="text-2xl font-bold text-blue-600">{v.ots.length}</p>
                    <p className="text-xs text-slate-500">OT en historial</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-50">
                    <p className="text-2xl font-bold text-green-600">
                      {v.ots.filter(o => o.estado === 'Entregado').length}
                    </p>
                    <p className="text-xs text-slate-500">OT entregadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Historial OT */}
        {tab === 'ots' && (
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">Historial de Órdenes de Trabajo</h2>
              <Link href={`/ordenes/nueva?vehiculo=${v.id}`}
                className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1">
                <ClipboardList size={13} /> Nueva OT
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {v.ots.map(ot => {
                const cfg = estadoConfig[ot.estado] ?? { label: ot.estado, class: 'bg-slate-100 text-slate-600' }
                return (
                  <Link key={ot.id} href={`/ordenes/${ot.id}`}
                    className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ClipboardList size={14} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm font-semibold text-slate-700">{ot.numero}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.class}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-0.5">{ot.descripcion}</p>
                      <p className="text-xs text-slate-400 mt-1">{ot.fecha} · {ot.mecanico}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-slate-700">{ot.total}</p>
                    </div>
                  </Link>
                )
              })}
              {v.ots.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <ClipboardList size={32} className="mx-auto mb-3 opacity-30" />
                  <p>Sin órdenes de trabajo registradas</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
