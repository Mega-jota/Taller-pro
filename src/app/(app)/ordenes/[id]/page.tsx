'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { ArrowLeft, Send, CheckCircle, Car, User, Wrench, MessageSquare, Mail, Phone, Clock } from 'lucide-react'

const estadosPosibles = [
  { value: 'recibido', label: 'Recibido', cls: 'bg-blue-500' },
  { value: 'diagnostico', label: 'En diagnóstico', cls: 'bg-yellow-500' },
  { value: 'en_proceso', label: 'En reparación', cls: 'bg-orange-500' },
  { value: 'listo', label: 'Listo para retirar', cls: 'bg-green-500' },
  { value: 'entregado', label: 'Entregado', cls: 'bg-slate-400' },
]

const otData = {
  id: '1', numero: 'OT-2026-0012', estado: 'en_proceso', prioridad: 'alta',
  vehiculo: { patente: 'ABCD12', marca: 'Toyota', modelo: 'Hilux', ano: 2021, km: 85000 },
  cliente: { nombre: 'LogiChile SpA', telefono: '+56 9 8765 4321', email: 'flota@logichile.cl', whatsapp: '+56 9 8765 4321' },
  mecanico: 'Carlos Rodríguez',
  problema: 'Cambio de correa de distribución + revisión general del motor',
  diagnostico: 'Se confirma desgaste en correa de distribución. Se recomienda cambio completo del kit (correa, tensor y bomba de agua).',
  fecha: '2026-05-18', estimada: '2026-05-20',
  costo_estimado: 450000, costo_total: null,
  items: [
    { descripcion: 'Kit correa de distribución completo', tipo: 'repuesto', cantidad: 1, precio: 180000 },
    { descripcion: 'Mano de obra cambio distribución', tipo: 'mano_obra', cantidad: 1, precio: 200000 },
    { descripcion: 'Aceite motor 5W-30 (4L)', tipo: 'insumo', cantidad: 1, precio: 45000 },
    { descripcion: 'Filtro de aceite', tipo: 'repuesto', cantidad: 1, precio: 25000 },
  ],
  historial: [
    { fecha: '2026-05-18 09:15', estado: 'recibido', mensaje: 'Vehículo recibido en taller. Se notificó al cliente.', notif: ['email', 'whatsapp'], usuario: 'Recepción' },
    { fecha: '2026-05-18 10:30', estado: 'diagnostico', mensaje: 'Vehículo en diagnóstico con Carlos R.', notif: ['whatsapp'], usuario: 'Carlos R.' },
    { fecha: '2026-05-18 14:00', estado: 'en_proceso', mensaje: 'Iniciado cambio de kit de distribución. Se estimó entrega para el 20/05.', notif: ['email', 'whatsapp'], usuario: 'Carlos R.' },
  ]
}

const notifIcon: Record<string, string> = { email: '📧', whatsapp: '💬', sms: '📱' }

export default function DetalleOTPage() {
  const [estado, setEstado] = useState(otData.estado)
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [historial, setHistorial] = useState(otData.historial)

  const total = otData.items.reduce((s, it) => s + it.cantidad * it.precio, 0)
  const estadoActual = estadosPosibles.find(e => e.value === estado)
  const siguienteIdx = estadosPosibles.findIndex(e => e.value === estado) + 1

  const avanzarEstado = () => {
    if (siguienteIdx < estadosPosibles.length) {
      const nuevoEstado = estadosPosibles[siguienteIdx].value
      setEstado(nuevoEstado)
      const nuevoItem = {
        fecha: new Date().toLocaleString('es-CL'),
        estado: nuevoEstado, mensaje: `Estado actualizado a "${estadosPosibles[siguienteIdx].label}"`,
        notif: ['email', 'whatsapp'], usuario: 'Sistema'
      }
      setHistorial([...historial, nuevoItem])
    }
  }

  const enviarActualizacion = () => {
    if (!mensaje.trim()) return
    setEnviando(true)
    setTimeout(() => {
      setHistorial([...historial, {
        fecha: new Date().toLocaleString('es-CL'), estado,
        mensaje, notif: ['whatsapp'], usuario: 'Taller'
      }])
      setMensaje('')
      setEnviando(false)
    }, 1000)
  }

  return (
    <div className="fade-in">
      <Topbar title={otData.numero} subtitle={`${otData.vehiculo.patente} · ${otData.vehiculo.marca} ${otData.vehiculo.modelo}`} />
      <div className="p-6 space-y-5">
        <Link href="/ordenes" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={15} /> Volver a órdenes
        </Link>

        {/* Header con estado */}
        <div className="card p-5 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${estadoActual?.cls} flex items-center justify-center`}>
              <Wrench size={22} color="white" />
            </div>
            <div>
              <p className="font-bold text-xl text-slate-800">{otData.numero}</p>
              <p className="text-sm text-slate-500">{estadoActual?.label} · Prioridad {otData.prioridad}</p>
            </div>
          </div>
          {/* Barra de progreso */}
          <div className="flex items-center gap-1">
            {estadosPosibles.slice(0, -1).map((e, i) => {
              const currentIdx = estadosPosibles.findIndex(s => s.value === estado)
              const done = i <= currentIdx
              return (
                <div key={e.value} className="flex items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? e.cls + ' text-white' : 'bg-slate-200 text-slate-400'}`}>
                    {i + 1}
                  </div>
                  {i < estadosPosibles.length - 2 && <div className={`w-8 h-0.5 ${i < currentIdx ? 'bg-green-400' : 'bg-slate-200'}`} />}
                </div>
              )
            })}
          </div>
          {siguienteIdx < estadosPosibles.length && (
            <button onClick={avanzarEstado}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold text-sm"
              style={{ backgroundColor: 'var(--accent)' }}>
              <CheckCircle size={16} /> Avanzar a: {estadosPosibles[siguienteIdx].label}
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Columna izquierda */}
          <div className="col-span-2 space-y-5">

            {/* Datos del trabajo */}
            <div className="card p-5 space-y-4">
              <p className="font-bold text-slate-700 border-b border-slate-100 pb-2">Descripción del trabajo</p>
              <div>
                <p className="text-xs text-slate-400 mb-1">Problema reportado</p>
                <p className="text-sm text-slate-700">{otData.problema}</p>
              </div>
              {otData.diagnostico && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">Diagnóstico</p>
                  <p className="text-sm text-slate-700">{otData.diagnostico}</p>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="card p-5">
              <p className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-4">Presupuesto</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 uppercase">
                    <th className="text-left pb-2">Ítem</th>
                    <th className="text-center pb-2">Tipo</th>
                    <th className="text-right pb-2">Cant.</th>
                    <th className="text-right pb-2">Precio</th>
                    <th className="text-right pb-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {otData.items.map((it, i) => (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="py-2 text-slate-700">{it.descripcion}</td>
                      <td className="py-2 text-center">
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{it.tipo}</span>
                      </td>
                      <td className="py-2 text-right text-slate-600">{it.cantidad}</td>
                      <td className="py-2 text-right text-slate-600">${it.precio.toLocaleString('es-CL')}</td>
                      <td className="py-2 text-right font-semibold text-slate-800">${(it.cantidad * it.precio).toLocaleString('es-CL')}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-200">
                    <td colSpan={4} className="pt-3 font-bold text-slate-700">TOTAL</td>
                    <td className="pt-3 text-right font-bold text-lg text-slate-800">${total.toLocaleString('es-CL')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Historial + enviar mensaje */}
            <div className="card p-5">
              <p className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-4">Historial y comunicaciones</p>
              <div className="space-y-3 mb-5">
                {historial.map((h, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare size={13} className="text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm text-slate-700">{h.mensaje}</p>
                        <div className="flex gap-1 ml-2">
                          {h.notif.map(n => <span key={n} title={n} className="text-base">{notifIcon[n]}</span>)}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{h.fecha} · {h.usuario}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Enviar update */}
              <div className="border-t border-slate-100 pt-4">
                <p className="text-sm font-medium text-slate-600 mb-2">Enviar actualización al cliente</p>
                <div className="flex gap-2">
                  <textarea
                    className="input flex-1 resize-none text-sm"
                    rows={2}
                    placeholder="Ej: Su vehículo está listo. Puede retirarlo en horario de oficina."
                    value={mensaje}
                    onChange={e => setMensaje(e.target.value)}
                  />
                  <button onClick={enviarActualizacion} disabled={enviando || !mensaje.trim()}
                    className="px-4 rounded-lg text-white font-semibold flex items-center gap-2 text-sm self-stretch"
                    style={{ backgroundColor: enviando ? '#93c5fd' : 'var(--accent)' }}>
                    <Send size={15} />
                    {enviando ? '...' : 'Enviar'}
                  </button>
                </div>
                <div className="flex gap-3 mt-2">
                  {[{ id: 'email', label: '📧 Email' }, { id: 'whatsapp', label: '💬 WhatsApp' }, { id: 'sms', label: '📱 SMS' }].map(n => (
                    <label key={n.id} className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                      <input type="checkbox" defaultChecked={n.id !== 'sms'} className="w-3.5 h-3.5" />
                      {n.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-5">
            {/* Vehículo */}
            <div className="card p-5">
              <p className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-3 flex items-center gap-2">
                <Car size={15} /> Vehículo
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Patente</span><span className="font-mono font-bold">{otData.vehiculo.patente}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Vehículo</span><span>{otData.vehiculo.marca} {otData.vehiculo.modelo}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Año</span><span>{otData.vehiculo.ano}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Km ingreso</span><span>{otData.vehiculo.km.toLocaleString('es-CL')}</span></div>
              </div>
            </div>

            {/* Cliente */}
            <div className="card p-5">
              <p className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-3 flex items-center gap-2">
                <User size={15} /> Cliente
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-slate-700">{otData.cliente.nombre}</p>
                <div className="flex items-center gap-2 text-slate-500"><Phone size={12} />{otData.cliente.telefono}</div>
                <div className="flex items-center gap-2 text-slate-500"><Mail size={12} />{otData.cliente.email}</div>
              </div>
            </div>

            {/* Fechas */}
            <div className="card p-5">
              <p className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-3 flex items-center gap-2">
                <Clock size={15} /> Fechas
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Ingreso</span><span>{new Date(otData.fecha).toLocaleDateString('es-CL')}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Estimada</span><span className="font-semibold text-orange-600">{new Date(otData.estimada).toLocaleDateString('es-CL')}</span></div>
              </div>
            </div>

            {/* Costo */}
            <div className="card p-5">
              <p className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-3">Costo estimado</p>
              <p className="text-3xl font-bold text-slate-800">${total.toLocaleString('es-CL')}</p>
              <p className="text-xs text-slate-400 mt-1">IVA no incluido</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
