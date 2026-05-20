'use client'
import { Bell, Search, User } from 'lucide-react'

interface TopbarProps {
  title: string
  subtitle?: string
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-30">
      <div className="flex-1">
        <h1 className="text-lg font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      {/* Buscador rápido */}
      <div className="relative hidden md:block">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Buscar patente, cliente..."
          className="pl-8 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg w-64 outline-none focus:border-blue-400 focus:bg-white transition-colors"
        />
      </div>

      {/* Notificaciones */}
      <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
        <Bell size={19} className="text-slate-600" />
        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">3</span>
      </button>

      {/* Avatar */}
      <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--accent-light)' }}>
          <User size={16} style={{ color: 'var(--accent)' }} />
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-semibold text-slate-700 leading-tight">Admin</p>
          <p className="text-xs text-slate-400">admin@taller.cl</p>
        </div>
      </div>
    </header>
  )
}
