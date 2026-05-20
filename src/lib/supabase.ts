import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Tipos principales
export type Taller = {
  id: string
  nombre: string
  logo_url?: string
  direccion?: string
  telefono?: string
  email?: string
  ciudad?: string
  plan: 'basico' | 'pro' | 'empresa'
  activo: boolean
  fecha_vencimiento?: string
  notif_email: boolean
  notif_whatsapp: boolean
  notif_sms: boolean
}

export type Usuario = {
  id: string
  taller_id: string
  nombre: string
  apellido?: string
  email: string
  telefono?: string
  rol: 'superadmin' | 'admin_taller' | 'mecanico' | 'inspector' | 'recepcionista'
  activo: boolean
}

export type Cliente = {
  id: string
  taller_id: string
  empresa_id?: string
  nombre: string
  apellido?: string
  rut?: string
  email?: string
  telefono?: string
  whatsapp?: string
  tipo: 'particular' | 'empresa'
  notas?: string
}

export type Vehiculo = {
  id: string
  taller_id: string
  cliente_id?: string
  empresa_id?: string
  patente: string
  marca: string
  modelo: string
  ano?: number
  color?: string
  kilometraje?: number
  combustible: string
  tipo_vehiculo: string
  transmision: string
  vin?: string
  notas?: string
  // Relaciones
  clientes?: Cliente
}

export type OrdenTrabajo = {
  id: string
  taller_id: string
  vehiculo_id: string
  cliente_id?: string
  mecanico_id?: string
  numero_ot: string
  estado: 'recibido' | 'diagnostico' | 'en_proceso' | 'listo' | 'entregado' | 'cancelado'
  problema_reportado: string
  diagnostico?: string
  trabajo_realizado?: string
  km_ingreso?: number
  fecha_ingreso: string
  fecha_estimada?: string
  fecha_entrega?: string
  costo_estimado?: number
  costo_total?: number
  prioridad: 'baja' | 'normal' | 'alta' | 'urgente'
  notas_internas?: string
  // Relaciones
  vehiculos?: Vehiculo
  clientes?: Cliente
  usuarios?: Usuario
}

export type Inspeccion = {
  id: string
  taller_id: string
  vehiculo_id: string
  cliente_id?: string
  inspector_id?: string
  codigo_interno?: string
  tipo: 'pre_compra' | 'pre_venta' | 'ingreso' | 'otro'
  fecha_inspeccion: string
  km_inspeccion?: number
  estado: 'en_progreso' | 'completada' | 'cancelada'
  total_cumple: number
  total_no_cumple: number
  total_na: number
  observaciones_generales?: string
  pdf_url?: string
  vehiculos?: Vehiculo
  clientes?: Cliente
}

export type InspeccionItem = {
  id: string
  inspeccion_id: string
  seccion_numero: number
  seccion_nombre: string
  item_numero: number
  item_descripcion: string
  estado: 'pendiente' | 'cumple' | 'no_cumple' | 'na'
  observaciones?: string
}

export const ESTADOS_OT = {
  recibido: { label: 'Recibido', color: 'bg-blue-100 text-blue-800', icon: '📥' },
  diagnostico: { label: 'En diagnóstico', color: 'bg-yellow-100 text-yellow-800', icon: '🔍' },
  en_proceso: { label: 'En reparación', color: 'bg-orange-100 text-orange-800', icon: '🔧' },
  listo: { label: 'Listo para retirar', color: 'bg-green-100 text-green-800', icon: '✅' },
  entregado: { label: 'Entregado', color: 'bg-gray-100 text-gray-800', icon: '🏁' },
  cancelado: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: '❌' },
}

export const PRIORIDADES = {
  baja: { label: 'Baja', color: 'bg-gray-100 text-gray-600' },
  normal: { label: 'Normal', color: 'bg-blue-100 text-blue-600' },
  alta: { label: 'Alta', color: 'bg-orange-100 text-orange-600' },
  urgente: { label: 'Urgente', color: 'bg-red-100 text-red-700' },
}
