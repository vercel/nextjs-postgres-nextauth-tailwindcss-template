# 🧩 Guía de Componentes - Tallify

**Versión:** 2.0.0
**Última actualización:** 25 de Diciembre, 2025

Catálogo completo de componentes UI del proyecto con props, ejemplos y best practices.

---

## 📚 Tabla de Contenidos

- [Core UI Components](#core-ui-components)
  - [TransactionItem](#transactionitem)
  - [FilterBar](#filterbar)
  - [SearchBar](#searchbar)
  - [Button](#button)
  - [Card](#card)
  - [Badge](#badge)
  - [Input](#input)
  - [Select](#select)
  - [Textarea](#textarea)
- [Business Components](#business-components)
  - [DashboardKPIs](#dashboardkpis)
  - [QuickAddFAB](#quickaddfab)
  - [UpcomingExpensesWidget](#upcomingexpenseswidget)
- [Layout Components](#layout-components)
  - [Desktop Sidebar Navigation](#desktop-sidebar-navigation)
  - [NavSection](#navsection)
  - [MobileNavBottom](#mobilenavbottom)
  - [Mobile Sidebar Sheet](#mobile-sidebar-sheet)
- [Loading States](#loading-states)
- [Toast Notifications](#toast-notifications)

---

## Core UI Components

### TransactionItem

**Ubicación:** `/components/ui/transaction-item.tsx`

Componente principal para mostrar transacciones de forma consistente en toda la app. Diseñado con inspiración en Wise para máxima claridad y accesibilidad.

#### Props

```typescript
interface TransactionItemProps {
  // Contenido
  icon: string | ReactNode;
  iconColor?: string;
  iconBg?: string;
  title: string;
  subtitle?: string;
  amount: number;
  currency?: string;
  status?: 'paid' | 'pending' | 'overdue' | 'cancelled';
  badge?: ReactNode;

  // Variantes
  variant?: 'default' | 'compact' | 'detailed';
  iconSize?: 'default' | 'compact' | 'large';

  // Interacción
  onClick?: () => void;
  onAction?: () => void;
  actionLabel?: string;
  showChevron?: boolean;
}
```

#### Ejemplo Básico

```tsx
import { TransactionItem } from '@/components/ui/transaction-item';
import { Utensils } from 'lucide-react';

<TransactionItem
  icon={<Utensils />}
  iconColor="hsl(25 95% 53%)"
  title="Comida en restaurante"
  subtitle="Hoy, 2:30 PM · Tarjeta Visa"
  amount={-125.50}
  status="paid"
/>
```

#### Variantes

**Default:** Uso general, padding normal
```tsx
<TransactionItem
  variant="default"
  icon="DollarSign"
  title="Suscripción Netflix"
  amount={-12.99}
/>
```

**Compact:** Para listas densas
```tsx
<TransactionItem
  variant="compact"
  icon="Coffee"
  title="Café"
  amount={-4.50}
/>
```

**Detailed:** Con border y shadow para destacar
```tsx
<TransactionItem
  variant="detailed"
  icon="ShoppingBag"
  title="Compra mensual"
  subtitle="Supermercado Central"
  amount={-250.00}
  badge={<Badge variant="warning">Recurrente</Badge>}
/>
```

#### Estados

```tsx
// Pagado (verde)
<TransactionItem status="paid" amount={-100} />

// Pendiente (amarillo)
<TransactionItem status="pending" amount={-50} />

// Vencido (rojo)
<TransactionItem status="overdue" amount={-75} />

// Cancelado (gris)
<TransactionItem status="cancelled" amount={-30} />
```

#### Interacción

```tsx
// Clickable con chevron
<TransactionItem
  icon="CreditCard"
  title="Pago de tarjeta"
  amount={-500}
  onClick={() => router.push(`/expense/${id}`)}
  showChevron
/>

// Con botón de acción
<TransactionItem
  icon="AlertCircle"
  title="Factura pendiente"
  amount={-150}
  onAction={() => handlePay(id)}
  actionLabel="Pagar"
/>
```

#### Accesibilidad

- ✅ Touch target: 48px (padding p-4)
- ✅ Keyboard navigation: Enter/Space para activar onClick
- ✅ Focus visible: Ring 2px en hover
- ✅ Role="button" cuando es clickable
- ✅ ARIA labels: Título + monto anunciado por lectores de pantalla

---

### FilterBar

**Ubicación:** `/components/ui/filter-bar.tsx`

Barra de filtros horizontal con chips interactivos. Soporta single-select y multi-select.

#### Props

```typescript
interface FilterBarProps {
  filters: Filter[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiSelect?: boolean;
  showCounts?: boolean;
  showReset?: boolean;
  resetLabel?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface Filter {
  id: string;
  label: string;
  count?: number;
  icon?: ReactNode;
  disabled?: boolean;
}
```

#### Ejemplo Básico

```tsx
import { FilterBar } from '@/components/ui/filter-bar';

const [selectedFilters, setSelectedFilters] = useState(['all']);

const filters = [
  { id: 'all', label: 'Todos', count: 45 },
  { id: 'pending', label: 'Pendientes', count: 8 },
  { id: 'paid', label: 'Pagados', count: 37 },
];

<FilterBar
  filters={filters}
  selected={selectedFilters}
  onChange={setSelectedFilters}
  showCounts
/>
```

#### Multi-Select

```tsx
<FilterBar
  filters={categoryFilters}
  selected={selectedCategories}
  onChange={setSelectedCategories}
  multiSelect
  showReset
  resetLabel="Limpiar filtros"
/>
```

#### Con Iconos

```tsx
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react';

const filters = [
  { id: 'expenses', label: 'Gastos', icon: <DollarSign />, count: 120 },
  { id: 'income', label: 'Ingresos', icon: <TrendingUp />, count: 30 },
  { id: 'cards', label: 'Tarjetas', icon: <CreditCard />, count: 5 },
];

<FilterBar filters={filters} selected={selected} onChange={setSelected} />
```

#### Tamaños

```tsx
// Small (sm) - Más compacto
<FilterBar size="sm" filters={filters} />

// Medium (md) - Default
<FilterBar size="md" filters={filters} />

// Large (lg) - Más espacioso
<FilterBar size="lg" filters={filters} />
```

#### Accesibilidad

- ✅ Touch targets: 44px mínimo (min-h-[44px])
- ✅ ARIA pressed: Indica estado seleccionado
- ✅ ARIA disabled: Indica filtros deshabilitados
- ✅ Keyboard navigation: Tab para navegar, Enter/Space para seleccionar
- ✅ Scroll horizontal: Automático con gradientes visuales

---

### SearchBar

**Ubicación:** `/components/ui/search-bar.tsx`

Barra de búsqueda con debounce, sugerencias y keyboard shortcuts.

#### Props

```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
  loading?: boolean;
  debounceMs?: number;
  showShortcut?: boolean;
  variant?: 'default' | 'compact' | 'expanded';
  placeholder?: string;
}
```

#### Ejemplo Básico

```tsx
import { SearchBar } from '@/components/ui/search-bar';

const [query, setQuery] = useState('');

<SearchBar
  value={query}
  onChange={setQuery}
  placeholder="Buscar gastos..."
  showShortcut
/>
```

#### Con Sugerencias

```tsx
const suggestions = ['Netflix', 'Spotify', 'Amazon Prime'];

<SearchBar
  value={query}
  onChange={setQuery}
  suggestions={suggestions}
  onSuggestionSelect={(suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  }}
/>
```

#### Con Debounce Personalizado

```tsx
<SearchBar
  value={query}
  onChange={setQuery}
  onSearch={handleSearch}
  debounceMs={500} // 500ms delay
  loading={isSearching}
/>
```

#### Features

- **Cmd+K / Ctrl+K shortcut:** Focus automático con keyboard shortcut
- **Debounced search:** Delay configurable (default: 300ms)
- **Clear button:** Botón X para limpiar búsqueda
- **Loading state:** Spinner mientras busca
- **Sugerencias:** Dropdown con sugerencias

#### Accesibilidad

- ✅ Touch target: 44px (h-11)
- ✅ Clear button: 32px (visible y accesible)
- ✅ ARIA label: "Limpiar búsqueda" en botón X
- ✅ Keyboard shortcut: Cmd+K anunciado visualmente
- ✅ Focus visible: Ring 2px

---

### Button

**Ubicación:** `/components/ui/button.tsx`

Componente de botón con múltiples variantes y tamaños. Basado en shadcn/ui con mejoras de accesibilidad.

#### Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm';
  asChild?: boolean;
}
```

#### Variantes

```tsx
import { Button } from '@/components/ui/button';

// Default - Verde vibrante primary
<Button variant="default">Guardar</Button>

// Destructive - Rojo para acciones destructivas
<Button variant="destructive">Eliminar</Button>

// Success - Verde para confirmaciones
<Button variant="success">Confirmar</Button>

// Warning - Amarillo para advertencias
<Button variant="warning">Advertencia</Button>

// Info - Azul para información
<Button variant="info">Info</Button>

// Outline - Solo borde
<Button variant="outline">Cancelar</Button>

// Secondary - Gris secundario
<Button variant="secondary">Secundario</Button>

// Ghost - Sin fondo
<Button variant="ghost">Ghost</Button>

// Link - Estilo enlace
<Button variant="link">Ver más</Button>
```

#### Tamaños

```tsx
// Default - 44px (WCAG AA ✅)
<Button size="default">Guardar</Button>

// Small - 40px (WCAG AA ✅)
<Button size="sm">Aceptar</Button>

// Large - 48px (WCAG AA ✅)
<Button size="lg">Confirmar Pago</Button>

// Icon - 44x44px (WCAG AA ✅)
<Button size="icon">
  <Plus className="h-5 w-5" />
</Button>

// Icon Small - 40x40px (WCAG AA ✅)
<Button size="icon-sm">
  <X className="h-4 w-4" />
</Button>
```

#### Ejemplos de Uso

```tsx
// Con loading state
<Button disabled={isLoading}>
  {isLoading ? 'Guardando...' : 'Guardar'}
</Button>

// Como Link (Next.js)
<Button asChild>
  <Link href="/dashboard">Ir al Dashboard</Link>
</Button>

// Con icono
<Button>
  <Save className="mr-2 h-4 w-4" />
  Guardar Cambios
</Button>
```

#### Accesibilidad

- ✅ Touch targets: Todos ≥ 40px
- ✅ Focus visible: Ring 2px en todos los botones
- ✅ Contraste: Todos cumplen WCAG AA (≥ 4.5:1)
- ✅ Disabled state: Pointer-events-none y opacity-50

---

### Card

**Ubicación:** `/components/ui/card.tsx`

Contenedor de contenido modular con header, content y footer.

#### Componentes

```typescript
Card          // Contenedor principal
CardHeader    // Header con padding
CardTitle     // Título (h3 semántico)
CardDescription // Descripción secundaria
CardContent   // Contenido principal
CardFooter    // Footer con acciones
```

#### Ejemplo Básico

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Total del Mes</CardTitle>
    <CardDescription>Diciembre 2025</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold">$12,450.00</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Ver detalles</Button>
  </CardFooter>
</Card>
```

#### Card con Gradient

```tsx
<Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
  <CardHeader>
    <CardTitle className="text-primary">Balance Positivo</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-2xl font-bold">+$3,250.00</p>
  </CardContent>
</Card>
```

#### Card Interactivo

```tsx
<Card className="cursor-pointer hover:bg-accent/50 transition-colors">
  <CardHeader>
    <CardTitle>Categoría: Comida</CardTitle>
    <CardDescription>120 transacciones este mes</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-xl font-semibold">$2,450.00</p>
  </CardContent>
</Card>
```

---

### Badge

**Ubicación:** `/components/ui/badge.tsx`

Etiquetas de estado pequeñas y compactas.

#### Variantes

```tsx
import { Badge } from '@/components/ui/badge';

// Default - Gris neutro
<Badge variant="default">Default</Badge>

// Secondary
<Badge variant="secondary">Secondary</Badge>

// Destructive - Rojo
<Badge variant="destructive">Vencido</Badge>

// Outline - Solo borde
<Badge variant="outline">Pendiente</Badge>

// Success - Verde (custom)
<Badge variant="success">Pagado</Badge>

// Warning - Amarillo (custom)
<Badge variant="warning">Por vencer</Badge>

// Info - Azul (custom)
<Badge variant="info">Información</Badge>
```

#### Ejemplos de Uso

```tsx
// En TransactionItem
<TransactionItem
  title="Netflix"
  amount={-12.99}
  badge={<Badge variant="warning">Recurrente</Badge>}
/>

// Status indicators
<div className="flex gap-2">
  <Badge variant="success">Activo</Badge>
  <Badge variant="destructive">Inactivo</Badge>
</div>

// Con contador
<Badge>{count} nuevos</Badge>
```

---

### Input

**Ubicación:** `/components/ui/input.tsx`

Campo de texto con validación y accesibilidad completa.

#### Props

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Hereda todos los props de input HTML
}
```

#### Ejemplo Básico

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="amount">Monto</Label>
  <Input
    id="amount"
    type="number"
    step="0.01"
    placeholder="0.00"
  />
</div>
```

#### Tipos de Input

```tsx
// Texto
<Input type="text" placeholder="Descripción del gasto" />

// Número
<Input type="number" step="0.01" min="0" placeholder="0.00" />

// Fecha
<Input type="date" defaultValue={todayDate} />

// Email
<Input type="email" placeholder="correo@ejemplo.com" />

// Password
<Input type="password" placeholder="••••••••" />

// Search
<Input type="search" placeholder="Buscar..." />
```

#### Con Validación

```tsx
const [error, setError] = useState('');

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    required
    aria-invalid={!!error}
    aria-describedby="email-error"
  />
  {error && (
    <p id="email-error" className="text-sm text-destructive">
      {error}
    </p>
  )}
</div>
```

#### Accesibilidad

- ✅ Touch target: 44px (h-11)
- ✅ Focus visible: Ring 2px
- ✅ Label asociado: htmlFor + id
- ✅ Error messages: aria-describedby
- ✅ Required fields: required attribute

---

### Select

**Ubicación:** `/components/ui/select.tsx`

Dropdown selector basado en Radix UI.

#### Componentes

```typescript
Select            // Wrapper principal
SelectTrigger     // Botón que abre el dropdown
SelectValue       // Valor seleccionado mostrado
SelectContent     // Contenedor del dropdown
SelectItem        // Item individual
SelectGroup       // Agrupar items
SelectLabel       // Label de grupo
```

#### Ejemplo Básico

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Select value={categoryId} onValueChange={setCategoryId}>
  <SelectTrigger>
    <SelectValue placeholder="Selecciona una categoría" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Comida</SelectItem>
    <SelectItem value="2">Transporte</SelectItem>
    <SelectItem value="3">Entretenimiento</SelectItem>
  </SelectContent>
</Select>
```

#### Con Grupos

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Método de pago" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Tarjetas</SelectLabel>
      <SelectItem value="visa">Visa ••1234</SelectItem>
      <SelectItem value="mastercard">Mastercard ••5678</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Efectivo</SelectLabel>
      <SelectItem value="cash">Efectivo</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

#### Con Iconos

```tsx
const categories = [
  { id: '1', name: 'Comida', icon: '🍔' },
  { id: '2', name: 'Transporte', icon: '🚗' },
];

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Categoría" />
  </SelectTrigger>
  <SelectContent>
    {categories.map((cat) => (
      <SelectItem key={cat.id} value={cat.id}>
        {cat.icon} {cat.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

---

### Textarea

**Ubicación:** `/components/ui/textarea.tsx`

Campo de texto multi-línea.

#### Ejemplo Básico

```tsx
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="notes">Notas</Label>
  <Textarea
    id="notes"
    placeholder="Agrega notas adicionales..."
    rows={4}
  />
</div>
```

#### Con Límite de Caracteres

```tsx
const [notes, setNotes] = useState('');
const maxLength = 500;

<div className="space-y-2">
  <Label htmlFor="notes">
    Notas ({notes.length}/{maxLength})
  </Label>
  <Textarea
    id="notes"
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
    maxLength={maxLength}
    rows={5}
  />
</div>
```

---

## Business Components

### DashboardKPIs

**Ubicación:** `/app/dashboard/dashboard-kpis.tsx`

Grid de KPIs principales del dashboard.

#### Muestra

- Total Gastos del mes
- Total Ingresos del mes
- Balance (Ingresos - Gastos)
- Gastos recurrentes

#### Ejemplo de Uso

```tsx
import { DashboardKPIs } from '@/app/dashboard/dashboard-kpis';

const kpisData = {
  totalExpenses: 5420.50,
  totalIncome: 8500.00,
  balance: 3079.50,
  recurringExpenses: 450.00,
};

<DashboardKPIs {...kpisData} />
```

---

### QuickAddFAB

**Ubicación:** `/app/dashboard/quick-add-fab.tsx`

Floating Action Button para agregar gastos rápidamente.

#### Props

```typescript
interface QuickAddFABProps {
  categories: Category[];
  paymentMethods: PaymentMethod[];
}
```

#### Features

- **FAB Position:** Bottom-right corner (bottom-20 right-4 en móvil, bottom-6 right-6 en desktop)
- **Dialog:** Formulario simplificado de gasto
- **Campos básicos:** Descripción, monto, fecha, categoría
- **Campos avanzados:** Método de pago, tipo (único/recurrente), frecuencia, notas
- **Validación:** Inline con toast notifications
- **Estado:** Marca como pagado checkbox
- **UX:** Auto-focus en descripción, reset automático, router.refresh() después de guardar

#### Accesibilidad

- ✅ ARIA label: "Agregar gasto rápido"
- ✅ Focus visible
- ✅ Keyboard accessible
- ✅ Touch target adecuado

---

### UpcomingExpensesWidget

**Ubicación:** `/app/dashboard/upcoming-expenses-widget.tsx`

Widget que muestra próximos gastos a vencer.

#### Features

- Lista de gastos pendientes ordenados por urgencia
- Colores de urgencia:
  - **< 3 días:** Naranja (urgente)
  - **3-7 días:** Amarillo (próximo)
  - **> 7 días:** Verde (lejano)
- Acciones rápidas: "Marcar como pagado"
- Empty state cuando no hay gastos pendientes

#### Ejemplo

```tsx
import { UpcomingExpensesWidget } from '@/app/dashboard/upcoming-expenses-widget';

<UpcomingExpensesWidget userId={user.id} />
```

---

## Layout Components

### Desktop Sidebar Navigation

**Ubicación:** `/app/[locale]/dashboard/layout.tsx` (DesktopNav function)

Sidebar de navegación lateral para desktop con secciones colapsables y perfil de usuario.

#### Dimensiones

- **Width:** 208px (`w-52`) - Optimizado para balance entre navegación y contenido
- **Position:** Fixed a la izquierda (solo visible en desktop `sm:flex`)
- **Content offset:** `sm:pl-52` aplicado al contenedor principal

#### Estructura

1. **Logo/Brand** - Link al dashboard con logo y nombre de la app
2. **Main Navigation** - Secciones colapsables (Gasto, Ingresos)
3. **User Profile Section** - Avatar, nombre, plan y dropdown con perfil/logout

#### Features

- **Dashboard access:** Vía logo (no link separado en navegación)
- **Secciones colapsables:** NavSection con estado persistente en localStorage
- **Sin separadores verticales:** NavSection items sin `border-l`
- **User dropdown:** Configuración, Cuenta, Seguridad, Exportar, Cerrar sesión
- **Auto-expand:** Sección se expande automáticamente si ruta activa

#### Accesibilidad

- ✅ Logo link: `min-h-[44px]` con ARIA label
- ✅ NavSection triggers: `min-h-[40px]` con ARIA expanded
- ✅ Nested nav items: `min-h-[36px]` con ARIA current
- ✅ User profile button: Touch target adecuado con roles semánticos
- ✅ Focus visible: Ring 2px en todos los elementos interactivos

---

### NavSection

**Ubicación:** `/app/[locale]/dashboard/nav-section.tsx`

Componente de navegación colapsable para agrupar links relacionados en el sidebar.

#### Props

```typescript
interface NavSectionProps {
  title: string;
  icon: IconName; // Nombre del icono de lucide-react
  links: NavLink[];
  defaultOpen?: boolean;
  storageKey: string; // Para persistir estado en localStorage
}

interface NavLink {
  href: string;
  label: string;
  icon: IconName;
}
```

#### Ejemplo de Uso

```tsx
const expenseLinks = [
  { href: '/dashboard/expenses', label: 'Todos', icon: 'Receipt' },
  { href: '/dashboard/categories', label: 'Categorías', icon: 'FolderOpen' },
  { href: '/dashboard/payment-methods', label: 'Métodos de pago', icon: 'CreditCard' }
];

<NavSection
  title="Gasto"
  icon="DollarSign"
  links={expenseLinks}
  defaultOpen={true}
  storageKey="nav-expense-open"
/>
```

#### Features

- **Collapsible:** Radix UI Collapsible con animación suave
- **Estado persistente:** localStorage guarda open/closed state
- **Auto-expand:** Se expande si contiene la ruta activa
- **Visual feedback:** Highlight en sección y link activos
- **Sin separadores:** Items anidados sin `border-l` (diseño limpio)

#### Accesibilidad

- ✅ Touch targets: Trigger 40px, nested items 36px
- ✅ ARIA expanded: Indica estado colapsado/expandido
- ✅ ARIA current: "page" en link activo
- ✅ Focus visible: Ring 2px
- ✅ Keyboard navigation: Enter/Space para toggle, Tab para navegar

---

### MobileNavBottom

**Ubicación:** `/components/mobile-nav-bottom.tsx`

Navegación inferior para móviles con 3 items principales + "Más".

#### Features

- **3 items principales:** Inicio, Gastos, (+ Más)
- **Sheet "Más":** Contiene Ingresos, Categorías, Métodos de Pago, Gastos Pagados, Perfil
- **Indicador activo:** Gradient bar superior + background highlight
- **Animaciones:** Scale on active, hover effects
- **Responsive:** Solo visible en móvil (sm:hidden)
- **User profile:** Dropdown integrado en sheet con avatar, nombre y plan

#### Accesibilidad

- ✅ ARIA current: "page" en item activo
- ✅ ARIA label: En todos los botones
- ✅ ARIA expanded: En botón "Más"
- ✅ Touch targets: 44px en todos los items
- ✅ Focus visible: Ring 2px

---

### Mobile Sidebar Sheet

**Ubicación:** `/app/[locale]/dashboard/layout.tsx` (MobileNav function)

Sheet lateral para navegación móvil (hamburger menu) que replica estructura del sidebar desktop.

#### Features

- **Trigger:** Botón PanelLeft en header (solo visible en móvil)
- **Estructura:** Logo + Dashboard link + Secciones (Gasto/Ingresos) + User profile
- **User profile section:** Idéntico a desktop (avatar, nombre, plan, dropdown)
- **Homologado con desktop:** Mismo patrón de navegación y opciones

#### Accesibilidad

- ✅ Sheet title + description: Para lectores de pantalla
- ✅ Touch targets: min-h-[40px] en todos los links
- ✅ Focus trap: Radix Sheet maneja automáticamente
- ✅ Close on selection: Sheet se cierra al navegar

---

## Loading States

**Ubicación:** `/components/ui/skeletons.tsx`

Componentes de skeleton para estados de carga.

### Disponibles

```tsx
import {
  TransactionItemSkeleton,
  TransactionListSkeleton,
  TimelineGroupSkeleton,
  CategoryCardSkeleton,
  CategoryGridSkeleton,
  KPICardSkeleton,
  KPIGridSkeleton,
  SearchBarSkeleton,
  FilterBarSkeleton,
  TableSkeleton,
  FormSkeleton,
} from '@/components/ui/skeletons';
```

### Ejemplos

```tsx
// Lista de transacciones
{isLoading ? (
  <TransactionListSkeleton count={5} />
) : (
  <TransactionList items={expenses} />
)}

// Grid de categorías
{isLoading ? (
  <CategoryGridSkeleton count={6} />
) : (
  <CategoryGrid categories={categories} />
)}

// KPIs del dashboard
{isLoading ? (
  <KPIGridSkeleton count={4} />
) : (
  <DashboardKPIs {...kpisData} />
)}
```

### Features

- **Shimmer animation:** Loading shimmer effect
- **Responsive:** Se adaptan al layout
- **Counts configurables:** Muestra N skeletons
- **Match real components:** Mismo tamaño y layout

---

## Toast Notifications

**Ubicación:** `/lib/utils/toast-helpers.tsx`

Sistema de notificaciones mejorado con helpers de uso fácil.

### Hook

```tsx
import { useEnhancedToast } from '@/lib/utils/toast-helpers';

const { success, error, warning, info, loading, promise } = useEnhancedToast();
```

### Tipos

```tsx
// Success
success({
  title: 'Gasto guardado',
  description: 'El gasto se registró correctamente'
});

// Error
error({
  title: 'Error al guardar',
  description: error.message
});

// Warning
warning({
  title: 'Atención',
  description: 'Este gasto ya existe'
});

// Info
info({
  title: 'Información',
  description: 'Los datos se sincronizaron'
});

// Loading
const toastId = loading({
  title: 'Guardando...',
  description: 'Por favor espera'
});

// Promise (auto-maneja loading, success, error)
await promise(
  saveExpense(data),
  {
    loading: 'Guardando gasto...',
    success: 'Gasto guardado ✅',
    error: 'Error al guardar'
  }
);
```

### Ejemplo Completo

```tsx
'use client';

import { useEnhancedToast } from '@/lib/utils/toast-helpers';

export function MyComponent() {
  const { promise } = useEnhancedToast();

  const handleSave = async (data: FormData) => {
    await promise(
      saveExpense(data),
      {
        loading: 'Guardando gasto...',
        success: 'Gasto guardado correctamente ✅',
        error: (err) => `Error: ${err.message}`
      }
    );
  };

  return <form onSubmit={handleSave}>...</form>;
}
```

---

## 🎨 Design Tokens

Todos los componentes usan design tokens definidos en `/app/globals.css`.

### Colores Principales

```css
--primary: 98 100% 70%;            /* Verde vibrante #9FFF66 */
--primary-foreground: 153 65% 8%;  /* Verde pino dark */

--destructive: 0 84% 60%;          /* Rojo */
--success: 98 100% 70%;            /* Verde vibrante */
--warning: 38 92% 50%;             /* Amber */
--info: 199 89% 48%;               /* Azul */
```

### Uso en Componentes

```tsx
// Usar design tokens directamente
<div className="bg-primary text-primary-foreground">
  Botón Primary
</div>

<div className="bg-destructive text-destructive-foreground">
  Botón Destructive
</div>

<div className="bg-muted text-muted-foreground">
  Elemento muted
</div>
```

Ver [design-system.md](./design/design-system.md) para paleta completa.

---

## ♿ Accesibilidad

Todos los componentes cumplen **WCAG 2.1 Nivel AA**.

### Checklist de Verificación

Al crear o modificar componentes, verificar:

- [ ] **Touch targets ≥ 44px** en elementos interactivos
- [ ] **Contraste ≥ 4.5:1** para texto normal
- [ ] **ARIA labels** en botones sin texto
- [ ] **Keyboard navigation** completa (Tab, Enter, Space, Escape, Arrows)
- [ ] **Focus visible** con ring de 2px
- [ ] **Semantic HTML** (nav, main, button, etc.)
- [ ] **Screen reader** friendly (roles, labels, descriptions)

Ver [ACCESSIBILITY-COMPLIANCE.md](./ACCESSIBILITY-COMPLIANCE.md) para detalles completos.

---

## 📚 Recursos Adicionales

- **[design-system.md](./design/design-system.md)** - Sistema de diseño Tallify completo
- **[ACCESSIBILITY-COMPLIANCE.md](./ACCESSIBILITY-COMPLIANCE.md)** - Auditoría de accesibilidad
- **[shadcn/ui Docs](https://ui.shadcn.com/)** - Documentación oficial de shadcn/ui
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Documentación de Tailwind
- **[Lucide Icons](https://lucide.dev/)** - Catálogo de iconos

---

**Proyecto:** Tallify - Expense Tracking App
**Versión:** 2.0.0
**Última actualización:** 25 de Diciembre, 2025
