'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard, Car, Users, ClipboardList, Search, Bell,
  Settings, LogOut, Wrench, ChevronRight, Building2
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/vehiculos', icon: Car, label: 'Vehículos' },
  { href: '/clientes', icon: Users, label: 'Clientes' },
  { href: '/ordenes', icon: ClipboardList, label: 'Órdenes de Trabajo' },
  { href: '/inspecciones', icon: Search, label: 'Inspecciones' },
  { href: '/empresas', icon: Building2, label: 'Empresas / Flota' },
]

const bottomItems = [
  { href: '/notificaciones', icon: Bell, label: 'Notificaciones' },
  { href: '/configuracion', icon: Settings, label: 'Configuración' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [tallerNombre, setTallerNombre] = useState('Mi Taller Mecánico')
  useEffect(() => {
    const n = localStorage.getItem('taller_nombre')
    if (n) setTallerNombre(n)
  }, [])

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col z-50"
      style={{ backgroundColor: 'var(--sidebar-bg)' }}>

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'var(--sidebar-active)' }}>
          <Wrench size={18} color="white" />
        </div>
        <div>
          <p className="text-white font-bold text-base leading-tight">TallerPro</p>
          <p className="text-xs" style={{ color: 'var(--sidebar-text)' }}>Sistema de Taller</p>
        </div>
      </div>

      {/* Taller activo */}
      <div className="mx-3 my-3 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <p className="text-xs" style={{ color: 'var(--sidebar-text)' }}>Taller activo</p>
        <p className="text-white text-sm font-semibold truncate">{tallerNombre}</p>
      </div>

      {/* Navegacion principal */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <p className="text-xs font-semibold px-2 mb-2 uppercase tracking-wider"
          style={{ color: 'rgba(203,213,225,0.5)' }}>Menu principal</p>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href}
              className={`sidebar-link mb-1 ${active ? 'active' : ''}`}>
              <Icon size={17} />
              <span>{label}</span>
              {active && <ChevronRight size={14} className="ml-auto opacity-70" />}
            </Link>
          )
        })}
      </nav>

      {/* Parte inferior */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        {bottomItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}
            className={`sidebar-link mb-1 ${pathname === href ? 'active' : ''}`}>
            <Icon size={17} />
            <span>{label}</span>
          </Link>
        ))}
        <button className="sidebar-link w-full mt-1 text-red-300 hover:text-red-200"
          onClick={() => {}}>
          <LogOut size={17} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}
