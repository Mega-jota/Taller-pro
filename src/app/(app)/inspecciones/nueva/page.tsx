'use client'
import { useState, useCallback } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { ArrowLeft, Save, ChevronDown, ChevronUp, CheckCircle, XCircle, Minus, Camera, FileDown } from 'lucide-react'

// ──────────────────────────────────────────────
// Definición de las 6 secciones con todos los ítems
// ──────────────────────────────────────────────
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
      'Revisión luces y testigos tablero apagados', 'Revisión vibración ralentí (posibles bujías, bobina, cables)',
      'Revisión estado plásticos air bag (sin cortes ni roturas)', 'Revisión dirección (a tope, ruidos, vibración o golpes)',
      'Revisión ruidos de embrague', 'Revisión dureza en pedal de embrague',
      'Revisión de capota eléctrica en caso de existir', 'Revisión sunroof',
      'Revisión corte de embrague (muy arriba o muy abajo)', 'Revisión pedal de freno (que no se vaya a fondo)',
      'Revisión pedal de aceleración (que acelere sin fallar)', 'Revisión bocina',
      'Revisión cierre centralizado', 'Revisión alza vidrios eléctricos',
      'Revisión espejos eléctricos laterales', 'Revisión señalizadores', 'Revisión luces',
      'Revisión comandos calefacción y AC', 'Revisión de controles al volante',
      'Revisión sapitos de agua delanteros y traseros', 'Revisión limpia parabrisas',
      'Revisión radio (USB, aux, cd y emisoras)', 'Revisión fugas de agua radiador calefacción',
      'Revisión calefacción (que caliente)', 'Revisión enfriamiento AC',
      'Revisión estado general interior', 'Revisión tapices',
      'Revisión eficacia freno mano (4 a 6 dientes)', 'Revisión sensores acercamiento',
      'Revisión cámara de retroceso', 'Revisión correderas asientos (manual o eléctrico)',
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
      'Revisión tapa de depósito de agua que no tenga aceite', 'Revisión tapa de aceite libre de agua',
      'Revisión fuga de líquido de frenos', 'Revisión de fuga de líquido hidráulico',
      'Revisión de fuga de líquido limpia parabrisas', 'Revisión correa AC',
      'Revisión de correa alternador', 'Revisión de correa de dirección',
      'Revisión ruidos en distribución, fecha y km si existe información', 'Revisión nivel de aceite',
      'Revisión nivel de coolant', 'Revisión nivel de líquido de frenos',
      'Revisión de nivel líquido hidráulico', 'Revisión escape (que no tire humo negro, blanco o azul)',
      'Revisión fugas de escape', 'Revisión soporte motor visual y con presión',
      'Revisión de golpeteo en inyectores en caso de ser diésel',
      'Revisión empaquetaduras (sin manipulación, motor sin abrir)',
      'Revisión posibles ruidos o anomalías en compresor de AC',
    ]
  },
  {
    numero: 4, nombre: 'Suspensión y Frenos', emoji: '🔩',
    items: [
      'Revisión visual neumáticos (desgaste parejo, huevos, roturas, grietas, clavos)',
      'Revisión de cazoletas', 'Revisión de espirales',
      'Revisión amortiguadores (humedad y rebote)', 'Revisión discos de freno delanteros',
      'Revisión discos de frenos traseros', 'Revisión frenos desgaste de pastillas delanteras',
      'Revisión frenos desgaste de pastillas traseras', 'Revisión pasadores de caliper de freno delanteros',
      'Revisión pasadores de caliper de freno traseros', 'Revisión fuga líquido freno por niples',
      'Revisión fuga líquido freno por flexibles', 'Revisión cable sensor ABS',
      'Revisión sensores cables de sensores de pastillas delanteros',
      'Revisión sensores cables de sensores de pastillas traseros', 'Revisión fuelles de caja de dirección',
      'Revisión fuelles de homocinética', 'Revisión bujes de bandejas', 'Revisión rótulas de bandejas',
      'Revisión bandejas', 'Revisión terminales de dirección', 'Revisión juego lateral de la rueda',
      'Revisión juego axial de la rueda', 'Revisión zumbido en rodamientos de masa delanteros',
      'Revisión zumbido en rodamientos de masa traseros',
      'Revisión paquetes de resorte (no estén quebrados ni tengan bujes rotos)',
      'Revisión barras de torsión (sin fugas de aceite en diferencial trasero)',
      'Revisión crucetas de cardán', 'Revisión cardán (mover para ver juego en el muñón)',
      'Revisión cardán corto cuando tiene transfer (sin juego)',
    ]
  },
  {
    numero: 5, nombre: 'Sistema Eléctrico', emoji: '⚡',
    items: [
      'Scanner (códigos de falla, almacenados, chequeo general a sistemas)',
      'Revisión carga batería', 'Revisión carga alternador',
      'Revisión funcionamiento de alarma con sonido y con cierres', 'Revisión fusibles',
      'Revisión motor de partida (5 a 6 arranques sin falla)',
    ]
  },
  {
    numero: 6, nombre: 'Revisión en Ruta', emoji: '🛣️',
    items: [
      'Revisión alineación', 'Revisión balanceo',
      'Revisión caja de cambios (que pasen sin problemas, sin asperezas ni ruidos)',
      'Revisión embrague (que corte bien, sin ruidos de pedal o rodamiento, sin patinar)',
      'Revisión ruidos de dirección (bomba, homocinética, terminales, rodamientos de masa)',
      'Revisión frenos (chillidos, raspado, crujido de balatas, zumbido al frenar, vibración, pedal esponjoso)',
      'Revisión temperatura motor (indicador en la mitad o sin luces de alta encendidas)',
      'Revisión indicadores tablero (odómetro, velocímetro, testigos, temperatura, presión de aceite, batería)',
      'Revisión velocidad crucero',
      'Revisión motor (pérdida de potencia, ruidos de golpeteo, tirones, se chupa o tiene explosiones)',
      'Revisión humo en caso que sea notorio',
      'Revisión ruidos de escape (cascabeleo catalítico, escape suelto o soporte)',
      'Revisión sonidos de carrocería', 'Revisión ruidos de suspensión y tren delantero',
      'Revisión cremallera de dirección (que no tenga juego ni crujido)', 'Revisión ruidos de correas',
      'Revisión eficacia frenos (ABS o convencional)',
      'Revisión cambios automáticos (que pasen según la velocidad, sin tirones al salir o bajar marchas)',
      'Revisión funcionamiento de 4WD (manual y automática)',
      'Revisión ruidos de crucetas, diferencial o cardán',
      'Revisión funcionamiento de turbo (que cargue adecuadamente, sin ruido ni sople)',
    ]
  },
]

type EstadoItem = 'pendiente' | 'cumple' | 'no_cumple' | 'na'
type ItemState = { estado: EstadoItem; observacion: string }

function buildInitialState() {
  const state: Record<string, ItemState> = {}
  SECCIONES.forEach(sec => {
    sec.items.forEach((_, idx) => {
      state[`${sec.numero}-${idx}`] = { estado: 'pendiente', observacion: '' }
    })
  })
  return state
}

export default function NuevaInspeccionPage() {
  const [items, setItems] = useState<Record<string, ItemState>>(buildInitialState)
  const [seccionAbierta, setSeccionAbierta] = useState<number>(1)
  const [observacionesGen, setObservacionesGen] = useState('')
  const [saving, setSaving] = useState(false)

  const setItem = useCallback((key: string, field: keyof ItemState, value: string) => {
    setItems(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }))
  }, [])

  const stats = useCallback(() => {
    let cumple = 0, no_cumple = 0, na = 0, pendiente = 0
    Object.values(items).forEach(it => {
      if (it.estado === 'cumple') cumple++
      else if (it.estado === 'no_cumple') no_cumple++
      else if (it.estado === 'na') na++
      else pendiente++
    })
    return { cumple, no_cumple, na, pendiente, total: cumple + no_cumple + na + pendiente }
  }, [items])

  const seccionStats = (secNum: number) => {
    const sec = SECCIONES.find(s => s.numero === secNum)!
    let cumple = 0, no_cumple = 0, na = 0, pendiente = 0
    sec.items.forEach((_, idx) => {
      const it = items[`${secNum}-${idx}`]
      if (it.estado === 'cumple') cumple++
      else if (it.estado === 'no_cumple') no_cumple++
      else if (it.estado === 'na') na++
      else pendiente++
    })
    return { cumple, no_cumple, na, pendiente }
  }

  const { cumple, no_cumple, na, pendiente, total } = stats()
  const pct = total > 0 ? Math.round((cumple / (cumple + no_cumple || 1)) * 100) : 0

  const handleSave = () => { setSaving(true); setTimeout(() => setSaving(false), 1500) }

  return (
    <div className="fade-in">
      <Topbar title="Nueva Inspección Pre-compra" subtitle="Formulario digital — 6 secciones, 150+ puntos" />
      <div className="p-6 space-y-5">
        <Link href="/inspecciones" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={15} /> Volver
        </Link>

        {/* Datos del formulario */}
        <div className="card p-5 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Patente vehículo *</label>
            <input className="input font-mono uppercase" placeholder="ABCD12" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Nombre cliente *</label>
            <input className="input" placeholder="Nombre del cliente" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">RUT cliente</label>
            <input className="input" placeholder="12.345.678-9" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Email</label>
            <input className="input" type="email" placeholder="correo@ejemplo.cl" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Teléfono</label>
            <input className="input" type="tel" placeholder="+56 9 1234 5678" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Kilometraje</label>
            <input className="input" type="number" placeholder="85000" />
          </div>
        </div>

        {/* Barra de progreso global */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-700">Progreso de la inspección</p>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="text-green-600">✅ {cumple} cumple</span>
              <span className="text-red-500">❌ {no_cumple} no cumple</span>
              <span className="text-slate-400">N/A {na}</span>
              <span className="text-slate-400">⏳ {pendiente} pendientes</span>
            </div>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full flex">
              <div className="bg-green-400 transition-all" style={{ width: `${(cumple / total) * 100}%` }} />
              <div className="bg-red-400 transition-all" style={{ width: `${(no_cumple / total) * 100}%` }} />
              <div className="bg-slate-300 transition-all" style={{ width: `${(na / total) * 100}%` }} />
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-slate-400">{total - pendiente} de {total} puntos revisados</span>
            <span className="text-xs font-bold" style={{ color: pct >= 80 ? '#16a34a' : pct >= 60 ? '#ea580c' : '#dc2626' }}>
              {pct}% en buen estado
            </span>
          </div>
        </div>

        {/* Secciones */}
        {SECCIONES.map(sec => {
          const ss = seccionStats(sec.numero)
          const isOpen = seccionAbierta === sec.numero
          return (
            <div key={sec.numero} className="card overflow-hidden">
              {/* Header de sección */}
              <button
                onClick={() => setSeccionAbierta(isOpen ? 0 : sec.numero)}
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
                  <div className="flex gap-2 text-xs font-semibold">
                    {ss.cumple > 0 && <span className="text-green-600">✅ {ss.cumple}</span>}
                    {ss.no_cumple > 0 && <span className="text-red-500">❌ {ss.no_cumple}</span>}
                    {ss.na > 0 && <span className="text-slate-400">N/A {ss.na}</span>}
                    {ss.pendiente > 0 && <span className="text-slate-300">⏳ {ss.pendiente}</span>}
                  </div>
                  {isOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                </div>
              </button>

              {/* Ítems de la sección */}
              {isOpen && (
                <div className="border-t border-slate-100">
                  <div className="px-5 py-2 bg-slate-50 grid grid-cols-12 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    <div className="col-span-1">#</div>
                    <div className="col-span-5">Punto de revisión</div>
                    <div className="col-span-4 text-center">Estado</div>
                    <div className="col-span-2">Observaciones</div>
                  </div>
                  {sec.items.map((itemNombre, idx) => {
                    const key = `${sec.numero}-${idx}`
                    const it = items[key]
                    return (
                      <div key={idx}
                        className={`px-5 py-3 grid grid-cols-12 gap-2 items-center border-b border-slate-50 last:border-0 transition-colors ${it.estado === 'no_cumple' ? 'bg-red-50/60' : it.estado === 'cumple' ? 'bg-green-50/40' : ''}`}>
                        <div className="col-span-1 text-xs text-slate-400 font-mono">{idx + 1}</div>
                        <div className="col-span-5 text-sm text-slate-700">{itemNombre}</div>
                        <div className="col-span-4 flex gap-1.5 justify-center">
                          {[
                            { val: 'cumple', label: 'CUMPLE', cls: 'bg-green-500 hover:bg-green-600', icon: CheckCircle },
                            { val: 'na', label: 'N/A', cls: 'bg-slate-400 hover:bg-slate-500', icon: Minus },
                            { val: 'no_cumple', label: 'NO CUMPLE', cls: 'bg-red-500 hover:bg-red-600', icon: XCircle },
                          ].map(btn => (
                            <button key={btn.val}
                              onClick={() => setItem(key, 'estado', it.estado === btn.val ? 'pendiente' : btn.val as EstadoItem)}
                              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all ${it.estado === btn.val ? `${btn.cls} text-white shadow-sm scale-105` : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
                              <btn.icon size={11} />
                              {btn.label}
                            </button>
                          ))}
                        </div>
                        <div className="col-span-2">
                          <input
                            className="w-full text-xs border border-slate-200 rounded px-2 py-1 outline-none focus:border-blue-400 bg-white"
                            placeholder="Obs..."
                            value={it.observacion}
                            onChange={e => setItem(key, 'observacion', e.target.value)}
                          />
                        </div>
                      </div>
                    )
                  })}

                  {/* Campo detalles de sección (solo Body Kit tiene diagrama) */}
                  {sec.numero === 1 && (
                    <div className="px-5 py-4 bg-slate-50 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 mb-2">Detalles / diagrama de daños</p>
                      <textarea className="input resize-none text-sm" rows={2} placeholder="Describir daños visualizados en carrocería (ubicación, tipo de daño, etc.)..." />
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {/* Observaciones generales */}
        <div className="card p-5 space-y-3">
          <p className="font-bold text-slate-700">Observaciones generales de la inspección</p>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-xs text-slate-400 font-mono mt-2 w-5">{i + 1})</span>
              <input className="input text-sm flex-1" placeholder={`Observación ${i + 1}...`} />
            </div>
          ))}
          <textarea className="input resize-none text-sm mt-2" rows={3}
            placeholder="Comentarios adicionales..."
            value={observacionesGen} onChange={e => setObservacionesGen(e.target.value)} />
        </div>

        {/* Fotos */}
        <div className="card p-5">
          <p className="font-bold text-slate-700 mb-4">Fotografías del vehículo (hasta 10)</p>
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 10 }, (_, i) => (
              <label key={i}
                className="aspect-video border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                <Camera size={20} className="text-slate-300 mb-1" />
                <span className="text-xs text-slate-400">{i + 1}</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">Formatos: JPG, PNG, HEIC. Máximo 10 MB por foto.</p>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <Link href="/inspecciones"
            className="flex-1 text-center py-3 rounded-lg border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50">
            Cancelar
          </Link>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold text-sm"
            style={{ backgroundColor: saving ? '#93c5fd' : 'var(--accent)' }}>
            <Save size={16} /> {saving ? 'Guardando...' : 'Guardar inspección'}
          </button>
          <button
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50">
            <FileDown size={16} /> Exportar PDF
          </button>
        </div>
      </div>
    </div>
  )
}
