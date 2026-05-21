'use client'
import Topbar from '@/components/Topbar'
import {
  Car, ClipboardList, Users, Search,
  TrendingUp, Clock, CheckCircle, AlertCircle, ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const statsCards = [
  { label: 'Vehículos en taller', value: '12', icon: Car, color: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600', trend: '+2 esta semana' },
  { label: 'OT abiertas', value: '8', icon: ClipboardList, color: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-600', trend: '3 urgentes' },
  { label: 'Clientes este mes', value: '34', icon: Users, color: 'bg-green-500', light: 'bg-green-50', text: 'text-green-600', trend: '+5 nuevos' },
  { label: 'Inspecciones', value: '7', icon: Search, color: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-600', trend: '2 pendientes' },
]

const recentOT = [
  { numero: 'OT-2026-0012', vehiculo: 'Toyota Hilux ABCD12', cliente: 'Juan Pérez', estado: 'en_proceso', prioridad: 'alta', mecanico: 'Carlos R.' },
  { numero: 'OT-2026-0011', vehiculo: 'Chevrolet Spark EFGH34', cliente: 'María López', estado: 'listo', prioridad: 'normal', mecanico: 'Pedro M.' },
  { numero: 'OT-2026-0010', vehiculo: 'Ford Ranger IJKL56', cliente: 'Empresa LogiChile', estado: 'diagnostico', prioridad: 'urgente', mecanico: 'Carlos R.' },
  { numero: 'OT-2026-0009', vehiculo: 'Nissan Frontier MNOP78', cliente: 'Roberto Silva', estado: 'recibido', prioridad: 'normal', mecanico: 'Sin asignar' },
  { numero: 'OT-2026-0008', vehiculo: 'Hyundai Tucson QRST90', cliente: 'Ana González', estado: 'entregado', prioridad: 'baja', mecanico: 'Pedro M.' },
]

const estadoConfig: Record<string, { label: string; class: string }> = {
  recibido: { label: 'Recibido', class: 'bg-blue-100 text-blue-700' },
  diagnostico: { label: 'Diagnóstico', class: 'bg-yellow-100 text-yellow-700' },
  en_proceso: { label: 'En reparación', class: 'bg-orange-100 text-orange-700' },
  listo: { label: 'Listo ✓', class: 'bg-green-100 text-green-700' },
  entregado: { label: 'Entregado', class: 'bg-gray-100 text-gray-600' },
  cancelado: { label: 'Cancelado', class: 'bg-red-100 text-red-600' },
}

const prioridadConfig: Record<string, { label: string; class: string }> = {
  baja: { label: 'Baja', class: 'text-gray-400' },
  normal: { label: 'Normal', class: 'text-blue-500' },
  alta: { label: 'Alta', class: 'text-orange-500' },
  urgente: { label: '🔴 Urgente', class: 'text-red-600 font-bold' },
}

const recentActivity = [
  { time: 'Hace 5 min', msg: 'OT-0012 cambió a "En reparación"', icon: '🔧' },
  { time: 'Hace 23 min', msg: 'Notificación enviada a María López (WhatsApp)', icon: '💬' },
  { time: 'Hace 1h', msg: 'Toyota Hilux ABCD12 — Inspección completada', icon: '✅' },
  { time: 'Hace 2h', msg: 'Nuevo cliente: Ana González registrada', icon: '👤' },
  { time: 'Hace 3h', msg: 'OT-0010 — Presupuesto enviado por email', icon: '📧' },
]

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('es-CL', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <div className="fade-in">
      <Topbar
        title="Dashboard"
        subtitle={`Buenos días · ${today}`}
      />

      <div className="p-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="card p-5 flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl ${stat.light} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={22} className={stat.text} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-500 leading-tight">{stat.label}</p>
                  <p className={`text-xs mt-1 font-medium ${stat.text}`}>{stat.trend}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* OT Recientes */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">Órdenes de Trabajo recientes</h2>
              <Link href="/ordenes" className="text-sm font-medium flex items-center gap-1"
                style={{ color: 'var(--accent)' }}>
                Ver todas <ArrowRight size={14} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100">
                    <th className="text-left px-6 py-3">N° OT</th>
                    <th className="text-left px-6 py-3">Vehículo</th>
                    <th className="text-left px-6 py-3">Estado</th>
                    <th className="text-left px-6 py-3">Prioridad</th>
                    <th className="text-left px-6 py-3">Mecánico</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOT.map((ot, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors">
                      <td className="px-6 py-3">
                        <Link href={`/ordenes/${parseInt(ot.numero.split('-')[2])}`}
                          className="font-mono font-semibold text-xs"
                          style={{ color: 'var(--accent)' }}>
                          {ot.numero}
                        </Link>
                      </td>
                      <td className="px-6 py-3">
                        <p className="font-medium text-slate-700">{ot.vehiculo}</p>
                        <p className="text-xs text-slate-400">{ot.cliente}</p>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`badge ${estadoConfig[ot.estado].class}`}>
                          {estadoConfig[ot.estado].label}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`text-xs font-semibold ${prioridadConfig[ot.prioridad].class}`}>
                          {prioridadConfig[ot.prioridad].label}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-slate-600 text-xs">{ot.mecanico}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="card">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">Actividad reciente</h2>
            </div>
            <div className="p-4 space-y-1">
              {recentActivity.map((act, i) => (
                <div key={i} className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-lg">{act.icon}</span>
                  <div>
                    <p className="text-sm text-slate-700 leading-tight">{act.msg}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel de acciones rápidas */}
        <div className="card p-5">
          <h2 className="font-bold text-slate-800 mb-4">Acciones rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: '/ordenes/nueva', icon: ClipboardList, label: 'Nueva Orden de Trabajo', color: 'bg-blue-500' },
              { href: '/vehiculos/nuevo', icon: Car, label: 'Registrar Vehículo', color: 'bg-green-500' },
              { href: '/inspecciones/nueva', icon: Search, label: 'Nueva Inspección', color: 'bg-purple-500' },
              { href: '/clientes/nuevo', icon: Users, label: 'Nuevo Cliente', color: 'bg-orange-500' },
            ].map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.href} href={action.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all group">
                  <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon size={20} color="white" />
                  </div>
                  <span className="text-xs font-medium text-slate-600 text-center">{action.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Indicadores del estado del taller */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-700">OT por estado</h3>
              <TrendingUp size={16} className="text-slate-400" />
            </div>
            {[
              { label: 'En reparación', count: 5, total: 8, color: 'bg-orange-400' },
              { label: 'Diagnóstico', count: 2, total: 8, color: 'bg-yellow-400' },
              { label: 'Listo para retirar', count: 1, total: 8, color: 'bg-green-400' },
            ].map((item) => (
              <div key={item.label} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-semibold text-slate-700">{item.count}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className={`h-2 ${item.color} rounded-full transition-all`}
                    style={{ width: `${(item.count / item.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-700">Tiempo promedio</h3>
              <Clock size={16} className="text-slate-400" />
            </div>
            <div className="text-center py-2">
              <p className="text-4xl font-bold" style={{ color: 'var(--accent)' }}>2.4</p>
              <p className="text-slate-500 text-sm">días promedio por OT</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Mantención simple</span>
                <span className="font-medium text-slate-700">0.5 días</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Reparación media</span>
                <span className="font-medium text-slate-700">2 días</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Reparación mayor</span>
                <span className="font-medium text-slate-700">5 días</span>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-700">Notificaciones enviadas</h3>
              <CheckCircle size={16} className="text-slate-400" />
            </div>
            <div className="space-y-3">
              {[
                { label: 'Email', count: 47, color: 'text-blue-600', icon: '📧' },
                { label: 'WhatsApp', count: 31, color: 'text-green-600', icon: '💬' },
                { label: 'SMS', count: 8, color: 'text-orange-600', icon: '📱' },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{n.icon}</span>
                    <span className="text-sm text-slate-600">{n.label}</span>
                  </div>
                  <span className={`font-bold ${n.color}`}>{n.count}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-100 flex justify-between">
                <span className="text-sm font-semibold text-slate-700">Total este mes</span>
                <span className="font-bold text-slate-800">86</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
