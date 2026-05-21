'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { Bell, CheckCircle, Clock, Filter } from 'lucide-react'

const TODAS = [
  { id: 1, icono: '✅', titulo: 'OT-2026-0012 lista para entrega', desc: 'Toyota Hilux ABCD12 — Juan Pérez', tiempo: 'Hace 5 min', tipo: 'ot', leida: false, href: '/ordenes/12' },
  { id: 2, icono: '💬', titulo: 'WhatsApp enviado a María López', desc: 'OT-2026-0011 — Vehículo listo para retiro', tiempo: 'Hace 23 min', tipo: 'mensaje', leida: false, href: '/ordenes/11' },
  { id: 3, icono: '🔍', titulo: 'Inspección completada — Ford Ranger', desc: 'Inspector: Carlos R. — Score: 87%', tiempo: 'Hace 1h', tipo: 'inspeccion', leida: false, href: '/inspecciones/3' },
  { id: 4, icono: '🔧', titulo: 'OT-2026-0010 asignada a Carlos R.', desc: 'Ford Ranger IJKL56 — LogiChile', tiempo: 'Hace 2h', tipo: 'ot', leida: true, href: '/ordenes/10' },
  { id: 5, icono: '👤', titulo: 'Nuevo cliente registrado', desc: 'Ana González — +56 9 9012 3456', tiempo: 'Hace 3h', tipo: 'cliente', leida: true, href: '/clientes/6' },
  { id: 6, icono: '📧', titulo: 'Presupuesto enviado por email', desc: 'OT-2026-0009 — Roberto Silva', tiempo: 'Hace 4h', tipo: 'mensaje', leida: true, href: '/ordenes/9' },
  { id: 7, icono: '🚗', titulo: 'Vehículo ingresado al taller', desc: 'Nissan Frontier MNOP78 — Roberto Silva', tiempo: 'Ayer 09:00', tipo: 'vehiculo', leida: true, href: '/vehiculos/6' },
  { id: 8, icono: '💬', titulo: 'SMS enviado a Roberto Silva', desc: 'OT-2026-0009 — Vehículo recibido', tiempo: 'Ayer 08:30', tipo: 'mensaje', leida: true, href: '/ordenes/9' },
  { id: 9, icono: '✅', titulo: 'OT-2026-0008 entregada', desc: 'Hyundai Tucson QRST90 — Ana González', tiempo: 'Ayer 16:30', tipo: 'ot', leida: true, href: '/ordenes/8' },
]

const tipoConfig: Record<string, string> = {
  ot: 'bg-blue-100 text-blue-700',
  mensaje: 'bg-green-100 text-green-700',
  inspeccion: 'bg-purple-100 text-purple-700',
  cliente: 'bg-orange-100 text-orange-700',
  vehiculo: 'bg-slate-100 text-slate-600',
}

export default function NotificacionesPage() {
  const [notifs, setNotifs] = useState(TODAS)
  const [filtro, setFiltro] = useState<'todas' | 'no_leidas'>('todas')

  const marcarTodasLeidas = () => setNotifs(notifs.map(n => ({ ...n, leida: true })))
  const marcarLeida = (id: number) => setNotifs(notifs.map(n => n.id === id ? { ...n, leida: true } : n))

  const filtradas = filtro === 'no_leidas' ? notifs.filter(n => !n.leida) : notifs
  const noLeidas = notifs.filter(n => !n.leida).length

  return (
    <div className="fade-in">
      <Topbar title="Notificaciones" subtitle="Historial de alertas y eventos del taller" />
      <div className="p-6 max-w-3xl space-y-5">

        <div className="flex items-center justify-between">
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button onClick={() => setFiltro('todas')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filtro === 'todas' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>
              Todas ({notifs.length})
            </button>
            <button onClick={() => setFiltro('no_leidas')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filtro === 'no_leidas' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>
              No leídas ({noLeidas})
            </button>
          </div>
          {noLeidas > 0 && (
            <button onClick={marcarTodasLeidas}
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">
              <CheckCircle size={14} /> Marcar todas leídas
            </button>
          )}
        </div>

        <div className="card overflow-hidden divide-y divide-slate-50">
          {filtradas.map(n => (
            <Link key={n.id} href={n.href}
              onClick={() => marcarLeida(n.id)}
              className={`flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors ${!n.leida ? 'bg-blue-50/40' : ''}`}>
              <span className="text-2xl flex-shrink-0">{n.icono}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!n.leida ? 'font-semibold text-slate-800' : 'text-slate-700'}`}>
                  {n.titulo}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tipoConfig[n.tipo]}`}>
                    {n.tipo}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={10} /> {n.tiempo}
                  </span>
                </div>
              </div>
              {!n.leida && <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />}
            </Link>
          ))}
          {filtradas.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Bell size={32} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">Sin notificaciones no leídas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
