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

interface ContactoAdicional {
  nombre: string
  cargo: string
  telefono: string
  email: string
}

export default function NuevaEmpresaPage() {
  const [guardado, setGuardado] = useState(false)
  const [contactosAdicionales, setContactosAdicionales] = useState<ContactoAdicional[]>([])

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
              <input type="text" className="input w-full" placeholder="Av. Industrial 1234, Santiago" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Ciudad</label>
              <input type="text" className="input w-full" placeholder="Santiago" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Región</label>
              <select className="input w-full">
                <option>Región Metropolitana</option>
                <option>Valparaíso</option>
                <option>Biobío</option>
                <option>La Araucanía</option>
                <option>Los Lagos</option>
                <option>Antofagasta</option>
                <option>Atacama</option>
                <option>Coquimbo</option>
                <option>O'Higgins</option>
                <option>Maule</option>
                <option>Ñuble</option>
                <option>Los Ríos</option>
                <option>Aysén</option>
                <option>Magallanes</option>
                <option>Arica y Parinacota</option>
                <option>Tarapacá</option>
              </select>
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
