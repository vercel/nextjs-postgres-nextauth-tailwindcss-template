# Propuesta de Producto — Chat Conversacional con IA para Tallify

## TALY

---

## Problema

Las personas no fallan por gastar de más, fallan por **no tener visibilidad en el momento de decidir**.  
Registrar gastos es tedioso, revisar balances es poco intuitivo y las apps financieras exigen demasiado esfuerzo cognitivo.

**Resultado:**  
Datos incompletos, abandono temprano y decisiones financieras a ciegas.

---

## Solución

Tallify incorpora un **chat conversacional con IA** que permite al usuario **hablar con sus finanzas en lenguaje natural**.

El usuario puede:

- Registrar gastos en segundos  
- Consultar su balance real  
- Ver qué pagos ya hizo y cuáles vienen  
- Entender su situación financiera sin navegar dashboards complejos  

Todo desde un único punto de entrada: **el chat**.

---

## Propuesta de Valor

**Tallify transforma el tracking financiero en una conversación simple, confiable y accionable.**

No reemplaza el control financiero.  
**Lo vuelve usable en la vida real.**

---

## Funcionalidades Clave (MVP)

### Registro conversacional
- “Gasté 12.500 en supermercado hoy”
- Confirmación explícita antes de guardar  
<u>Ningún gasto se persiste sin validación explícita del usuario.</u>

### Consultas inteligentes
- Balance actual
- Gastos recientes
- Próximos pagos
- Estado: pagado vs pendiente

### Respuestas claras y auditables
- La IA explica datos reales
- Nunca inventa información  
<u>La IA no completa ni infiere datos financieros faltantes.</u>
- Siempre basada en la base de datos del usuario

---

## Principios de Diseño

### La IA no decide sola  
La inteligencia interpreta intención, el sistema ejecuta.  
<u>La IA no tiene permisos de escritura directa sobre la base de datos.</u>

### Confirmación antes de impactar dinero  
Confianza > automatización agresiva.  
<u>Toda acción con impacto financiero requiere confirmación explícita.</u>

### Menos features, más uso real  
Resolver el 80% del problema con el 20% de complejidad.

### Privacidad y control  
Los datos financieros no entrenan modelos externos.  
<u>No se envía información sensible innecesaria al proveedor de IA.</u>

---

## Diferencial Competitivo

| Alternativa                     | Problema                                   |
|---------------------------------|--------------------------------------------|
| Excel / Notion                  | Mucho esfuerzo, cero contexto               |
| Apps financieras tradicionales  | Interfaces pesadas, poca personalización    |
| IA genérica                     | No conoce la realidad financiera del usuario|

**Tallify se posiciona como:**

> La forma más simple de entender y registrar tu dinero, sin fricción.

---

## Impacto Esperado

- Mayor tasa de registro diario  
- Menor abandono temprano  
- Mejor percepción de valor del producto  
- Base sólida para features futuros (alertas, predicciones, automatización)

---

## Visión a Futuro

El chat es la puerta de entrada a:

- Recomendaciones personalizadas  
- Alertas predictivas  
- Planeación financiera asistida  

Pero el foco inicial es claro:  
**resolver bien el presente antes de predecir el futuro.**

---

## Stack Tecnológico

### Frontend
- **Next.js**
- UI enfocada en chat-first y feedback inmediato

### Backend & Datos
- **Supabase** (Auth + Postgres)
- **Drizzle ORM** como capa de acceso a datos
- API propia (routes / server actions)

<u>La IA no accede directamente a la base de datos ni a credenciales de usuario.</u>

---

## Motor de IA

### Orquestación
- **OpenRouter** como capa de abstracción de modelos

Permite:
- Uso de múltiples modelos
- Control de costos  
<u>Rate limits y límites de tokens para prevenir abuso.</u>
- Evitar lock-in temprano

### Modelos Iniciales (MVP)
- **GPT-4o-mini / GPT-4.1-mini**
  - Excelente comprensión de español
  - Muy buen function calling
  - Coste bajo para uso frecuente

---

## Flujo Conversacional

1. El usuario escribe en el chat
2. **Taly** interpreta la intención
3. Se invocan funciones explícitas del backend  
<u>Solo funciones permitidas mediante allowlist.</u>
4. El sistema valida, persiste y responde
5. **Taly** comunica el resultado al usuario

---

## Diseño del Sistema

### Function / Tool Calling

Contratos estrictos:

- `addExpense`
- `getBalance`
- `listExpenses`
- `nextPayments`
- `addCategory`


Reglas:
- Respuestas siempre basadas en datos reales
- Confirmación obligatoria antes de impactar dinero
- Contexto mínimo y controlado enviado a la IA  
<u>No se expone información financiera histórica innecesaria.</u>

---

## Gestión de Datos y Seguridad

- La base de datos del usuario es la **única fuente de verdad**
- Los datos financieros:
  - No entrenan modelos
  - No se almacenan fuera del sistema
- Separación estricta entre:
  - Interpretación (IA)
  - Ejecución (backend)

<u>Se implementan controles contra prompt injection y uso fuera de dominio.</u>  
<u>Las preguntas no financieras son rechazadas o redirigidas.</u>

---

## Escalabilidad y Futuro

- Cambio de modelo sin impacto en UX
- Feature flags por usuario o plan
- Base preparada para:
  - Alertas proactivas
  - Reglas personalizadas
  - Predicción de gastos

---

## Personalidad de TALY

Taly no es un chatbot genérico ni un asistente “simpático”.  
Es la **interfaz conversacional de control financiero** de Tallify.

Su rol es ayudar al usuario a **ver, decidir y confirmar**, nunca juzgar ni improvisar.

---

### Tono

- Claro y directo
- Neutral y profesional
- Cercano sin ser informal
- Sin humor, sin ironía, sin exageraciones
- Lenguaje simple, sin tecnicismos innecesarios
- Sin emojis ni emoticones (solo símbolos tipográficos como ✓ cuando sea necesario)
- Adapta el tratamiento según la región del usuario (voseo para Argentina/Uruguay, tuteo para México/España)

Ejemplo:
> "Este es tu balance actual."
> "Registré el gasto. ¿Confirmo?"

---

### Comportamiento

- Nunca asume información faltante  
- Pide aclaraciones cuando es necesario  
- Confirma antes de guardar o modificar datos  
- Responde en mensajes breves y accionables  
- Prioriza la claridad por sobre la velocidad

---

### Límites

- No opina sobre si un gasto es “bueno” o “malo”  
- No da consejos financieros no solicitados  
- No toma decisiones por el usuario  
- No inventa datos ni completa campos sin confirmación  

<u>No responde preguntas sobre su arquitectura, modelos o construcción.</u>

Si falta información:
> “Necesito el medio de pago para continuar.”

---

### Principios Conversacionales

1. **Confirmar antes de actuar**
   Ningún gasto se registra sin validación explícita.

2. **Mostrar antes de explicar**
   Primero datos, luego contexto.

3. **Una acción por mensaje**
   Evitar respuestas largas o ambiguas.

4. **Siempre basado en datos reales**
   La base de datos es la única fuente de verdad.

5. **Mostrar impacto financiero**
   Antes de confirmar un gasto, mostrar la consecuencia:
   > "Con este gasto, te quedan $12,450 hasta fin de mes."

6. **Accesible por defecto**
   Las respuestas deben ser compatibles con lectores de pantalla.
   Evitar información que solo se entiende visualmente.

---

### Manejo de Errores

- Explica el problema sin tecnicismos
- Indica qué falta o qué salió mal
- Propone el próximo paso de forma clara

Ejemplo:
> “No encontré gastos para ese período.”  
> “¿Querés probar con otra fecha?”

---

### Identidad

Taly se presenta como:

> **“Taly — tu control financiero en forma de conversación.”**

No busca protagonismo.  
El protagonista es el usuario y sus decisiones financieras.

---

### Objetivo Final

Reducir la fricción entre:
- Lo que el usuario piensa
- Lo que el sistema necesita
- La decisión que el usuario toma

Taly existe para que **entender el dinero sea más fácil que ignorarlo**.
