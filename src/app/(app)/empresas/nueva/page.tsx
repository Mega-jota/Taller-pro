'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Link from 'next/link'
import { ArrowLeft, Building2, Save, Plus, Trash2 } from 'lucide-react'

const RUBROS = [
  'Transporte y logística',
  'Construcción',
  'Agricultura',
  'Minería',
  'Distribución',
  'Retail',
  'Pesca y acuicultura',
  'Forestal',
  'Otro',
]

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

interface ContactoAdicional {
  nombre: string
  cargo: string
  telefono: string
  email: string
}

export default function NuevaEmpresaPage() {
  const [guardado, setGuardado] = useState(false)
  const [contactosAdicionales, setContactosAdicionales] = useState<ContactoAdicional[]>([])
  const [region, setRegion] = useState('')
  const [comuna, setComuna] = useState('')

  const comunasDisponibles = region ? (REGIONES_COMUNAS[region] || []) : []

  const handleRegionChange = (nuevaRegion: string) => {
    setRegion(nuevaRegion)
    setComuna('')
  }

  const agregarContacto = () => {
    setContactosAdicionales([...contactosAdicionales, { nombre: '', cargo: '', telefono: '', email: '' }])
  }

  const eliminarContacto = (idx: number) => {
    setContactosAdicionales(contactosAdicionales.filter((_, i) => i !== idx))
  }

  const actualizarContacto = (idx: number, campo: keyof ContactoAdicional, valor: string) => {
    const nuevos = [...contactosAdicionales]
    nuevos[idx][campo] = valor
    setContactosAdicionales(nuevos)
  }

  const handleGuardar = () => {
    setGuardado(true)
    setTimeout(() => setGuardado(false), 3000)
  }

  return (
    <div className="fade-in">
      <Topbar title="Nueva Empresa" subtitle="Registrar cliente corporativo / flota" />

      <div className="p-6 max-w-3xl space-y-5">

        <Link href="/empresas" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={15} /> Volver a empresas
        </Link>

        {guardado && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2">
            ✅ Empresa registrada correctamente
          </div>
        )}

        {/* Datos de la empresa */}
        <div className="card p-6 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <Building2 size={18} className="text-slate-500" />
            <h2 className="font-bold text-slate-800">Datos de la empresa</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Razón social <span className="text-red-400">*</span>
              </label>
              <input type="text" className="input w-full" placeholder="Ej: LogiChile S.A." />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                RUT <span className="text-red-400">*</span>
              </label>
              <input type="text" className="input w-full" placeholder="76.123.456-7" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Rubro</label>
              <select className="input w-full">
                <option value="">Seleccionar rubro...</option>
                {RUBROS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Dirección</label>
              <input type="text" className="input w-full" placeholder="Av. Industrial 1234" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Región</label>
              <select className="input w-full" value={region} onChange={e => handleRegionChange(e.target.value)}>
                <option value="">Seleccionar región...</option>
                {REGIONES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Comuna {region && <span className="text-red-400">*</span>}
              </label>
              {region ? (
                <select className="input w-full" value={comuna} onChange={e => setComuna(e.target.value)}>
                  <option value="">Seleccionar comuna...</option>
                  {comunasDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              ) : (
                <input
                  type="text"
                  className="input w-full bg-slate-50 cursor-not-allowed"
                  placeholder="Selecciona una región primero"
                  disabled
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Teléfono empresa</label>
              <input type="tel" className="input w-full" placeholder="+56 2 2345 6789" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Email empresa</label>
              <input type="email" className="input w-full" placeholder="contacto@empresa.cl" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Sitio web</label>
              <input type="url" className="input w-full" placeholder="https://www.empresa.cl" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                N° vehículos en flota (estimado)
              </label>
              <input type="number" className="input w-full" placeholder="0" min="1" />
            </div>
          </div>
        </div>

        {/* Contacto principal */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-slate-800">Contacto principal</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Nombre <span className="text-red-400">*</span>
              </label>
              <input type="text" className="input w-full" placeholder="Nombre completo" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Cargo</label>
              <input type="text" className="input w-full" placeholder="Ej: Jefe de flota" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Teléfono / WhatsApp <span className="text-red-400">*</span>
              </label>
              <input type="tel" className="input w-full" placeholder="+56 9 8765 4321" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Email <span className="text-red-400">*</span>
              </label>
              <input type="email" className="input w-full" placeholder="contacto@empresa.cl" />
            </div>
          </div>
        </div>

        {/* Contactos adicionales */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-800">Contactos adicionales</h2>
            <button onClick={agregarContacto}
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">
              <Plus size={14} /> Agregar contacto
            </button>
          </div>

          {contactosAdicionales.length === 0 && (
            <p className="text-sm text-slate-400 italic">Sin contactos adicionales registrados.</p>
          )}

          {contactosAdicionales.map((c, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-600">Contacto {idx + 2}</p>
                <button onClick={() => eliminarContacto(idx)}
                  className="text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" className="input text-sm" placeholder="Nombre"
                  value={c.nombre} onChange={e => actualizarContacto(idx, 'nombre', e.target.value)} />
                <input type="text" className="input text-sm" placeholder="Cargo"
                  value={c.cargo} onChange={e => actualizarContacto(idx, 'cargo', e.target.value)} />
                <input type="tel" className="input text-sm" placeholder="Teléfono"
                  value={c.telefono} onChange={e => actualizarContacto(idx, 'telefono', e.target.value)} />
                <input type="email" className="input text-sm" placeholder="Email"
                  value={c.email} onChange={e => actualizarContacto(idx, 'email', e.target.value)} />
              </div>
            </div>
          ))}
        </div>

        {/* Condiciones comerciales */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-slate-800">Condiciones comerciales</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Descuento fijo (%)</label>
              <input type="number" className="input w-full" placeholder="0" min="0" max="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Días de crédito</label>
              <select className="input w-full">
                <option value="0">Pago al contado</option>
                <option value="30">30 días</option>
                <option value="60">60 días</option>
                <option value="90">90 días</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Notas internas</label>
              <textarea className="input w-full" rows={3}
                placeholder="Acuerdos especiales, preferencias del cliente, observaciones..." />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 justify-end pb-6">
          <Link href="/empresas"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
            Cancelar
          </Link>
          <button onClick={handleGuardar}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: 'var(--accent)' }}>
            <Save size={15} /> Guardar empresa
          </button>
        </div>

      </div>
    </div>
  )
}
