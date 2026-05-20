# 🔧 TallerPro — Guía de Despliegue Paso a Paso

> **Tiempo estimado total: ~1 hora**  
> No necesitas ser programador. Solo sigue los pasos en orden.

---

## PASO 1 — Crear cuenta en GitHub (5 min)

1. Ve a **https://github.com** y crea una cuenta gratuita
2. Haz clic en **"New repository"**
3. Nómbralo `tallerpro`
4. Márcalo como **Privado**
5. Haz clic en **"Create repository"**
6. Sube los archivos de este proyecto a ese repositorio

---

## PASO 2 — Crear cuenta en Supabase (10 min)

> Supabase es la base de datos gratuita del sistema.

1. Ve a **https://supabase.com** → **"Start your project"**
2. Regístrate con tu cuenta de GitHub (más rápido)
3. Haz clic en **"New Project"**
   - Organización: la que te crea automáticamente
   - Nombre del proyecto: `tallerpro`
   - Database password: crea una contraseña segura y **guárdala**
   - Región: `South America (São Paulo)` — la más cercana
4. Espera ~2 minutos mientras se crea el proyecto

### Configurar la base de datos:

5. En el menú izquierdo ve a **SQL Editor**
6. Haz clic en **"New query"**
7. Copia TODO el contenido del archivo `tallerpro_schema.sql`
8. Pégalo en el editor y haz clic en **"Run"** (▶)
9. Deberías ver "Success. No rows returned"

### Crear los Storage Buckets (para fotos):

10. Ve a **Storage** en el menú izquierdo
11. Crea 3 buckets (botón "New bucket"):
    - `fotos-inspeccion` → marcar como **Public**
    - `logos-talleres` → marcar como **Public**
    - `fotos-vehiculos` → marcar como **Public**

### Obtener las claves de API:

12. Ve a **Settings → API**
13. Copia y guarda:
    - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
    - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

---

## PASO 3 — Crear cuenta en Vercel (5 min)

> Vercel publica tu aplicación en internet, gratis.

1. Ve a **https://vercel.com** → **"Sign Up"**
2. Regístrate con tu cuenta de GitHub
3. Haz clic en **"Add New Project"**
4. Selecciona el repositorio `tallerpro` de GitHub
5. En la sección **"Environment Variables"** agrega:

```
NEXT_PUBLIC_SUPABASE_URL        = (el que copiaste de Supabase)
NEXT_PUBLIC_SUPABASE_ANON_KEY   = (el que copiaste de Supabase)
SUPABASE_SERVICE_ROLE_KEY       = (el que copiaste de Supabase)
RESEND_API_KEY                  = (lo obtienes en el Paso 4)
RESEND_FROM_EMAIL               = notificaciones@tudominio.cl
TWILIO_ACCOUNT_SID              = (lo obtienes en el Paso 5)
TWILIO_AUTH_TOKEN               = (lo obtienes en el Paso 5)
TWILIO_WHATSAPP_NUMBER          = whatsapp:+14155238886
TWILIO_SMS_NUMBER               = +56xxxxxxxxx
NEXT_PUBLIC_APP_URL             = https://tuapp.vercel.app
```

6. Haz clic en **"Deploy"**
7. Espera ~3 minutos. ¡Tu app estará en línea!

---

## PASO 4 — Configurar Email con Resend (5 min)

> Resend envía los emails automáticos a los clientes.

1. Ve a **https://resend.com** → **"Sign Up"** (gratis)
2. Ve a **"API Keys"** → **"Create API Key"**
3. Copia la clave y ponla en Vercel como `RESEND_API_KEY`
4. Para usar tu propio dominio (ej: `notificaciones@tallerpro.cl`):
   - Ve a **"Domains"** → **"Add Domain"**
   - Sigue las instrucciones para agregar los registros DNS
   - Tarda ~24h en verificarse
5. Mientras tanto, puedes usar el dominio gratuito de prueba de Resend

---

## PASO 5 — Configurar WhatsApp y SMS con Twilio (10 min)

> Twilio envía WhatsApp y SMS. Tiene créditos gratuitos para probar.

1. Ve a **https://twilio.com** → **"Sign up"**
2. Verifica tu número de teléfono
3. En el **Console Dashboard** copia:
   - **Account SID** → `TWILIO_ACCOUNT_SID`
   - **Auth Token** → `TWILIO_AUTH_TOKEN`

### Para WhatsApp:
4. Ve a **Messaging → Try it out → Send a WhatsApp message**
5. Sigue las instrucciones para conectar el sandbox de WhatsApp
6. El número del sandbox es: `+1 415 523 8886` → `TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886`

> Para producción real necesitas solicitar un número de WhatsApp Business verificado (proceso de 1-3 días)

### Para SMS:
7. Ve a **Phone Numbers → Manage → Buy a number**
8. Busca un número en tu país y compralo (~$1 USD/mes)
9. Ponlo como `TWILIO_SMS_NUMBER`

---

## PASO 6 — Crear el primer usuario administrador (5 min)

1. Ve a tu app en Vercel (ej: `https://tallerpro.vercel.app`)
2. En Supabase → **Authentication → Users** → **"Invite user"**
3. Ingresa tu email
4. Revisa tu email y haz clic en el link de confirmación
5. En Supabase → **SQL Editor**, ejecuta:

```sql
-- Reemplaza 'TU-USER-ID' con el ID que aparece en Authentication → Users
INSERT INTO usuarios (id, nombre, email, rol)
VALUES ('TU-USER-ID', 'Tu Nombre', 'tu@email.com', 'superadmin');

-- Crea el primer taller
INSERT INTO talleres (nombre, plan, activo)
VALUES ('Mi Taller Mecánico', 'pro', true);

-- Vincula el usuario al taller
UPDATE usuarios SET taller_id = (SELECT id FROM talleres LIMIT 1)
WHERE email = 'tu@email.com';
```

---

## PASO 7 — Conectar dominio propio (opcional, 15 min)

Si tienes un dominio (ej: `tallerpro.cl`):

1. En Vercel → tu proyecto → **"Settings → Domains"**
2. Escribe tu dominio y haz clic en **"Add"**
3. Vercel te dará registros DNS para agregar en tu registrador de dominio
4. Espera ~1h para que propague

---

## ✅ ¡Listo!

Tu sistema TallerPro está en línea. Próximos pasos:
- Crea los mecánicos e inspectores en **Configuración → Usuarios**
- Registra el primer vehículo en **Vehículos → Nuevo vehículo**
- Crea la primera orden de trabajo en **Órdenes → Nueva OT**

---

## 🆘 Soporte

Si algo no funciona, puedes pedirle ayuda a Claude directamente en Cowork.  
Describe el error exacto que ves y te ayudará a resolverlo paso a paso.

---

*TallerPro v1.0 — Mayo 2026*
