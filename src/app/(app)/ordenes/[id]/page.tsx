'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { ArrowLeft, Send, CheckCircle, Car, User, Wrench, MessageSquare, Mail, Phone, Clock } from 'lucide-react'

const estadosPosibles = [
  { value: 'recibido',    label: 'Recibido',           cls: 'bg-blue-500' },
  { value: 'diagnostico', label: 'En diagnóstico',     cls: 'bg-yellow-500' },
  { value: 'en_proceso',  label: 'En reparación',      cls: 'bg-orange-500' },
  { value: 'listo',       label: 'Listo para retirar', cls: 'bg-green-500' },
  { value: 'entregado',   label: 'Entregado',          cls: 'bg-slate-400' },
]

const OTS: Record<string, {
  id: string; numero: string; estado: string; prioridad: string;
  vehiculo: { patente: string; marca: string; modelo: string; ano: number; km: number }
  cliente: { nombre: string; telefono: string; email: string }
  mecanico: string; problema: string; diagnostico: string
  fecha: string; estimada: string
  items: { descripcion: string; tipo: string; cantidad: number; precio: number }[]
  historial: { fecha: string; estado: string; mensaje: string; notif: string[]; usuario: string }[]
}> = {
  '8': {
    id: '8', numero: 'OT-2026-0008', estado: 'entregado', prioridad: 'baja',
    vehiculo: { patente: 'QRST90', marca: 'Hyundai', modelo: 'Tucson', ano: 2020, km: 72000 },
    cliente: { nombre: 'Ana González', telefono: '+56 9 9012 3456', email: 'ana.glez@hotmail.com' },
    mecanico: 'Pedro Muñoz', problema: 'Mantención preventiva 70.000 km',
    diagnostico: 'Revisión completa. Cambio de aceite, filtros y pastillas traseras.',
    fecha: '2026-05-08', estimada: '2026-05-08',
    items: [
      { descripcion: 'Aceite motor 5W-30 (4L)', tipo: 'insumo', cantidad: 1, precio: 42000 },
      { descripcion: 'Filtro de aceite', tipo: 'repuesto', cantidad: 1, precio: 12000 },
      { descripcion: 'Pastillas de freno traseras', tipo: 'repuesto', cantidad: 1, precio: 35000 },
      { descripcion: 'Mano de obra mantención', tipo: 'mano_obra', cantidad: 1, precio: 45000 },
    ],
    historial: [
      { fecha: '08/05/2026 09:00', estado: 'recibido', mensaje: 'Vehículo recibido para mantención 70.000 km.', notif: ['email'], usuario: 'Recepción' },
      { fecha: '08/05/2026 11:30', estado: 'en_proceso', mensaje: 'Iniciada la mantención preventiva.', notif: ['whatsapp'], usuario: 'Pedro M.' },
      { fecha: '08/05/2026 14:00', estado: 'listo', mensaje: 'Mantención completa. Vehículo listo.', notif: ['email', 'whatsapp'], usuario: 'Pedro M.' },
      { fecha: '08/05/2026 16:30', estado: 'entregado', mensaje: 'Vehículo entregado al cliente.', notif: [], usuario: 'Recepción' },
    ]
  },
  '9': {
    id: '9', numero: 'OT-2026-0009', estado: 'recibido', prioridad: 'normal',
    vehiculo: { patente: 'MNOP78', marca: 'Nissan', modelo: 'Frontier', ano: 2019, km: 112000 },
    cliente: { nombre: 'Roberto Silva', telefono: '+56 9 5678 1234', email: 'rsilva@gmail.com' },
    mecanico: 'Sin asignar', problema: 'Ruido en suspensión delantera al girar',
    diagnostico: '',
    fecha: '2026-05-18', estimada: '2026-05-21',
    items: [],
    historial: [
      { fecha: '18/05/2026 08:30', estado: 'recibido', mensaje: 'Vehículo ingresado. Pendiente diagnóstico.', notif: ['email'], usuario: 'Recepción' },
    ]
  },
  '10': {
    id: '10', numero: 'OT-2026-0010', estado: 'diagnostico', prioridad: 'urgente',
    vehiculo: { patente: 'IJKL56', marca: 'Ford', modelo: 'Ranger', ano: 2021, km: 58000 },
    cliente: { nombre: 'Empresa LogiChile', telefono: '+56 2 2345 6789', email: 'flota@logichile.cl' },
    mecanico: 'Carlos Rodríguez', problema: 'Testigo de motor encendido, pérdida de potencia',
    diagnostico: 'Scanner muestra código P0299 (turbo baja presión). Revisando actuador de turbina.',
    fecha: '2026-05-16', estimada: '2026-05-22',
    items: [
      { descripcion: 'Diagnóstico computarizado', tipo: 'servicio', cantidad: 1, precio: 35000 },
    ],
    historial: [
      { fecha: '16/05/2026 10:00', estado: 'recibido', mensaje: 'Vehículo recibido. Cliente indica pérdida de potencia.', notif: ['email'], usuario: 'Recepción' },
      { fecha: '16/05/2026 11:15', estado: 'diagnostico', mensaje: 'En diagnóstico con Carlos R. Scanner conectado.', notif: ['whatsapp'], usuario: 'Carlos R.' },
    ]
  },
  '11': {
    id: '11', numero: 'OT-2026-0011', estado: 'listo', prioridad: 'normal',
    vehiculo: { patente: 'EFGH34', marca: 'Chevrolet', modelo: 'Spark', ano: 2020, km: 42000 },
    cliente: { nombre: 'María López', telefono: '+56 9 1234 5678', email: 'maria@empresa.cl' },
    mecanico: 'Pedro Muñoz', problema: 'Cambio de frenos delanteros y alineación',
    diagnostico: 'Discos y pastillas delanteras con desgaste excesivo. Alineación fuera de rango.',
    fecha: '2026-05-14', estimada: '2026-05-15',
    items: [
      { descripcion: 'Discos de freno delanteros (par)', tipo: 'repuesto', cantidad: 1, precio: 65000 },
      { descripcion: 'Pastillas de freno delanteras', tipo: 'repuesto', cantidad: 1, precio: 28000 },
      { descripcion: 'Alineación al computador', tipo: 'servicio', cantidad: 1, precio: 25000 },
      { descripcion: 'Mano de obra frenos', tipo: 'mano_obra', cantidad: 1, precio: 55000 },
    ],
    historial: [
      { fecha: '14/05/2026 09:00', estado: 'recibido', mensaje: 'Ingreso por cambio de frenos y alineación.', notif: ['email'], usuario: 'Recepción' },
      { fecha: '14/05/2026 12:00', estado: 'en_proceso', mensaje: 'Iniciado cambio de frenos delanteros.', notif: [], usuario: 'Pedro M.' },
      { fecha: '15/05/2026 10:00', estado: 'listo', mensaje: 'Trabajo completado. Vehículo listo para retiro.', notif: ['email', 'whatsapp'], usuario: 'Pedro M.' },
    ]
  },
  '12': {
    id: '12', numero: 'OT-2026-0012', estado: 'en_proceso', prioridad: 'alta',
    vehiculo: { patente: 'ABCD12', marca: 'Toyota', modelo: 'Hilux', ano: 2021, km: 85000 },
    cliente: { nombre: 'Juan Pérez', telefono: '+56 9 8765 4321', email: 'juan@gmail.com' },
    mecanico: 'Carlos Rodríguez', problema: 'Cambio de correa de distribución + revisión general del motor',
    diagnostico: 'Se confirma desgaste en correa de distribución. Se recomienda cambio completo del kit (correa, tensor y bomba de agua).',
    fecha: '2026-05-18', estimada: '2026-05-20',
    items: [
      { descripcion: 'Kit correa de distribución completo', tipo: 'repuesto', cantidad: 1, precio: 180000 },
      { descripcion: 'Mano de obra cambio distribución', tipo: 'mano_obra', cantidad: 1, precio: 200000 },
      { descripcion: 'Aceite motor 5W-30 (4L)', tipo: 'insumo', cantidad: 1, precio: 45000 },
      { descripcion: 'Filtro de aceite', tipo: 'repuesto', cantidad: 1, precio: 25000 },
    ],
    historial: [
      { fecha: '18/05/2026 09:15', estado: 'recibido', mensaje: 'Vehículo recibido en taller. Se notificó al cliente.', notif: ['email', 'whatsapp'], usuario: 'Recepción' },
      { fecha: '18/05/2026 10:30', estado: 'diagnostico', mensaje: 'Vehículo en diagnóstico con Carlos R.', notif: ['whatsapp'], usuario: 'Carlos R.' },
      { fecha: '18/05/2026 14:00', estado: 'en_proceso', mensaje: 'Iniciado cambio de kit de distribución. Entrega estimada 20/05.', notif: ['email', 'whatsapp'], usuario: 'Carlos R.' },
    ]
  },
}

// OT por defecto para IDs no encontrados
const otDefault = OTS['12']

const notifIcon: Record<string, string> = { email: '📧', whatsapp: '💬', sms: '📱' }

export default function DetalleOTPage() {
  const params = useParams()
  const id = String(params.id)
  const otBase = OTS[id] || { ...otDefault, id, numero: `OT-2026-${String(id).padStart(4, '0')}` }

  const [estado, setEstado] = useState(otBase.estado)
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [historial, setHistorial] = useState(otBase.historial)

  const total = otBase.items.reduce((s, it) => s + it.cantidad * it.precio, 0)
  const estadoActual = estadosPosibles.find(e => e.value === estado)
  const siguienteIdx = estadosPosibles.findIndex(e => e.value === estado) + 1

  const avanzarEstado = () => {
    if (siguienteIdx < estadosPosibles.length) {
      const nuevoEstado = estadosPosibles[siguienteIdx].value
      setEstado(nuevoEstado)
      setHistorial([...historial, {
        fecha: new Date().toLocaleString('es-CL'),
        estado: nuevoEstado,
        mensaje: `Estado actualizado a "${estadosPosibles[siguienteIdx].label}"`,
        notif: ['email', 'whatsapp'],
        usuario: 'Sistema'
      }])
    }
  }

  const enviarActualizacion = () => {
    if (!mensaje.trim()) return
    setEnviando(true)
    setTimeout(() => {
      setHistorial([...historial, {
        fecha: new Date().toLocaleString('es-CL'),
        estado,
        mensaje,
        notif: ['whatsapp'],
        usuario: 'Taller'
      }])
      setMensaje('')
      setEnviando(false)
    }, 1000)
  }

  return (
    <div className="fade-in">
      <Topbar
        title={otBase.numero}
        subtitle={`${otBase.vehiculo.patente} · ${otBase.vehiculo.marca} ${otBase.vehiculo.modelo}`}
      />
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
              <p className="font-bold text-xl text-slate-800">{otBase.numero}</p>
              <p className="text-sm text-slate-500">{estadoActual?.label} · Prioridad {otBase.prioridad}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {estadosPosibles.slice(0, -1).map((e, i) => {
              const currentIdx = estadosPosibles.findIndex(s => s.value === estado)
              const done = i <= currentIdx
              return (
                <div key={e.value} className="flex items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? e.cls + ' text-white' : 'bg-slate-200 text-slate-400'}`}>
                    {i + 1}
                  </div>
                  {i < estadosPosibles.length - 2 && (
                    <div className={`w-8 h-0.5 ${i < currentIdx ? 'bg-green-400' : 'bg-slate-200'}`} />
                  )}
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
          <div className="col-span-2 space-y-5">
            <div className="card p-5 space-y-4">
              <p className="font-bold text-slate-700 border-b border-slate-100 pb-2">Descripción del trabajo</p>
              <div>
                <p className="text-xs text-slate-400 mb-1">Problema reportado</p>
                <p className="text-sm text-slate-700">{otBase.problema}</p>
              </div>
              {otBase.diagnostico && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">Diagnóstico</p>
                  <p className="text-sm text-slate-700">{otBase.diagnostico}</p>
                </div>
              )}
            </div>

            <div className="card p-5">
              <p className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-4">Presupuesto</p>
              {otBase.items.length === 0 ? (
                <p className="text-sm text-slate-400 italic">Sin ítems aún. Pendiente diagnóstico.</p>
              ) : (
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
                    {otBase.items.map((it, i) => (
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
              )}
            </div>

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

          <div className="space-y-5">
            <div className="card p-5">
              <p className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-3 flex items-center gap-2">
                <Car size={15} /> Vehículo
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Patente</span><span className="font-mono font-bold">{otBase.vehiculo.patente}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Vehículo</span><span>{otBase.vehiculo.marca} {otBase.vehiculo.modelo}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Año</span><span>{otBase.vehiculo.ano}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Km ingreso</span><span>{otBase.vehiculo.km.toLocaleString('es-CL')}</span></div>
              </div>
            </div>

            <div className="card p-5">
              <p className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-3 flex items-center gap-2">
                <User size={15} /> Cliente
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-slate-700">{otBase.cliente.nombre}</p>
                <div className="flex items-center gap-2 text-slate-500"><Phone size={12} />{otBase.cliente.telefono}</div>
                <div className="flex items-center gap-2 text-slate-500"><Mail size={12} />{otBase.cliente.email}</div>
              </div>
            </div>

            <div className="card p-5">
              <p className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-3 flex items-center gap-2">
                <Clock size={15} /> Fechas
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Ingreso</span><span>{new Date(otBase.fecha).toLocaleDateString('es-CL')}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Estimada</span><span className="font-semibold text-orange-600">{new Date(otBase.estimada).toLocaleDateString('es-CL')}</span></div>
              </div>
            </div>

            {total > 0 && (
              <div className="card p-5">
                <p className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-3">Costo estimado</p>
                <p className="text-3xl font-bold text-slate-800">${total.toLocaleString('es-CL')}</p>
                <p className="text-xs text-slate-400 mt-1">IVA no incluido</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
