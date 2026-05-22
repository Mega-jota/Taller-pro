'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { ArrowLeft, Save, User, Building2 } from 'lucide-react'

const REGIONES_COMUNAS: Record<string, string[]> = {
  'Arica y Parinacota': ['Arica', 'Camarones', 'General Lagos', 'Putre'],
  'Tarapacá': ['Alto Hospicio', 'Camiña', 'Colchane', 'Huara', 'Iquique', 'Pica', 'Pozo Almonte'],
  'Antofagasta': ['Antofagasta', 'Calama', 'María Elena', 'Mejillones', 'Ollagüe', 'San Pedro de Atacama', 'Sierra Gorda', 'Taltal', 'Tocopilla'],
  'Atacama': ['Alto del Carmen', 'Caldera', 'Chañaral', 'Copiapó', 'Diego de Almagro', 'Freirina', 'Huasco', 'Tierra Amarilla', 'Vallenar'],
  'Coquimbo': ['Andacollo', 'Canela', 'Combarbalá', 'Coquimbo', 'Illapel', 'La Higuera', 'La Serena', 'Los Vilos', 'Monte Patria', 'Ovalle', 'Paiguano', 'Punitaqui', 'Río Hurtado', 'Salamanca', 'Vicuña'],
  'Valparaíso': ['Algarrobo', 'Cabildo', 'Calera', 'Cartagena', 'Casablanca', 'Catemu', 'Concón', 'El Quisco', 'El Tabo', 'Hijuelas', 'Isla de Pascua', 'Juan Fernández', 'La Cruz', 'La Ligua', 'Limache', 'Llaillay', 'Los Andes', 'Nogales', 'Olmué', 'Panquehue', 'Papudo', 'Petorca', 'Puchuncaví', 'Putaendo', 'Quillota', 'Quilpué', 'Quintero', 'Rinconada', 'San Antonio', 'San Esteban', 'San Felipe', 'Santa María', 'Santo Domingo', 'Valparaíso', 'Villa Alemana', 'Viña del Mar', 'Zapallar'],
  'Región Metropolitana': ['Alhué', 'Buin', 'Calera de Tango', 'Cerrillos', 'Cerro Navia', 'Colina', 'Conchalí', 'Curacaví', 'El Bosque', 'El Monte', 'Estación Central', 'Huechuraba', 'Independencia', 'Isla de Maipo', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Lampa', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Melipilla', 'Ñuñoa', 'Padre Hurtado', 'Paine', 'Pedro Aguirre Cerda', 'Peñaflor', 'Peñalolén', 'Pirque', 'Providencia', 'Pudahuel', 'Puente Alto', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Bernardo', 'San Joaquín', 'San José de Maipo', 'San Miguel', 'San Pedro', 'San Ramón', 'Santiago', 'Talagante', 'Tiltil', 'Vitacura'],
  "O'Higgins": ['Chimbarongo', 'Chépica', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'La Estrella', 'Las Cabras', 'Litueche', 'Lolol', 'Machalí', 'Malloa', 'Marchihue', 'Mostazal', 'Nancagua', 'Navidad', 'Olivar', 'Palmilla', 'Paredones', 'Peralillo', 'Peumo', 'Pichidegua', 'Pichilemu', 'Placilla', 'Pumanque', 'Quinta de Tilcoco', 'Rancagua', 'Rengo', 'Requínoa', 'San Fernando', 'San Francisco de Mostazal', 'San Vicente', 'Santa Cruz'],
  'Maule': ['Cauquenes', 'Chanco', 'Colbún', 'Constitución', 'Curepto', 'Curicó', 'Empedrado', 'Hualañé', 'Licantén', 'Linares', 'Longaví', 'Maule', 'Molina', 'Parral', 'Pelarco', 'Pelluhue', 'Pencahue', 'Rauco', 'Retiro', 'Río Claro', 'Romeral', 'Sagrada Familia', 'San Clemente', 'San Javier', 'San Rafael', 'Talca', 'Teno', 'Vichuquén', 'Villa Alegre', 'Yerbas Buenas'],
  'Ñuble': ['Bulnes', 'Chillán', 'Chillán Viejo', 'Cobquecura', 'Coelemu', 'Coihueco', 'El Carmen', 'Ninhue', 'Ñiquén', 'Pemuco', 'Pinto', 'Portezuelo', 'Quillón', 'Quirihue', 'Ránquil', 'San Carlos', 'San Fabián', 'San Ignacio', 'San Nicolás', 'Trehuaco', 'Yungay'],
  'Biobío': ['Alto Biobío', 'Antuco', 'Arauco', 'Cabrero', 'Cañete', 'Chiguayante', 'Concepción', 'Contulmo', 'Coronel', 'Curanilahue', 'Florida', 'Hualpén', 'Hualqui', 'Laja', 'Lebu', 'Los Ángeles', 'Los Álamos', 'Lota', 'Mulchén', 'Nacimiento', 'Negrete', 'Penco', 'Quilaco', 'Quilleco', 'San Pedro de la Paz', 'San Rosendo', 'Santa Bárbara', 'Santa Juana', 'Talcahuano', 'Tirúa', 'Tomé', 'Tucapel', 'Yumbel'],
  'La Araucanía': ['Angol', 'Carahue', 'Cholchol', 'Collipulli', 'Cunco', 'Curacautín', 'Curarrehue', 'Ercilla', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Melipeuco', 'Nueva Imperial', 'Padre Las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Purén', 'Renaico', 'Saavedra', 'Temuco', 'Teodoro Schmidt', 'Toltén', 'Traiguén', 'Victoria', 'Vilcún', 'Villarrica'],
  'Los Ríos': ['Corral', 'Futrono', 'La Unión', 'Lago Ranco', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli', 'Río Bueno', 'Valdivia'],
  'Los Lagos': ['Ancud', 'Calbuco', 'Castro', 'Chaitén', 'Chonchi', 'Cochamó', 'Curaco de Vélez', 'Dalcahue', 'Fresia', 'Frutillar', 'Futaleufú', 'Hualaihué', 'Llanquihue', 'Los Muermos', 'Maullín', 'Osorno', 'Palena', 'Puerto Montt', 'Puerto Octay', 'Puerto Varas', 'Puqueldón', 'Purranque', 'Puyehue', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao', 'Río Negro', 'San Juan de la Costa', 'San Pablo'],
  'Aysén': ['Aysén', 'Chile Chico', 'Cisnes', 'Cochrane', 'Coyhaique', 'Guaitecas', 'Lago Verde', "O'Higgins", 'Río Ibáñez', 'Tortel'],
  'Magallanes': ['Antártica', 'Cabo de Hornos', 'Laguna Blanca', 'Natales', 'Porvenir', 'Primavera', 'Punta Arenas', 'Río Verde', 'San Gregorio', 'Timaukel', 'Torres del Paine'],
}

const REGIONES = Object.keys(REGIONES_COMUNAS)

export default function NuevoClientePage() {
  const [tipo, setTipo] = useState<'particular' | 'empresa'>('particular')
  const [saving, setSaving] = useState(false)
  const [region, setRegion] = useState('')
  const [comuna, setComuna] = useState('')

  const comunasDisponibles = region ? (REGIONES_COMUNAS[region] || []) : []

  const handleRegionChange = (nuevaRegion: string) => {
    setRegion(nuevaRegion)
    setComuna('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // TODO: conectar con Supabase
    setTimeout(() => setSaving(false), 1500)
  }

  return (
    <div className="fade-in">
      <Topbar title="Nuevo Cliente" subtitle="Registrar cliente en el sistema" />
      <div className="p-6 max-w-2xl">

        <Link href="/clientes" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft size={15} /> Volver a clientes
        </Link>

        <form onSubmit={handleSubmit} className="card p-6 space-y-5">

          {/* Tipo de cliente */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de cliente</label>
            <div className="flex gap-3">
              {[
                { value: 'particular', label: 'Particular', icon: User, desc: 'Persona natural' },
                { value: 'empresa', label: 'Empresa', icon: Building2, desc: 'Persona jurídica / Flota' },
              ].map(opt => (
                <button key={opt.value} type="button"
                  onClick={() => setTipo(opt.value as 'particular' | 'empresa')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${tipo === opt.value ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <opt.icon size={20} className={tipo === opt.value ? 'text-blue-600' : 'text-slate-400'} />
                  <p className={`font-semibold mt-2 ${tipo === opt.value ? 'text-blue-800' : 'text-slate-700'}`}>{opt.label}</p>
                  <p className="text-xs text-slate-500">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Datos personales */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {tipo === 'empresa' ? 'Razón Social *' : 'Nombre *'}
              </label>
              <input className="input" required placeholder={tipo === 'empresa' ? 'Empresa Ejemplo SpA' : 'Nombre del cliente'} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {tipo === 'empresa' ? 'Apellido contacto' : 'Apellido'}
              </label>
              <input className="input" placeholder={tipo === 'empresa' ? 'Nombre del contacto' : 'Apellido'} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">RUT *</label>
              <input className="input" required placeholder="12.345.678-9" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Teléfono</label>
              <input className="input" type="tel" placeholder="+56 9 1234 5678" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input className="input" type="email" placeholder="correo@ejemplo.cl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">WhatsApp</label>
              <input className="input" type="tel" placeholder="+56 9 1234 5678" />
            </div>
          </div>

          {/* Dirección con Región → Comuna */}
          <div>
            <p className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b border-slate-100">Dirección</p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Calle y número</label>
                <input className="input w-full" placeholder="Av. Ejemplo 1234, Depto 5B" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Región</label>
                  <select
                    className="input w-full"
                    value={region}
                    onChange={e => handleRegionChange(e.target.value)}>
                    <option value="">Seleccionar región...</option>
                    {REGIONES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Comuna {region && <span className="text-red-400">*</span>}
                  </label>
                  {region ? (
                    <select
                      className="input w-full"
                      value={comuna}
                      onChange={e => setComuna(e.target.value)}>
                      <option value="">Seleccionar comuna...</option>
                      {comunasDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="input w-full bg-slate-50 text-slate-400 cursor-not-allowed"
                      placeholder="Selecciona región primero"
                      disabled
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {tipo === 'empresa' && (
            <div className="p-4 bg-slate-50 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-slate-700">Datos adicionales empresa</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Giro</label>
                  <input className="input" placeholder="Transporte de carga" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Teléfono empresa</label>
                  <input className="input" placeholder="+56 2 2345 6789" />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Notas internas</label>
            <textarea className="input resize-none" rows={3} placeholder="Observaciones sobre el cliente (solo visibles internamente)..." />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <Link href="/clientes" className="btn-secondary flex-1 text-center">Cancelar</Link>
            <button type="submit" disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-white font-semibold transition-colors"
              style={{ backgroundColor: saving ? '#93c5fd' : 'var(--accent)' }}>
              <Save size={16} />
              {saving ? 'Guardando...' : 'Guardar cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
