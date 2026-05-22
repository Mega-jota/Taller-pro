'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import {
  ArrowLeft, FileDown, CheckCircle, XCircle, Minus,
  Car, User, Calendar, Gauge, ChevronDown, ChevronUp, Loader2
} from 'lucide-react'

const SECCIONES = [
  {
    numero: 1, nombre: 'Body Kit', emoji: '🚗',
    items: [
      'Revisión latas', 'Revisión estado pintura', 'Revisión choques', 'Revisión parabrisas',
      'Revisión apertura y cierre cuadratura puertas', 'Revisión espejos laterales',
      'Revisión neumático repuesto', 'Revisión herramientas auto', 'Revisión botiquín',
      'Revisión dado de seguridad', 'Revisión vidrios de puertas', 'Revisión kilometraje',
      'Revisión VIN visual en chasis', 'Revisión molduras e insignias',
      'Revisión ópticos y focos', 'Revisión antena eléctrica', 'Revisión alarma',
    ]
  },
  {
    numero: 2, nombre: 'Interior', emoji: '🪑',
    items: [
      'Revisión estado llaves (controles y apertura)', 'Revisión arranque motor',
      'Revisión luces y testigos tablero apagados', 'Revisión vibración ralentí',
      'Revisión estado plásticos air bag', 'Revisión dirección',
      'Revisión ruidos de embrague', 'Revisión dureza en pedal de embrague',
      'Revisión de capota eléctrica', 'Revisión sunroof',
      'Revisión corte de embrague', 'Revisión pedal de freno',
      'Revisión pedal de aceleración', 'Revisión bocina',
      'Revisión cierre centralizado', 'Revisión alza vidrios eléctricos',
      'Revisión espejos eléctricos laterales', 'Revisión señalizadores', 'Revisión luces',
      'Revisión comandos calefacción y AC', 'Revisión controles al volante',
      'Revisión sapitos de agua delanteros y traseros', 'Revisión limpia parabrisas',
      'Revisión radio (USB, aux, cd y emisoras)', 'Revisión fugas de agua radiador calefacción',
      'Revisión calefacción', 'Revisión enfriamiento AC',
      'Revisión estado general interior', 'Revisión tapices',
      'Revisión eficacia freno mano (4 a 6 dientes)', 'Revisión sensores acercamiento',
      'Revisión cámara de retroceso', 'Revisión correderas asientos',
      'Revisión cinturones seguridad',
    ]
  },
  {
    numero: 3, nombre: 'Motor', emoji: '⚙️',
    items: [
      'Revisión ruidos de golpeteo de motor', 'Revisión ruidos golpe valvular o taquis',
      'Revisión ruidos de chillidos en correas', 'Revisión ruidos de bomba de agua',
      'Revisión ruidos en bomba de dirección hidráulica', 'Revisión ruidos rodamientos varios',
      'Revisión ruidos en rodamiento de alternador', 'Revisión ruidos de fuga de escape',
      'Revisión ruidos de fuga de aire', 'Revisión ruidos en caja de cambios',
      'Revisión ruido rodamiento empuje', 'Revisión fugas de agua en mangueras de radiador',
      'Revisión fugas mangueras de agua', 'Revisión fugas y óxido en tapa termostato',
      'Revisión fugas y óxido en carcaza termostato', 'Revisión fugas y óxido en bomba de agua',
      'Revisión fuga y óxido en tapa depósito radiador', 'Revisión fuga y óxido en tapa depósito agua',
      'Revisión fuga en mangueras de calefacción', 'Revisión fugas y óxido en radiador',
      'Revisión fugas y óxido en sellos de agua de motor', 'Revisión fugas de aceite en tapa de válvulas',
      'Revisión fugas de aceite en empaquetadura de culatas', 'Revisión fugas aceite en retén de distribución',
      'Revisión fugas aceite en cárter', 'Revisión fugas aceite en retén de cola caja de cambios',
      'Revisión fugas aceite en diferencial', 'Revisión fugas aceite en filtro de aceite',
      'Revisión tapa depósito de agua sin aceite', 'Revisión tapa de aceite libre de agua',
      'Revisión fuga de líquido de frenos', 'Revisión fuga de líquido hidráulico',
      'Revisión fuga de líquido limpia parabrisas', 'Revisión correa AC',
      'Revisión correa alternador', 'Revisión correa de dirección',
      'Revisión ruidos en distribución', 'Revisión nivel de aceite',
      'Revisión nivel de coolant', 'Revisión nivel de líquido de frenos',
      'Revisión nivel líquido hidráulico', 'Revisión escape (sin humo negro, blanco o azul)',
      'Revisión fugas de escape', 'Revisión soporte motor',
      'Revisión golpeteo en inyectores (diésel)', 'Revisión empaquetaduras',
      'Revisión compresor de AC',
    ]
  },
  {
    numero: 4, nombre: 'Suspensión y Frenos', emoji: '🔩',
    items: [
      'Revisión visual neumáticos', 'Revisión de cazoletas', 'Revisión de espirales',
      'Revisión amortiguadores', 'Revisión discos de freno delanteros',
      'Revisión discos de frenos traseros', 'Revisión pastillas delanteras',
      'Revisión pastillas traseras', 'Revisión pasadores de caliper delanteros',
      'Revisión pasadores de caliper traseros', 'Revisión fuga líquido freno por niples',
      'Revisión fuga líquido freno por flexibles', 'Revisión cable sensor ABS',
      'Revisión sensores pastillas delanteros', 'Revisión sensores pastillas traseros',
      'Revisión fuelles de caja de dirección', 'Revisión fuelles de homocinética',
      'Revisión bujes de bandejas', 'Revisión rótulas de bandejas', 'Revisión bandejas',
      'Revisión terminales de dirección', 'Revisión juego lateral de la rueda',
      'Revisión juego axial de la rueda', 'Revisión rodamientos de masa delanteros',
      'Revisión rodamientos de masa traseros', 'Revisión paquetes de resorte',
      'Revisión barras de torsión', 'Revisión crucetas de cardán',
      'Revisión cardán', 'Revisión cardán corto con transfer',
    ]
  },
  {
    numero: 5, nombre: 'Sistema Eléctrico', emoji: '⚡',
    items: [
      'Scanner (códigos de falla)', 'Revisión carga batería', 'Revisión carga alternador',
      'Revisión funcionamiento de alarma', 'Revisión fusibles',
      'Revisión motor de partida',
    ]
  },
  {
    numero: 6, nombre: 'Revisión en Ruta', emoji: '🛣️',
    items: [
      'Revisión alineación', 'Revisión balanceo', 'Revisión caja de cambios',
      'Revisión embrague', 'Revisión ruidos de dirección', 'Revisión frenos',
      'Revisión temperatura motor', 'Revisión indicadores tablero',
      'Revisión velocidad crucero', 'Revisión motor en ruta',
      'Revisión humo', 'Revisión ruidos de escape', 'Revisión sonidos de carrocería',
      'Revisión ruidos de suspensión', 'Revisión cremallera de dirección',
      'Revisión ruidos de correas', 'Revisión eficacia frenos',
      'Revisión cambios automáticos', 'Revisión funcionamiento de 4WD',
      'Revisión ruidos de crucetas y diferencial', 'Revisión funcionamiento de turbo',
    ]
  },
]

function generarItems() {
  const estados: Array<'cumple' | 'no_cumple' | 'na'> = ['cumple', 'cumple', 'cumple', 'cumple', 'no_cumple', 'na']
  const result: Record<string, { estado: 'cumple' | 'no_cumple' | 'na'; obs: string }> = {}
  SECCIONES.forEach(sec => {
    sec.items.forEach((_, idx) => {
      const estado = estados[Math.floor(Math.random() * estados.length)]
      result[`${sec.numero}-${idx}`] = {
        estado,
        obs: estado === 'no_cumple' ? 'Requiere atención' : '',
      }
    })
  })
  return result
}

const itemsData = generarItems()

const estadoConfig = {
  cumple: { label: 'CUMPLE', cls: 'bg-green-100 text-green-700', icon: CheckCircle },
  no_cumple: { label: 'NO CUMPLE', cls: 'bg-red-100 text-red-700', icon: XCircle },
  na: { label: 'N/A', cls: 'bg-slate-100 text-slate-500', icon: Minus },
}

const INFO = {
  codigo: '#12399',
  vehiculo: 'IJKL56 · Ford Ranger 2022',
  cliente: 'María López',
  fecha: '17 de mayo, 2026',
  km: '61.000 km',
  mecanico: 'Carlos Rodríguez',
  observaciones: [
    'Vehículo en buen estado general para su año y kilometraje.',
    'Se recomienda revisar pastillas de freno en próxima mantención.',
    'Leve fuga de aceite en retén de distribución — monitorear.',
  ]
}

export default function DetalleInspeccionPage() {
  const [seccionAbierta, setSeccionAbierta] = useState<number | null>(1)
  const [exportando, setExportando] = useState(false)

  const totalCumple = Object.values(itemsData).filter(i => i.estado === 'cumple').length
  const totalNoCumple = Object.values(itemsData).filter(i => i.estado === 'no_cumple').length
  const totalNa = Object.values(itemsData).filter(i => i.estado === 'na').length
  const total = totalCumple + totalNoCumple + totalNa
  const pct = Math.round((totalCumple / (totalCumple + totalNoCumple || 1)) * 100)

  const exportarPDF = () => {
    setExportando(true)

    const seccionesHTML: string = SECCIONES.map(sec => {
      const secItems = sec.items.map((nombre, idx) => {
        const it = itemsData[`${sec.numero}-${idx}`]
        const estadoLabel = it.estado === 'cumple' ? 'CUMPLE' : it.estado === 'no_cumple' ? 'NO CUMPLE' : 'N/A'
        const estadoColor = it.estado === 'cumple' ? '#16a34a' : it.estado === 'no_cumple' ? '#dc2626' : '#94a3b8'
        const rowBg = it.estado === 'no_cumple' ? '#fff5f5' : 'white'
        return `
          <tr style="background:${rowBg}; border-bottom: 1px solid #f1f5f9;">
            <td style="padding:6px 8px; color:#94a3b8; font-size:11px; width:32px;">${idx + 1}</td>
            <td style="padding:6px 8px; font-size:12px; color:#374151;">${nombre}</td>
            <td style="padding:6px 8px; text-align:center; width:100px;">
              <span style="display:inline-block; padding:2px 8px; border-radius:4px; font-size:10px; font-weight:700; background:${it.estado === 'cumple' ? '#dcfce7' : it.estado === 'no_cumple' ? '#fee2e2' : '#f1f5f9'}; color:${estadoColor};">
                ${estadoLabel}
              </span>
            </td>
            <td style="padding:6px 8px; font-size:11px; color:#94a3b8; font-style:italic;">${it.obs || '—'}</td>
          </tr>`
      }).join('')

      const cumpleSec = sec.items.filter((_, idx) => itemsData[`${sec.numero}-${idx}`].estado === 'cumple').length
      const noCumpleSec = sec.items.filter((_, idx) => itemsData[`${sec.numero}-${idx}`].estado === 'no_cumple').length

      return `
        <div style="margin-bottom:20px; break-inside:avoid;">
          <div style="background:#f8fafc; padding:10px 14px; border-radius:8px 8px 0 0; border-bottom:2px solid #e2e8f0; display:flex; align-items:center; justify-content:space-between;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:18px;">${sec.emoji}</span>
              <span style="font-weight:700; color:#1e293b; font-size:13px;">${sec.numero}. ${sec.nombre}</span>
              <span style="color:#94a3b8; font-size:11px;">${sec.items.length} puntos</span>
            </div>
            <div style="display:flex; gap:12px; font-size:11px; font-weight:700;">
              <span style="color:#16a34a;">✅ ${cumpleSec}</span>
              <span style="color:#dc2626;">❌ ${noCumpleSec}</span>
            </div>
          </div>
          <table style="width:100%; border-collapse:collapse; border:1px solid #e2e8f0; border-top:0;">
            <thead>
              <tr style="background:#f8fafc;">
                <th style="padding:6px 8px; text-align:left; font-size:10px; color:#94a3b8; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">#</th>
                <th style="padding:6px 8px; text-align:left; font-size:10px; color:#94a3b8; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">Punto de revisión</th>
                <th style="padding:6px 8px; text-align:center; font-size:10px; color:#94a3b8; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">Estado</th>
                <th style="padding:6px 8px; text-align:left; font-size:10px; color:#94a3b8; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">Observación</th>
              </tr>
            </thead>
            <tbody>${seccionesHTML}</tbody>
          </table>
        </div>`
    }).join('')

    const pctColor = pct >= 80 ? '#16a34a' : pct >= 60 ? '#ea580c' : '#dc2626'

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Inspección ${INFO.codigo} — TallerPro</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1e293b; background: white; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body style="padding:32px; max-width:900px; margin:0 auto;">

  <!-- Header -->
  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px; padding-bottom:20px; border-bottom:2px solid #e2e8f0;">
    <div>
      <div style="font-size:11px; color:#94a3b8; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:4px;">Informe de Inspección Vehicular</div>
      <div style="font-size:28px; font-weight:800; color:#1e293b; font-family:monospace;">${INFO.codigo}</div>
      <div style="font-size:13px; color:#64748b; margin-top:4px;">Generado el ${new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:22px; font-weight:900; color:${pctColor};">${pct}%</div>
      <div style="font-size:11px; color:#94a3b8;">en buen estado</div>
      <div style="margin-top:8px; display:inline-block; padding:4px 12px; border-radius:20px; background:#dcfce7; color:#16a34a; font-size:11px; font-weight:700;">✅ Completada</div>
    </div>
  </div>

  <!-- Info vehículo -->
  <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:16px; margin-bottom:20px; background:#f8fafc; border-radius:12px; padding:16px;">
    <div>
      <div style="font-size:10px; color:#94a3b8; font-weight:600; text-transform:uppercase; margin-bottom:4px;">Vehículo</div>
      <div style="font-size:13px; font-weight:600; color:#1e293b;">${INFO.vehiculo}</div>
    </div>
    <div>
      <div style="font-size:10px; color:#94a3b8; font-weight:600; text-transform:uppercase; margin-bottom:4px;">Cliente</div>
      <div style="font-size:13px; font-weight:600; color:#1e293b;">${INFO.cliente}</div>
    </div>
    <div>
      <div style="font-size:10px; color:#94a3b8; font-weight:600; text-transform:uppercase; margin-bottom:4px;">Fecha</div>
      <div style="font-size:13px; font-weight:600; color:#1e293b;">${INFO.fecha}</div>
    </div>
    <div>
      <div style="font-size:10px; color:#94a3b8; font-weight:600; text-transform:uppercase; margin-bottom:4px;">Kilometraje</div>
      <div style="font-size:13px; font-weight:600; color:#1e293b;">${INFO.km}</div>
    </div>
  </div>

  <!-- Resumen global -->
  <div style="display:flex; gap:16px; margin-bottom:24px;">
    <div style="flex:1; background:#dcfce7; border-radius:10px; padding:14px 16px; text-align:center;">
      <div style="font-size:24px; font-weight:800; color:#16a34a;">${totalCumple}</div>
      <div style="font-size:11px; color:#16a34a; font-weight:600;">✅ CUMPLE</div>
    </div>
    <div style="flex:1; background:#fee2e2; border-radius:10px; padding:14px 16px; text-align:center;">
      <div style="font-size:24px; font-weight:800; color:#dc2626;">${totalNoCumple}</div>
      <div style="font-size:11px; color:#dc2626; font-weight:600;">❌ NO CUMPLE</div>
    </div>
    <div style="flex:1; background:#f1f5f9; border-radius:10px; padding:14px 16px; text-align:center;">
      <div style="font-size:24px; font-weight:800; color:#94a3b8;">${totalNa}</div>
      <div style="font-size:11px; color:#94a3b8; font-weight:600;">➖ N/A</div>
    </div>
    <div style="flex:1; background:#f8fafc; border-radius:10px; padding:14px 16px; text-align:center;">
      <div style="font-size:24px; font-weight:800; color:#64748b;">${total}</div>
      <div style="font-size:11px; color:#64748b; font-weight:600;">TOTAL PUNTOS</div>
    </div>
  </div>

  <!-- Barra global -->
  <div style="height:10px; background:#e2e8f0; border-radius:999px; overflow:hidden; display:flex; margin-bottom:28px;">
    <div style="width:${(totalCumple / total) * 100}%; background:#4ade80;"></div>
    <div style="width:${(totalNoCumple / total) * 100}%; background:#f87171;"></div>
    <div style="width:${(totalNa / total) * 100}%; background:#cbd5e1;"></div>
  </div>

  <!-- Secciones -->
  ${seccionesHTML}

  <!-- Observaciones generales -->
  <div style="margin-top:24px; padding:16px; background:#fffbeb; border-radius:10px; border-left:4px solid #f59e0b;">
    <div style="font-weight:700; color:#1e293b; margin-bottom:10px;">Observaciones generales</div>
    ${INFO.observaciones.map((obs, i) => `<div style="font-size:13px; color:#374151; margin-bottom:6px;">${i + 1}) ${obs}</div>`).join('')}
  </div>

  <!-- Footer -->
  <div style="margin-top:32px; padding-top:16px; border-top:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
    <div style="font-size:12px; color:#94a3b8;">TallerPro · Sistema de Gestión de Taller</div>
    <div style="font-size:12px; color:#94a3b8;">Inspección ${INFO.codigo} · ${INFO.mecanico}</div>
  </div>

</body>
</html>`

    // Usar iframe oculto para evitar bloqueo de popups
    const iframe = document.createElement('iframe')
    iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;border:0;'
    document.body.appendChild(iframe)

    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (doc) {
      doc.open()
      doc.write(html)
      doc.close()
      setTimeout(() => {
        iframe.contentWindow?.focus()
        iframe.contentWindow?.print()
        setTimeout(() => {
          document.body.removeChild(iframe)
          setExportando(false)
        }, 1000)
      }, 600)
    } else {
      setExportando(false)
    }
  }

  return (
    <div className="fade-in">
      <Topbar title="Inspección #12399" subtitle="Ford Ranger IJKL56 · 2022" />
      <div className="p-6 space-y-5">

        <div className="flex items-center justify-between">
          <Link href="/inspecciones" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
            <ArrowLeft size={15} /> Volver a inspecciones
          </Link>
          <button
            onClick={exportarPDF}
            disabled={exportando}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors disabled:opacity-60">
            {exportando
              ? <><Loader2 size={15} className="animate-spin" /> Generando...</>
              : <><FileDown size={15} /> Exportar PDF</>
            }
          </button>
        </div>

        {/* Header */}
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 card p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400 mb-1">Código interno</p>
                <p className="font-mono font-bold text-2xl text-slate-800">#12399</p>
              </div>
              <span className="badge bg-green-100 text-green-700">✅ Completada</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Car size={14} className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400">Vehículo</p>
                  <p className="font-semibold">IJKL56 · Ford Ranger 2022</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <User size={14} className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400">Cliente</p>
                  <p className="font-semibold">María López</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar size={14} className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400">Fecha</p>
                  <p className="font-semibold">17 de mayo, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Gauge size={14} className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400">Kilometraje</p>
                  <p className="font-semibold">61.000 km</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen */}
          <div className="card p-5 flex flex-col justify-center">
            <p className="text-sm font-semibold text-slate-600 mb-3">Resultado global</p>
            <div className="text-center mb-3">
              <p className="text-5xl font-bold" style={{ color: pct >= 80 ? '#16a34a' : pct >= 60 ? '#ea580c' : '#dc2626' }}>
                {pct}%
              </p>
              <p className="text-xs text-slate-400 mt-1">en buen estado</p>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-green-600 font-semibold">✅ Cumple</span>
                <span className="font-bold text-slate-700">{totalCumple}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-500 font-semibold">❌ No cumple</span>
                <span className="font-bold text-slate-700">{totalNoCumple}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">➖ N/A</span>
                <span className="font-bold text-slate-700">{totalNa}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span className="text-slate-500">Total puntos</span>
                <span className="font-bold text-slate-700">{total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra global */}
        <div className="card p-4">
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="bg-green-400 transition-all" style={{ width: `${(totalCumple / total) * 100}%` }} />
            <div className="bg-red-400 transition-all" style={{ width: `${(totalNoCumple / total) * 100}%` }} />
            <div className="bg-slate-300 transition-all" style={{ width: `${(totalNa / total) * 100}%` }} />
          </div>
        </div>

        {/* Secciones */}
        {SECCIONES.map(sec => {
          const isOpen = seccionAbierta === sec.numero
          const secItems = sec.items.map((_, idx) => itemsData[`${sec.numero}-${idx}`])
          const cumple = secItems.filter(i => i.estado === 'cumple').length
          const noCumple = secItems.filter(i => i.estado === 'no_cumple').length
          const na = secItems.filter(i => i.estado === 'na').length

          return (
            <div key={sec.numero} className="card overflow-hidden">
              <button
                onClick={() => setSeccionAbierta(isOpen ? null : sec.numero)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sec.emoji}</span>
                  <div>
                    <p className="font-bold text-slate-800">{sec.numero}. {sec.nombre}</p>
                    <p className="text-xs text-slate-500">{sec.items.length} puntos</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-3 text-xs font-semibold">
                    <span className="text-green-600">✅ {cumple}</span>
                    <span className="text-red-500">❌ {noCumple}</span>
                    <span className="text-slate-400">N/A {na}</span>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-slate-100">
                  <div className="px-5 py-2 bg-slate-50 grid grid-cols-12 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    <div className="col-span-1">#</div>
                    <div className="col-span-6">Punto de revisión</div>
                    <div className="col-span-3 text-center">Estado</div>
                    <div className="col-span-2">Observación</div>
                  </div>
                  {sec.items.map((itemNombre, idx) => {
                    const key = `${sec.numero}-${idx}`
                    const it = itemsData[key]
                    const cfg = estadoConfig[it.estado]
                    const Icon = cfg.icon
                    return (
                      <div key={idx}
                        className={`px-5 py-3 grid grid-cols-12 gap-2 items-center border-b border-slate-50 last:border-0 ${it.estado === 'no_cumple' ? 'bg-red-50/50' : ''}`}>
                        <div className="col-span-1 text-xs text-slate-400 font-mono">{idx + 1}</div>
                        <div className="col-span-6 text-sm text-slate-700">{itemNombre}</div>
                        <div className="col-span-3 flex justify-center">
                          <span className={`badge flex items-center gap-1 ${cfg.cls}`}>
                            <Icon size={11} /> {cfg.label}
                          </span>
                        </div>
                        <div className="col-span-2 text-xs text-slate-400 italic">{it.obs || '—'}</div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {/* Observaciones generales */}
        <div className="card p-5">
          <p className="font-bold text-slate-700 mb-3">Observaciones generales</p>
          <div className="space-y-2 text-sm text-slate-600">
            <p>1) Vehículo en buen estado general para su año y kilometraje.</p>
            <p>2) Se recomienda revisar pastillas de freno en próxima mantención.</p>
            <p>3) Leve fuga de aceite en retén de distribución — monitorear.</p>
          </div>
        </div>

        {/* Fotos placeholder */}
        <div className="card p-5">
          <p className="font-bold text-slate-700 mb-4">Fotografías del vehículo</p>
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
                <p className="text-xs text-slate-400">Foto {i + 1}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
