'use client'
import { Bell, Search, User, X, CheckCircle, Clock, Car, ChevronRight } from 'lucide-react'
import { ReactNode, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface TopbarProps {
  title: string
  subtitle?: string
  actions?: ReactNode
}

const NOTIFICACIONES_MOCK = [
  { id: 1, tipo: 'ot', icono: '✅', titulo: 'OT-2026-0012 lista para entrega', tiempo: 'Hace 5 min', leida: false, href: '/ordenes/12' },
  { id: 2, tipo: 'cliente', icono: '💬', titulo: 'WhatsApp enviado a María López', tiempo: 'Hace 23 min', leida: false, href: '/clientes/2' },
  { id: 3, tipo: 'inspeccion', icono: '🔍', titulo: 'Inspección completada — Ford Ranger', tiempo: 'Hace 1h', leida: false, href: '/inspecciones/3' },
  { id: 4, tipo: 'ot', icono: '🔧', titulo: 'OT-2026-0010 asignada a Carlos R.', tiempo: 'Hace 2h', leida: true, href: '/ordenes/10' },
  { id: 5, tipo: 'cliente', icono: '👤', titulo: 'Nuevo cliente registrado: Ana González', tiempo: 'Hace 3h', leida: true, href: '/clientes/6' },
  { id: 6, tipo: 'ot', icono: '📧', titulo: 'Presupuesto enviado — OT-2026-0009', tiempo: 'Hace 4h', leida: true, href: '/ordenes/9' },
]

export default function Topbar({ title, subtitle, actions }: TopbarProps) {
  const router = useRouter()
  const [busqueda, setBusqueda] = useState('')
  const [mostrarNotif, setMostrarNotif] = useState(false)
  const [notifs, setNotifs] = useState(NOTIFICACIONES_MOCK)
  const [tallerNombre, setTallerNombre] = useState('Mi Taller')
  const [tallerEmail, setTallerEmail] = useState('admin@taller.cl')
  const notifRef = useRef<HTMLDivElement>(null)

  const noLeidas = notifs.filter(n => !n.leida).length

  useEffect(() => {
    // Leer nombre del taller desde localStorage
    const nombre = localStorage.getItem('taller_nombre')
    const email = localStorage.getItem('taller_email')
    if (nombre) setTallerNombre(nombre)
    if (email) setTallerEmail(email)
  }, [])

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setMostrarNotif(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const marcarTodasLeidas = () => {
    setNotifs(notifs.map(n => ({ ...n, leida: true })))
  }

  const handleBusqueda = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && busqueda.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(busqueda.trim())}`)
    }
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-30">
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-slate-800 truncate">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
      </div>

      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}

      {/* Buscador rápido */}
      <div className="relative hidden md:block flex-shrink-0">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          onKeyDown={handleBusqueda}
          placeholder="Buscar patente, cliente... (Enter)"
          className="pl-8 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg w-64 outline-none focus:border-blue-400 focus:bg-white transition-colors"
        />
      </div>

      {/* Notificaciones */}
      <div ref={notifRef} className="relative flex-shrink-0">
        <button
          onClick={() => setMostrarNotif(!mostrarNotif)}
          className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Bell size={19} className="text-slate-600" />
          {noLeidas > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              {noLeidas}
            </span>
          )}
        </button>

        {/* Panel de notificaciones */}
        {mostrarNotif && (
          <div className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell size={15} className="text-slate-500" />
                <p className="font-bold text-slate-800 text-sm">Notificaciones</p>
                {noLeidas > 0 && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {noLeidas} nuevas
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {noLeidas > 0 && (
                  <button onClick={marcarTodasLeidas}
                    className="text-xs text-blue-500 hover:text-blue-700 font-medium">
                    Marcar todas leídas
                  </button>
                )}
                <button onClick={() => setMostrarNotif(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={15} />
                </button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifs.map(n => (
                <button key={n.id}
                  onClick={() => {
                    setNotifs(notifs.map(x => x.id === n.id ? { ...x, leida: true } : x))
                    setMostrarNotif(false)
                    router.push(n.href)
                  }}
                  className={`w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 ${!n.leida ? 'bg-blue-50/50' : ''}`}
                >
                  <span className="text-lg flex-shrink-0 mt-0.5">{n.icono}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-tight ${!n.leida ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                      {n.titulo}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <Clock size={10} /> {n.tiempo}
                    </p>
                  </div>
                  {!n.leida && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => { setMostrarNotif(false); router.push('/notificaciones') }}
                className="w-full text-center text-xs font-semibold flex items-center justify-center gap-1"
                style={{ color: 'var(--accent)' }}
              >
                Ver historial completo <ChevronRight size={12} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Avatar / Usuario */}
      <div className="flex items-center gap-2 pl-2 border-l border-slate-200 flex-shrink-0">
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--accent-light)' }}>
          <User size={16} style={{ color: 'var(--accent)' }} />
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-semibold text-slate-700 leading-tight">{tallerNombre}</p>
          <p className="text-xs text-slate-400">{tallerEmail}</p>
        </div>
      </div>
    </header>
  )
}
